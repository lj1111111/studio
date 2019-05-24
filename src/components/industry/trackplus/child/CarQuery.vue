<template>
	<div class="right-component-item-content item-list">
		<el-row class="right-component-item track-split-item" type="flex" align='middle'>
			<el-col :span="8">
				{{$t('Common.vehicle_number')}}
			</el-col>
		</el-row>
		<el-row class="right-component-item track-split-item" type="flex" align='middle'>
			<el-col :span="24">
				<!--<el-input placeholder="请输入车牌编号" v-model="code" @keyup.enter.native="searchPositon">
					<i slot="suffix" @click="searchPositon" style="color:#409EFF;cursor: pointer;" class="el-input__icon el-icon-location"></i>
				</el-input>-->
				<!---->
				<el-autocomplete popper-class="my-autocomplete" v-model="code" :fetch-suggestions="querySearch" :placeholder="$t('Common.input_vehicle_number')" @select="handleSelect"  @keyup.enter.native="searchPositon" style="width: 100%;">
					<i slot="suffix" @click="searchPositon" style="color:#409EFF;cursor: pointer;" class="el-input__icon el-icon-location"></i>
					<template slot-scope="{ item }" >
						<div class="name">{{ item.id }}</div>
					</template>
				</el-autocomplete>
			</el-col>

		</el-row>

		<CarType :checked-cars="cars" @changetype="handleChangeType"></CarType>
	</div>
</template>

