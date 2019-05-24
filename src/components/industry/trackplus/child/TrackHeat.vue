<template>
	<div class="right-component-item-content item-list">
		<div v-if="bGroupHeat">
			<el-row class="right-component-item track-split-item" type="flex" align='middle'>
				<el-col :span="8">
					{{$t('Common.select_date')}}
				</el-col>
			</el-row>
			<el-row class="right-component-item track-split-item" type="flex" align='middle'>
				<el-col :span="24">
					<el-date-picker v-model="curDate" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width: 100% !important;">
					</el-date-picker>
				</el-col>
			</el-row>
			<el-row class="right-component-item track-split-item" type="flex" align='middle'>
				<el-col :span="8">
					{{$t('Common.select_time')}}
				</el-col>
			</el-row>
			<el-row class="right-component-item track-split-item" type="flex" align='middle'>
				<el-col :span="24">
					<div style="display: flex;flex-direction: row;width: 100%;">
						<div v-show="bGroupHeat" style="margin-top: 20px;">
							<img v-if="isPlay" src="../images/play.svg" :title="$t('Common.play')" style="width: 22px;height: auto;cursor: pointer;" class="Num-pause-btn" @click="play">
							<img v-else src="../images/stop.svg" :title="$t('Common.play')" style="width: 22px;height: auto;cursor: pointer;" class="Num-pause-btn" @click="stop">
						</div>
						<VueSlider :process-style="bprocessStyle" v-model="curTime" :data="times" style="margin-top: 20px;flex:1;padding-left: 10px;padding-right: 10px;" :real-time="true" @drag-end="queryHeat"></VueSlider>
					</div>
				</el-col>
			</el-row>
			<el-row class="right-component-item track-split-item" type="flex" align='middle'>
				<el-col :span="8">
					{{$t('Common.vehicle_number')}}
				</el-col>
			</el-row>
			<el-row class="right-component-item track-split-item" type="flex" align='middle'>
				<el-autocomplete popper-class="my-autocomplete" v-model="code" :fetch-suggestions="querySearch" :placeholder="$t('Common.input_vehicle_number')" @select="handleSelect" style="width: 100%;" @change.native="queryHeat">
					<template slot-scope="{ item }">
						<div class="name">{{ item.id }}</div>
					</template>
				</el-autocomplete>
			</el-row>
			<CarType :checked-cars="cars" @changetype="handleChangeType"></CarType>
			<el-row class="right-component-item track-split-item" type="flex" align='middle'>
				<el-col :span="8">
					{{$t('Common.legend')}}
				</el-col>
			</el-row>
			<el-row class="right-component-item track-split-item" type="flex" align='middle'>
				<el-col :span="24">
					<VueSlider v-model="value" :process-style="bprocessStyle" style="margin-top: 20px;" :min="min" :max="max" :interval="interval" :real-time="real" @drag-end="drawLocalHeat"></VueSlider>
				</el-col>
			</el-row>
			<el-row class="right-component-item track-split-item" type="flex" align='middle' style="padding: 8px 22px">
				<el-col :span="6" v-for="(value, index) in gradient" :key="index">
					<div :style="{height: '10px',backgroundColor: value}">

					</div>
				</el-col>
			</el-row>
			<el-row class="right-component-item track-split-item" type="flex" align='middle' style="padding: 8px 22px">
				<el-col :span="6" v-for="(value, key) in breakValues" :key="key" style="text-align: center;">
					{{value}}
				</el-col>
			</el-row>
			<!--绘制范围-->
			<el-row class="right-component-item track-split-item" type="flex" align='middle'>
				<el-col :span="8">
					{{$t('Common.draw_region')}}
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
		<!--单体热力图-->
		<div v-else>
			<el-row class="right-component-item track-split-item" type="flex" align='middle'>
				<el-col :span="8">
					{{$t('Common.select_date')}}
				</el-col>
			</el-row>
			<el-row class="right-component-item track-split-item" type="flex" align='middle'>
				<el-col :span="24">
					<el-date-picker v-model="curDate2" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width: 100% !important;" @change="queryDensity">
					</el-date-picker>
				</el-col>
			</el-row>
			<el-row class="right-component-item track-split-item" type="flex" align='middle'>
				<el-col :span="8">
					{{$t('Common.end_time')}}
				</el-col>
			</el-row>
			<el-row class="right-component-item track-split-item" type="flex" align='middle'>
				<el-col :span="24">
					<VueSlider :process-style="bprocessStyle" v-model="curTime2" :data="times2" style="margin-top: 20px;flex:1;padding-left: 10px;padding-right: 10px;" :real-time="true" @drag-end="queryDensity"></VueSlider>
				</el-col>
			</el-row>
			<!--<el-row class="right-component-item track-split-item" type="flex" align='middle'>
				<el-col :span="8">
					{{$t('Common.legend')}}
				</el-col>
			</el-row>
			<el-row class="right-component-item track-split-item" type="flex" align='middle'>
				<el-col :span="24">
					<VueSlider v-model="value2" :process-style="bprocessStyle" style="margin-top: 20px;" :min="min2" :max="max2"  :real-time="real" ></VueSlider>
				</el-col>
			</el-row>
			<el-row class="right-component-item track-split-item" type="flex" align='middle' style="padding: 8px 22px">
				<el-col :span="6" v-for="(value, index) in gradient" :key="index">
					<div :style="{height: '10px',backgroundColor: value}">

					</div>
				</el-col>
			</el-row>
			<el-row class="right-component-item track-split-item" type="flex" align='middle' style="padding: 8px 22px">
				<el-col :span="6" v-for="(value, key) in breakValues" :key="key" style="text-align: center;">
					{{value}}
				</el-col>
			</el-row>-->
		</div>
		<!--查询结果-->
		<div style="background-color:#F3F3F3 ; border-top: solid 1px #DCDEE3;padding: 1px 0px;overflow: hidden;" v-if="!bGroupHeat">
			<div :style="heightStyle3" class="tr-center">
				<el-row class="right-component-item track-split-item" v-for="(lcc,index) in devices" :key="index" type="flex" align='middle' justify="center">
					<el-col :span="10" v-show="lcc.isQueryTrack">
						<el-checkbox style="font-size: 20px !important;" v-model="lcc.selected">{{lcc.label}}</el-checkbox>
					</el-col>
					<el-col :span="24" v-show="!lcc.isQueryTrack">
						<el-checkbox style="font-size: 20px !important;" v-model="lcc.selected">{{lcc.label}}</el-checkbox>
					</el-col>
					<!--<el-col :span="14" v-show="lcc.isQueryTrack">
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
					</el-col>-->
				</el-row>
			</div>
			<!--分页功能-->
			<div style="border-top: solid 1px #DCDEE3;padding: 1px 4px;" v-if="bShowPage">
				<el-row class="right-component-item track-split-item" type="flex" align='middle' justify="center" style="padding: 4px 12px;">
					<el-pagination :current-page="currentPage" @current-change="handleCurrentChange" :page-size="pageSize" layout="total, prev, pager, next" :total="total" :pager-count="5">
					</el-pagination>
				</el-row>
			</div>
			<div style="border-top: solid 1px #DCDEE3;padding: 0px 0px;">
				<el-row class="right-component-item track-split-item" type="flex" align='middle' justify="center">
					<el-col :span="12" style="text-align: center;">
						<el-button type="primary" plain size="small" @click="queryDensity">{{$t('Common.query')}}</el-button>
					</el-col>
					<el-col :span="12" style="text-align: center;">
						<el-button type="primary" plain size="small" @click="backToQueryDevice">{{$t('Common.back')}}</el-button>
					</el-col>
				</el-row>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState } from 'vuex'
	import moment from 'moment'
	import { findCarTypeKeyByLabel, getCarLabelByKey, getCarTypeNameList } from '../js/carstype.js'
	import { HEAT_QUERY, TRACK_QUERY_DEVICE_BY_BBOX, TRACK_QUERY, TRACK_QUERY_DEVICE_BY_GEOMETRY, HEAT_QUERY_DENSITY } from '../js/serviceapi.js'
	import CarType from './CarType.vue'
	import VueSlider from 'vue-slider-component';
	import { PageSize } from '../js/constants.js'
	import mixins from './mixins.js'
	const EVENT_TRACK_HEAT = "trackheat";
	const DATEFORMAT = "YYYY-MM-DD HH:mm";
	const DATEFORMAT2 = "YYYY-MM-DD HH:mm:ss";
	const SPLIT = 1; //1小时间隔
	const GRID_SIZE = 100;
	const INTERVAL_TIME = 1000; //定时器间隔
	const props = {
		mapObj: {
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
		message: "轨迹热力分析",
		name: "TrackHeat",
		props,
		mixins: [mixins],
		data() {
			return {
				map: this.mapObj,
				real: true,
				code: '', //车牌编号关键字
				isPlay: true, //播放状态
				bShowPage: false, //显示分页组件
				bGroupHeat: true, //true表示群体热力图，false表示单体热力图
				devices: [],
				pageSize: PageSize, //每页数量
				total: 0,
				currentPage: 1, //当前页数
				drawHandler: null, //绘制类型
				tempDrawLayer: null, //绘制结果图层
				drawType: '',
				min: 5000,
				max: 500000,
				value: 80000,
				interval: 5000,
				timeInterval: null, //定时器
				curDate: '2018-08-31',
				curTime: '08:00',
				times: ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00",
					"12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"
				],
				cars: getCarTypeNameList(), //被选中的车类型
				pickOptions: {
					start: '00:00',
					step: '00:60',
					end: '23:00'
				},
				gradient: ["rgb(0,0,255)", "rgb(0,255,0)", "yellow", 'rgb(255,0,0)'],
				heatmapLayer: null, //热力图层
				heatData: {},
				curDate2: '2018-08-31',
				curTime2: '+8',
				times2: ["+1", "+2", "+3", "+4", "+5", "+6", "+7", "+8", "+9", "+10", "+11", "+12", "+13", "+14", "+15", "+16", "+17", "+18", "+19", "+20", "+21", "+22", "+23", "+24"],
				min2: 10,
				max2: 1000,
				value2: 180,
			}
		},
		mounted() {
			this.$nextTick(() => {
				this.map=this.mapObj;
				this.curDate = '2018-08-31';
				this.curTime = '08:00';
			});
		},
		activated() {
			this.curDate = '2018-08-31';
			this.curTime = '08:00';
		},
		beforeDestroy() {
			this.reset();
			this.map = null;
		},
		methods: {
			//关闭定时器
			clearInterval() {
				if(this.timeInterval) {
					clearInterval(this.timeInterval);
				}
			},
			play() {
				this.clearInterval();
				this.isPlay = false;
				this.timeInterval = setInterval(this.cycleQueryHeat, INTERVAL_TIME);
			},
			cycleQueryHeat() {
				var index = this.times.indexOf(this.curTime);
				if(index + 1 >= this.times.length) {
					index = 0;
					this.curTime = this.times[index];
				} else {
					this.curTime = this.times[index + 1];
				}
				this.queryHeat();
			},
			stop() {
				this.isPlay = true;
				this.clearInterval();
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
				this.tempDrawLayer.drawType = this.drawType;
				this.map && this.map.off(L.Draw.Event.CREATED, this.drawEvent, this);
				this.drawType = "";
				this.stop();
				this.initTimeForSingle();
				this.queryCarsBySpatialAndTims();
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
					this.map && this.map.off(L.Draw.Event.CREATED, this.drawEvent, this);
					this.map && this.map.on(L.Draw.Event.CREATED, this.drawEvent, this);
				}
			},
			//绘制多边形
			drawPolygon() {
				this.clearDrawTempLayer();
				if(this.map) {
					this.drawHandler = new L.Draw.Polygon(this.map, {
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
					this.map && this.map.off(L.Draw.Event.CREATED, this.drawEvent, this);
					this.map && this.map.on(L.Draw.Event.CREATED, this.drawEvent, this);
				}
			},
			//清除绘制
			clearDraw() {
				this.clearDrawTempLayer();
			},
			//清除绘制临时图层
			clearDrawTempLayer() {
				if(this.tempDrawLayer && this.map && this.map.hasLayer(this.tempDrawLayer)) {
					this.map.removeLayer(this.tempDrawLayer);
				}
				//				this.tempDrawLayer = null;
				this.drawHandler && this.drawHandler.disable();
				this.drawHandler = null;
				this.drawType = "";
			},
			//
			clearHeatLayers() {
				if(this.map) {
					if(this.heatmapLayer && this.map.hasLayer(this.heatmapLayer)) {
						this.map.removeLayer(this.heatmapLayer);
					}
				}
				this.heatmapLayer = null;
				this.heatData = {};
			},
			//显示热力图
			showHeatLayer() {
				if(this.heatmapLayer && this.heatmapLayer._el) {
					this.heatmapLayer._el.style.display = "";
				}
			},
			//隐藏热力图
			hideHeatLayer() {
				if(this.heatmapLayer && this.heatmapLayer._el) {
					this.heatmapLayer._el.style.display = "none";
				}
			},
			handleChangeType(pv) {
				this.cars = pv;
				this.queryHeat();
			},
			//请求热力图数据
			queryHeat() {
				//				if(!this.bGroupHeat) {
				//					this.queryDensity();
				//					return false;
				//				}
				if(!this.map) {
					return false;
				}
				if(!this.curDate || !this.curTime) {
					return false;
				}
				var str = this.curDate + " " + this.curTime;
				var startTime = moment(str, DATEFORMAT);
				var mStartTime = startTime.format(DATEFORMAT2);
				var endTime = startTime.add(SPLIT, 'hours');
				var mEndTime = startTime.format(DATEFORMAT2);
				if(!startTime || !endTime) {
					return false;
				}
				var array = [];
				this.cars && this.cars.forEach(item => {
					array.push(findCarTypeKeyByLabel(item));
				})
				var data = {
					key: this.code,
					type: array,
					begin: mStartTime,
					end: mEndTime,
					split: GRID_SIZE
				};
				var index = this.params.dataConfig.dsId;
				var url = this.spaceRestUrl + HEAT_QUERY + index;
				var headers = {
					'Content-Type': 'text/plain;charset=utf-8'
				};
				this.$post(url, data, headers).then(response => {
					this.$emit(EVENT_TRACK_HEAT);
					if(!this.map) {
						return false;
					}
					this.clearHeatLayers();
					var info = response.info;
					if(info && info.item && info.item.length > 0) {
						var heatData = info.item;
						var jsondata = {
							max: this.value,
							data: heatData
						}
						//						var len = heatData ? heatData.length : 0;
						//						var min = 0;
						//						for(var i = 0; i < len; i++) {
						//							if(i == 0) {
						//								min = heatData[i].count;
						//							} else {
						//								min = min > heatData[i].count ? heatData[i].count : min;
						//							}
						//						}
						this.heatData = jsondata;
						//						var mint1 = Math.floor(min / this.interval);
						//						this.min = mint1*this.interval;
						//						var m = info.max && info.max > 0 ? info.max * 2 : 100;
						//						var t1 = m % this.interval;
						//						if(t1 != 0) {
						//							var t2 = Math.ceil(m / this.interval);
						//							this.max = t2 * this.interval;
						//						} else {
						//							this.max = m;
						//						}
						//						this.value = info.max;
						var cfg = {
							// radius should be small ONLY if scaleRadius is true (or small radius is intended)
							"radius": 30,
							"maxOpacity": .8,
							// scales the radius based on map zoom
							"scaleRadius": false,
							// if set to false the heatmap uses the global maximum for colorization
							// if activated: uses the data maximum within the current map boundaries 
							//   (there will always be a red spot with useLocalExtremas true)
							"useLocalExtrema": false,
							// which field name in your data represents the latitude - default "lat"
							latField: 'y',
							// which field name in your data represents the longitude - default "lng"
							lngField: 'x',
							// which field name in your data represents the data value - default "value"
							valueField: 'count'
						};
						this.heatmapLayer = new HeatmapOverlay(cfg);
						this.heatmapLayer.setData(jsondata);
						this.map.addLayer(this.heatmapLayer);
					} else {
						this.$message.warning(this.$t('message.no_query_results'));
					}
				});
			},
			reset() {
				this.map && this.map.off(L.Draw.Event.CREATED, this.drawEvent, this);
				this.value = 80000;
				this.clearHeatLayers();
				this.curDate = '2018-08-31';
				this.curTime = '08:00';
				this.cars = getCarTypeNameList();
				this.stop();
			},
			drawLocalHeat() {
				var newVal = this.value;
				if(this.map && this.heatmapLayer && this.heatData) {
					var data = this.heatData.data;
					var len = data ? data.length : 0;
					var jsonData = {
						max: newVal,
						data: data
					};
					this.heatmapLayer.setData(jsonData);
				}
			},
			//按照空间和时间以及类型查询车辆
			queryCarsBySpatialAndTims() {
				if(!this.tempDrawLayer) {
					this.$message.warning(this.$t('message.draw_area'));
					return false;
				}
				var latlngs = this.tempDrawLayer.getLatLngs() && this.tempDrawLayer.getLatLngs()[0] ? this.tempDrawLayer.getLatLngs()[0] : null;
				var len = latlngs ? latlngs.length : 0;
				if(len < 0) {
					this.$message.warning(this.$t('message.draw_area'));
					return false;
				}
				if(!this.curDate || !this.curTime) {
					this.$message.warning(this.$t('message.set_query_time'));
					return false;
				}
				var str = this.curDate + " " + this.curTime;
				var startTime = moment(str, DATEFORMAT);
				var mStartTime = startTime.format(DATEFORMAT2);
				var endTime = startTime.add(SPLIT, 'hours');
				var mEndTime = startTime.format(DATEFORMAT2);
				if(!startTime || !endTime) {
					return false;
				}
				var array = [];
				var data = {
					type: array,
					begin: mStartTime,
					end: mEndTime,
					size: this.pageSize,
					page: this.currentPage - 1
				};
				var index = this.params.dataConfig.dsId;
				var url = "";
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
				var headers = {
					'Content-Type': 'text/plain;charset=utf-8'
				};
				this.$post(url, data, headers).then(response => {
					var info = response.info;
					this.devices = [];
					var info = response.info;
					var infos = info && info.item ? info.item : null;
					var len = infos ? infos.length : 0;
					this.clearDraw();
					if(len > 0) {
						this.bGroupHeat = false;
						this.clearHeatLayers(); //
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
							'isPlayTrack': false //true表示正在播放轨迹
						});
					}
				});
			},
			backToQueryDevice() {
				this.bGroupHeat = true;
				this.bShowPage = false; //显示分页组件
				this.devices = [];
				this.total = 0;
				this.currentPage = 1; //当前页数
				this.queryHeat();
			},
			//单体热力图
			queryDensity() {
				var array = [];
				this.devices && this.devices.forEach(item => {
					if(item.selected) {
						array.push(item.label);
					}
				})
				if(array && array.length == 0) {
					this.$message.warning(this.$t('message.select_vehicle'));
					return false;
				}
				var sStartTime = this.curDate2 + " 00:00:00";
				var sEndTime = '';
				if(this.times2.indexOf(this.curTime2) >= 0) {
					var index = this.times2.indexOf(this.curTime2);
					var startTime = moment(sStartTime, DATEFORMAT2);
					var endTime = startTime.add(index + 1, 'hours');
					sEndTime = endTime.format(DATEFORMAT2);
				}
				if(!sStartTime || !sEndTime) {
					return false;
				}
				var data = {
					id: array,
					begin: sStartTime,
					end: sEndTime,
					split: 50
				};
				var index = this.params.dataConfig.dsId;
				var url = this.spaceRestUrl + HEAT_QUERY_DENSITY + index;
				var headers = {
					'Content-Type': 'text/plain;charset=utf-8'
				};
				this.$post(url, data, headers).then(response => {
					this.$emit(EVENT_TRACK_HEAT);
					this.clearHeatLayers();
					if(!this.map) {
						return false;
					}
					var info = response.info;
					if(info && info.item && info.item.length > 0) {
						var heatData = info.item;
						var jsondata = {
							max: 180,
							data: heatData
						}
						this.heatData = jsondata;
						var cfg = {
							// radius should be small ONLY if scaleRadius is true (or small radius is intended)
							"radius": 30,
							"maxOpacity": .8,
							// scales the radius based on map zoom
							"scaleRadius": false,
							// if set to false the heatmap uses the global maximum for colorization
							// if activated: uses the data maximum within the current map boundaries 
							//   (there will always be a red spot with useLocalExtremas true)
							"useLocalExtrema": false,
							// which field name in your data represents the latitude - default "lat"
							latField: 'y',
							// which field name in your data represents the longitude - default "lng"
							lngField: 'x',
							// which field name in your data represents the data value - default "value"
							valueField: 'count'
						};
						this.heatmapLayer = new HeatmapOverlay(cfg);
						this.heatmapLayer.setData(jsondata);
						this.map.addLayer(this.heatmapLayer);
						//						var corner1 = L.latLng(miny,minx);
						//                      var corner2 = L.latLng(maxy, maxx);
						//                      var bounds = L.latLngBounds(corner1, corner2);
						//						this.map.fitBounds(bounds);
					} else {
						this.$message.warning(this.$t('message.no_query_results'));
					}
				});
			},
			handleCurrentChange(val) {
				this.currentPage = val;
				this.queryCarsBySpatialAndTims();
			},
			//两个时间同步
			initTimeForSingle() {
				this.curDate2 = this.curDate;
				var index = this.times.indexOf(this.curTime);
				if(index >= 0 && index < this.times.length) {
					this.curTime2 = this.times2[index];
				}
			}
		},
		computed: {
			heightStyle3() {
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
						"max-height": (this.height - 234 - 50 - tempHeight) + "px",
						"overflow": 'hidden auto'
					}
				} else {
					return {};
				}
			},
			heightStyle() {
				return {
					maxHeight: this.height - 52 + "px",
					overflow: 'auto'
				}
			},
			breakValues() {
				if(this.value > 0) {
					var temp = [];
					var array = [0.25, 0.55, 0.85, 1.0];
					for(var i = 0; i < 4; i++) {
						var num = array[i] * this.value;
						temp.push(Math.round(num * 100) / 100);
					}
					return temp;
				} else {
					return [25, 55, 85, 100];
				}
			},
			isDrawRect() {
				return this.drawType == "rectangle" ? true : false;
			},
			isDrawPoly() {
				return this.drawType == "polygon" ? true : false;
			},
			...mapState([
				'spaceRestUrl',
				'maps'
			])
		},
		components: {
			CarType,
			VueSlider
		},
		watch: {
			curDate(newval, oldval) {
				this.queryHeat();
			},
			//			curDate2(newval,oldval) {
			//				this.queryDensity();
			//			}
		}
	}
</script>

<style>
	.undraw-state {
		border: 1px solid #F3F3F3;
	}
	
	.draw-state {
		/*border-color: #3a8ee6;*/
		border: 1px solid #3a8ee6;
		/*background-color: #409EFF;*/
	}
</style>