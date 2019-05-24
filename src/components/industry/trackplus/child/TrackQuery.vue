<template>
	<div style="overflow: hidden;box-sizing: border-box;">
		<!--查询车辆  style="border-bottom: solid 1px #DCDEE3;" -->
		<div class="right-component-item-content item-list tr-center" v-if="isQueryDevice" :style="heightStyle2">
			<!--查询方式-->
			<!--<el-row class="right-component-item track-split-item" type="flex" align='middle'>
				<el-col :span="8">
					{{$t('Common.query_mode')}}
				</el-col>
			</el-row>
			<el-row class="right-component-item track-split-item" type="flex" align='middle'>
				<el-col :span="24">
					<el-select v-model="queryMode" :placeholder="$t('Common.select')" style="width: 100% !important;" @change="modeChange">
						<el-option v-for="item in queryModeList" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-col>
			</el-row>-->
			<div>
				<el-row class="right-component-item track-split-item" type="flex" align='middle'>
					<el-col :span="8">
						{{$t('Common.vehicle_number')}}
					</el-col>
				</el-row>
				<el-row class="right-component-item track-split-item" type="flex" align='middle'>
					<el-autocomplete popper-class="my-autocomplete" v-model="code" :fetch-suggestions="querySearch" :placeholder="$t('Common.input_vehicle_number')" @select="handleSelect" style="width: 100%;">
						<template slot-scope="{ item }">
							<div class="name">{{ item.id }}</div>
						</template>
					</el-autocomplete>
				</el-row>
			</div>
			<div>
				<el-row class="right-component-item track-split-item" type="flex" align='middle'>
					<el-col :span="8">
						{{$t('Common.draw_mode')}}
					</el-col>
				</el-row>
				<el-row class="right-component-item track-split-item" type="flex" align='middle'>
					<el-col :span="3" style="text-align: left;">
						<img src="../images/draw_rect.svg" style="width: 24px;height: auto;cursor: pointer; padding: 4px;" :title="$t('Common.draw_rectangle')" class="Num-pause-btn" :class="[isDrawRect?'draw-state':'undraw-state']" @click="drawRect">
					</el-col>
					<el-col :span="3" style="text-align: center;">
						<img src="../images/draw_poly.svg" style="width: 24px;height: auto;cursor: pointer;padding: 4px;" :title="$t('Common.draw_polygon')" class="Num-pause-btn" :class="[isDrawPoly?'draw-state':'undraw-state']" @click="drawPolygon">
					</el-col>
					<el-col :span="3" style="text-align: right;">
						<img src="../images/draw_clear.svg" style="width: 24px;height: auto;cursor: pointer;padding: 4px; " :title="$t('Common.clear')" class="Num-pause-btn" @click="clearDraw">
					</el-col>
				</el-row>
			</div>

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
					{{$t('Common.end_time')}}
				</el-col>
			</el-row>
			<el-row class="right-component-item track-split-item" type="flex" align='middle'>
				<el-col :span="24">
					<VueSlider v-model="curTime" :process-style="bprocessStyle" :data="times" style="margin-top: 20px;" :real-time="true"></VueSlider>
				</el-col>
			</el-row>
			<!--<el-row class="right-component-item track-split-item" type="flex" align='middle'>
				<el-col :span="24">
					<el-date-picker v-model="endTime" type="datetime" :placeholder="$t('Common.select_datetime')" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" style="width: 100% !important;">
					</el-date-picker>
				</el-col>
			</el-row>-->
			<CarType :checked-cars="cars" @changetype="handleChangeType"></CarType>
			<!--<el-row class="right-component-item split-item" type="flex" align='middle' v-if="!isCustom">
				<el-col :span="8">
					绘制范围
				</el-col>
				<el-col :span="16">
					<el-date-picker v-model="endTime" type="datetime" placeholder="选择日期时间" style="width: 100% !important;">
					</el-date-picker>
				</el-col>
			</el-row>-->
			<el-row class="right-component-item track-split-item track-split-item-line " type="flex" align='middle' justify="center">
				<el-col :span="8" style="text-align: center;">
					<el-button type="primary" plain size="small" @click="reset">{{$t('Common.reset')}}</el-button>
				</el-col>
				<el-col :span="8" style="text-align: center;">
					<el-button type="primary" plain size="small" @click="queryDevice">{{$t('Common.query')}}</el-button>
				</el-col>
			</el-row>
		</div>
		<!--车辆列表-->
		<div :style="heightStyle3" class="tr-center">
			<div class="right-component-item-content " v-if="!isQueryDevice">
				<div style="background-color: #FFF;padding: 0 4px;">
					<el-row class="right-component-item track-split-item" v-for="(lcc,index) in devices" :key="index" type="flex" align='middle' justify="center">
						<el-col :span="10" v-show="lcc.isQueryTrack">
							<el-checkbox style="font-size: 20px !important;" v-model="lcc.selected">{{lcc.label}}</el-checkbox>
						</el-col>
						<el-col :span="24" v-show="!lcc.isQueryTrack">
							<el-checkbox style="font-size: 20px !important;" v-model="lcc.selected">{{lcc.label}}</el-checkbox>
						</el-col>
						<el-col :span="14" v-show="lcc.isQueryTrack">
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
								<!--<el-col :span="4" style="text-align: center;">
									<img src="../images/setting.svg" style="width: 24px;height: auto;cursor: pointer;" title="设置" class="Num-pause-btn">
								</el-col>-->
							</el-row>
						</el-col>
					</el-row>
				</div>
			</div>
		</div>
		<div v-if="!isQueryDevice">
			<!--分页功能-->
			<div style="border-top: solid 1px #DCDEE3;padding: 1px 4px;" v-if="bShowPage">
				<el-row class="right-component-item track-split-item" type="flex" align='middle' justify="center" style="padding: 4px 12px;">
					<el-pagination :current-page="currentPage" @current-change="handleCurrentChange" :page-size="pageSize" layout="total, prev, pager, next" :total="total" :pager-count="5">
					</el-pagination>
				</el-row>
			</div>
			<div style="border-top: solid 1px #DCDEE3;padding: 1px 4px;" ref="trackdiv">
				<TrackPlaySet :playTrackConfig="playTrackConfig" @expand="handleExpand"></TrackPlaySet>
			</div>
			<div style="border-top: solid 1px #DCDEE3;padding: 4px 0px;">
				<el-row class="right-component-item track-split-item" type="flex" align='middle' justify="center">
					<!--<el-col :span="6" style="text-align: center;">
						<el-button type="primary" plain size="small" @click="backToQueryDevice">全选</el-button>
					</el-col>
					<el-col :span="6" style="text-align: center;">
						<el-button type="primary" plain size="small" @click="backToQueryDevice">反选</el-button>
					</el-col>-->
					<el-col :span="6" style="text-align: center;">
						<el-button type="primary" plain size="small" @click="selectAll">{{$t('Common.select_all')}}</el-button>
					</el-col>
					<el-col :span="6" style="text-align: center;">
						<el-button type="primary" plain size="small" @click="unselectAll">{{$t('Common.unselect_all')}}</el-button>
					</el-col>
					<el-col :span="6" style="text-align: center;">
						<el-button type="primary" plain size="small" @click="queryTrack">{{$t('Common.query')}}</el-button>
					</el-col>
					<el-col :span="6" style="text-align: center;">
						<el-button type="primary" plain size="small" @click="backToQueryDevice">{{$t('Common.back')}}</el-button>
					</el-col>
				</el-row>
			</div>
		</div>
	</div>
