<template>
	<div style="position: absolute; " :id="ukey" :style="locationObject">
		<div style="position: absolute;width:100%; height: 100%;box-sizing: border-box;" :id='mapid' :style="styleObject">

		</div>

		<div style="position: absolute;width:100%; height: 100%;z-index: 2000;" v-show="editmode">

		</div>
		<slot>
		</slot>
	</div>
</template>

<script>
	import common from '../../mixins/common.js'
	import { mapState } from 'vuex'
	export default {
		message: '地图组件',
		name: 'SeMap',
		mixins: [common],
		data() {
			return {
				map: undefined,
				seManager: undefined,
				zoomControl: null,
				toolbarControl: null,
				mapInfoControl: null,
				layerControl: null,
				miniMapControl: null
			}
		},
		mounted() {
			this.initMap();
		},
		computed: {
			mapid() {
				return 'map_' + this.ukey;
			},
			...mapState([
				'url', 'token', 'ak'
			])
		},
		methods: {
			/***
			 * 创建TileLayers
			 */
			createTileLayers(type) {
				var array = [];
				switch(type) {
					case 1: //天地图矢量地图
						{
							array.push(L.PBM.createTileLayer(L.PBMType.tdt_vec_4326, "天地图矢量地图"));
							array.push(L.PBM.createTileLayer(L.PBMType.tdt_vec_a_4326, "天地图矢量地图"));
							break;
						}
					case 2: //天地图影像地图
						{
							array.push(L.PBM.createTileLayer(L.PBMType.tdt_img_4326, "天地图影像地图"));
							array.push(L.PBM.createTileLayer(L.PBMType.tdt_ter_a_4326, "天地图影像地图"));
							break;
						}
					case 3: //高德矢量地图
						{
							array.push(L.PBM.createTileLayer(L.PBMType.gaode_vec_3857, "高德矢量地图"));
							break;
						}
					case 4: //高德影像地图
						{
							array.push(L.PBM.createTileLayer(L.PBMType.gaode_img_3857, "高德影像地图"));
							break;
						}
					case 5: //腾讯矢量地图
						{
							array.push(L.PBM.createTileLayer(L.PBMType.tencent_vec_3857, "腾讯矢量地图"));
							break;
						}
					case 6: //腾讯影像地图
						{
							array.push(L.PBM.createTileLayer(L.PBMType.tencent_img_3857, "腾讯影像地图"));
							break;
						}
					case 7: //谷歌矢量地图
						{
							array.push(L.PBM.createTileLayer(L.PBMType.google_vec_3857, "谷歌矢量地图"));
							break;
						}
					case 8: //谷歌影像地图
						{
							array.push(L.PBM.createTileLayer(L.PBMType.google_img_3857, "谷歌影像地图"));
							break;
						}
					case 9: //智图矢量地图
						{
							array.push(L.PBM.createTileLayer(L.PBMType.geoq_vec_3857, "智图矢量地图"));
							break;
						}
					case 10: //智图蓝色地图
						{
							array.push(L.PBM.createTileLayer(L.PBMType.geoq_vec_purplishBlue_3857, "智图蓝色地图"));
							break;
						}
					case 11: //OSM矢量地图
						{
							array.push(L.PBM.createTileLayer(L.PBMType.osm_vec_3857, "OSM矢量地图"));
							break;
						}
				}
				return array;
			},
			//重置地图容器大小
			resize(newval) {
				let chartdiv = document.getElementById(this.mapid);
				chartdiv.style.width = (newval.width) + "px";
				chartdiv.style.height = (newval.height) + "px";
				this.map && this.map._onResize();
				this.lockMap();
			},
			lockMap() {
				this.map && this.map.setView(L.latLng(this.params.mapInit.center[1], this.params.mapInit.center[0]), this.params.mapInit.zoom);
				//				setTimeout(() => {
				//					if(this.map) {
				//						this.map.setView(L.latLng(this.params.mapInit.center[1], this.params.mapInit.center[0]), this.params.mapInit.zoom);
				//						this.map.dragging.disable();
				//						this.map.touchZoom.disable();
				//						this.map.doubleClickZoom.disable();
				//						this.map.scrollWheelZoom.disable();
				//						this.map.boxZoom.disable();
				//					}
				//				}, 1000)
			},
			/***
			 * 初始化地图
			 */
			initMap() {
				this.$nextTick(() => {
					if(this.map) {
						this.map.eachLayer((layer) => {
							this.map.removeLayer(layer);
						})
						if(this.params.data && this.params.data.id != '0') {
//							this.map.closeMap();
                            this.seManager && this.seManager.removeAllVectorService();
						}
					}
					if(this.params.data && this.params.data.id != '0' || this.params.publicMap.id != 0) {
						var options = {
							center: [this.params.mapInit.center[1], this.params.mapInit.center[0]],
							zoom: this.params.mapInit.zoom,
							zoomControl: false,
							preferCanvas: true
						};
						if(this.params.publicMap.id > 2) {
							options.crs = L.CRS.EPSG3857
						} else {
							options.crs = L.CRS.EPSG4326;
						}
						var array = this.createTileLayers(this.params.publicMap.id);
						if(!this.map) {
							this.map = new L.Map(this.mapid, options);
							var sUrl = this.url;
							var token = this.token;
							//var ak=this.ak;
//							if(token && sUrl) {
//								
//							} else {
//								this.$message({
//									message: '服务地址为空！',
//									type: 'error'
//								});
//							}
							this.seManager = new L.SE.SeManager(this.map, {
									serviceUrl: sUrl,
									token: token
								})
						} else {
							this.map.options.crs = options.crs;
						}
					    array && array.forEach((item) => {
							this.map.addLayer(item);
						})
						if(this.params.data && this.params.data.id != '0') {
							var mapId=this.params.data.id;
							this.seManager.addVectorService(mapId,{
                                 bfitBounds:true
                                });
						}
						
							
						this.lockMap();
						this.removeAllControl();
						this.addControl();
					} else {
						if(this.map) {
							this.removeAllControl();
                            this.seManager && this.seManager.removeAllVectorService();
							L.DomUtil.setClass(L.DomUtil.get(this.mapid), '');
							this.map.remove();
							this.map = undefined;
							this.seManager=undefined;
						}
					}

				})

			},
			removeAllControl() {
				if(this.map) {
					if(this.zoomControl) {
						this.map.removeControl(this.zoomControl);
						this.zoomControl = null;
					}
					if(this.toolbarControl) {
						this.map.removeControl(this.toolbarControl);
						this.toolbarControl = null;
					}
					if(this.mapInfoControl) {
						this.map.removeControl(this.mapInfoControl);
						this.mapInfoControl = null;
					}
					if(this.layerControl) {
						this.map.removeControl(this.layerControl);
						this.layerControl = null;
					}
					if(this.miniMapControl) {
						this.map.removeControl(this.miniMapControl);
						this.miniMapControl = null;
					}
				}
			},
			addControl() {
				if(this.map) {
					if(this.params.mapInteract.showZoom) { //地图缩放[未用到]
						if(!this.zoomControl) {
							this.zoomControl = new L.Control.Zoom({
								position: "bottomright"
							});
						} else {
							this.map.removeControl(this.zoomControl);
						}
						this.map.addControl(this.zoomControl);
					} else {
						this.zoomControl && this.map.removeControl(this.zoomControl);
					}
					if(this.params.mapInteract.showToolBar) { //工具条
						if(!this.toolbarControl) {
							this.toolbarControl = new L.Control.SeToolBar({
								position: "topleft"
							});
						} else {
							this.map.removeControl(this.toolbarControl);
						}
						this.map.addControl(this.toolbarControl);
					} else {
						this.toolbarControl && this.map.removeControl(this.toolbarControl);
					}
					if(this.params.mapInteract.showMapInfo) { //地图信息
						if(!this.mapInfoControl) {
							this.mapInfoControl = new L.Control.MapInfo({
								position: 'bottomleft',
								mousePosShow: true,
								zoomShow: true,
								scaleShow: true
							});
						} else {
							this.map.removeControl(this.mapInfoControl);
						}
						this.map.addControl(this.mapInfoControl);
					} else {
						this.mapInfoControl && this.map.removeControl(this.mapInfoControl);
					}
					//矢量图层列表
					this.map.on("openMap", () => {
//						if(this.params.mapInteract.showLayers) { //矢量图层列表
//							var layers = this.map.getSeLayerList();
//							if(layers) {
//								if(!this.layerControl) {
//									this.layerControl = new L.Control.SeLayers({}, {}, layers, {
//										position: 'topright'
//									});
//								} else {
//									this.map.removeControl(this.layerControl);
//								}
//								this.map.addControl(this.layerControl);
//							}
//						} else {
//							this.layerControl && this.map.removeControl(this.layerControl);
//						}
					});
					if(this.params.mapInteract.showMiniMap) { //影眼图
						if(!this.miniMapControl) {
							var array = [];
							if(this.params.publicMap != undefined && this.params.publicMap.id != 0) {
								array = this.createTileLayers(this.params.publicMap.id);
							} else {
								//处理主地图的瓦片图层为空时，默认加载天地图
								if(this.map.options.crs.code == "EPSG:4326") {
									array.push(L.PBM.createTileLayer(L.PBMType.tdt_vec_4326, "天地图矢量地图"));
								} else {
									array.push(L.PBM.createTileLayer(L.PBMType.tdt_vec_3857, "天地图矢量地图"))
								}
							}
							this.miniMapControl = L.control.minimap(array[0], {
								toggleDisplay: true,
								strings: {
									hideText: '隐藏',
									showText: '显示'
								},
							});
						} else {
							this.map.removeControl(this.miniMapControl);
						}
						this.map.addControl(this.miniMapControl);
					} else {
						this.miniMapControl && this.map.removeControl(this.miniMapControl);
					}
				}
			}
		},
		watch: {
			'location': {
				handler(curVal, oldVal) {　
					this.resize(curVal);
				},
				deep: true
			},
			'params.mapInit': {
				handler(curVal, oldVal) {
					this.lockMap();
				},
				deep: true
			},
			'params.publicMap': {
				handler(curVal, oldVal) {　　
					this.initMap();
				},
				deep: true
			},
			'params.mapInteract': {
				handler(curVal, oldVal) {　　
					this.initMap();
				},
				deep: true
			},
			'params.data': {
				handler(curVal, oldVal) {　　
					this.initMap();
				},
				deep: true
			}
		}
	}
