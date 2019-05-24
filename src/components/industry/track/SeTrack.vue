<template>
	<div style="position: absolute; " :id="ukey" :style="locationObject">
		<el-row style="position: absolute;width:100%;height: 100%;" :style="styleObject" >
			<el-col :span="leftSpan" style="background-color: #545c64;">
				<Menu :style="menuStyle" :navMenuStyle="params.option.navMenuStyle"></Menu>
			</el-col>
			<el-col :span="centerSpan" >
				<TrackCondition :style="conditionStyle" :height="height"  :map="map" :params="params"></TrackCondition>
			</el-col>
			<el-col :span="rightSpan">
				<div :style="mapStyle" :id="mapid" style="box-sizing: border-box;">

				</div>
			</el-col>
		</el-row>
		<div style="position: absolute;width:100%; height: 100%;z-index: 2000;" v-show="editmode">

		</div>
		<slot>
		</slot>
	</div>
</template>

<script>
	import publicTileMap from '../../../constants/PublicTileMap.js'
	import common from '../../../mixins/common.js'
	import Menu from './child/Menu.vue'
	import TrackCondition from './child/TrackCondition.vue'
	import service from '../../../api/service.js'
	import Resource from './js/Resource.js'
	import { TrackQueryType } from './js/constants.js'
	import { getContentPosition } from './js/with.js'
	import trackmixins from './mixins/trackmixins.js'

	//	import { deepClone } from '../../../utils/util.js' 
	import { mapState } from 'vuex'
	import { LocationEvent, TabChangeTypeEvent, QueryTrackByCodeEvent, QueryDevicesByRectEvent, QueryDevicesResultEvent, LocationTrackEvent } from './js/constants.js'
	import './css/index.css';
	//引入外部js
	import './lib/leaflet.rotatedMarker.js'
	import 'leaflet.pm';
	import 'leaflet.pm/dist/leaflet.pm.css';

	const trackLineStyle = {
		color: "rgb(42,144,82)",
		weight: 8
	}

	export default {
		name: 'SeTrack',
		message: '轨迹分析组件',
		mixins: [common, trackmixins],
		data() {
			return {
				height:0,
				map: undefined,
				//boxs: [], //查询范围数组
				locationMarker: null, //单个设备定位 和播放轨迹时共用
				drawItems: [], //绘制的临时图层
				leftSpan: 2,
				centerSpan: 5,
				rightSpan: 17,
				activeName: TrackQueryType.QUERY_BY_NUM,
				trackLines: [], //轨迹线
				markers: [], //Marker标记-轨迹线起点和终点表示
				baseLayers: [], //底图
				devices: [], //查询的设备结果
				interval: null //最后位置定时器
			}
		},
		mounted() {
			this.$nextTick(() => {
				this.clearInterval();
				this.bus.$off(QueryTrackByCodeEvent, this.handleQueryTrackByCode);
				this.bus.$off(TabChangeTypeEvent, this.handleTabChangeTypeEvent);
				this.bus.$off(QueryDevicesByRectEvent, this.handleQueryDevicesByRect);
				this.bus.$off(LocationTrackEvent, this.handleLocationTrack);
				this.bus.$off(LocationEvent, this.handleLocation);
				this.bus.$off("resetQueryDefine", this.handleResetQueryDefine);
				this.bus.$off("resetMapQuery", this.handleResetMapQuery);
				this.bus.$on(QueryTrackByCodeEvent, this.handleQueryTrackByCode);
				this.bus.$on(TabChangeTypeEvent, this.handleTabChangeTypeEvent);
				this.bus.$on(QueryDevicesByRectEvent, this.handleQueryDevicesByRect);
				this.bus.$on(LocationTrackEvent, this.handleLocationTrack);
				this.bus.$on(LocationEvent, this.handleLocation);
				this.bus.$on("resetQueryDefine", this.handleResetQueryDefine);
				this.bus.$on("resetMapQuery", this.handleResetMapQuery);
				//this.dowithDataBase();
				this.initMap();
			})
		},
		beforeDestroy() {
			this.bus.$off(QueryDevicesByRectEvent, this.handleQueryDevicesByRect);
		},
		components: {
			Menu,
			TrackCondition
		},
		computed: {
			mapid() {
				return 'map_' + this.ukey;
			},
			mapStyle() {
				var obj = {
					"position": "absolute"
				};
				if(this.params.option.panelStyle.showBg) {
					obj["background-color"] = this.params.option.panelStyle.bgColor;
				}
				if(this.params.option.panelStyle.showBorder) {
					obj["border"] = this.params.option.panelStyle.borderWidth + "px solid " + this.params.option.panelStyle.borderColor;
				}
				return {
					width: this.location.width * this.rightSpan / 24 + "px",
					height: this.location.height + "px",
					...obj
				}
			},
			menuStyle() {
				return {
					height: this.location.height + "px"

				}
			},
			conditionStyle() {
				this.height=this.location.height;
				return {
					width: this.location.width * this.centerSpan / 24 + "px",
					height: this.location.height + "px",
					overflow: 'hidden'
				}
			},
			...mapState([
				'dbUrl', 'dbRestUrl', 'bus'
			])
		},
		methods: {
			addPMDrawControl() {
				if(this.map) {
					this.map.pm.addControls({
						drawMarker: false,
						drawPolygon: true,
						drawPolyline: false,
						drawCircle: true,
						drawRectangle: true,
						editMode: false,
						cutPolygon: false,
						dragPolygon: false,
						removalMode: true,
						position: 'topright'
					});
					this.map.pm.setPathOptions({
						color: 'red',
						fillColor: 'orange',
						fillOpacity: 0.7,
					});
					//					this.map.off('pm:create', this.handleDrawCreate);
					//					this.map.off('pm:remove', this.handleDrawRemove);
					this.map.on('pm:create', this.handleDrawCreate);
					this.map.on('pm:remove', this.handleDrawRemove);
				}
			},
			//处理数据库
			dowithDataBase() {
				var params = (this.params);
				var dbConfig = params.dataConfig.dbConfig;
				if(dbConfig) {
					//				var url = this.dbUrl + DB_SUB_REST;
					//				var params2 = {
					//					tablename: dbConfig.tableName,
					//					fields: '*',
					//					filter: dbConfig.condition ? dbConfig.condition : ''
					//				};

					var url = this.dbRestUrl + service.TRACK_TOP;
					var params2 = {
						id: dbConfig.id,
						filter: dbConfig.condition ? dbConfig.condition : ''
						//						,
						//						tablename: dbConfig.tableName,
						//						fields: '*',
						//						filter: dbConfig.condition ? dbConfig.condition : ''
					};

					this.$fetch(url, params2).then(repsone => {

						if(repsone && repsone.code == 200) {
							var data = repsone.data;
							if(data && data.length > 0) {
								//params.dataConfig.data = data;
								this.createComponent(params);
							} else {
								this.$message({
									message: '数据为空！',
									type: 'warning'
								});
							}
						} else {
							this.$message.error('服务器错误！');
						}
					}).catch(error => {
						this.$message.error('服务器错误！');
					});
				} else {
					this.$message.error('缺少必需参数！');
				}
			},
			//清除底图
			clearBaseLayers() {
				this.map && this.baseLayers.forEach(item => {
					this.map.removeLayer(item);
				})
				this.baseLayers = [];
			},
			initMap() {
				this.clearBaseLayers();
				if(!this.map) {
					this.map = L.map(this.mapid, {
						maxZoom: 18,
						zoomControl: true,
						attributionControl: false
					});
					L.control.scale().addTo(this.map);
					this.addPMDrawControl();
					document.querySelector(".leaflet-pm-toolbar").style.display = "none";
				}
				if(this.params.option.publicMap.isCustomService) //自定义WMTS 服务
				{
					this.map.options.crs = L.CRS.EPSG4326;
					this.baseLayers.push(new L.TileLayer.WMTS(this.params.option.publicMap.titleUrl));
				} else {
					var objInfo = publicTileMap.findTileLayerInfo(this.params.option.publicMap.id);
					if(objInfo && objInfo.epsg == "EPSG:3857") {
						this.map.options.crs = L.CRS.EPSG3857;
					} else {
						this.map.options.crs = L.CRS.EPSG4326;
					}
					var array = publicTileMap.createTileLayers(this.params.option.publicMap.id);
					array && array.forEach((item) => {
						this.baseLayers.push(item);
					})
				}
				this.baseLayers && this.baseLayers.forEach((item) => {
					this.map.addLayer(item);
				})
				this.map.options.center = [this.params.option.mapInit.center[1], this.params.option.mapInit.center[0]];
				this.map.options.zoom = this.params.option.mapInit.zoom;
				this.lockMap();
			},

			//重置地图容器大小
			resize(newval) {
				let chartdiv = document.getElementById(this.mapid);
				chartdiv.style.width = (newval.width * this.rightSpan / 24) + "px";
				chartdiv.style.height = (newval.height) + "px";
				this.map && this.map._onResize();
				this.lockMap();
			},
			lockMap() {
				this.map && this.map.setView(L.latLng(this.params.option.mapInit.center[1], this.params.option.mapInit.center[0]), this.params.option.mapInit.zoom);
			},
			//清除范围
			clearRects() {
				var len = this.drawItems ? this.drawItems.length : 0;
				if(len > 0 && this.map) {
					for(var i = len - 1; i >= 0; i--) {
						var item = this.drawItems[i];
						if(item && this.map.hasLayer(item)) {
							this.map.removeLayer(item);
						}
					}
				}
                this.drawnItems = [];
			},
			/***
			 * 清除图层
			 */
			clearAllLayers() {
				this.map && this.trackLines.forEach(item => {
					this.map.removeLayer(item);
				})
				this.map && this.markers.forEach(item => {
					this.map.removeLayer(item);
				})
				//				this.map && this.drawnItems.forEach(item => {
				//					if(this.map.hasLayer(item)) {
				//						this.map.removeLayer(item);
				//					}
				//				})
				if(this.map && this.locationMarker) {
					if(this.map.hasLayer(this.locationMarker)) {
						this.map.removeLayer(this.locationMarker);
					}
				}
				this.locationMarker = null;
				this.trackLines = [];
				this.markers = [];
			},
			//关闭定时器
			clearInterval() {
				//关闭定时器
				if(this.interval) {
					clearInterval(this.interval);
				}
			},
			handleDrawCreate(e) {
				if(e.layer) {
					this.drawItems.push(e.layer);
					//					this.boxs.push({
					//						minX: e.layer.getBounds().getWest(),
					//						maxX: e.layer.getBounds().getEast(),
					//						minY: e.layer.getBounds().getSouth(),
					//						maxY: e.layer.getBounds().getNorth()
					//					});
				}
			},
			handleDrawRemove(e) {
				var index = this.drawItems.indexOf(e.layer);
				if(index >= 0) {
					this.drawItems.splice(index, 1);
					//this.boxs.splice(index, 1);
				}
			},
			/****
			 * tab改变
			 */
			handleTabChangeTypeEvent(tabType) {
				this.activeName = tabType;
				if(this.map) {
					this.clearRects();
					if(this.activeName == TrackQueryType.QUERY_BY_MAP) //按设备号查询
					{
						document.querySelector(".leaflet-pm-toolbar").style.display = "inline-block";

					} else {

						document.querySelector(".leaflet-pm-toolbar").style.display = "none";
					}
				}
			},
			/***
			 * 根据时间和设备号查询轨迹
			 */
			handleQueryTrackByCode(data) {
				if(data == null) {
					this.$message.error('缺少必需参数！');
					return false;
				}
				var params = (this.params);
				var dataConfig = params.dataConfig;
				if(dataConfig) {
					var url = this.dbRestUrl + service.TRACK_LIST + "?id=" + dataConfig.dbConfig.id;
					var data2 = {
						fields: dataConfig.fields,
						cars: data.codes,
						startTime: data.startTime,
						endTime: data.endTime
					};
					this.clearRects();
					this.clearInterval();
					this.clearAllLayers();
					this.$post(url, data2).then(repsone => {
						if(repsone && repsone.code == 200) {
							var data = repsone.data;
							var startIcon = L.icon({
								iconUrl: Resource.trackStart.url,
								iconSize: [25, 39],
								iconAnchor: [12, 38] //图标的偏移
							});
							var endIcon = L.icon({
								iconUrl: Resource.trackEnd.url,
								iconSize: [25, 39],
								iconAnchor: [12, 38] //图标的偏移
							});
							var count22=this.devices?this.devices.length:0;
							if(data && data.length > 0) {
								data.forEach(item => {
									var coordinates = item.coordinates;
									var len = coordinates ? coordinates.length : 0
									var latlngs = new Array();
									var lineStyle = this.getLineStyle(item.code);
									
									for(var i = 0; i < len; i += 2) {
										latlngs.push([coordinates[i + 1], coordinates[i]]);
										if(i == 0) //起点
										{
											var marker = L.marker([coordinates[i + 1], coordinates[i]], {
												icon: startIcon
											}).addTo(this.map);
											this.markers.push(marker);

										}
										if(i == len - 2) //终点
										{
											var marker = L.marker([coordinates[i + 1], coordinates[i]], {
												icon: endIcon
											}).addTo(this.map);
											this.markers.push(marker);
										}
									}
									var polyLine = new L.Polyline(latlngs, lineStyle);
									polyLine.addTo(this.map);
									polyLine.code = item.code;
									polyLine.times = item.times;
									this.trackLines.push(polyLine);
									if(count22>0)
									{
										for(var i=0;i<count22;i++)
										{
											if(this.devices[i].label==item.code){
												this.devices[i].isQueryTrack=true;
											}
										}
									}
								})
								var bounds = this.computedTracksBounds(this.trackLines);
								if(bounds && this.map) {
									this.map.fitBounds(bounds);
								}
							
								
							} else {
								this.$message({
									message: '查询结果为空！',
									type: 'warning'
								});
							}
						} else {
							this.$message.error('服务器错误！');
						}
					}).catch(error => {
						this.$message.error('服务器错误！');
					});
				} else {
					this.$message.error('缺少必需参数！');
				}
			},
            //根据范围和时间查询设备
			handleQueryDevicesByRect(data) {
				if(!data || !data.startTime || !data.endTime) {
					this.$message.warning('请设置查询时间！');
					return;
				}
				var boxs = this.getDrawItemsBoxs();
				if(!boxs || boxs.length == 0) {
					this.$message.warning('请绘制查询范围！');
					return;
				}
				var params = (this.params);
				var dataConfig = params.dataConfig;
				if(dataConfig) {
					var url = this.dbRestUrl + service.TRACK_QUERY_DEVICE + "?id=" + dataConfig.dbConfig.id;
					var data2 = {
						boxs: boxs,
						fields: dataConfig.fields,
						startTime: data.startTime,
						endTime: data.endTime
					};
					this.$post(url, data2).then(repsone => {
						this.devices = [];
						if(repsone && repsone.code == 200) {
							if(repsone.data && repsone.data.length > 0) {
								//console.log(repsone.data);
								//this.isQueryDevice = false;
								var r, g, b;
								var len = repsone.data.length;
								for(var i = 0; i < len; i++) {
									r = Math.floor(Math.random() * 256);
									g = Math.floor(Math.random() * 256);
									b = Math.floor(Math.random() * 256);
									this.devices.push({
										'label': repsone.data[i],
										'color': "rgba(" + r + "," + g + "," + b + ",1)",
										'tof': false,
										'selected': false,
										'isQueryTrack':false
									});
									this.bus.$emit(QueryDevicesResultEvent, this.devices);
								}
							} else {
								this.$message({
									message: '查询结果为空！',
									type: 'warning'
								});
							}
						} else {
							this.$message.error(repsone.msg);
						}
					}).catch(error => {
						this.$message.error('服务器错误！');
					});
				} else {
					this.$message.error('缺少必需参数！');
				}
			},
			/****
			 * 根据设备号查找样式
			 */
			getLineStyle(code) {
				var len = this.devices ? this.devices.length : 0;
				for(var i = 0; i < len; i++) {
					if(this.devices[i].label == code) {
						return {
							color: this.devices[i].color,
							weight: 8
						}
					}
				}
				return trackLineStyle;
			},
			//计算当前所有轨迹线的最大Bounds
			computedTracksBounds() {
				var len = this.trackLines ? this.trackLines.length : 0;
				var bounds = null;
				for(var i = 0; i < len; i++) {
					var temp = new L.LatLngBounds(this.trackLines[i].getBounds().getSouthWest(), this.trackLines[i].getBounds().getNorthEast());
					if(!bounds) {
						bounds = temp;
					} else {
						bounds = bounds.extend(temp);
					}
				}
				return bounds;
			},
			//获取绘制范围的数组
			getDrawItemsBoxs() {
				var boxs = [];
				var len=this.drawItems ?this.drawItems.length:0;
				for(var i=0;i<len;i++)
				{
					var item=this.drawItems[i];
					boxs.push({
						minX: item.getBounds().getWest(),
						maxX: item.getBounds().getEast(),
						minY: item.getBounds().getSouth(),
						maxY: item.getBounds().getNorth()
					});
				}
				return boxs;
			},
			/***
			 * 轨迹定位
			 */
			handleLocationTrack(code) {
				var len = this.trackLines ? this.trackLines.length : 0;
				var bounds = null;
				for(var i = 0; i < len; i++) {
					if(this.trackLines[i].code == code) {
						bounds = new L.LatLngBounds(this.trackLines[i].getBounds().getSouthWest(), this.trackLines[i].getBounds().getNorthEast());
						break;
					}
				}
				if(bounds && this.map) {
					this.map.fitBounds(bounds);
				}
			},
			//请求最后位置
			lastLocation(code) {
				if(!code) {
					this.$message.warning('请设备号不能为空！');
					return;
				}
				var params = (this.params);
				var dataConfig = params.dataConfig;
				if(dataConfig) {
					var url = this.dbRestUrl + service.TRACK_LASTLOCATION + "?id=" + dataConfig.dbConfig.id;
					var data2 = {
						code: code,
						fields: dataConfig.fields
					};

					this.$post(url, data2).then(repsone => {
						//console.log(repsone)
						if(repsone && repsone.code == 200) {
							if(repsone.data) {
								this.clearAllLayers();
								var icon = L.icon({
									iconUrl: Resource.findSymbol(this.params.option.animation.icon.name).url,
									iconSize: [52, 26],
									iconAnchor: [26, 0] //图标的偏移
								});
								var dataTemp = repsone.data;
								dataTemp["code"] = code;
								//Marker水平图标
								this.locationMarker = L.marker([repsone.data.lat, repsone.data.lng], {
									rotationAngle: repsone.data.angle - 90,
									icon: icon
								}).addTo(this.map).bindPopup(getContentPosition(repsone.data)); //.openPopup();
								var latlngT = new L.LatLng(repsone.data.lat, repsone.data.lng);
								if(this.params.option.publicMap.isCustomService) //自定义底图服务
								{
									this.map.panTo(latlngT, {
										animate: true
									});
								} else {
									this.map.flyTo(latlngT);
								}
							} else {
								this.$message({
									message: '查询结果为空！',
									type: 'warning'
								});
							}
						}
					});
				} else {
					this.$message.error('缺少必需参数！');
				}
			},
			//设备定位
			handleLocation(code) {
				this.clearInterval();
				this.clearPlayTrack();
				this.lastLocation(code);
				this.interval = setInterval(this.lastLocation, 5 * 1000, code);
			},
			//重置设备查询条件
			handleResetQueryDefine() {
				this.clearInterval();
				this.clearAllLayers();
			},
			//重置地图查询条件
			handleResetMapQuery() {
				//				this.clearInterval();
				//				this.clearAllLayers();
				this.clearRects();
			}

		},
		watch: {
			'location': {
				handler(curVal, oldVal) {　
					this.resize(curVal);
				},
				deep: true
			},
			'params.dataConfig': {
				handler(curVal, oldVal) {
					//this.dowithDataBase();
				},
				deep: true
			},
			'params.option.mapInit': {
				handler(curVal, oldVal) {
					this.lockMap();
				},
				deep: true
			},
			'params.option.publicMap': {
				handler(curVal, oldVal) {　　
					this.initMap();
				},
				deep: true
			}
		}

	}