</template>

<script>
	import moment from 'moment'
	import * as turf from '@turf/turf'
	import VueSlider from 'vue-slider-component';
	import { createIcon, getContentPosition, computeSegmentHeading, getSpeedColor, createLineStyleBySpeed } from '../js/utils.js'
	import Resource from '../js/Resource.js'
	import { findCarTypeKeyByLabel, getCarLabelByKey, getCarTypeNameList } from '../js/carstype.js'
	import CarType from './CarType.vue'
	import TrackPlaySet from './TrackPlaySet.vue'
	import { mapState } from 'vuex'
	//	import service from '../../../../api/service.js'
	import { TRACK_QUERY_DEVICE_BY_BBOX, TRACK_QUERY, TRACK_QUERY_DEVICE_BY_GEOMETRY } from '../js/serviceapi.js'
	import { PageSize } from '../js/constants.js'
	import mixins from './mixins.js'
	const DATEFORMAT = "YYYY-MM-DD HH:mm:ss";
	//const PageSize = 20; //每页显示记录数
	const EVENT_TRACK_QUERY = "trackquery";
	const QueryModeList = [{
			label: "按车牌号查询",
			value: "querybycode"
		},
		{
			label: "按空间范围查询",
			value: "querybyspatial"
		}
	]
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
		message: "轨迹查询设置组件",
		name: "TrackQuery",
		props,
		mixins: [mixins],
		data() {
			return {
				curTime: '+8',
				//				times: ["01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00",
				//					"12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00", "24:00"
				//				],
				times: ["+1", "+2", "+3", "+4", "+5", "+6", "+7", "+8", "+9", "+10", "+11", "+12", "+13", "+14", "+15", "+16", "+17", "+18", "+19", "+20", "+21", "+22", "+23", "+24"],
				bShowPage: false, //显示分页组件
				pageSize: PageSize,
				total: 0,
				currentPage: 1, //当前页数
				isRight: false,
				//queryModeList: QueryModeList,
				queryMode: 'querybycode',
				cars: getCarTypeNameList(),
				code: '', //车牌编号关键字
				startTime: '',
				endTime: '',
				boxs: [], //范围数组
				isQueryDevice: true,
				devices: [], //查询的设备结果
				trackLines: [],
				markers: [],
				tipMarkers: [], //提示进入和离开时间，空间查询时
				playTrackConfig: {
					speed: 300, //播放速度
					locationMode: 2 //定位方式
				}, //轨迹播放参数
				tempTrackLayer: null, //当前已播放的轨迹
				locationMarker: null, //当前播放轨迹的位置
				curProgress: 0, //当前播放的进度 
				drawHandler: null, //绘制类型
				tempDrawLayer: null, //绘制结果图层
				drawType: '',
				infoControl: null
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
		},
		methods: {
			//处理tooltipMarkers是否显示
			mapViewChange() {
				if(this.map && this.map.getZoom() >= 12) {
					this.map && this.tipMarkers && this.tipMarkers.forEach(item => {
						this.map.removeLayer(item);
					})
					this.map && this.tipMarkers && this.tipMarkers.forEach(item => {
						this.map.addLayer(item);
					})
				} else {
					this.map && this.tipMarkers && this.tipMarkers.forEach(item => {
						this.map.removeLayer(item);
					})
				}
			},
			modeChange() {
				this.clearDrawTempLayer();
				this.map && this.tipMarkers && this.tipMarkers.forEach(item => {
					this.map.removeLayer(item);
				})
				this.tipMarkers = [];
			},
			selectAll() {
				this.devices && this.devices.forEach(item => {
					item.selected = true;
				})
			},
			unselectAll() {
				this.devices && this.devices.forEach(item => {
					item.selected = false;
				})
			},
			handleCurrentChange(val) {
				this.currentPage = val;
				this.queryDevice();
			},
			handleExpand(pv) {
				this.isRight = pv;
			},
			drawEvent(e) {
				var type = e.layerType,
					layer = e.layer;
				if(this.tempDrawLayer && this.map && this.map.hasLayer(this.tempDrawLayer)) {
					this.map.removeLayer(this.tempDrawLayer);
				}
				this.tempDrawLayer = layer;
				if(this.tempDrawLayer && this.map) {
					this.map.addLayer(this.tempDrawLayer);
				}
				this.map && this.map.off(L.Draw.Event.CREATED, this.drawEvent);
				this.tempDrawLayer.drawType = this.drawType;
				this.drawType = "";

			},
			//绘制矩形
			drawRect() {
				this.clearDrawTempLayer();
				if(this.map) {
					this.drawHandler = new L.Draw.Rectangle(this.map, {
						shapeOptions: {
							stroke: true,
							color: 'red',
							weight: 4,
							opacity: 0.5,
							fill: true,
							fillColor: "orange", //same as color by default
							fillOpacity: 0.2,
							clickable: true
						}
					});
					this.drawType = 'rectangle';
					this.drawHandler.enable();
					this.map && this.map.off(L.Draw.Event.CREATED, this.drawEvent);
					this.map && this.map.on(L.Draw.Event.CREATED, this.drawEvent);
				}
			},
			//绘制多边形
			drawPolygon() {
				this.clearDrawTempLayer();
				if(this.map) {
					this.drawHandler = new L.Draw.Polygon(this.map, {
						//						zIndexOffset: 10000,
						shapeOptions: {
							stroke: true,
							color: 'red',
							weight: 4,
							opacity: 0.5,
							fill: true,
							fillColor: "orange", //same as color by default
							fillOpacity: 0.2,
							clickable: true
						}
					});
					this.drawType = 'polygon';
					this.drawHandler.enable();
					this.map && this.map.off(L.Draw.Event.CREATED, this.drawEvent);
					this.map && this.map.on(L.Draw.Event.CREATED, this.drawEvent);
				}
			},
			//清除绘制
			clearDraw() {
				this.clearDrawTempLayer();
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
			handleChangeType(pv) {
				this.cars = pv;
			},
			//返回查询设备组件
			backToQueryDevice() {
				this.currentPage = 1;
				this.isQueryDevice = true;
				this.devices = [];
				//this.clearDrawTempLayer();
				//this.tempDrawLayer = null;
			},
			//清除图层和释放资源
			clearAllayers() {
				this.stop();
				this.removeLayers();
				this.trackLines = [];
				this.markers = [];
				//this.clearDrawTempLayer();
			},
			//移除图层
			removeLayers() {
				if(this.map) {
					this.trackLines && this.trackLines.forEach(item => {
						this.map.removeLayer(item);
					})
					this.markers && this.markers.forEach(item => {
						this.map.removeLayer(item);
					})
					this.tipMarkers && this.tipMarkers.forEach(item => {
						this.map.removeLayer(item);
					})
					this.tipMarkers = [];
				}
			},
			//清除绘制临时图层
			clearDrawTempLayer() {
				if(this.tempDrawLayer && this.map && this.map.hasLayer(this.tempDrawLayer)) {
					this.map.removeLayer(this.tempDrawLayer);
				}
				this.tempDrawLayer = null;
				this.drawHandler && this.drawHandler.disable();
				this.drawHandler = null;
				this.drawType = "";
			},
			//查询轨迹
			queryTrack() {
				var codes = [];
				this.devices && this.devices.forEach((item) => {
					if(item.selected) {
						codes.push(item.label);
					}
				});
				if(!codes || codes.length == 0) {
					this.$message.warning(this.$t('message.select_vehicle'));
					return false;
				}
				this.computeDateTime();
				if(!this.startTime || !this.endTime) {
					this.$message.warning(this.$t('message.set_query_time'));
					return false;
				}
				var data = {
					id: codes,
					begin: this.startTime,
					end: this.endTime
				}
				this.$emit(EVENT_TRACK_QUERY);
				var index = this.params.dataConfig.dsId;
				var url = this.spaceRestUrl + TRACK_QUERY + index;
				var headers = {
					'Content-Type': 'text/plain;charset=utf-8'
				};
				this.$post(url, data, headers).then(response => {
					this.clearAllayers();
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
					var count22 = this.devices ? this.devices.length : 0;
					var devicesLen = this.devices ? this.devices.length : 0;
					for(var i = 0; i < devicesLen; i++) {
						var temp = this.devices[i];
						if(temp.isQueryTrack) {
							temp.isQueryTrack = false;
							temp.isPlayTrack = false;
							this.$set(this.devices, i, temp);
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
							//							if(this.queryMode == 'querybyspatial') //空间范围查询时，分析进入和离开时间
							//							{
							//								
							//							}
							var datajson = this.tempDrawLayer && this.tempDrawLayer.toGeoJSON();
							var coords = datajson && datajson.geometry && datajson.geometry.coordinates;
							this.computeTrackInfoForRegion(polyLine, coords);
							if(devicesLen > 0) {
								for(var i = 0; i < devicesLen; i++) {
									if(this.devices[i].label == code) {
										var temp = this.devices[i];
										temp.isQueryTrack = true;
										this.$set(this.devices, i, temp);
									}
								}
							}
						});
						this.mapViewChange();
						var bounds = this.computedTracksBounds(this.trackLines);
						if(bounds && this.map) {
							this.map.fitBounds(bounds);
						}
					}
				});
			},
			convertToCoords(latlngs) {
				var array = [];
				latlngs && latlngs.forEach(item => {
					array.push([item.lng, item.lat]);
				})
				return array;
			},

			/***
			 * 判断轨迹点进入和离开区域的时刻点
			 * @parmas polyline  表示L.PolyLine
			 * @parmas coords  表示Array
			 */
			computeTrackInfoForRegion(polyline, coords) {
				var points = polyline && polyline.getLatLngs();
				var times = polyline && polyline.times;
				var count = points ? points.length : 0;
				var intersects = null;
				if(count > 1 && times && coords) {
					var polygon = turf.polygon(coords);
					var line1 = turf.lineString(this.convertToCoords(points));
					intersects = turf.lineIntersect(line1, polygon);
					var features = intersects && intersects.features;
					if(!this.tipMarkers) {
						this.tipMarkers = [];
					}
					var code = polyline.code;
					var icon = L.icon({
						iconUrl: Resource.marker_icon,
						iconSize: [25, 41],
						iconAnchor: [12, 41],
						popupAnchor: [1, -34],
						tooltipAnchor: [16, -28],
						shadowSize: [41, 41]
					});
					features && features.forEach((item, index) => {
						var coords = item.geometry && item.geometry.coordinates ? item.geometry.coordinates : null;
						if(coords) {
							var marker = L.marker([coords[1], coords[0]], {
								icon: icon
							}); //.addTo(this.map);
							this.tipMarkers.push(marker);
							var pt = turf.point([coords[0], coords[1]]);
							for(var i = 0; i < count - 1; i++) {
								var array = [];
								var p1 = turf.point([points[i].lng, points[i].lat]);
								var p2 = turf.point([points[i + 1].lng, points[i + 1].lat]);
								array.push([points[i].lng, points[i].lat], [points[i + 1].lng, points[i + 1].lat]);
								var line = turf.lineString(array);
								//var isPointOnLine = turf.booleanPointOnLine(pt, line); //是否在线上判断
								//var isPointOnLine = L.SE.UtilTool.isPointNearestOnLine(points[i].lng, points[i].lat, points[i + 1].lng, points[i + 1].lat, coords[0], coords[1], 1.0E-9);
								var isPointOnLine = L.SpatialRelationship.IsPointNearLinesect(points[i].lng, points[i].lat, points[i + 1].lng, points[i + 1].lat, coords[0], coords[1], 1.0E-9);
								if(isPointOnLine) //在线上
								{
									var localTime = times[i];
									var time = moment(localTime * 1000).format('YYYY-MM-DD HH:mm:ss');
									var bRet = turf.booleanPointInPolygon(p1, polygon);
									if(bRet) //在面内
									{
										marker.bindTooltip(code + " " + this.$t('Common.leave_time') + time, {
											permanent: true,
											direction: 'top',
											offset: [0, -10]
										});
									} else {
										marker.bindTooltip(code + " " + this.$t('Common.enter_time') + time, {
											permanent: true,
											direction: 'top',
											offset: [0, -10]
										});
									}
									break;
								}
							}
						}
					})
				}
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
			queryDevice() {
				//				if(this.queryMode == "querybycode") //按照车牌号查询
				//				{
				//					this.queryCarsByKeyAndTims();
				//				} else {
				//					this.queryCarsBySpatialAndTims();
				//				}
				this.queryCarsBySpatialAndTims();
			},
			//计算时间
			computeDateTime() {
				if(this.times.indexOf(this.curTime) >= 0) {
					var index = this.times.indexOf(this.curTime);
					var startTime = moment(this.startTime, DATEFORMAT);
					var endTime = startTime.add(index + 1, 'hours');
					this.endTime = endTime.format(DATEFORMAT);
				}
			},
			//按照车牌号和时间以及类型查询车辆，支持模糊查询
			queryCarsByKeyAndTims() {
				if(!this.code) {
					this.$message.warning(this.$t('message.input_vehicle_number'));
					return false;
				}
				this.computeDateTime();
				if(!this.startTime || !this.endTime) {
					this.$message.warning(this.$t('message.set_query_time'));
					return false;
				}
				var array = [];
				this.cars && this.cars.forEach(item => {
					array.push(findCarTypeKeyByLabel(item));
				})
				var data = {
					key: this.code,
					type: array,
					begin: this.startTime,
					end: this.endTime,
					size: this.pageSize,
					page: this.currentPage - 1
				};
				var index = this.params.dataConfig.dsId;
				var url = this.spaceRestUrl + TRACK_QUERY_DEVICE_BY_BBOX + index;
				var headers = {
					'Content-Type': 'text/plain;charset=utf-8'
				};
				this.$post(url, data, headers).then(response => {
					this.devices = [];
					var info = response.info;
					var infos = info && info.item ? info.item : null;
					var len = infos ? infos.length : 0;
					if(len > 0) {
						this.isQueryDevice = false;
					} else {
						this.$message.warning(this.$t('message.no_query_results'));
						return false;
					}
					var r, g, b;
					this.total = info && info.data_count != undefined ? info.data_count : 0;
					for(var i = 0; i < len; i++) {
						r = Math.floor(Math.random() * 256);
						g = Math.floor(Math.random() * 256);
						b = Math.floor(Math.random() * 256);
						this.devices.push({
							'label': infos[i].id,
							"type": infos[i].type,
							'color': "rgba(" + r + "," + g + "," + b + ",1)",
							'tof': false,
							'selected': false,
							'isQueryTrack': false,
							'isPlayTrack': false, //true表示正在播放轨迹
						});
					}
				}).catch(error => {
					this.$message.error(this.$t('message.server_error'));
				});
			},
			//按照空间和时间以及类型查询车辆，支持模糊查询
			queryCarsBySpatialAndTims() {
				if(!this.code && !this.tempDrawLayer) {
					this.$message.warning(this.$t('message.set_query_conditions'));
					return false;
				}
				//				if(!this.code) {
				//					this.$message.warning(this.$t('message.input_vehicle_number'));
				//					return false;
				//				}
				//				if(!this.tempDrawLayer) {
				//					this.$message.warning(this.$t('message.draw_area'));
				//					return false;
				//				}
				this.computeDateTime();
				if(!this.startTime || !this.endTime) {
					this.$message.warning(this.$t('message.set_query_time'));
					return false;
				}
				var array = [];
				this.cars && this.cars.forEach(item => {
					array.push(findCarTypeKeyByLabel(item));
				})
				var data = {
					key: this.code,
					type: array,
					begin: this.startTime,
					end: this.endTime,
					size: this.pageSize,
					page: this.currentPage - 1
				};
				var index = this.params.dataConfig.dsId;
				var url = "";
				if(this.tempDrawLayer) {
					if(this.tempDrawLayer.drawType == "rectangle") //Box查询
					{
						var bounds = this.tempDrawLayer.getBounds();
						var box = {
							minx: bounds.getWest(),
							maxx: bounds.getEast(),
							miny: bounds.getSouth(),
							maxy: bounds.getNorth()
						};
						data.bbox = [box];
						url = this.spaceRestUrl + TRACK_QUERY_DEVICE_BY_BBOX + index;
					} else //多边形查询
					{
						var datajon = this.tempDrawLayer.toGeoJSON();
						var geometry = datajon && datajon.geometry;
						data.geometry = [geometry];
						url = this.spaceRestUrl + TRACK_QUERY_DEVICE_BY_GEOMETRY + index;
					}
				} else {
					url = this.spaceRestUrl + TRACK_QUERY_DEVICE_BY_BBOX + index;
				}
				var headers = {
					'Content-Type': 'text/plain;charset=utf-8'
				};
				this.$post(url, data, headers).then(response => {
					this.devices = [];
					var info = response.info;
					var infos = info && info.item ? info.item : null;
					var len = infos ? infos.length : 0;
					if(len > 0) {
						this.isQueryDevice = false;
					} else {
						this.$message.warning(this.$t('message.no_query_results'));
						return false;
					}
					this.total = info && info.data_count != undefined ? info.data_count : 0;
					var r, g, b;
					for(var i = 0; i < len; i++) {
						r = Math.floor(Math.random() * 256);
						g = Math.floor(Math.random() * 256);
						b = Math.floor(Math.random() * 256);
						this.devices.push({
							'label': infos[i].id,
							"type": infos[i].type,
							'color': "rgba(" + r + "," + g + "," + b + ",1)",
							'tof': false,
							'selected': false,
							'isQueryTrack': false,
							'isPlayTrack': false, //true表示正在播放轨迹
						});
					}
				});
			},
			/****
			 * 某设备轨迹定位
			 */
			locationTrack(index) {
				if(this.devices && index >= 0 && index < this.devices.length) {
					var code = this.devices[index].label;
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
			reset() {
				this.map && this.map.off(L.Draw.Event.CREATED, this.drawEvent);
				this.currentPage = 1;
				this.startTime = '';
				this.endTime = '';
				this.code = "";
				this.queryMode = 'querybycode';
				this.isQueryDevice = true;
				this.devices = []; //查询的设备结果
				this.clearAllayers();
				this.stop();
				this.clearDrawTempLayer();
				this.tempDrawLayer = null;
				this.cars = getCarTypeNameList();
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
			//关闭定时器
			clearInterval() {
				//关闭定时器
				if(this.interval) {
					clearInterval(this.interval);
				}
			},
			//清除播放轨迹的图层等信息
			clearPlayTrack() {
				//清除临时轨迹线
				if(this.map && this.tempTrackLayer) {
					if(this.map.hasLayer(this.tempTrackLayer)) {
						this.map.removeLayer(this.tempTrackLayer);
					}
				}
				this.tempTrackLayer = null;
				//清除定位点
				if(this.map && this.locationMarker) {
					if(this.map.hasLayer(this.locationMarker)) {
						this.map.removeLayer(this.locationMarker);
					}
				}
				this.locationMarker = null;
				this.curProgress = 0;
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
				var features = trackLine && trackLine.features;
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
				//清除车速图层
				if(this.map && features) {
					if(this.map.hasLayer(features)) {
						this.map.removeLayer(features);
					}
				}
				trackLine.features = null;
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
			/****
			 * 根据轨迹线计算出速度图层
			 */
			computTrackLinesSpeedGroupLayer(trackLine) {
				if(trackLine) {
					var features = null;
					if(trackLine.features != undefined) {
						features = trackLine.features;
					}
					if(features && this.map && this.map.hasLayer(features)) {
						this.map.removeLayer(features);
					}
					var latLngs = trackLine.getLatLngs();
					var times = trackLine.times;
					var lines = [];
					var len = latLngs ? latLngs.length : 0;
					var splitcount = 20;
					var index = 0;
					for(var i = 0; i < len; i += (splitcount)) {
						var tempLatLngs = null;
						var tempTimes = null;
						tempLatLngs = latLngs.slice(i, i + splitcount);
						tempTimes = times.slice(i, i + splitcount);
						var count1 = tempLatLngs ? tempLatLngs.length : 0;
						var count2 = tempTimes ? tempTimes.length : 0;
						if(count1 > 0 && count2 > 0) {
							if(i > 0) {
								tempLatLngs.unshift(latLngs[i - 1]);
								tempTimes.unshift(times[i - 1]);
								count1 = tempLatLngs ? tempLatLngs.length : 0;
								count2 = tempTimes ? tempTimes.length : 0;
							}
							var totalLen = 0;
							for(var j = 0; j < count1 - 1; j++) {
								var sLoction = tempLatLngs[j];
								var eLocation = tempLatLngs[j + 1];
								var dlength = sLoction.distanceTo(eLocation); //距离
								totalLen += dlength;
							}
							var sTime = tempTimes[0];
							var eTime = tempTimes[count2 - 1];
							var dif = eTime - sTime;
							var d = (totalLen / 1000) / (dif / 3600);
							var poly = new L.Polyline(tempLatLngs, createLineStyleBySpeed(d));
							lines.push(poly);
						} else {
							console.log("computTrackLinesSpeedGroupLayer error！");
						}
						//index += splitcount;
					}
					features = L.featureGroup(lines);
					trackLine.features = features;
					if(features && this.map && features) {
						this.map.addLayer(features);
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
				this.computTrackLinesSpeedGroupLayer(trackLine);
				var interval = trackLine.interval;
				//this.initDevicesState();
				var _self = this;
				var tempDevice = this.devices[index];
				tempDevice.isPlayTrack = true;
				this.$set(this.devices, index, tempDevice);
				if(this.map && this.infoControl) {
					this.map.removeControl(this.infoControl);
				} else {
					this.infoControl = new L.SpeedInfoControl({
						title: this.$t('speed')
					});
				}
				this.infoControl.addTo(this.map);
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
						//							console.log("AA");
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
						//						trackLine.locationMarker._popup && trackLine.locationMarker._popup.on("popupclose",_self.test)
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
				var len = this.devices ? this.devices.length : 0;
				for(var i = 0; i < len; i++) {
					var temp = this.devices[i];
					temp.isPlayTrack = false;
					this.$set(this.devices, i, temp);
				}
			},
			//停止
			stop(index) {
				if(index != undefined) {
					var len = this.devices ? this.devices.length : 0;
					if(index >= 0 && index < len /*&& this.tempTrackLayer*/ ) {
						var code = this.devices[index].label;
						var trackLine = this.findTrackLineByCode(code);
						var tempDevice = this.devices[index];
						tempDevice.isPlayTrack = false;
						this.$set(this.devices, index, tempDevice);
						this.clearIntervalByLine(trackLine);
						this.clearPlayTrackByLine(trackLine);
					}
				} else {
					if(this.map && this.infoControl) {
						this.map.removeControl(this.infoControl);
						this.infoControl = null;
					}
					this.initDevicesState();
					this.trackLines && this.trackLines.forEach(item => {
						this.clearIntervalByLine(item);
						this.clearPlayTrackByLine(item);
					})
				}
			}
		},
		computed: {
			heightStyle3() {
				var ret = this.isRight;
				var height = 0;
				if(ret) {
					height = 37;
				} else {
					height = 149;
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
						"max-height": (this.height - 106 - height - tempHeight) + "px",
						"overflow": 'hidden auto'
					}
				} else {
					return {};
				}
			},
			heightStyle2() {
				if(this.isQueryDevice) {
					return {
						"height": (this.height - 52) + "px",
						"overflow": 'hidden auto'
					}
				} else {
					return {};
				}
			},
			isQueryByCodeMode() {
				return this.queryMode == "querybycode" ? true : false;
			},
			isQueryBySpatialMode() {
				return this.queryMode == "querybyspatial" ? true : false;
			},
			isDrawRect() {
				return this.drawType == "rectangle" ? true : false;
			},
			isDrawPoly() {
				return this.drawType == "polygon" ? true : false;
			},
			queryModeList() {
				QueryModeList.forEach(item => {
					item.label = this.$t(item.value);
				})
				return QueryModeList;
			},
			...mapState([
				'spaceRestUrl',
				'maps'
			])
		},
		components: {
			CarType,
			TrackPlaySet,
			VueSlider
		},
		watch: {
			playTrackConfig: {
				handler(newval, oldval) {
					console.log(newval);
				},
				deep: true
			}
		}
	}
</script>

<style scoped>
	/*.item-list {
		padding: 6px 0;
	}*/
	/*.split-item {
		padding: 4px 15px;
		overflow: hidden auto;
	}*/
	
	.c-track-second-color {
		width: 90%;
		height: 20px;
		margin: 6px auto;
		cursor: pointer;
		/*margin-top: 8px;
        margin-left: 8px;
        float: left;*/
	}
	
	.tr-center {
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
	}
	
	.undraw-state {
		border: 1px solid #F3F3F3;
	}
	
	.draw-state {
		/*border-color: #3a8ee6;*/
		border: 1px solid #3a8ee6;
		/*background-color: #409EFF;*/
	}
	
	.Num-pause-btn:hover {
		border-color: #3a8ee6;
	}
</style>