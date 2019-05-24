<template>
	<div class="right-component-item-content item-list" style="overflow: hidden;box-sizing: border-box;">
		<div v-if="isQueryDevice">
			<el-row class="right-component-item track-split-item" type="flex" align='middle'>
				<el-col :span="8">
					{{$t('Common.vehicle_number')}}
				</el-col>
			</el-row>
			<el-row class="right-component-item track-split-item" type="flex" align='middle'>
				<el-col :span="24">
					<el-autocomplete popper-class="my-autocomplete" v-model="code" :fetch-suggestions="querySearch" :placeholder="$t('Common.input_vehicle_number')" @select="handleSelect" style="width: 100%;">
						<template slot-scope="{ item }">
							<div class="name">{{ item.id }}</div>
						</template>
					</el-autocomplete>
				</el-col>
			</el-row>
			<!--选择时间-->
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
				<el-col :span="24">
					{{$t('Common.minute_interval')}}
				</el-col>
			</el-row>
			<el-row class="right-component-item track-split-item" type="flex" align='middle'>
				<el-col :span="24">
					<VueSlider v-model="curTime" :process-style="bprocessStyle"  :data="times" style="margin-top: 20px;" :real-time="true"></VueSlider>
				</el-col>
			</el-row>
			 
			<!--<el-row class="right-component-item track-split-item" type="flex" align='middle'>
				<el-col :span="8">
					{{$t('Common.end_time')}}
				</el-col>
			</el-row>
			<el-row class="right-component-item track-split-item" type="flex" align='middle'>
				<el-col :span="24">
					<VueSlider v-model="curTime" :data="times" style="margin-top: 20px;" :real-time="realtime"></VueSlider>
				</el-col>
			</el-row>-->
			<el-row class="right-component-item track-split-item" type="flex" align='middle'>
				<el-col :span="24">
					{{$t('Common.area_radius_meter')}}
				</el-col>
			</el-row>
			<el-row class="right-component-item track-split-item" type="flex" align='middle'>
				<el-col :span="24">
					<el-input-number v-model="radius" :min="0" :max="200"></el-input-number>
				</el-col>
			</el-row>
			<el-row class="right-component-item track-split-item track-split-item-line " type="flex" align='middle' justify="center">
				<el-col :span="8" style="text-align: center;">
					<el-button type="primary" plain size="small" @click="reset">{{$t('Common.reset')}}</el-button>
				</el-col>
				<el-col :span="8" style="text-align: center;">
					<el-button type="primary" plain size="small" @click="queryTrack">{{$t('Common.analysis')}}</el-button>
				</el-col>
			</el-row>
		</div>
		<!--车辆列表-->
		<div :style="heightStyle3" class="tr-center"  v-if="!isQueryDevice">
			<div class="right-component-item-content">
				<div style="background-color: #FFF;padding: 0 4px;">
					<!--<el-row class="right-component-item track-split-item" type="flex" align='middle' justify="center" >
						<el-col :span="20" >
							<span style="padding-left: 24px;">车牌号</span>
						</el-col>
						<el-col :span="4" style="text-align: center;">
							数量
						</el-col>
					</el-row>-->
					<el-row class="right-component-item track-split-item" type="flex" align='middle' justify="center" v-for="(lcc,index) in pageDevices" :key="index">
						<el-col :span="10" v-show="lcc.isQueryTrack">
							<el-checkbox style="font-size: 20px !important;" v-model="lcc.selected">{{lcc.label}}</el-checkbox>
						</el-col>
						<el-col :span="20" v-show="!lcc.isQueryTrack">
							<el-checkbox style="font-size: 20px !important;" v-model="lcc.selected">{{lcc.label}}</el-checkbox>
						</el-col>
						<el-col :span="10" v-show="lcc.isQueryTrack">
							<el-row type="flex" align='middle' justify="center">
								<el-col :span="12" style="text-align: right;">
									<div class="c-track-second-color" v-bind:style="{background:lcc.color}" @click="locationTrack(index)"></div>
								</el-col>
								<el-col :span="6" style="text-align: right;">
									<img src="../images/play.svg" :title="$t('Common.play')" style="width: 24px;height: auto;cursor: pointer;" class="Num-pause-btn" @click="play(lcc,index)">
								</el-col>
								<el-col :span="6" style="text-align: right;" v-if="!lcc.isPlayTrack">
									<img src="../images/stop.svg" style="width: 24px;height: auto;cursor: pointer;" :title="$t('Common.stop')" class="Num-pause-btn" @click="stop(index)">
								</el-col>
								<el-col :span="6" style="text-align: right;" v-else>
									<img src="../images/stop-y.svg" style="width: 24px;height: auto;cursor: pointer;" :title="$t('Common.stop')" class="Num-pause-btn" @click="stop(index)">
								</el-col>
							</el-row>
						</el-col>
						<el-col :span="4" style="text-align: center;">
							{{lcc.count}}
						</el-col>
					</el-row>
				</div>
			</div>
		</div>
		<div v-if="!isQueryDevice ">
			<!--分页功能-->
			<div style="border-top: solid 1px #DCDEE3;padding: 1px 4px;" v-if="bShowPage">
				<el-row class="right-component-item track-split-item" type="flex" align='middle' justify="center" style="padding: 4px 12px; ">
					<el-pagination :current-page="currentPage" @current-change="handleCurrentChange" :page-size="pageSize" layout="total, prev, pager, next " :total="total" :pager-count="5">
					</el-pagination>
				</el-row>
			</div>
			<div style="border-top: solid 1px #DCDEE3;padding: 1px 4px;" ref="trackdiv">
				<TrackPlaySet :playTrackConfig="playTrackConfig" @expand="handleExpand"></TrackPlaySet>
			</div>
			<div style="border-top: solid 1px #DCDEE3;padding: 4px 0px;">
				<el-row class="right-component-item track-split-item " type="flex" align='middle' justify="center">
					<el-col :span="12 " style="text-align: center;">
						<el-button type="primary " plain size="small" @click="queryTrack2">{{$t('Common.query')}}</el-button>
					</el-col>
					<el-col :span="12 " style="text-align: center;">
						<el-button type="primary " plain size="small" @click="backToQueryDevice">{{$t('Common.back')}}</el-button>
					</el-col>
				</el-row>
			</div>
		</div>
	</div>
