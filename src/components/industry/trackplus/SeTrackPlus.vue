<template>
	<div style="position: absolute;" :id="ukey" :style="locationObject">
		<el-row style="position: absolute;width:100%;height: 100%;" :style="styleObject">
			<el-col :span="params.option.layout.left">
				<Menu :style="menuStyle" @menu-change="handleMenuChange"></Menu>
			</el-col>
			<el-col :span="params.option.layout.center">
				<component :is="currentTabComponent" :style="conditionStyle" :height="height" :map="map" :params="params" :active-name="activeName" :editmode="editmode"></component>
			</el-col>
			<el-col :span="params.option.layout.right">
				<div :style="divSize" >
					<div style="left:50%;transform: translateX(-50%); z-index:6000;color: #18fffd;background-color:rgba(6, 45, 89, 0.8);text-align: center;font-size: 24px;position: absolute;padding: 10px;display: inline-block;margin-top: 20px;">
						{{$t('message.total')}}<span class="number-format">{{countFormat}}</span>
					</div>
					<div :style="mapStyle" :id="mapid" style="box-sizing: border-box;">

					</div>
					<FenceMonitorResult :monitors="params.monitors"></FenceMonitorResult>
				</div>
			</el-col>
		</el-row>
		<div style="position: absolute;width:100%; height: 100%;z-index: 6000;" v-show="editmode">

		</div>
		<slot>
		</slot>
	</div>
</template>

<script>
	import { numberFormat } from '../../../utils/util.js'
	import { TOTAL_COUNT } from './js/serviceapi.js'
	import { setTypes } from './js/carstype.js'
	import publicTileMap from '../../../constants/PublicTileMap.js'
	import common from '../../../mixins/common.js'
	import uimixins from './mixins/uimixins.js'
	import Menu from './child/Menu.vue'
	import MonitorModule from './child/MonitorModule.vue'
	import TrackQueryModule from './child/TrackQueryModule.vue'
	import TrackAnalysisModule from './child/TrackAnalysisModule.vue'
	import FenceMonitorResult from './child/FenceMonitorResult.vue'
	import { mapState } from 'vuex'
	import './css/index.css';

	//引入外部js
	//import './lib/leaflet.rotatedMarker.js'
	//import './lib/AnimatedMarker.js'
    import './lib/leaflet.draw-src.js';
	import './lib/leaflet.draw.css';
	import './lib/SpeedInfoControl.js'
	import './lib/InfoControl.js'
	const INTERVAL_TIME = 5000; //定时器间隔
	export default {
		name: 'SeTrackPlus',
		message: '轨迹分析Plus组件',
		mixins: [common, uimixins],
		data() {
			return {
				startTime:'',
				count: 0, //接入轨迹点数据量
				height: 0,
				map: undefined,
				seManager: undefined,
				interval: null, //定时器
			}
		},
		mounted() {
			this.$nextTick(() => {
				this.initMap();
				setTypes(this.$store.state.devicesTypes);
				if(!this.editmode) {
					this.intervalQueryTotalCount();
				} else {
					this.clearInterval();
				}
			})
		},
		beforeDestroy() {

		},
		components: {
			Menu,
			MonitorModule,
			TrackQueryModule,
			FenceMonitorResult,
			TrackAnalysisModule
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
				var rightSpan = this.params.option.layout.right;
				return {
					width: this.location.width * rightSpan / 24 + "px",
					height: this.location.height + "px",
					...obj
				}
			},
			divSize() {
				var obj = {
					"position": "relative"
				};
//				if(this.params.option.panelStyle.showBg) {
//					obj["background-color"] = this.params.option.panelStyle.bgColor;
//				}
//				if(this.params.option.panelStyle.showBorder) {
//					obj["border"] = this.params.option.panelStyle.borderWidth + "px solid " + this.params.option.panelStyle.borderColor;
//				}
				var rightSpan = this.params.option.layout.right;
				return {
					width: this.location.width * rightSpan / 24 + "px",
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
				this.height = this.location.height;
				var centerSpan = this.params.option.layout.center;
				return {
					width: this.location.width * centerSpan / 24 - 1 + "px",
					height: this.location.height + "px",
					overflow: 'hidden'
				}
			},
			menuBgColor() {
				return {
					backgroundColor: this.params.option.navMenuStyle.backgroundColor
				}
			},
			countFormat() {
				//numberFormat(value, decimals, dec_point, thousands_sep, "round");
				return numberFormat(this.count, 0, '.', ",", "round");
			},
			...mapState([
				'spaceRestUrl',
				'maps'
			])
		},
		methods: {
			//关闭定时器
			clearInterval() {
				//关闭定时器
				if(this.interval) {
					clearInterval(this.interval);
				}
			},
			intervalQueryTotalCount() {
				this.clearInterval();
				this.queryTotalCount();
				this.interval = setInterval(this.queryTotalCount, INTERVAL_TIME);
			},
			queryTotalCount() {
				var id = this.params.dataConfig.dsId;
				var url = this.spaceRestUrl + TOTAL_COUNT + id; //
				this.$fetch(url).then(response => {
					this.count = response && response.info && response.info.points_count != undefined ? response.info.points_count : 0;
				});
			},
			//清除底图
			clearBaseLayers() {
				this.map && this.baseLayers.forEach(item => {
					this.map.removeLayer(item);
				})
				this.baseLayers = [];
			},
			findMap(id) {
				var maps = this.maps;
				var len = maps ? maps.length : 0;
				for(var i = 0; i < len; i++) {
					if(maps[i].id == id) {
						return maps[i]["map"];
					}
				}
				return null;
			},
			initMap() {
				this.clearBaseLayers();
				//this.map = this.findMap(this.mapid);
				if(!this.map) {
					this.map = L.map(this.mapid, {
						maxZoom: 17,
						zoomControl: false,
						attributionControl: false,
						drawControlTooltips: false
					});
					//L.control.scale().addTo(this.map);
					var temps = [];
					if(this.maps) {
						temps = Object.assign([], this.maps);
					}
					temps.push({
						id: this.mapid,
						map: this.map
					});
					//this.map.initSeManage();
					//this.$store.commit('setMaps', temps);
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
				var rightSpan = this.params.option.layout.right;
				chartdiv.style.width = (newval.width * rightSpan / 24) + "px";
				chartdiv.style.height = (newval.height) + "px";
				this.map && this.map._onResize();
				this.lockMap();
			},
			lockMap() {
				this.map && this.map.setView(L.latLng(this.params.option.mapInit.center[1], this.params.option.mapInit.center[0]), this.params.option.mapInit.zoom);
			},
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
			},
			'params.monitors': {
				handler(curVal, oldVal) {　　
					//this.initMap();
					//console.log(curVal);
				},
				deep: true
			},
			editmode(newval, oldval) {
				if(!newval) {
					this.intervalQueryTotalCount();
				} else {
					this.clearInterval();
				}
			}
		}

	}
</script>

<style scoped>
	.tr-center {
		overflow: hidden;
	}
</style>