<script>
	import CarType from './CarType.vue'
	import { findCarTypeKeyByLabel, getCarLabelByKey, getCarTypeNameList } from '../js/carstype.js'
	import { getContentPosition, createIcon, computeSegmentHeading, findSymbol, colorRgb } from '../js/utils.js'
	import { TRACK_QUERY_DEVICE_BY_CODE, TRACK_REAL_POSITION } from '../js/serviceapi.js'
	import mixins from './mixins.js'
	import { mapState } from 'vuex'
	const EVENT_SEARCH_POSITION = "searchpositon";
	const props = {
		map: {
			type: Object
		},
		params: {
			type: Object
		}
	}
	export default {
		name: "CarQuery",
		message: "车辆查询",
		props,
		mixins: [mixins],
		data() {
			return {
				cars: getCarTypeNameList(),
				markers: [],
				code: '',
				seTempLayer: null, //临时图层
				result: [] //查询的数据
			}
		},
		mounted() {
			this.$nextTick(() => {
				this.map && this.map.off('moveend', this.mapViewChange);
				this.map && this.map.on('moveend', this.mapViewChange);
			})
		},
		beforeDestroy() {
			this.map && this.map.off('moveend', this.mapViewChange);
			this.map && this.map.closePopup();
		},
		methods: {
			//处理Markers是否显示
			mapViewChange() {
				this.clearMarkers();
				var bounds = this.map && this.map.getBounds();
				var infos = this.result;
				var array = [];
				var len = infos ? infos.length : 0;
				var r=0;
				for(var i = 0; i < len; i++) {
					var coordinates = infos[i].coordinates;
					if(coordinates && coordinates.length > 0) {
						var curLatLng = coordinates[0] && new L.LatLng(coordinates[0][1], coordinates[0][0]);
						var nextLatLng = coordinates[1] && new L.LatLng(coordinates[1][1], coordinates[1][0]);
						if(!nextLatLng) {
							nextLatLng = curLatLng;
						}
						if(!bounds || !bounds.contains(nextLatLng)) {
							continue;
						}
						var angle = 0;
						if(this.map.getZoom() >= 14) {
							angle = computeSegmentHeading(this.map.project(curLatLng), this.map.project(nextLatLng));
						}
						var obj = {
							code: infos[i].id,
							lng: nextLatLng.lng,
							lat: nextLatLng.lat,
							time: infos[i].time,
							type: getCarLabelByKey(infos[i].type)
						}
						var marker = null;
						if(this.map.getZoom() >= 14) {
							marker = L.marker([obj.lat, obj.lng], {
								rotationAngle: angle - 90,
								icon: createIcon(infos[i].type)
							});
							marker.obj = obj;
							marker.on('click', e => {
								var content = getContentPosition(e.target.obj, this);
								this.map.openPopup(content, e.latlng);
							})
							this.markers.push(marker);
						} else {
							var mSymbol = null;
							mSymbol = findSymbol(infos[i].type);
							var color = mSymbol && mSymbol.color ? mSymbol.color : '#0000FF';
							var temp = colorRgb(color);
							var sestyle = {
								stroke: true,
								strokeColor: temp && new L.RGBAColor(temp[0], temp[1], temp[2]),
								fillColor: temp && new L.RGBAColor(temp[0], temp[1], temp[2], 150),
							};
							r = 8;
							if(this.map.getZoom() >= 0 && this.map.getZoom() < 12) {
								r = 5;
							}
//							marker = new L.SeCircleFeature(L.point(obj.lng, obj.lat), r, r);
//							marker.obj = obj;
//							marker.style = sestyle;
//							array.push(marker);
							var mapPoints=[];
							mapPoints.push(L.point(obj.lng, obj.lat));
							var symbol=new L.SimpleMarkerSymbol({size:r*2,color:sestyle.fillColor,hasOutline:true,outlineColor:sestyle.strokeColor});
							marker = new L.SePointFeature({mapPoints:mapPoints,symbol:symbol});
							marker.obj = obj;
							//marker.style = sestyle;
							array.push(marker);
						}
					}
				}
				var tempFeatures = this.avoidFeatures(array,r);
				if(tempFeatures && tempFeatures.length > 0) //数据量大时
				{
//					this.seTempLayer = new L.SeTempLayer();
//					this.seTempLayer.features = tempFeatures;
//					this.map && this.map.addLayer(this.seTempLayer);
					
					this.seTempLayer = new L.SeTempLayer({pane:"overlayPane"});
					this.seTempLayer.setFeatures(tempFeatures);
					this.map && this.map.addLayer(this.seTempLayer);
					this.seTempLayer.draw();
				}
				this.map && this.markers && this.markers.forEach(item => {
					this.map.addLayer(item);
				})
			},
			handleChangeType(pv) {
				this.cars = pv;
			},
			reset() {
				this.result = [];
				this.cars = getCarTypeNameList();
				this.code = '';
				this.clearMarkers();
				this.map && this.map.off('moveend', this.mapViewChange);
			},
			/***
			 * 清除图层
			 */
			clearMarkers() {
				this.map && this.markers && this.markers.forEach(item => {
					this.map.removeLayer(item);
				})
				this.markers = [];
				if(this.map && this.seTempLayer && this.map.hasLayer(this.seTempLayer)) {
					this.map.removeLayer(this.seTempLayer);
				}
				this.seTempLayer = null;
			},
			//查询车辆
			searchPositon() {
				if(!this.map) {
					return;
				}
				if(!this.code) {
					this.$message.warning(this.$t("message.input_vehicle_number"));
					return;
				}
				var array = [];
				this.cars && this.cars.forEach(item => {
					array.push(findCarTypeKeyByLabel(item));
				})
				if(array == null || array.length == 0) {
					this.result = [];
					this.clearMarkers();
					this.$message.warning(this.$t("message.select_vehicle_type"));
					return false;
				}
				var data = {
					key: this.code,
					type: array
				};
				this.$emit(EVENT_SEARCH_POSITION);
				var index = this.params.dataConfig.dsId;
				var headers = {
					'Content-Type': 'text/plain;charset=utf-8'
				};
				this.map && this.map.off('moveend', this.mapViewChange);
				this.map && this.map.on('moveend', this.mapViewChange);
				var url = this.spaceRestUrl + TRACK_REAL_POSITION + index;
				this.$post(url, data, headers).then(response => {
					this.clearMarkers();
					this.realMonitoreResult(response);
					//					var infos = response.info && response.info.item;
					//					var len = infos ? infos.length : 0;
					//					this.clearMarkers();
					//					var minx, maxx, miny, maxy = 0;
					//					for(var i = 0; i < len; i++) {
					//						var coordinates = infos[i].coordinates;
					//						var curLatLng = null;
					//						var nextLatLng = null;
					//						if(coordinates && coordinates.length > 0) {
					//							if(coordinates.length == 1) {
					//								curLatLng = new L.LatLng(coordinates[0][1], coordinates[0][0]);
					//								nextLatLng = new L.LatLng(coordinates[0][1], coordinates[0][0]);
					//							} else {
					//								curLatLng = new L.LatLng(coordinates[0][1], coordinates[0][0]);
					//								nextLatLng = new L.LatLng(coordinates[1][1], coordinates[1][0]);
					//							}
					//						}
					//						if(curLatLng && nextLatLng) {
					//							var angle = computeSegmentHeading(this.map.project(curLatLng), this.map.project(nextLatLng));
					//							if(i == 0) {
					//								minx = maxx = nextLatLng.lng;
					//								miny = maxy = nextLatLng.lat;
					//							} else {
					//								minx = minx > nextLatLng.lng ? nextLatLng.lng : minx;
					//								maxx = maxx < nextLatLng.lng ? nextLatLng.lng : maxx;
					//								miny = miny > nextLatLng.lat ? nextLatLng.lat : miny;
					//								maxy = maxy < nextLatLng.lat ? nextLatLng.lat : maxy;
					//							}
					//							var obj = {
					//								code: infos[i].id,
					//								lng: nextLatLng.lng,
					//								lat: nextLatLng.lat,
					//								time: infos[i].time,
					//								type: getCarLabelByKey(infos[i].type)
					//							}
					//							var icon = createIcon(infos[i].type);
					//							icon.popupAnchor = [-50, -50];
					//							var marker = L.marker([obj.lat, obj.lng], {
					//								rotationAngle: angle - 90,
					//								icon: icon
					//							}).addTo(this.map).bindPopup(getContentPosition(obj,this));
					//							this.markers.push(marker);
					//						}
					//					}
					//					if(len > 0) {
					//						var centerX = (minx + maxx) / 2;
					//						var centery = (miny + maxy) / 2;
					//						var latlng = new L.LatLng(centery, centerX);
					//						var p1 = new L.LatLng(miny, minx);
					//						var p2 = new L.LatLng(maxy, maxx);
					//						var bounds = new L.LatLngBounds(p1, p2);
					//						this.map.fitBounds(bounds);
					//					}
				});
			},
			handleSelect(item) {
				this.code = item ? item.id : '';
				this.searchPositon();
			},
			/***
			 * 处理实时监控结果
			 */
			realMonitoreResult(response) {
				var infos = response.info && response.info.item;
				var len = infos ? infos.length : 0;
				this.clearMarkers();
				var array = [];
				this.result = infos;
				var minx, maxx, miny, maxy = 0;
				for(var i = 0; i < len; i++) {
					var coordinates = infos[i].coordinates;
					if(coordinates && coordinates.length > 0) {
						var curLatLng = coordinates[0] && new L.LatLng(coordinates[0][1], coordinates[0][0]);
						var nextLatLng = coordinates[1] && new L.LatLng(coordinates[1][1], coordinates[1][0]);
						if(!nextLatLng) {
							nextLatLng = curLatLng;
						}
						var angle = 0;
						if(this.map.getZoom() >= 14) {
							angle = computeSegmentHeading(this.map.project(curLatLng), this.map.project(nextLatLng));
						}
						if(i == 0) {
							minx = maxx = nextLatLng.lng;
							miny = maxy = nextLatLng.lat;
						} else {
							minx = minx > nextLatLng.lng ? nextLatLng.lng : minx;
							maxx = maxx < nextLatLng.lng ? nextLatLng.lng : maxx;
							miny = miny > nextLatLng.lat ? nextLatLng.lat : miny;
							maxy = maxy < nextLatLng.lat ? nextLatLng.lat : maxy;
						}
						//						var marker = null;
						//						if(this.map.getZoom() >= 14) {
						//							marker = L.marker([obj.lat, obj.lng], {
						//								rotationAngle: angle - 90,
						//								icon: createIcon(infos[i].type)
						//							});
						//							marker.obj = obj;
						//							marker.on('click', e => {
						//								var content = getContentPosition(e.target.obj, this);
						//								this.map.openPopup(content, e.latlng);
						//							})
						//							this.markers.push(marker);
						//						} else {
						//							var mSymbol = null;
						//							mSymbol = findSymbol(infos[i].type);
						//							var color = mSymbol && mSymbol.color ? mSymbol.color : '#0000FF';
						//							var temp = colorRgb(color);
						//							var sestyle = new L.SeStyle({
						//								stroke: true,
						//								strokeColor: temp && new L.RGBAColor(temp[0], temp[1], temp[2]),
						//								fillColor: temp && new L.RGBAColor(temp[0], temp[1], temp[2], 150),
						//							});
						//							var r = 8;
						//							if(this.map.getZoom() >= 0 && this.map.getZoom() < 12) {
						//								r = 5;
						//							}
						//							marker = new L.SeCircleFeature(L.point(obj.lng, obj.lat), r, r);
						//							marker.obj = obj;
						//							marker.style = sestyle;
						//							array.push(marker);
						//						}
					}
				}
				//				if(array.length > 0) //数据量大时
				//				{
				//					this.seTempLayer = new L.SeTempLayer();
				//					this.seTempLayer.addFeatures(array);
				//					this.map && this.map.addLayer(this.seTempLayer);
				//				}
				//				this.map && this.markers && this.markers.forEach(item => {
				//					this.map.addLayer(item);
				//				})
				if(len > 0) {
					var centerX = (minx + maxx) / 2;
					var centery = (miny + maxy) / 2;
					var latlng = new L.LatLng(centery, centerX);
					var p1 = new L.LatLng(miny, minx);
					var p2 = new L.LatLng(maxy, maxx);
					var bounds = new L.LatLngBounds(p1, p2);
					this.map.fitBounds(bounds);
				}
				else
				{
					this.$message.warning(this.$t('message.no_query_results'));
				}
			},
			avoidFeatures(features,a) {
				var len = features ? features.length : 0;
				var feature_list = [];
				if(len && this.map) {
					var pCoreModel = new L.COverlapModel(this.map.getSize().x, this.map.getSize().y);
					var mapPos = this.map._getMapPanePos();
					for(var j = 0; j < len; j++) {
						var feature = features[j];
						if(!feature) continue;
						var size = a * 2; //new L.Point(feature.a*2, feature.b*2);
						if(!size) {
							feature_list.push(feature);
							continue;
						}
						var points=feature.getMapPoints();
						var point=points && points.length>0?points[0]:null;
						if(point) {
							var latLng = L.latLng(point.y, point.x);
							var pixelPoint = this.map.latLngToLayerPoint(latLng);
							if(pixelPoint) {
								var brt = L.SeAvoid.validPointPos([pixelPoint], size, pCoreModel, mapPos.x, mapPos.y/*, L.simple_state_value.OVERLAP_ELEM_POINT | L.simple_state_value.OVERLAP_ELEM_LABEL*/);
								if(brt) {
									feature_list.push(feature);
								}
							}
						}
					}
					pCoreModel.releaseAllModel();
					pCoreModel = null;
				}
				return feature_list;
			}
		},
		components: {
			CarType
		},
		computed: {
			...mapState([
				'spaceRestUrl',
				'maps'
			])
		},
		watch: {
			//			code(newVal,oldVal){
			//				this.searchPositon();
			//			}
		}
	}
</script>

<style>

</style>