</template>

<script>
	import * as turf from '@turf/turf'
	import VueSlider from 'vue-slider-component';
	import moment from 'moment'
	import { getContentPosition, createIcon, breakColorPart, breakApart, computeSegmentHeading } from '../js/utils.js'
	import Resource from '../js/Resource.js'
	import TrackPlaySet from './TrackPlaySet.vue'
	import { findCarTypeKeyByLabel, getCarLabelByKey } from '../js/carstype.js'
	import { TRACK_QUERY, TRACK_ANALYSIS } from '../js/serviceapi.js'
	import { PageSize } from '../js/constants.js'
	import { mapState } from 'vuex'
	import mixins from './mixins.js'
	const DATEFORMAT = "YYYY-MM-DD HH:mm:ss";
	const EVENT_TRACK_ANALYSIS = "trackanalysis";
	const trackLineStyle = {
		color: "rgb(42,144,82)",
		weight: 8
	}
	/***
	 * 已播放的轨迹样式
	 */
	const playtrackLineStyle = {
		color: "#a09e97",
		weight: 8
	}
	const props = {
		map: {
			type: Object
		},
		params: {
			type: Object
		},
		height: {
			type: Number,
			default: 0
		}
	}
	export default {
		name: "TrackAnalysis",
		message: "轨迹分析 ",
		props,
		mixins: [mixins],
		data() {
			return {
				value1:50,
				realtime: true,
				times: ["+10","+20","+30","+40","+50","+60"],
				bShowPage: false, //显示分页组件
				pageSize: PageSize,
				total: 0,
				currentPage: 1, //当前页数
				curTime: "+10",
				isRight: false,
				code: '', //车牌号
				startTime: '', //开始时间
				endTime: '', //结束时间
				polyLine: null,
				trackLines: [], //分析的结果
				markers: [],
				radius: 50,
				isQueryDevice: true,
				devices: [], //格式[{}]
				pageDevices: [], //当前页显示的设备
				bufferLayer: null, //buffer图层
				playTrackConfig: {
					speed: 300, //播放速度
					locationMode: 2 //定位方式
				}, //轨迹播放参数
				infoControl: null
			}
		},
		methods: {
			handleCurrentChange(val) {
				this.currentPage = val;
				this.computePageDevices();
			},
			//计算时间
//			computeDateTime() {
//				if(this.times.indexOf(this.curTime) >= 0) {
//					var index = this.times.indexOf(this.curTime);
//					var startTime = moment(this.startTime, DATEFORMAT);
//					var endTime = startTime.add(index + 1, 'hours');
//					this.endTime = endTime.format(DATEFORMAT);
//				}
//			},
			//计算时间
			computeDateTime2() {
				if(this.times.indexOf(this.curTime) >= 0) {
					var index = this.times.indexOf(this.curTime);
					var startTime = moment(this.startTime, DATEFORMAT);
					var endTime = startTime.add((index + 1)*10, 'minutes');
					this.endTime = endTime.format(DATEFORMAT);
				}
			},
			handleExpand(pv) {
				this.isRight = pv;
			},
			reset() {
				this.stop();
				this.removeLayers();
				this.code = ""; //车牌号
				this.startTime = "";
				this.endTime = "";
				this.backToQueryDevice();
			},
			/***
			 * 根据设备编号查找对应的轨迹图层
			 */
			findTrackLineByCode(code) {
				var len = this.trackLines ? this.trackLines.length : 0;
				for(var i = 0; i < len; i++) {
					if(this.trackLines[i].code == code) {
						return this.trackLines[i];
					}
				}
				return null;
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
			//移除图层
			removeLayers() {
				if(this.map) {
					if(this.polyLine && this.map.hasLayer(this.polyLine)) {
						this.map.removeLayer(this.polyLine);
					}
				}
				this.polyLine = null;
				if(this.map) {
					this.trackLines && this.trackLines.forEach(item => {
						this.map.removeLayer(item);
					})
				}
				this.trackLines = [];
				this.markers && this.markers.forEach(item => {
					this.map.removeLayer(item);
				})
				this.markers = [];
				if(this.map) {
					if(this.bufferLayer && this.map.hasLayer(this.bufferLayer)) {
						this.map.removeLayer(this.bufferLayer);
					}
				}
				this.bufferLayer = null;
			},
			//清除轨迹线
			clearLines() {
				if(this.map) {
					this.trackLines && this.trackLines.forEach(item => {
						this.map.removeLayer(item);
					})
				}
				this.trackLines = [];
				this.markers && this.markers.forEach(item => {
					this.map.removeLayer(item);
				})
				this.markers = [];
			},
			//查询轨迹
			queryTrack() {
				if(!this.code) {
					this.$message.warning(this.$t('message.input_vehicle_number'));
					return false;
				}
				this.computeDateTime2();
				if(!this.startTime || !this.endTime) {
					this.$message.warning(this.$t('message.set_query_time'));
					return false;
				}
				var data = {
					id: [this.code],
					begin: this.startTime,
					end: this.endTime
				}
				var index = this.params.dataConfig.dsId;
				var url = this.spaceRestUrl + TRACK_QUERY + index;
				var headers = {
					'Content-Type': 'text/plain;charset=utf-8'
				};
				this.$post(url, data, headers).then(response => {
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
					var features = response.features;
					if(features && features.length > 0) {
						var count = features.length;
						var bValidTrackLine = false;
						var item = null;
						for(var j = 0; j < count; j++) {
							item = features[j];
							var coordinates = item.geometry.coordinates;
							var len = coordinates ? coordinates.length : 0
							if(len >= 10) //有10个点以上认为是合法的轨迹
							{
								bValidTrackLine = true;
								break;
							}
						}
						if(bValidTrackLine && item) {
							this.$emit(EVENT_TRACK_ANALYSIS);
							this.stop();
							this.removeLayers();
							var coordinates = item.geometry.coordinates;
							var len = coordinates ? coordinates.length : 0
							var latlngs = new Array();
							var code = item.properties["id"];
							var lineStyle = trackLineStyle;
							for(var i = 0; i < len; i++) {
								latlngs.push([coordinates[i][1], coordinates[i][0]]);
								if(i == 0) //起点
								{
									var marker = L.marker([coordinates[i][1], coordinates[i][0]], {
										icon: startIcon
									}).addTo(this.map);
									this.markers.push(marker);
								}
								if(i == len - 1) //终点
								{
									var marker = L.marker([coordinates[i][1], coordinates[i][0]], {
										icon: endIcon
									}).addTo(this.map);
									this.markers.push(marker);
								}
							}
							this.polyLine = new L.Polyline(latlngs, lineStyle);
							this.polyLine.code = code;
							this.polyLine.type = item.properties["type"];
							this.polyLine.times = item.properties["time"];
							this.polyLine.addTo(this.map);
							var bounds = this.polyLine.getBounds();
							if(bounds && this.map) {
								this.map.fitBounds(bounds);
							}
							this.analysis();
						} else {
							this.$message.warning(this.$t('message.no_legal_track')); 
						}
					} else {
						this.$message.warning(this.$t('message.no_query_results'));
					}
				});
			},
			/****
			 * 随机生成线样式
			 */
			makeLineStyle() {
				var r, g, b;
				r = Math.floor(Math.random() * 256);
				g = Math.floor(Math.random() * 256);
				b = Math.floor(Math.random() * 256);
				return {
					color: "rgba(" + r + "," + g + "," + b + ",1)",
					weight: 8
				}
			},
			/****
			 * 相似分析
			 */
			analysis() {
				var geojson = this.polyLine && this.polyLine.toGeoJSON();
				if(!geojson || !geojson.geometry) {
					this.$message.warning(this.$t('message.set_analyzed_track'));
					return false;
				}
				var data = {
					track: geojson.geometry && geojson.geometry.coordinates,
					begin: this.startTime,
					end: this.endTime,
					distance: this.radius
				}
				var index = this.params.dataConfig.dsId;
				var url = this.spaceRestUrl + TRACK_ANALYSIS + index;
				var headers = {
					'Content-Type': 'text/plain;charset=utf-8'
				};
				this.$post(url, data, headers).then(response => {
					this.devices = [];
					var infos = response.info && response.info.item;
					var len = infos ? infos.length : 0;
					this.total = len;
					if(len > 0) {
						this.isQueryDevice = false;
					} else {
						this.$message.warning(this.$t('message.no_query_results'));
						return false;
					}
					var sortBy = function(field) {
						return function(a, b) {
							return b[field] - a[field];
						}
					};
					infos.sort(sortBy('count'));
					var startColor = "007979";
					var endColor = "80FFFF";
					var tempList = breakColorPart(startColor, endColor, len);
					var startIntColor = breakApart(startColor);
					var endIntColor = breakApart(endColor);
					var r, g, b;
					for(var i = 0; i < len; i++) {
						var r, g, b = 0;
						//						r = startIntColor[0];
						//						g = startIntColor[1];
						//						b = startIntColor[2];
						//						for(var j = 0; j < 3; j++) {
						//							startIntColor[j] += tempList[j];
						//						}
						r = Math.floor(Math.random() * 256);
						g = Math.floor(Math.random() * 256);
						b = Math.floor(Math.random() * 256);
						this.devices.push({
							'label': infos[i].id,
							'count': infos[i].count,
							'color': "rgba(" + r + "," + g + "," + b + ",1)",
							'selected': false,
							'isQueryTrack': false
						});
					}
					this.computePageDevices();
					var scale = this.computeScale();
					var options = {
						tolerance: scale,
						highQuality: false
					};
					//var simplified = turf.simplify(geojson, options);
					var bufferData = turf.buffer(geojson, this.radius, {
						units: 'meters'
					});
					this.bufferLayer = new L.GeoJSON(bufferData);
					this.map.addLayer(this.bufferLayer);
				});
			},
			//获取每页数据
			computePageDevices() {
				this.pageDevices=[];
				if(this.devices) {
					if(this.total > 0) {
						var startindex = (this.currentPage - 1) * this.pageSize;
						var endindex = this.currentPage * this.pageSize;
						this.pageDevices = this.devices.slice(startindex, endindex);
					}
				}
			},
			computeScale() {
				var bounds = this.map && this.map.getBounds();
				var size = this.map && this.map.getSize();
				if(bounds && size) {
					var difLng = bounds.getEast() - bounds.getWest();
					var difWidth = size.x;
					return difLng / difWidth;
				}
				return 0;
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
			//查询轨迹
			queryTrack2() {
				var codes = [];
				this.pageDevices && this.pageDevices.forEach((item) => {
					if(item.selected) {
						codes.push(item.label);
					}
				});
				if(!codes || codes.length == 0) {
					this.$message.warning(this.$t('message.select_vehicle'));
					return false;
				}
				this.computeDateTime2();
				if(!this.startTime || !this.endTime) {
					this.$message.warning(this.$t('message.set_query_time'));
					return false;
				}
				var data = {
					id: codes,
					begin: this.startTime,
					end: this.endTime
				}
				//this.$emit(EVENT_TRACK_QUERY);
				var index = this.params.dataConfig.dsId;
				var url = this.spaceRestUrl + TRACK_QUERY + index;
				var headers = {
					'Content-Type': 'text/plain;charset=utf-8'
				};
				this.$post(url, data, headers).then(response => {
					//this.clearAllayers();
					this.stop();
					this.clearLines();
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
					var features = response.features;
					//var count22 = this.devices ? this.devices.length : 0;
					var devicesLen = this.pageDevices ? this.pageDevices.length : 0;
					for(var i = 0; i < devicesLen; i++) {
						var temp = this.pageDevices[i];
						if(temp.isQueryTrack) {
							temp.isQueryTrack = false;
							this.$set(this.pageDevices, i, temp);
						}
					}
					if(features && features.length > 0) {
						features.forEach(item => {
							var coordinates = item.geometry.coordinates;
							var len = coordinates ? coordinates.length : 0
							var latlngs = new Array();
							var code = item.properties["id"];
							var lineStyle = this.getLineStyle(code);
							for(var i = 0; i < len; i++) {
								latlngs.push([coordinates[i][1], coordinates[i][0]]);
								if(i == 0) //起点
								{
									var marker = L.marker([coordinates[i][1], coordinates[i][0]], {
										icon: startIcon
									}).addTo(this.map);
									this.markers.push(marker);
								}
								if(i == len - 1) //终点
								{
									var marker = L.marker([coordinates[i][1], coordinates[i][0]], {
										icon: endIcon
									}).addTo(this.map);
									this.markers.push(marker);
								}
							}
							var polyLine = new L.Polyline(latlngs, lineStyle);
							polyLine.code = code;
							polyLine.type = item.properties["type"];
							polyLine.times = item.properties["time"];
							polyLine.addTo(this.map);
							this.trackLines.push(polyLine);
							if(devicesLen > 0) {
								for(var j = 0; j < devicesLen; j++) {
									if(this.pageDevices[j].label == code) {
										var temp = this.pageDevices[j];
										temp.isQueryTrack = true;
										this.$set(this.pageDevices, j, temp);
									}
								}
							}
						});
						var bounds = this.computedTracksBounds(this.trackLines);
						if(bounds && this.map) {
							this.map.fitBounds(bounds);
						}
					}
				});
			},
			//返回查询设备组件
			backToQueryDevice() {
				this.currentPage = 1;
				this.isQueryDevice = true;
				this.devices = [];
			},
			/****
			 * 某设备轨迹定位
			 */
			locationTrack(index) {
				if(this.pageDevices && index >= 0 && index < this.pageDevices.length) {
					var code = this.pageDevices[index].label;
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
				}
			},
			//关闭定时器
			clearIntervalByLine(trackLine) {
				var interval = trackLine && trackLine.interval;
				//关闭定时器
				if(interval) {
					clearInterval(interval);
				}
			},
			//清除对应的轨迹播放临时图层
			clearPlayTrackByLine(trackLine) {
				var tempTrackLayer = trackLine && trackLine.tempTrackLayer;
				var locationMarker = trackLine && trackLine.locationMarker;
				//清除临时轨迹线
				if(this.map && tempTrackLayer) {
					if(this.map.hasLayer(tempTrackLayer)) {
						this.map.removeLayer(tempTrackLayer);
					}
				}
				trackLine.tempTrackLayer = null;
				//清除定位点
				if(this.map && locationMarker) {
					if(this.map.hasLayer(locationMarker)) {
						this.map.removeLayer(locationMarker);
					}
				}
				trackLine.locationMarker = null;
				trackLine.curProgress = 0;
			},
			//查找出正在播放的轨迹
			findAllPlayTrackLines() {
				var len = this.devices ? this.devices.length : 0;
				var array = [];
				for(var i = 0; i < len; i++) {
					if(this.devices[i].isPlayTrack) {
						var code = this.devices[i].label;
						this.trackLines && this.trackLines.forEach(item => {
							if(item.code == code) {
								array.push(item);
							}
						})
					}
				}
				return array;
			},
			//计算多个轨迹播放定位方式
			computePlayTracksLocation(locationMode) {
				var array = this.findAllPlayTrackLines();
				switch(locationMode) //定位方式
				{
					case 0: //以位置点为中心
						{
							var x1, y1, x2, y2 = 0;
							var bRet = false;
							array && array.forEach((item, index) => {
								var latLngs = item.getLatLngs();
								var curProgress = item.curProgress;
								if(latLngs && latLngs.length > 0 && curProgress != undefined && curProgress >= 0 && curProgress < latLngs.length) {
									if(latLngs[curProgress]) {
										bRet = true;
										if(index == 0) {
											x1 = x2 = latLngs[curProgress].lng;
											y1 = y2 = latLngs[curProgress].lat;
										} else {
											x1 = latLngs[curProgress].lng < x1 ? latLngs[curProgress].lng : x1;
											x2 = latLngs[curProgress].lng > x2 ? latLngs[curProgress].lng : x2;
											y1 = latLngs[curProgress].lat < y1 ? latLngs[curProgress].lat : y1;
											y2 = latLngs[curProgress].lat > y2 ? latLngs[curProgress].lat : y2;
										}
									}
								}
							})
							if(bRet) {
								var latlngT = L.latLng((y1 + y2) * 0.5, (x1 + x2) * 0.5);
								if(this.params.option.publicMap.isCustomService) //自定义底图服务
								{
									this.map.panTo(latlngT, {
										animate: true
									});
								} else {
									this.map.flyTo(latlngT);
								}
							}
							break;
						}
					case 1: //以轨迹范围居中
						{
							var bounds = null;
							array && array.forEach((item, index) => {
								var temp = new L.LatLngBounds(item.getBounds().getSouthWest(), item.getBounds().getNorthEast());
								if(!bounds) {
									bounds = temp;
								} else {
									bounds = bounds.extend(temp);
								}
							})
							if(bounds) {
								this.map.fitBounds(bounds);
							}
							break;
						}
					case 2: //不聚集，当位置所有轨迹播放点不在当前范围内时，移动到此点中心
						{
							var x1, y1, x2, y2 = 0;
							var tempList = [];
							var bRet = false;
							array && array.forEach((item, index) => {
								var latLngs = item.getLatLngs();
								var curProgress = item.curProgress;
								if(latLngs && latLngs.length > 0 && curProgress != undefined && curProgress >= 0 && curProgress < latLngs.length) {
									if(latLngs[curProgress]) {
										bRet = true;
										if(index == 0) {
											x1 = x2 = latLngs[curProgress].lng;
											y1 = y2 = latLngs[curProgress].lat;
										} else {
											x1 = latLngs[curProgress].lng < x1 ? latLngs[curProgress].lng : x1;
											x2 = latLngs[curProgress].lng > x2 ? latLngs[curProgress].lng : x2;
											y1 = latLngs[curProgress].lat < y1 ? latLngs[curProgress].lat : y1;
											y2 = latLngs[curProgress].lat > y2 ? latLngs[curProgress].lat : y2;
										}
										tempList.push(latLngs[curProgress]);
									}
								}
							})
							var boundsT = this.map.getBounds();
							var len = tempList ? tempList.length : 0;
							var bContain = false;
							for(var i = 0; i < len; i++) {
								if(boundsT && boundsT.contains(tempList[i])) {
									bContain = true;
									break;
								}
							}
							if(!bContain) {
								if(bRet) {
									var latlngT = L.latLng((y1 + y2) * 0.5, (x1 + x2) * 0.5);
									if(this.params.option.publicMap.isCustomService) //自定义底图服务
									{
										this.map.panTo(latlngT, {
											animate: true
										});
									} else {
										this.map.flyTo(latlngT);
									}
								}
							}
							break;
						}
				}
			},
			//播放轨迹，改成支持多条轨迹线播放
			play(item, index) {
				var code = item.label;
				var speed = this.playTrackConfig.speed;
				var locationMode = this.playTrackConfig.locationMode;
				var trackLine = this.findTrackLineByCode(code);
				if(!trackLine) {
					this.$message({
						message: this.$t('message.no_track_data'),
						type: 'warning'
					});
					return;
				}
				this.clearIntervalByLine(trackLine);
				this.clearPlayTrackByLine(trackLine);
				var interval = trackLine.interval;
				//this.initDevicesState();
				var _self = this;
				var tempDevice = this.pageDevices[index];
				tempDevice.isPlayTrack = true;
				this.$set(this.pageDevices, index, tempDevice);
				var drawTrack = function() {
					var curProgress = trackLine.curProgress;
					var latLngs = trackLine.getLatLngs();
					var len = latLngs ? latLngs.length : 0;
					if(curProgress == undefined) {
						curProgress = 0;
					}
					if(len > 0 && curProgress < len) {
						var curLatLng = null;
						var nextLatLng = null;
						var angle = 0; //旋转角度
						curLatLng = latLngs[curProgress];
						if(curProgress + 1 < len) {
							nextLatLng = latLngs[curProgress + 1];
						} else {
							curLatLng = latLngs[curProgress - 1];
							nextLatLng = latLngs[curProgress];
						}
						if(curLatLng.lat == nextLatLng.lat && curLatLng.lng == nextLatLng.lng) {
							trackLine.curProgress++;
							return;
						}
						angle = computeSegmentHeading(_self.map.project(curLatLng), _self.map.project(nextLatLng)) - 90;
						var icon = createIcon(trackLine.type, true);
						var dataTemp = {};
						dataTemp["code"] = trackLine.code;
						dataTemp["time"] = trackLine.times[curProgress];
						dataTemp["lat"] = latLngs[curProgress].lat;
						dataTemp["lng"] = latLngs[curProgress].lng;
						dataTemp["type"] = getCarLabelByKey(trackLine.type);
						//添加图标
						if(trackLine.locationMarker == null) {
							trackLine.locationMarker = L.marker(latLngs[curProgress], {
								rotationAngle: angle, ////repsone.data.angle + 180,
								icon: icon
							}).addTo(_self.map).bindPopup(getContentPosition(dataTemp, _self));
						} else {
							trackLine.locationMarker.setLatLng(latLngs[curProgress]).bindPopup(getContentPosition(dataTemp, _self));
							trackLine.locationMarker.setRotationAngle(angle);
						}
						//						trackLine.locationMarker.on('popupclose',()=>{
						//							console.log("AA ");
						//							trackLine.closepopup=true;
						//						})
						//						//添加图标
						//						if(trackLine.locationMarker != null) {
						//							_self.map.removeLayer(trackLine.locationMarker);
						//							trackLine.locationMarker = null;
						//						}
						//						//Marker水平图标
						//						trackLine.locationMarker = L.marker(latLngs[curProgress], {
						//							rotationAngle: angle, ////repsone.data.angle + 180,
						//							icon: icon
						//						}).addTo(_self.map).bindPopup(getContentPosition(dataTemp)).openPopup();
						//						trackLine.locationMarker._popup && trackLine.locationMarker._popup.on("popupclose ",_self.test)
						//						
						if(trackLine.tempTrackLayer == null) {
							trackLine.tempTrackLayer = new L.Polyline(latLngs[curProgress], playtrackLineStyle);
							trackLine.tempTrackLayer.addLatLng(latLngs[curProgress]);
							trackLine.tempTrackLayer.addTo(_self.map);
						} else {
							trackLine.tempTrackLayer.addLatLng(latLngs[curProgress]);
						}
						trackLine.tempTrackLayer.code = trackLine.code;
						//_self.computePlayTracksLocation(locationMode);
						
						//						switch(locationMode) //定位方式
						//						{
						//							case 0: //以位置点为中心
						//								{
						//									var latlngT = latLngs[curProgress];
						//									if(_self.params.option.publicMap.isCustomService) //自定义底图服务
						//									{
						//										_self.map.panTo(latlngT, {
						//											animate: true
						//										});
						//									} else {
						//										_self.map.flyTo(latlngT);
						//									}
						//									break;
						//								}
						//							case 1: //以轨迹范围居中
						//								{
						//									_self.map.fitBounds(trackLine.getBounds());
						//									break;
						//								}
						//							case 2: //不聚集，当位置点不在当前范围内时，移动到此点
						//								{
						//									var latlngT = latLngs[curProgress];
						//									//不在地图范围内移至到地图中心
						//									if(!_self.map.getBounds().contains(latlngT)) {
						//										if(_self.params.option.publicMap.isCustomService) //自定义底图服务
						//										{
						//											_self.map.panTo(latlngT, {
						//												animate: true
						//											});
						//										} else {
						//											_self.map.flyTo(latlngT);
						//										}
						//									}
						//
						//									break;
						//								}
						//						}
						trackLine.curProgress++;
					} else {
						//_self.clearInterval();
						//_self.clearPlayTrack();
						_self.clearIntervalByLine(trackLine);
						_self.clearPlayTrackByLine(trackLine);
						var tempDevice = _self.devices[index];
						tempDevice.isPlayTrack = false;
						_self.$set(_self.devices, index, tempDevice);
					}
				}
				var latLngs = trackLine.getLatLngs();
				var len = latLngs ? latLngs.length : 0;
				var latlng = len > 0 ? latLngs[0] : null;
				if(latlng) {
					//地图移动到起点位置
					if(_self.params.option.publicMap.isCustomService) //自定义底图服务
					{
						_self.map.panTo(latlng, {
							animate: true
						});
					} else {
						_self.map.flyTo(latlng);
					}
				}
				trackLine.interval = setInterval(drawTrack, speed);
			},
			initDevicesState() {
				var len = this.pageDevices ? this.pageDevices.length : 0;
				for(var i = 0; i < len; i++) {
					var temp = this.pageDevices[i];
					temp.isPlayTrack = false;
					this.$set(this.pageDevices, i, temp);
				}
			},
			//停止
			stop(index) {
				if(index != undefined) {
					var len = this.pageDevices ? this.pageDevices.length : 0;
					if(index >= 0 && index < len /*&& this.tempTrackLayer*/ ) {
						var code = this.pageDevices[index].label;
						var trackLine = this.findTrackLineByCode(code);
						var tempDevice = this.pageDevices[index];
						tempDevice.isPlayTrack = false;
						this.$set(this.pageDevices, index, tempDevice);
						this.clearIntervalByLine(trackLine);
						this.clearPlayTrackByLine(trackLine);
					}
				} else {
					this.initDevicesState();
					this.trackLines && this.trackLines.forEach(item => {
						this.clearIntervalByLine(item);
						this.clearPlayTrackByLine(item);
					})
				}
			}
		},
		components: {
			TrackPlaySet,
			VueSlider
		},
		computed: {
			heightStyle3() {
				var ret = this.isRight;
				var height1= 0;
				if(ret) {
					height1 = 37;
				} else {
					height1 = 149;
				}
				//var height = this.$refs.trackdiv && this.$refs.trackdiv.offsetHeight; //100
				var len = this.devices && this.devices.length;
				if(len > 0) {
					var tempHeight = 0;
					tempHeight = this.total >= this.pageSize ? 44 : 0;
					if(tempHeight > 0) {
						this.bShowPage = true;
					} else {
						this.bShowPage = false;
					}
					return {
						"max-height": (this.height - 106 - height1 - tempHeight) + "px",
						"overflow": 'hidden auto'
					}
				} else {
					return {};
				}
			},
			...mapState([
				'spaceRestUrl',
				'maps'
			])
		}
	}
</script>

<style>
	.el-input-number {
		width: 100%;
	}
	
	.c-track-second-color {
		width: 90%;
		height: 20px;
		margin: 6px auto;
		cursor: pointer;
		/*margin-top: 8px;
        margin-left: 8px;
        float: left;*/
	}
	/*.tr-center {
		overflow: hidden;
	}
	
	.tr-center::-webkit-scrollbar {
		width: 4px;
		height: 4px;
	}
	
	.tr-center::-webkit-scrollbar-thumb {
		border-radius: 2px;
		-webkit-box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.2);
		background: #c0c4cc;
	}*/
</style>