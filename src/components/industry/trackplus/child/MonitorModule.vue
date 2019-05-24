<template>
	<el-tabs :stretch="true" style="background-color:#F3F3F3 ; color:#2c3e50; " type="border-card" v-model="localActiveName">
		<el-tab-pane :label="$t('SeTrackPlus.real_location')" name="monitor_location">
			<div class="right-component-item-content item-list" style="overflow: hidden;">
				<div :style="heightStyle" class="tr-center">
					<el-row class="right-component-item track-split-item" type="flex" align='middle'>
						<el-col :span="8">
							{{$t('Common.start_time')}}
						</el-col>
					</el-row>
					<el-row class="right-component-item track-split-item" type="flex" align='middle'>
						<el-col :span="24">
							<el-date-picker v-model="startTime" type="datetime" :placeholder="$t('Common.select_datetime')" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" style="width: 100% !important;" > 
							</el-date-picker>
						</el-col>
					</el-row>
					<CarType :checked-cars="cars" @changetype="handleChangeType"></CarType>
					<el-row class="right-component-item track-split-item track-split-item-line " type="flex" align='middle' justify="center" style="padding: 8px 14px 0px 14px;">
						<el-col :span="8" style="text-align: center;">
							<el-button type="primary" plain @click="reset">{{$t('Common.reset')}}</el-button>
						</el-col>
						<el-col :span="8" style="text-align: center;">
							<el-button type="primary" plain @click="query">{{$t('Common.start_monitor')}}</el-button>
						</el-col>
					</el-row>
					<Bar style="background-color:#F3F3F3 ;padding: 10px 0px;" :options="options" :total="total" ref="bar"></Bar>
				</div>
			</div>
		</el-tab-pane>
		<el-tab-pane :label="$t('SeTrackPlus.vehicle_monitor')" name="monitor_fence">
			<div style="overflow: hidden;">
				<div :style="heightStyle" class="tr-center">
					<FenceMonitor :params="params" :map="map" ref="fencemonitor" @fencechange="handleFenceChange"></FenceMonitor>
					<FenceManage :params="params" :map="map" @fencecreate="handleFenceCreate" ref="fencemanage"></FenceManage>
				</div>
			</div>
		</el-tab-pane>
	</el-tabs>
</template>