//	/*
//	 * @class Control.SeLayers
//	 */
//	L.Control.SeLayers = L.Control.extend({
//		// @section
//		// @aka Control.Layers options
//		options: {
//			// @option collapsed: Boolean = true
//			// If `true`, the control will be collapsed into an icon and expanded on mouse hover or touch.
//			collapsed: true,
//			position: 'topright',
//
//			// @option autoZIndex: Boolean = true
//			// If `true`, the control will assign zIndexes in increasing order to all of its layers so that the order is preserved when switching them on/off.
//			autoZIndex: true,
//
//			// @option hideSingleBase: Boolean = false
//			// If `true`, the base layers in the control will be hidden when there is only one.
//			hideSingleBase: false,
//
//			// @option sortLayers: Boolean = false
//			// Whether to sort the layers. When `false`, layers will keep the order
//			// in which they were added to the control.
//			sortLayers: false,
//
//			// @option sortFunction: Function = *
//			// A [compare function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
//			// that will be used for sorting the layers, when `sortLayers` is `true`.
//			// The function receives both the `L.Layer` instances and their names, as in
//			// `sortFunction(layerA, layerB, nameA, nameB)`.
//			// By default, it sorts layers alphabetically by their name.
//			sortFunction: function(layerA, layerB, nameA, nameB) {
//				return nameA < nameB ? -1 : (nameB < nameA ? 1 : 0);
//			}
//		},
//
//		initialize: function(baseLayers, overlays, seLayers, options) {
//			L.setOptions(this, options);
//
//			this._layers = [];
//			this._lastZIndex = 0;
//			this._handlingClick = false;
//
//			for(var i in baseLayers) {
//				this._addLayer(baseLayers[i], i);
//			}
//
//			for(i in overlays) {
//				this._addLayer(overlays[i], i, true);
//			}
//			if(seLayers) {
//				var index = 0;
//				var count = seLayers.length;
//				for(index = 0; index < count; index++) {
//					this._addLayer(seLayers[index], seLayers[index].label, true);
//				}
//			}
//		},
//
//		onAdd: function(map) {
//			this._initLayout();
//			this._update();
//
//			this._map = map;
//			map.on('zoomend', this._checkDisabledLayers, this);
//
//			return this._container;
//		},
//
//		onRemove: function() {
//			this._map.off('zoomend', this._checkDisabledLayers, this);
//
//			for(var i = 0; i < this._layers.length; i++) {
//				this._layers[i].layer.off('add remove', this._onLayerChange, this);
//			}
//		},
//
//		// @method addBaseLayer(layer: Layer, name: String): this
//		// Adds a base layer (radio button entry) with the given name to the control.
//		addBaseLayer: function(layer, name) {
//			this._addLayer(layer, name);
//			return(this._map) ? this._update() : this;
//		},
//
//		// @method addOverlay(layer: Layer, name: String): this
//		// Adds an overlay (checkbox entry) with the given name to the control.
//		addOverlay: function(layer, name) {
//			this._addLayer(layer, name, true);
//			return(this._map) ? this._update() : this;
//		},
//
//		// @method removeLayer(layer: Layer): this
//		// Remove the given layer from the control.
//		removeLayer: function(layer) {
//			layer.off('add remove', this._onLayerChange, this);
//
//			var obj = this._getLayer(L.stamp(layer));
//			if(obj) {
//				this._layers.splice(this._layers.indexOf(obj), 1);
//			}
//			return(this._map) ? this._update() : this;
//		},
//
//		// @method expand(): this
//		// Expand the control container if collapsed.
//		expand: function() {
//			L.DomUtil.addClass(this._container, 'leaflet-control-layers-expanded');
//			this._form.style.height = null;
//			var acceptableHeight = this._map.getSize().y - (this._container.offsetTop + 50);
//			if(acceptableHeight < this._form.clientHeight) {
//				L.DomUtil.addClass(this._form, 'leaflet-control-layers-scrollbar');
//				this._form.style.height = acceptableHeight + 'px';
//			} else {
//				L.DomUtil.removeClass(this._form, 'leaflet-control-layers-scrollbar');
//			}
//			this._checkDisabledLayers();
//			return this;
//		},
//
//		// @method collapse(): this
//		// Collapse the control container if expanded.
//		collapse: function() {
//			L.DomUtil.removeClass(this._container, 'leaflet-control-layers-expanded');
//			return this;
//		},
//
//		_initLayout: function() {
//			var className = 'leaflet-control-layers',
//				container = this._container = L.DomUtil.create('div', className),
//				collapsed = this.options.collapsed;
//
//			// makes this work on IE touch devices by stopping it from firing a mouseout event when the touch is released
//			container.setAttribute('aria-haspopup', true);
//
//			L.DomEvent.disableClickPropagation(container);
//			if(!L.Browser.touch) {
//				L.DomEvent.disableScrollPropagation(container);
//			}
//
//			var form = this._form = L.DomUtil.create('form', className + '-list');
//
//			if(collapsed) {
//				this._map.on('click', this.collapse, this);
//
//				if(!L.Browser.android) {
//					L.DomEvent.on(container, {
//						mouseenter: this.expand,
//						mouseleave: this.collapse
//					}, this);
//				}
//			}
//
//			var link = this._layersLink = L.DomUtil.create('a', className + '-toggle', container);
//			link.href = '#';
//			link.title = 'Layers';
//			link.style.width = "36px";
//			link.style.height = "36px";
//			if(L.Browser.touch) {
//				L.DomEvent
//					.on(link, 'click', L.DomEvent.stop)
//					.on(link, 'click', this.expand, this);
//			} else {
//				L.DomEvent.on(link, 'focus', this.expand, this);
//			}
//
//			// work around for Firefox Android issue https://github.com/Leaflet/Leaflet/issues/2033
//			L.DomEvent.on(form, 'click', function() {
//				setTimeout(L.bind(this._onInputClick, this), 0);
//			}, this);
//
//			// TODO keyboard accessibility
//
//			if(!collapsed) {
//				this.expand();
//			}
//
//			this._baseLayersList = L.DomUtil.create('div', className + '-base', form);
//			this._separator = L.DomUtil.create('div', className + '-separator', form);
//			this._overlaysList = L.DomUtil.create('div', className + '-overlays', form);
//			//处理SeLayers
//			this._separatorForSeLayer = L.DomUtil.create('div', className + '-separator', form);
//			this._selayersList = L.DomUtil.create('div', className + '-overlays', form);
//			container.appendChild(form);
//		},
//
//		_getLayer: function(id) {
//			for(var i = 0; i < this._layers.length; i++) {
//
//				if(this._layers[i] && L.stamp(this._layers[i].layer) === id) {
//					return this._layers[i];
//				}
//			}
//		},
//
//		_addLayer: function(layer, name, overlay) {
//			layer.on('add remove', this._onLayerChange, this);
//
//			this._layers.push({
//				layer: layer,
//				name: name,
//				overlay: overlay
//			});
//
//			if(this.options.sortLayers) {
//				this._layers.sort(L.bind(function(a, b) {
//					return this.options.sortFunction(a.layer, b.layer, a.name, b.name);
//				}, this));
//			}
//
//			if(this.options.autoZIndex && layer.setZIndex) {
//				this._lastZIndex++;
//				layer.setZIndex(this._lastZIndex);
//			}
//		},
//
//		_update: function() {
//			if(!this._container) {
//				return this;
//			}
//			L.DomUtil.empty(this._baseLayersList);
//			L.DomUtil.empty(this._overlaysList);
//			//处理SeLayers
//			L.DomUtil.empty(this._selayersList);
//
//			var baseLayersPresent, overlaysPresent, i, obj, baseLayersCount = 0;
//			var selaysPresent;
//			for(i = 0; i < this._layers.length; i++) {
//				obj = this._layers[i];
//				this._addItem(obj);
//				overlaysPresent = overlaysPresent || obj.overlay;
//				baseLayersPresent = baseLayersPresent || !obj.overlay;
//				baseLayersCount += !obj.overlay ? 1 : 0;
//				selaysPresent = selaysPresent || obj.overlay;
//			}
//
//			// Hide base layers section if there's only one layer.
//			if(this.options.hideSingleBase) {
//				baseLayersPresent = baseLayersPresent && baseLayersCount > 1;
//				this._baseLayersList.style.display = baseLayersPresent ? '' : 'none';
//			}
//
//			this._separator.style.display = overlaysPresent && baseLayersPresent ? '' : 'none';
//			this._separatorForSeLayer.style.display = overlaysPresent && baseLayersPresent && selaysPresent ? '' : 'none';
//			return this;
//		},
//
//		_onLayerChange: function(e) {
//			if(!this._handlingClick) {
//				this._update();
//			}
//
//			var obj = this._getLayer(L.stamp(e.target));
//
//			// @namespace Map
//			// @section Layer events
//			// @event baselayerchange: LayersControlEvent
//			// Fired when the base layer is changed through the [layer control](#control-layers).
//			// @event overlayadd: LayersControlEvent
//			// Fired when an overlay is selected through the [layer control](#control-layers).
//			// @event overlayremove: LayersControlEvent
//			// Fired when an overlay is deselected through the [layer control](#control-layers).
//			// @namespace Control.Layers
//			var type = obj.overlay ?
//				(e.type === 'add' ? 'overlayadd' : 'overlayremove') :
//				(e.type === 'add' ? 'baselayerchange' : null);
//
//			if(type) {
//				this._map.fire(type, obj);
//			}
//		},
//
//		// IE7 bugs out if you create a radio dynamically, so you have to do it this hacky way (see http://bit.ly/PqYLBe)
//		_createRadioElement: function(name, checked) {
//
//			var radioHtml = '<input type="radio" class="leaflet-control-layers-selector" name="' +
//				name + '"' + (checked ? ' checked="checked"' : '') + '/>';
//
//			var radioFragment = document.createElement('div');
//			radioFragment.innerHTML = radioHtml;
//
//			return radioFragment.firstChild;
//		},
//
//		_addItem: function(obj) {
//			var label = document.createElement('label'),
//				checked = this._map.hasLayer(obj.layer),
//				input;
//			var canvas = null;
//			if(obj.overlay) {
//				input = document.createElement('input');
//				input.type = 'checkbox';
//				input.className = 'leaflet-control-layers-selector';
//				input.defaultChecked = checked;
//				if(obj.layer.type == L.LayerType.SELAYER) //矢量图层
//				{
//					checked = obj.layer.visible;
//					input.defaultChecked = checked;
//					canvas = this.createCanvas(obj.layer);
//				}
//			} else {
//				input = this._createRadioElement('leaflet-base-layers', checked);
//			}
//
//			input.layerId = L.stamp(obj.layer);
//
//			L.DomEvent.on(input, 'click', this._onInputClick, this);
//
//			var name = document.createElement('span');
//			name.innerHTML = ' ' + obj.name;
//
//			// Helps from preventing layer control flicker when checkboxes are disabled
//			// https://github.com/Leaflet/Leaflet/issues/2771
//			var holder = document.createElement('div');
//
//			label.appendChild(holder);
//			holder.appendChild(input);
//			if(canvas) {
//				holder.appendChild(canvas);
//			}
//			holder.appendChild(name);
//
//			var container = obj.overlay ? this._overlaysList : this._baseLayersList;
//			container.appendChild(label);
//
//			this._checkDisabledLayers();
//			return label;
//		},
//
//		_onInputClick: function() {
//			var inputs = this._form.getElementsByTagName('input'),
//				input, layer, hasLayer;
//			var addedLayers = [],
//				removedLayers = [];
//
//			this._handlingClick = true;
//
//			for(var i = inputs.length - 1; i >= 0; i--) {
//				input = inputs[i];
//				layer = this._getLayer(input.layerId).layer;
//				if(layer && "type" in layer && layer.type == L.LayerType.SELAYER) {
//					layer.visible = input.checked;
//				} else {
//					hasLayer = this._map.hasLayer(layer);
//					if(input.checked && !hasLayer) {
//						addedLayers.push(layer);
//
//					} else if(!input.checked && hasLayer) {
//						removedLayers.push(layer);
//					}
//				}
//			}
//
//			// Bugfix issue 2318: Should remove all old layers before readding new ones
//			for(i = 0; i < removedLayers.length; i++) {
//				this._map.removeLayer(removedLayers[i]);
//			}
//			for(i = 0; i < addedLayers.length; i++) {
//				this._map.addLayer(addedLayers[i]);
//			}
//			this._handlingClick = false;
//			this._refocusOnMap();
//			this._map.refresh();
//		},
//		/**
//		 * 创建canvas画布
//		 * @param {Object} layer
//		 */
//		createCanvas: function(layer) {
//			var symbolStyle = null;
//			if(layer.renderStyle && layer.renderStyle.bClassify) {
//				if(!layer.renderStyle.symbolStyles || !Array.isArray(layer.renderStyle.symbolStyles)) {
//					return;
//				}
//				symbolStyle = layer.renderStyle.symbolStyles.slice(0);
//				if(layer.renderStyle.defaultSymbolStyle && layer.renderStyle.defaultSymbolStyle.visible) {
//					symbolStyle = layer.renderStyle.defaultSymbolStyle;
//				}
//			} else {
//				symbolStyle = layer.renderStyle.defaultSymbolStyle;
//			}
//			if(!symbolStyle) return;
//			var size = 14;
//			var p1 = new L.Point(0, 0);
//			var p2 = new L.Point(0, size);
//			var p3 = new L.Point(size, size);
//			var p4 = new L.Point(size, 0);
//			var center = new L.Point(size / 2, size / 2);
//			var symbol = symbolStyle.symbol;
//			var canvas = document.createElement("canvas");
//			canvas.width = size;
//			canvas.height = size;
//			var context = canvas.getContext("2d");
//			var symbolType = symbol.options.symbolType;
//			switch(symbolType) {
//				case L.SymbolType.MARK_SYMBOL:
//					{
//						symbol.draw(context, center);
//						break
//					}
//				case L.SymbolType.LINE_SYMBOL:
//					{
//						symbol.draw(context, [p2, p4], [2], 1);
//						break
//					}
//				case L.SymbolType.FILL_SYMBOL:
//					{
//						symbol.draw(context, [p1, p2, p3, p4], [4], 1);
//						break
//					}
//			}
//			return canvas;
//		},
//		_checkDisabledLayers: function() {
//			var inputs = this._form.getElementsByTagName('input'),
//				input,
//				layer,
//				zoom = this._map.getZoom();
//
//			for(var i = inputs.length - 1; i >= 0; i--) {
//				input = inputs[i];
//				layer = this._getLayer(input.layerId).layer;
//				input.disabled = (layer.options.minZoom !== undefined && zoom < layer.options.minZoom) ||
//					(layer.options.maxZoom !== undefined && zoom > layer.options.maxZoom);
//			}
//		},
//
//		_expand: function() {
//			// Backward compatibility, remove me in 1.1.
//			return this.expand();
//		},
//
//		_collapse: function() {
//			// Backward compatibility, remove me in 1.1.
//			return this.collapse();
//		}
//
//	});
//
//	// @factory L.control.layers(baselayers?: Object, overlays?: Object, options?: Control.Layers options)
//	// Creates an attribution control with the given layers. Base layers will be switched with radio buttons, while overlays will be switched with checkboxes. Note that all base layers should be passed in the base layers object, but only one should be added to the map during map instantiation.
//	L.control.Selayers = function(baseLayers, overlays, seLayers, options) {
//		return new L.Control.SeLayers(baseLayers, overlays, seLayers, options);
//	};
//
//	L.SeSelectionLayer.include({
//		onRemove: function() {
//			if(!this._map) return;
//			this._map.removeLayer(this.renderer);
//		}
//	});
//	L.Control.MapInfo.include({
//		onRemove: function() {
//			this._map.off('moveend viewreset', this._change, this);
//			this._map.off('mousemove', this._onMouseMove, this);
//		}
//	});
</script>

<style>
	.leaflet-container {
		background: transparent;
		background-color: transparent;
	}
	
	.leaflet-control-mapinfo,
	.leaflet-control-layerlegend,
	.se-bar-foot {
		color: #222222;
	}
	
	.leaflet-control-mapinfo {
		background: rgba(255, 255, 255, 1);
	}
	
	/*.leaflet-control-minimap-toggle-display-bottomright {
		bottom: -4px;
		right: -4px;
	}*/
</style>