</script>

<style scoped>
	.tr-center {
		overflow: hidden;
	}
	
	/*.tr-center::-webkit-scrollbar {
		width: 4px;
		height: 4px;
	}
	
	.tr-center::-webkit-scrollbar-thumb {
		border-radius: 2px;
		-webkit-box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.2);
		background: #c0c4cc;
		
	}*/
	/*	/*
	.c-search-button {
		margin-bottom: 15px;
		font-size: 12px;
	}
	
	.Num-pause-btn {
		margin-right: 10px;
		margin-left: 10px;
		padding-top: 10px;
		cursor: pointer;
		width: 30px;
		height: 30px
	}
	
	.Num-contro-item {
		width: 208px;
		margin-top: 10px;
	}
	
	.Num-contro-title {
		font-size: 12px;
		color: #606266;
		margin-right: 4px;
		margin-left: 10px;
	}
	
	.Num-contro-imgitem {
		width: 50px;
	}
	
	.Num-contro-imgtitle {
		font-size: 12px;
		width: 50px;
		text-align: center;
		color: #606266
	}
	
	.Num-contro-img {
		float: left;
		margin-left: 18px;
		text-align: center;
		cursor: pointer;
	}
	
	.Num-contro-msgitem {
		width: 115px;
	}
	
	.Num-contro-msgtitle {
		font-size: 14px;
		width: 115px;
		text-align: center;
		color: #606266;
	}
	
	.Num-contro-msg {
		float: left;
		margin-left: 20px;
		text-align: center;
	}*/
</style>