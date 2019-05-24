<template>
	<div class="item-list">
		<div class="right-component-item-header track-split-item-line-bootom split-item">
			<span @click="isRight=!isRight">
			<i class="el-icon-caret-right" v-show="isRight" ></i>
			<i class="el-icon-caret-bottom" v-show="!isRight" ></i>
			{{$t('FenceMonitor.fence_monitor')}}</span>
		</div>
		<div v-show="!isRight" class="right-component-item-content item-list">
			<el-row class="right-component-item track-split-item" type="flex" align='middle'>
				<el-col :span="8">
					{{$t('Common.start_time')}}
				</el-col>
			</el-row>
			<el-row class="right-component-item track-split-item" type="flex" align='middle'>
				<el-col :span="24">
					<el-date-picker v-model="startTime" type="datetime" :placeholder="$t('Common.select_datetime')" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" style="width: 100% !important;">
					</el-date-picker>
				</el-col>
			</el-row>
			<el-row class="right-component-item track-split-item" type="flex" align='middle'>
				<el-col :span="8">
					{{$t('FenceMonitor.select_fence')}}
				</el-col>
			</el-row>
			<el-row class="right-component-item track-split-item" type="flex" align='middle'>
				<el-col :span="24">
					<!--<el-checkbox-group v-model="selectFences" @change="handleCheckedChange">
						<el-checkbox v-for="item in fences" :label="item" :key="item" style="margin: 4px 0; width: 100%;">{{item.properties.name}}</el-checkbox>
					</el-checkbox-group>-->
					<el-select v-model="selectFences" multiple collapse-tags style="width:100%;" :placeholder="$t('Common.select')" @change="handleFenceChange">
						<el-option v-for="item in fences" :key="item.properties.id" :label="getSubLabel(item)" :value="item.properties.id">
						</el-option>
					</el-select>
				</el-col>
			</el-row>
			<CarType :checked-cars="cars" @changetype="handleChangeType">

			</CarType>
			<el-row class="right-component-item track-split-item track-split-item-line " type="flex" align='middle' justify="center">
				<el-col :span="8" style="text-align: center;">
					<el-button type="primary" plain size="small" @click="reset">{{$t('Common.reset')}}</el-button>
				</el-col>
				<el-col :span="8" style="text-align: center;">
					<el-button type="primary" plain size="small" @click="monitor">{{$t('Common.start_monitor')}}</el-button>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
	import moment from "moment"
	import { getContentPosition, createIcon, computeSegmentHeading, findSymbol, colorRgb } from '../js/utils.js'
	import { findCarTypeKeyByLabel, getCarLabelByKey, getCarTypeNameList } from '../js/carstype.js'
	import { FENCE_QUERY, FENCE_REAL_MONITOR, FENCE_NOREAL_MONITOR, TRACK_QUERY, TRACK_QUERY_PAST } from '../js/serviceapi.js'
	import CarType from './CarType.vue'
	import { mapState } from 'vuex'
	import mixins from './mixins.js'
	const EVENT_FENCE_CHANGE = "fencechange";
	const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';
	const INTERVAL_TIME = 5000; //定时器间隔
	const SPLIT_TIME = 3; //定时器间隔
	const props = {
		map: {
			type: Object
		},
		params: {
			type: Object
		}
	}
	export default {
		name: "FenceMonitor",
		message: "围栏监测组件",
		props,
		mixins: [mixins],
		data() {
			return {
				isRight: false,
				cars: getCarTypeNameList(),
				fences: [], //围栏数据
				selectFences: [], //已选择的围栏
				startTime: '2018-08-31 08:00:00',
				interval: null, //定时器
				timeCount: 0, //模拟实时监控次数
				geoJSONLayer: null, //围栏图层
				markers: [], //监控的Marker
				seTempLayer: null
			}
		},
		created() {
			this.queryFences();
		},
		methods: {
			getSubLabel(item) {
				var obj = item && item.properties && item.properties.name;
				if(obj) {
					if(obj.length > 20) {
						return obj.substr(0, 20) + "...";
					} else {
						return obj;
					}
				}
				return '';
			},
			handleChangeType(pv) {
				this.cars = pv;
			},

			handleFenceChange(val) {
				this.addFences();
				this.$emit(EVENT_FENCE_CHANGE);
			},
			//清除图层
			clearFenceLayers() {
				if(this.geoJSONLayer && this.map && this.map.hasLayer(this.geoJSONLayer)) {
					this.map.removeLayer(this.geoJSONLayer);
				}
				this.geoJSONLayer = null;
			},
			/***
			 * 清除Marker图层
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
			/***
			 * 根据围栏ID查找围栏数据
			 */
			findFence(id) {
				var len = this.fences ? this.fences.length : 0;
				for(var i = 0; i < len; i++) {
					var obj = this.fences[i].properties;
					if(obj && obj.id != undefined && obj.id == id) {
						return this.fences[i];
					}
				}
				return null;
			},
			featureStyle(feature) {
				return {
					weight: 2,
					opacity: 1,
					color: 'white',
					fillOpacity: 0.5,
					fillColor: "#3388ff"
				}
			},
			//显示围栏图层
			addFences() {
				var len = this.selectFences ? this.selectFences.length : 0;
				var fencesData = [];
				for(var i = 0; i < len; i++) {
					var temp = this.findFence(this.selectFences[i]);
					if(temp) {
						fencesData.push(temp);
					}
				}
				this.clearFenceLayers();
				if(fencesData.length > 0 && this.map) {
					var jsonData = {
						"type": "FeatureCollection",
						"features": fencesData
					}
					this.geoJSONLayer = new L.GeoJSON(jsonData, {
						//style: this.featureStyle
					});
					this.map.addLayer(this.geoJSONLayer);
					this.map.fitBounds(this.geoJSONLayer.getBounds());
				}
			},
			//查询围栏
			queryFences() {
				var url = this.spaceRestUrl + FENCE_QUERY; //
				this.$fetch(url).then(response => {
					this.fences = response.info;
				});
			},
			//围栏监控
			monitor() {
				if(!this.selectFences || this.selectFences.length == 0) {
					this.$message.warning(this.$t("message.select_fence_area"));
					return false;
				}
				if(!this.startTime) //实时监控
				{
					this.realMonitor();
				} else //模拟实时监控
				{
					this.noRealMonitor();
				}
			},
			reset() {
				this.clearFenceLayers();
				this.clearMarkers();
				this.clearInterval();
				this.cars = getCarTypeNameList();
				this.selectFences = []; //已选择的围栏
				this.startTime = '2018-08-31 08:00:00';
				this.timeCount = 0; //模拟实时监控次数
				this.queryFences() //重新请求围栏
				this.params.monitors = [];
			},
			//关闭定时器
			clearInterval() {
				//关闭定时器
				if(this.interval) {
					clearInterval(this.interval);
				}
			},
			//实时监控
			realMonitor() {
				this.clearInterval();
				this.queryRealMonitor();
				this.interval = setInterval(this.queryRealMonitor, INTERVAL_TIME);
			},
			//模拟围栏实时监控
			noRealMonitor() {
				this.clearInterval();
				this.queryNoRealMonitor();
				this.interval = setInterval(this.queryNoRealMonitor, INTERVAL_TIME);
			},
			//查询实时监控
			queryRealMonitor() {
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
						this.clearMarkers();
						this.params.monitors = [];
						this.map && this.map.closePopup();
						return false;
					}
					var data = {
						fences: this.selectFences,
						box: box,
						type: array
					};
					var url = this.spaceRestUrl + FENCE_REAL_MONITOR + this.params.dataConfig.dsId; //
					var headers = {
						'Content-Type': 'text/plain;charset=utf-8'
					};
					this.$post(url, data, headers).then(response => {
						this.map && this.map.closePopup();
						var infos = response.info;
						var len = infos ? infos.length : 0;
						this.clearMarkers();
						var monitors = [];
						var arrayFeatures = [];
						for(var i = 0; i < len; i++) {
							var coordinates = infos[i].coordinates;
							var curLatLng = new L.LatLng(coordinates[0][1], coordinates[0][0]);
							var nextLatLng = new L.LatLng(coordinates[1][1], coordinates[1][0]);
							angle = computeSegmentHeading(this.map.project(curLatLng), this.map.project(nextLatLng));
							var obj = {
								code: infos[i].id,
								lng: coordinates[1][0],
								lat: coordinates[1][1],
								time: infos[i].time,
								type: getCarLabelByKey(infos[i].type)
							}
							var marker = null;
							if(this.map.getZoom() >= 14) {
								marker = L.marker([obj.lat, obj.lng], {
									rotationAngle: angle - 90,
									icon: createIcon(infos[i].type)
								})
								marker.obj = obj;
								marker.on('click', e => {
									var content = getContentPosition(e.target.obj, this);
									this.map.openPopup(content, e.latlng);
								})
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
								if(this.map.getZoom() >= 0 && this.map.getZoom() < 12) {
									r = 5;
								}
								//								marker = new L.SeCircleFeature(L.point(obj.lng, obj.lat), r, r);
								//								marker.obj = obj;
								//								marker.style = sestyle;
								//								arrayFeatures.push(marker);
								var mapPoints = [];
								mapPoints.push(L.point(obj.lng, obj.lat));
								var symbol = new L.SimpleMarkerSymbol({
									size: r * 2,
									color: sestyle.fillColor,
									hasOutline: true,
									outlineColor: sestyle.strokeColor
								});
								marker = new L.SePointFeature({
									mapPoints: mapPoints,
									symbol: symbol
								});
								marker.obj = obj;
								arrayFeatures.push(marker);
							}
							var state = infos[i].fence_status;
							if(state) {
								monitors.push({
									code: infos[i].id,
									lng: coordinates[1][0],
									lat: coordinates[1][1],
									time: moment(infos[i].time * 1000).format(DATE_FORMAT),
									type: getCarLabelByKey(infos[i].type)
								})
							}
						}
						if(arrayFeatures.length > 0) //数据量大时
						{
							//							this.seTempLayer = new L.SeTempLayer();
							//							this.seTempLayer.addFeatures(arrayFeatures);
							//							this.map && this.map.addLayer(this.seTempLayer);
							this.seTempLayer = new L.SeTempLayer({
								pane: "overlayPane"
							});
							this.seTempLayer.setFeatures(arrayFeatures);
							this.map && this.map.addLayer(this.seTempLayer);
							this.seTempLayer.draw();
						}
						this.map && this.markers && this.markers.forEach(item => {
							this.map.addLayer(item);
						})
						this.params.monitors = monitors;
					});
				}
			},
			/****
			 * 模拟围栏实时监测
			 */
			queryNoRealMonitor() {
				var array = [];
				this.cars && this.cars.forEach(item => {
					array.push(findCarTypeKeyByLabel(item));
				})
				if(!array || array.length == 0) {
					this.clearMarkers();
					this.params.monitors = [];
					this.map && this.map.closePopup();
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
						fence_list: this.selectFences,
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
						this.map && this.map.closePopup();
						var infos = response.features;
						var len = infos ? infos.length : 0;
						this.clearMarkers();
						var monitors = [];
						var arrayFeatures = [];
						for(var i = 0; i < len; i++) {
							var feature = infos[i];
							var geometry = feature.geometry;
							var coordinates = geometry.coordinates;
							if(coordinates) {
								var obj = null;
								var angle = 0;
								var type = "";
								if(coordinates.length == 1) {
									type = feature.properties["type"];
									obj = {
										code: feature.properties["id"],
										lng: coordinates[0][0],
										lat: coordinates[0][1],
										time: feature.properties["time"][0],
										type: getCarLabelByKey(type)
									}
									//处理围栏判断结果
									if(feature.properties["fence_status"][0]) {
										monitors.push({
											code: feature.properties["id"],
											lng: coordinates[0][0],
											lat: coordinates[0][1],
											time: moment(feature.properties["time"][0] * 1000).format(DATE_FORMAT),
											type: getCarLabelByKey(type)
										})
									}
								} else if(coordinates.length > 1) {
									type = feature.properties["type"];
									var curLatLng = new L.LatLng(coordinates[0][1], coordinates[0][0]);
									var nextLatLng = new L.LatLng(coordinates[1][1], coordinates[1][0]);
									angle = computeSegmentHeading(this.map.project(curLatLng), this.map.project(nextLatLng));
									obj = {
										code: feature.properties["id"],
										lng: coordinates[1][0],
										lat: coordinates[1][1],
										time: feature.properties["time"][1],
										type: getCarLabelByKey(feature.properties["type"])
									}
									//处理围栏判断结果
									if(feature.properties["fence_status"][1]) {
										monitors.push({
											code: feature.properties["id"],
											lng: coordinates[0][0],
											lat: coordinates[0][1],
											time: moment(feature.properties["time"][0] * 1000).format(DATE_FORMAT),
											type: getCarLabelByKey(type)
										})
									}
								}
								if(obj) {
									var marker = null;
									if(this.map.getZoom() >= 14) {
										marker = L.marker([obj.lat, obj.lng], {
											rotationAngle: angle - 90,
											icon: createIcon(type)
										});
										marker.obj = obj;
										marker.on('click', e => {
											var content = getContentPosition(e.target.obj, this);
											this.map.openPopup(content, e.latlng);
										})
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
										if(this.map.getZoom() >= 0 && this.map.getZoom() < 12) {
											r = 5;
										}
										//										marker = new L.SeCircleFeature(L.point(obj.lng, obj.lat), r, r);
										//										marker.obj = obj;
										//										marker.style = sestyle;
										//										arrayFeatures.push(marker);
										var mapPoints = [];
										mapPoints.push(L.point(obj.lng, obj.lat));
										var symbol = new L.SimpleMarkerSymbol({
											size: r * 2,
											color: sestyle.fillColor,
											hasOutline: true,
											outlineColor: sestyle.strokeColor
										});
										marker = new L.SePointFeature({
											mapPoints: mapPoints,
											symbol: symbol
										});
										marker.obj = obj;
										arrayFeatures.push(marker);
									}
								}
							}
						}
						if(arrayFeatures.length > 0) //数据量大时
						{
							this.seTempLayer = new L.SeTempLayer({
								pane: "overlayPane"
							});
							this.seTempLayer.setFeatures(arrayFeatures);
							this.map && this.map.addLayer(this.seTempLayer);
							this.seTempLayer.draw();
						}
						this.map && this.markers && this.markers.forEach(item => {
							this.map.addLayer(item);
						})
						this.params.monitors = monitors;
					});
				}
			}
		},
		components: {
			CarType
		},
		computed: {
			...mapState([
				'spaceRestUrl',
				'maps',
				'uid'
			])
		}

	}
</script>

<style scoped>

</style>