<script>
	import moment from "moment"
	//import echarts from 'echarts'
	import { TRACK_REAL_POSITION, TRACK_QUERY_BY_BOX, TRACK_QUERY, TRACK_QUERY_PAST } from '../js/serviceapi.js'
	import { TrackModuleType } from '../js/constants.js'
	import { deepClone } from '../../../../utils/util.js'
	import CarType from './CarType.vue'
	import FenceMonitor from './FenceMonitor.vue'
	import FenceManage from './FenceManage.vue'
	import Bar from './Bar.vue'
	import { findCarTypeKeyByLabel, getCarLabelByKey, getTypes, setTypes, getCarTypeNameList, getCarTypeKeyList } from '../js/carstype.js'
	import { getContentPosition, createIcon, computeSegmentHeading, findSymbol, colorRgb } from '../js/utils.js'
	import mixins from './mixins.js'
	import { mapState } from 'vuex'
	//import { data } from './data.js'; //测试
	const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';
	const INTERVAL_TIME = 5000; //定时器间隔
	const SPLIT_TIME = 5; //时间间隔
	const options = {
		grid: {
			left: '30px',
			right: '10px',
			top: '30px'
		},
		xAxis: {
			data: ["出租车", "警车", "公交车", "私家车", "货车"],
			axisLabel: {
				color: '#333',
				interval: 0,
				fontSize: 12
			},
			axisTick: {
				show: false
			},
			axisLine: {
				lineStyle: {
					color: "#CCC",
					width: 1
				}
			}
		},
		yAxis: {
			axisLine: {
				show: false
			},
			axisTick: {
				show: false
			},
			axisLabel: {
				color: '#333',
				fontSize: 12
			},
			max: 100
		},
		series: [{
			label: {
				show: false,
				position: 'top',
				color: "#000"
			},
			name: '销量',
			type: 'bar',
			barWidth: '35%',
			data: [0, 0, 0, 0, 0]
		}]
	};
	const props = {
		map: {
			type: Object
		},
		params: {
			type: Object
		},
		activeName: {
			type: String,
			default: TrackModuleType.MONITOR_LOCATION
		},
		height: {
			type: Number,
			default: 0
		},
		editmode: {
			type: Boolean,
			default: false
		}
	}
	export default {
		name: 'MonitorModule',
		message: '监测组件',
		props,
		mixins: [mixins],
		data() {
			return {
				mapTemp:this.map,
				seTempLayer: null, //临时图层
				markers: [], //
				cars: getCarTypeNameList(),
				localActiveName: TrackModuleType.MONITOR_LOCATION,
				startTime: '2018-08-31 08:00:00',
				interval: null, //定时器
				timeCount: 0,
				options,
				total: 0,
				curPopupCar:'',
			}
		},
		created() {
			this.localActiveName = TrackModuleType.MONITOR_LOCATION;
			this.query();
		},
		activated() {
			//console.log("activated");
			this.localActiveName = TrackModuleType.MONITOR_LOCATION;
			this.query();
		},
		beforeDestroy() {
			this.reset();
			this.$refs.fencemanage.reset(); //释放围栏监控组件资源
			this.$refs.fencemonitor.reset(); //释放围栏监控组件资源
			this.mapTemp=null;
		},
		destroyed(){
			
		},
		deactivated() {
			//console.log("deactivated");
			this.reset();
			this.$refs.fencemanage.reset(); //释放围栏监控组件资源
			this.$refs.fencemonitor.reset(); //释放围栏监控组件资源
		},
		mounted() {
			//console.log("mounted");
			this.$nextTick(() => {
				this.mapTemp=this.map;
				setTypes(this.$store.state.devicesTypes);
				this.cars = getCarTypeNameList();
				this.initChart();
				this.mapTemp && this.mapTemp.off("popupclose",this.closePopupEvent);
				this.mapTemp && this.mapTemp.on("popupclose",this.closePopupEvent);
			})
		},
		computed: {
			...mapState([
				'spaceRestUrl',
				'maps'
			])
		},
		methods: {
			test(){
				console.log("AA");
			},
			initChart() {
				var data = getCarTypeNameList();
				this.options.xAxis.data = data;
				var temp = [];
				data && data.forEach(item => {
					temp.push(0);
				})
				this.options.series[0].data = temp;
			},
			getSerdata() {
				var labels = getCarTypeNameList();
				if(!labels || labels.length == 0) {
					return [];
				}
				var echarts = this.$echarts;
				var serdata = [{
					itemStyle: {
						normal: {
							barBorderRadius: [30, 30, 0, 0],
							color: new echarts.graphic.LinearGradient(
								0, 0, 0, 1, [{
										offset: 0,
										color: '#00FFFF'
									},
									{
										offset: 1,
										color: '#00B7ED'
									}
								]
							)
						}
					},
					value: 0
				}, {
					itemStyle: {
						normal: {
							barBorderRadius: [30, 30, 0, 0],
							color: new echarts.graphic.LinearGradient(
								0, 0, 0, 1, [{
										offset: 0,
										color: '#00E500'
									},
									{
										offset: 1,
										color: '#00B21E'
									}
								]
							)
						}
					},
					value: 0
				}, {
					itemStyle: {
						normal: {
							barBorderRadius: [30, 30, 0, 0],
							color: new echarts.graphic.LinearGradient(
								0, 0, 0, 1, [{
										offset: 0,
										color: '#FFF143'
									},
									{
										offset: 1,
										color: '#FFA700'
									}
								]
							)
						}
					},
					value: 0
				}, {
					itemStyle: {
						normal: {
							barBorderRadius: [30, 30, 0, 0],
							color: new echarts.graphic.LinearGradient(
								0, 0, 0, 1, [{
										offset: 0,
										color: '#FF23E4'
									},
									{
										offset: 1,
										color: '#AC00A2'
									}
								]
							)
						}
					},
					value: 0
				}, {
					itemStyle: {
						normal: {
							barBorderRadius: [30, 30, 0, 0],
							color: new echarts.graphic.LinearGradient(
								0, 0, 0, 1, [{
										offset: 0,
										color: '#F00056'
									},
									{
										offset: 1,
										color: '#C00035'
									}
								]
							)
						}
					},
					value: 0
				}];
				var len = labels ? labels.length : 0;
				var count = serdata ? serdata.length : 0;
				var result = [];
				for(var i = 0; i < len; i++) {
					if(i >= 0 && i < count) {
						result.push(serdata[i]);
					} else {
						result.push(serdata[0]);
					}
				}
				return result;
			},
			//监听围栏改变事件
			handleFenceChange() {
				this.$refs.fencemanage.reset(); //释放围栏监控组件资源
				this.reset(); //释放实时位置资源

			},
			//监听创建围栏事件
			handleFenceCreate() {
				this.$refs.fencemonitor.reset(); //释放围栏监控组件资源
				this.reset(); //释放实时位置资源
			},
			/***
			 * 清除图层
			 */
			clearMarkers() {
				this.mapTemp && this.markers && this.markers.forEach(item => {
					this.mapTemp.removeLayer(item);
				})
				this.markers = [];

				if(this.mapTemp && this.seTempLayer && this.mapTemp.hasLayer(this.seTempLayer)) {
					this.mapTemp.removeLayer(this.seTempLayer);
				}
				this.seTempLayer = null;
			},
			handleChangeType(pv) {
				this.cars = pv;
			},
			//关闭定时器
			clearInterval() {
				//关闭定时器
				if(this.interval) {
					clearInterval(this.interval);
				}
				this.interval=null;
			},
			//重置
			reset() {
				this.curPopupCar='';
				this.mapTemp && this.mapTemp.closePopup();
				this.total = 0;
				var chartData = deepClone(this.getSerdata());
				this.options.series[0].label.show = false;
				this.options.yAxis.max = 100;
				this.options.grid.left = "30px";
				this.options.series[0].data = chartData;
				this.cars = getCarTypeNameList();
				this.startTime = "2018-08-31 08:00:00";
				this.clearInterval();
				this.clearMarkers();
				this.timeCount=0;
				this.mapTemp && this.mapTemp.off("closepopupevent",this.closePopupEvent);
			},
			closePopupEvent(){
				this.curPopupCar='';
			},
			//查询
			query() {
				this.$refs.fencemonitor && this.$refs.fencemonitor.reset(); //释放围栏监控组件资源
				this.$refs.fencemanage && this.$refs.fencemanage.reset(); //释放围栏组件资源
				if(!this.editmode) {
					if(!this.startTime) { //最新位置
						this.realCarPosition();
					} else {
						this.clearInterval();
						this.queryTrackByBox();
						this.interval = setInterval(this.queryTrackByBox, INTERVAL_TIME);
					}
				}
			},
			/***
			 * 实时监控
			 */
			realCarPosition() {
				if(!this.editmode) {
					this.clearInterval();
					this.queryRealPosition();
					this.interval = setInterval(this.queryRealPosition, INTERVAL_TIME);
				}
			},
			/****
			 * 根据范围范围、时间、类型查询轨迹
			 */
			queryTrackByBox() {
				var array = [];
				this.cars && this.cars.forEach(item => {
					array.push(findCarTypeKeyByLabel(item));
				})
				if(!array || array.length == 0) {
					this.monitoreResult();
					return false;
				}
				var bounds = this.map && this.map.getBounds();
				if(bounds) {
					var box = {
						minx: bounds.getWest(),
						maxx: bounds.getEast(),
						miny: bounds.getSouth(),
						maxy: bounds.getNorth()
					}
					var start = moment(this.startTime, DATE_FORMAT).add(SPLIT_TIME * this.timeCount, 'seconds');
					this.timeCount += 1;
					var end = moment(this.startTime, DATE_FORMAT).add(SPLIT_TIME * this.timeCount, 'seconds');
					var scale = this.computeScale();
					var data = {
						bbox: [box],
						begin: start.format(DATE_FORMAT),
						end: end.format(DATE_FORMAT),
						type: array,
						scale: scale
					};
					var url = this.spaceRestUrl + TRACK_QUERY_PAST + this.params.dataConfig.dsId; //
					var headers = {
						'Content-Type': 'text/plain;charset=utf-8'
					};
					this.$post(url, data, headers).then(response => {
						this.monitoreResult(response);
						//						var infos = response.features;
						//						var len = infos ? infos.length : 0;
						//						this.clearMarkers();
						//						var chartData = deepClone(this.getSerdata()); //[0, 0, 0, 0, 0]; //["出租车", "警车", "公交车", "私家车", "货车"],
						//						var begin = new Date();
						//						for(var i = 0; i < len; i++) {
						//							var feature = infos[i];
						//							var geometry = feature.geometry;
						//							var coordinates = geometry.coordinates;
						//							var properties = feature.properties;
						//							if(coordinates) {
						//								var obj = null;
						//								var angle = 0;
						//								var type = "";
						//								if(coordinates.length == 1) {
						//									type = properties["type"];
						//									obj = {
						//										code: properties["id"],
						//										lng: coordinates[0][0],
						//										lat: coordinates[0][1],
						//										time: properties["time"][0],
						//										type: getCarLabelByKey(type)
						//									}
						//								} else if(coordinates.length > 1) {
						//									type = properties["type"];
						//									if(this.map.getZoom() >= 14) {
						//										var curLatLng = new L.LatLng(coordinates[0][1], coordinates[0][0]);
						//										var nextLatLng = new L.LatLng(coordinates[1][1], coordinates[1][0]);
						//										angle = computeSegmentHeading(this.map.project(curLatLng), this.map.project(nextLatLng));
						//									}
						//									obj = {
						//										code: properties["id"],
						//										lng: coordinates[1][0],
						//										lat: coordinates[1][1],
						//										time: properties["time"][1],
						//										type: getCarLabelByKey(properties["type"])
						//									}
						//								}
						//								if(obj) {
						//									var marker = null;
						//									if(this.map.getZoom() >= 14) {
						//										marker = L.marker([obj.lat, obj.lng], {
						//											rotationAngle: angle - 90,
						//											icon: createIcon(type)
						//										});
						//										marker.obj = obj;
						//										//marker.addTo(this.map);
						//										marker.on('click', e => {
						//											var content = getContentPosition(e.target.obj, this);
						//											this.map.openPopup(content, e.latlng);
						//										})
						//
						//									} else {
						//										var mSymbol = null;
						//										mSymbol = findSymbol(type);
						//										var color = mSymbol && mSymbol.color ? mSymbol.color : '#0000FF';
						//										marker = L.circleMarker([obj.lat, obj.lng], {
						//											radius: 8,
						//											color: color,
						//											fillOpacity: 0.6,
						//											fillColor: color
						//										});
						//										marker.obj = obj;
						//										//marker.addTo(this.map);
						//										marker.on('click', e => {
						//											var content = getContentPosition(e.target.obj, this);
						//											this.map.openPopup(content, e.latlng, {
						//												offset: [0, 3]
						//											});
						//										})
						//									}
						//									this.markers.push(marker);
						//									this.totalResult(type, chartData);
						//								}
						//							}
						//						}
						//						this.markers && this.markers.forEach(item => {
						//							this.map.addLayer(item);
						//						})
						//						this.computeY(chartData);
						//						if(len > 0) {
						//							this.options.series[0].label.show = true;
						//						} else {
						//							this.options.series[0].label.show = false;
						//						}
						//						this.options.series[0].data = chartData;
						//						var end = new Date();
						//						var time = end - begin;
						//						console.log("time is=" + time);
					});
				}
			},
			/***
			 * 处理历史监控结果
			 */
			monitoreResult(response) {
				if(!this.mapTemp) return false;
				this.mapTemp && this.mapTemp.closePopup();
				var infos = response && response.features;
				var len = infos ? infos.length : 0;
				this.clearMarkers();
				var array = [];
				var chartData = deepClone(this.getSerdata());
				//				var begin = new Date();
				this.total = len;
				var popObject=null;
				for(var i = 0; i < len; i++) {
					var feature = infos[i];
					var geometry = feature.geometry;
					var coordinates = geometry.coordinates;
					var properties = feature.properties;
					if(coordinates) {
						var obj = null;
						var angle = 0;
						var type = "";
						if(coordinates.length == 1) {
							type = properties["type"];
							obj = {
								code: properties["id"],
								lng: coordinates[0][0],
								lat: coordinates[0][1],
								time: properties["time"][0],
								type: getCarLabelByKey(type)
							}
						} else if(coordinates.length > 1) {
							type = properties["type"];
							if(this.mapTemp.getZoom() >= 14) {
								var curLatLng = new L.LatLng(coordinates[0][1], coordinates[0][0]);
								var nextLatLng = new L.LatLng(coordinates[1][1], coordinates[1][0]);
								angle = computeSegmentHeading(this.mapTemp.project(curLatLng), this.mapTemp.project(nextLatLng));
							}
							obj = {
								code: properties["id"],
								lng: coordinates[1][0],
								lat: coordinates[1][1],
								time: properties["time"][1],
								type: getCarLabelByKey(properties["type"])
							}
						}
						if(obj) {
							var marker = null;
							if(this.mapTemp.getZoom() >= 14) {
								marker = L.marker([obj.lat, obj.lng], {
									rotationAngle: angle - 90,
									icon: createIcon(type)
								});
								marker.obj = obj;
								marker.on('click', e => {
									var content = getContentPosition(e.target.obj, this);
									this.mapTemp.openPopup(content, e.latlng);
//									if(this.curPopupCar==e.target.obj.code)
//									{
//										var content = getContentPosition(e.target.obj, this);
//									    this.map.openPopup(content, e.latlng);
//									}
//									else
//									{
//										var content = getContentPosition(e.target.obj, this);
//										this.curPopupCar=e.target.obj.code;
//									    this.map.openPopup(content, e.latlng);
//									}
								})
								if(this.curPopupCar==obj.code)
								{
									popObject=obj;
								}
								this.markers.push(marker);
							} else {
								var mSymbol = null;
								mSymbol = findSymbol(type);
								var color = mSymbol && mSymbol.color ? mSymbol.color : '#0000FF';
								var temp = colorRgb(color);
								var sestyle = {
									stroke: true,
									strokeColor: temp && new L.RGBAColor(temp[0], temp[1], temp[2]),
									fillColor: temp && new L.RGBAColor(temp[0], temp[1], temp[2], 150),
								};
								var r = 8;
								if(this.mapTemp.getZoom() >= 0 && this.mapTemp.getZoom() < 12) {
									r = 5;
								}
								var mapPoints=[];
								mapPoints.push(L.point(obj.lng, obj.lat));
								var symbol=new L.SimpleMarkerSymbol({size:r*2,color:sestyle.fillColor,hasOutline:true,outlineColor:sestyle.strokeColor});
								marker = new L.SePointFeature({mapPoints:mapPoints,symbol:symbol});
								marker.obj = obj;
								//marker.style = sestyle;
								array.push(marker);
							}
							this.totalResult(type, chartData);
						}
					}
				}
				if(array.length > 0) //数据量大时
				{
					this.seTempLayer = new L.SeTempLayer({pane:"overlayPane"});
					this.seTempLayer.setFeatures(array);
					this.mapTemp && this.mapTemp.addLayer(this.seTempLayer);
					this.seTempLayer.draw();
					
				}
				this.mapTemp && this.markers && this.markers.forEach(item => {
					this.mapTemp.addLayer(item);
				})
				this.computeY(chartData);
				if(len > 0) {
					this.options.series[0].label.show = true;
				} else {
					this.options.series[0].label.show = false;
				}
				this.options.series[0].data = chartData;
//				if(popObject)
//				{
//					var content = getContentPosition(popObject, this);
//				    this.map.openPopup(content, [popObject.lat,popObject.lng]);
//				}
			},
			/***
			 * 处理实时监控结果
			 */
			realMonitoreResult(response) {
				if(!this.mapTemp) return false;
				this.mapTemp && this.mapTemp.closePopup();
				var infos = response.info && response.info.item;
				var len = infos ? infos.length : 0;
				this.clearMarkers();
				var array = [];
				this.total = len;
				var chartData = deepClone(this.getSerdata());
				for(var i = 0; i < len; i++) {
					var coordinates = infos[i].coordinates;
					if(coordinates && coordinates.length > 0) {
						var curLatLng = coordinates[0] && new L.LatLng(coordinates[0][1], coordinates[0][0]);
						var nextLatLng = coordinates[1] && new L.LatLng(coordinates[1][1], coordinates[1][0]);
						if(!nextLatLng) {
							nextLatLng = curLatLng;
						}
						var angle = computeSegmentHeading(this.mapTemp.project(curLatLng), this.mapTemp.project(nextLatLng));
						var obj = {
							code: infos[i].id,
							lng: nextLatLng.lng,
							lat: nextLatLng.lat,
							time: infos[i].time,
							type: getCarLabelByKey(infos[i].type)
						}
						this.totalResult(infos[i].type, chartData);
						var marker = null;
						if(this.mapTemp && this.mapTemp.getZoom() >= 14) {
							marker = L.marker([obj.lat, obj.lng], {
								rotationAngle: angle - 90,
								icon: createIcon(infos[i].type)
							});
							marker.obj = obj;
							marker.on('click', e => {
								var content = getContentPosition(e.target.obj, this);
								this.mapTemp.openPopup(content, e.latlng);
							})
							this.markers.push(marker);
						} else {
							var mSymbol = null;
							mSymbol = findSymbol(infos[i].type);
							var color = mSymbol && mSymbol.color ? mSymbol.color : '#0000FF';
							var temp = colorRgb(color);
							var sestyle = new L.SeStyle({
								stroke: true,
								strokeColor: temp && new L.RGBAColor(temp[0], temp[1], temp[2]),
								fillColor: temp && new L.RGBAColor(temp[0], temp[1], temp[2], 150),
							});
							var r = 8;
							if(this.mapTemp.getZoom() >= 0 && this.mapTemp.getZoom() < 12) {
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
				if(array.length > 0) //数据量大时
				{
//					this.seTempLayer = new L.SeTempLayer();
//					this.seTempLayer.addFeatures(array);
//					this.mapTemp && this.mapTemp.addLayer(this.seTempLayer);
                    this.seTempLayer = new L.SeTempLayer({pane:"overlayPane"});
					this.seTempLayer.setFeatures(array);
					this.mapTemp && this.mapTemp.addLayer(this.seTempLayer);
					this.seTempLayer.draw();
				}
				this.mapTemp && this.markers && this.markers.forEach(item => {
					this.mapTemp.addLayer(item);
				})
				this.computeY(chartData);
				if(len > 0) {
					this.options.series[0].label.show = true;
				} else {
					this.options.series[0].label.show = false;
				}
				//this.options.series[0].label.show = false;
				this.options.series[0].data = chartData;
			},

			/****
			 * 根据chartData设置Y轴
			 */
			computeY(chartData) {
				var max = 0;
				chartData && chartData.forEach((item, index) => {
					if(index == 0) {
						max = item.value;
					} else {
						max = max > item.value ? max : item.value;
					}
				});
				if(max >= 10000) {
					this.options.yAxis.max = null;
					this.options.grid.left = "55px";
				} else if(max >= 1000 && max < 10000) {
					this.options.yAxis.max = null;
					this.options.grid.left = "45px";
				} else if(max >= 100 && max < 1000) {
					this.options.yAxis.max = null;
					this.options.grid.left = "45px";
				} else {
					this.options.yAxis.max = 100;
					this.options.grid.left = "30px";
				}
			},
			//查询车辆实时位置
			queryRealPosition() {
				var bounds = this.map && this.map.getBounds();
				if(bounds) {
					var box = {
						minx: bounds.getWest(),
						maxx: bounds.getEast(),
						miny: bounds.getSouth(),
						maxy: bounds.getNorth()
					}
					var array = [];
					this.cars && this.cars.forEach(item => {
						array.push(findCarTypeKeyByLabel(item));
					})
					if(!array || array.length == 0) {
						this.realMonitoreResult();
						return false;
					}
					var data = {
						box: box,
						type: array
					};
					var headers = {
						'Content-Type': 'text/plain;charset=utf-8'
					};
					var url = this.spaceRestUrl + TRACK_REAL_POSITION + this.params.dataConfig.dsId; //
					this.$post(url, data, headers).then(response => {
						this.realMonitoreResult(response);
						//						var infos = response.info && response.info.item;
						//						var len = infos ? infos.length : 0;
						//						this.clearMarkers();
						//						var chartData = deepClone(this.getSerdata()); //["出租车", "警车", "公交车", "私家车", "货车"],
						//						for(var i = 0; i < len; i++) {
						//							var coordinates = infos[i].coordinates;
						//							if(coordinates && coordinates.length > 0) {
						//								var curLatLng = coordinates[0] && new L.LatLng(coordinates[0][1], coordinates[0][0]);
						//								var nextLatLng = coordinates[1] && new L.LatLng(coordinates[1][1], coordinates[1][0]);
						//								if(!nextLatLng) {
						//									nextLatLng = curLatLng;
						//								}
						//								var angle = computeSegmentHeading(this.map.project(curLatLng), this.map.project(nextLatLng));
						//								var obj = {
						//									code: infos[i].id,
						//									lng: nextLatLng.lng,
						//									lat: nextLatLng.lat,
						//									time: infos[i].time,
						//									type: getCarLabelByKey(infos[i].type)
						//								}
						//								this.totalResult(infos[i].type, chartData);
						//								var marker = null;
						//								if(this.map.getZoom() >= 14) {
						//									marker = L.marker([obj.lat, obj.lng], {
						//										rotationAngle: angle - 90,
						//										icon: createIcon(infos[i].type)
						//									}).addTo(this.map);
						//									marker.obj = obj;
						//									marker.on('click', e => {
						//										var content = getContentPosition(e.target.obj, this);
						//										this.map.openPopup(content, e.latlng);
						//									})
						//
						//								} else {
						//									var mSymbol = findSymbol(infos[i].type);
						//									var color = mSymbol && mSymbol.color ? mSymbol.color : '#0000FF';
						//									marker = L.circleMarker([obj.lat, obj.lng], {
						//										radius: 8,
						//										color: color,
						//										fillOpacity: 0.6,
						//										fillColor: color
						//									});
						//									marker.obj = obj;
						//									//marker.addTo(this.map);
						//									marker.on('click', e => {
						//										var content = getContentPosition(e.target.obj, this);
						//										this.map.openPopup(content, e.latlng, {
						//											offset: [0, 3]
						//										});
						//									})
						//								}
						//								this.markers.push(marker);
						//							}
						//						}
						//						this.markers && this.markers.forEach(item => {
						//							this.map.addLayer(item);
						//						})
						//						this.computeY(chartData);
						//						if(len > 0) {
						//							this.options.series[0].label.show = true;
						//						} else {
						//							this.options.series[0].label.show = false;
						//						}
						//						this.options.series[0].data = chartData;
					});
				}
			},
			totalResult(type, chartData) {
				var list = getCarTypeKeyList();
				var len = list ? list.length : 0;
				if(len > 0) {
					var index = list.indexOf(type);
					if(chartData && index >= 0 && index < chartData.length) {
						chartData[index].value += 1;
					}
				}
			}
		},
		components: {
			CarType,
			FenceMonitor,
			FenceManage,
			Bar
		},
		watch: {
			activeName(curval, oldval) {
				this.localActiveName = curval;
			},
			height() {
				this.$refs.bar.resize();
			},
			editmode(curval, oldval) {
				if(curval) //编辑模式
				{
					this.clearInterval();
				} else {
					if(this.localActiveName == TrackModuleType.MONITOR_LOCATION) {
						this.query();
					}
				}
			},
			map(newval,oldnew){
				this.mapTemp=newval;
			}

		}
	}
</script>

<style scoped>
	/*.el-checkbox+.el-checkbox {
		margin-left: 0px;
	}*/
</style>