<template>
	<div class="item-list" style="margin-top:10px;">
		<div class="right-component-item-header  track-split-item-line-bootom split-item">
			<span @click="isRight=!isRight">
			<i class="el-icon-caret-right" v-show="isRight" ></i>
			<i class="el-icon-caret-bottom" v-show="!isRight" ></i>
			{{$t('FenceManage.fence_manage')}}</span>
		</div>
		<div v-show="!isRight" class="right-component-item-content item-list">
			<!--查询方式-->
			<el-row class="right-component-item track-split-item" type="flex" align='middle'>
				<el-col :span="8">
					{{$t('Common.create_mode')}}
				</el-col>
			</el-row>
			<el-row class="right-component-item track-split-item" type="flex" align='middle'>
				<el-col :span="24">
					<el-select v-model="createMode" placeholder="请选择" style="width: 100% !important;" @change="createModeChange">
						<el-option v-for="item in createModeList" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-col>
			</el-row>
			<div v-if="isCreateModeByDraw">
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
						<img src="../images/draw_poly.svg" style="width: 24px;height: auto;cursor: pointer;padding: 4px;" :title="$t('Common.draw_polygon')"   class="Num-pause-btn" :class="[isDrawPoly?'draw-state':'undraw-state']" @click="drawPolygon">
					</el-col>
					<el-col :span="3" style="text-align: right;">
						<img src="../images/draw_clear.svg" style="width: 24px;height: auto;cursor: pointer;padding: 4px; " :title="$t('Common.clear')"  class="Num-pause-btn" @click="clearDraw">
					</el-col>
				</el-row>
			</div>
			<div v-else>
				<el-row class="right-component-item track-split-item" type="flex" align='middle'>
					<el-col :span="8">
						{{$t('Common.draw_mode')}}
					</el-col>
				</el-row>
				<el-row class="right-component-item track-split-item" type="flex" align='middle'>
					<el-col :span="3" style="text-align: left;">
						<img src="../images/draw_clear.svg" style="width: 24px;height: auto;cursor: pointer;padding: 4px; " :title="$t('Common.clear')" class="Num-pause-btn" @click="clearDraw">
					</el-col>
				</el-row>
			</div>
			<el-row class="right-component-item track-split-item" type="flex" align='middle'>
				<el-col :span="8">
					{{$t('FenceManage.fence_name')}}
				</el-col>
			</el-row>
			<el-row class="right-component-item track-split-item" type="flex" align='middle'>
				<el-col :span="24">
					<el-input :placeholder="$t('Common.input_name')" v-model="name">

					</el-input>
				</el-col>
			</el-row>
			<el-row class="right-component-item track-split-item track-split-item-line " type="flex" align='middle' justify="center">
				<el-col :span="8" style="text-align: center;">
					<el-button type="primary" plain size="small" @click="reset">{{$t('Common.reset')}}</el-button>
				</el-col>
				<el-col :span="8" style="text-align: center;">
					<el-button type="primary" plain size="small" @click="createFence">{{$t('Common.create')}}</el-button>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
	import fencesData from '../data/fences.json'
	import { FENCE_CREATE } from '../js/serviceapi.js'
	import { mapState } from 'vuex'
	//创建围栏事件
	const EVENT_FENCE_CREATE = "fencecreate";
	//创建围栏常量
	const CREATE_BY_DRAW = "createbydraw";
	const CREATE_BY_SELECT = "createbyselect";
	//创建围栏方式
	const createModeList = [{
			label: "手动绘制",
			value: CREATE_BY_DRAW
		},
		{
			label: "选择范围",
			value: CREATE_BY_SELECT
		}
	]
	const props = {
		map: {
			type: Object
		}
	}
	
	export default {
		name: "FenceManage",
		message: "围栏管理组件",
		props,
		data() {
			return {
				isRight: false,
				//createModeList,
				createMode: CREATE_BY_DRAW,
				name: '', //围栏名称
				drawHandler: null, //绘制类型
				tempDrawLayer: null, //绘制结果图层
				drawType: '',
				geoJSONLayer: null //GeoJSON图层
			}
		},
		methods: {
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
				this.tempDrawLayer = null;
				this.drawHandler && this.drawHandler.disable();
				this.drawHandler = null;
				this.drawType = "";
			},
			//移除GeoJSON图层
			clearGeoJSONLayer() {
				if(this.geoJSONLayer && this.map && this.map.hasLayer(this.geoJSONLayer)) {
					this.map.removeLayer(this.geoJSONLayer);
				}
				this.geoJSONLayer = null;
			},
			createModeChange(val) {
				this.clearGeoJSONLayer();
				this.clearDrawTempLayer();
				if(val == CREATE_BY_SELECT) //选择模式模式
				{
					this.showGeoJSON();
				}
			},
			//释放资源
			reset(){
				this.clearDrawTempLayer();
				this.clearGeoJSONLayer();
				this.name="";
				this.createMode=CREATE_BY_DRAW;
			},
			showGeoJSON() {
				if(this.map) {
					this.geoJSONLayer = new L.GeoJSON(fencesData, {
						style: this.featureStyle,
						onEachFeature: this.onEachFeature
					});
					this.map.addLayer(this.geoJSONLayer);
					this.map.fitBounds(this.geoJSONLayer.getBounds());
					this.$emit(EVENT_FENCE_CREATE);
				}
			},
			//创建围栏
			createFence() {
				if(!this.name) {
					this.$message.warning(this.$t("message.enter_fence_name"));
					return false;
				}
				if(!this.tempDrawLayer) {
					this.$message.warning(this.$t("message.set_fence_area"));
					return false;
				}
				var json = this.tempDrawLayer.toGeoJSON();
				if(!json) {
					this.$message.warning(this.$t("message.set_fence_area"));
					return false;
				}
				json.properties.name = this.name;
				var msg1=this.$t('message.ask_create_fence');
				this.$confirm(msg1, this.$t('message.prompt'), {
					confirmButtonText: this.$t('message.ok'),
					cancelButtonText: this.$t('message.cancel'),
					type: 'warning'
				}).then(() => {
					var headers = {
						'Content-Type': 'text/plain;charset=utf-8'
					};
					var url = this.spaceRestUrl + FENCE_CREATE;
					var data = json;
					this.$post(url, data,headers).then(response => {
						this.$emit(EVENT_FENCE_CREATE);
						this.clearDrawTempLayer();//成功之后围栏
						this.name="";
					});
				}).catch(() => {});
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
			onEachFeature(feature, layer) {
				layer.on({
					//					mouseover: this.highlightFeature,
					//					mouseout: this.resetHighlight,
					click: this.zoomToFeature
				});
			},
			highlightFeature(e) {
				var layer = e.target;
				layer.setStyle({
					weight: 3,
					//					color: '#666',
					dashArray: '',
					fillOpacity: 1
				});

				if(!L.Browser.ie) {
					layer.bringToFront();
				}
			},

			resetHighlight(e) {
				if(this.geoJSONLayer) {
					this.geoJSONLayer.resetStyle(e.target);
				}
			},
			zoomToFeature(e) {
				var latLngs = e.target.getLatLngs();
				if(this.tempDrawLayer && this.map && this.map.hasLayer(this.tempDrawLayer)) {
					this.map.removeLayer(this.tempDrawLayer);
				}
				this.tempDrawLayer = new L.Polygon(latLngs, {
					weight: 4,
					opacity: 0.5,
					color: 'red',
					fillOpacity: 0.5,
					fillColor: "orange"
				});
				if(this.tempDrawLayer && this.map) {
					this.map.addLayer(this.tempDrawLayer);
				}
				this.map && this.map.fitBounds(e.target.getBounds());
			}
		},
		computed: {
			isCreateModeByDraw() {
				return this.createMode == CREATE_BY_DRAW ? true : false;
			},
			isDrawRect() {
				return this.drawType == "rectangle" ? true : false;
			},
			isDrawPoly() {
				return this.drawType == "polygon" ? true : false;
			},
			createModeList(){
				createModeList.forEach(item=>{
					item.label=this.$t(item.value);
				})
				return createModeList;
			},
			...mapState([
				'spaceRestUrl',
				'maps'
			])
		},
		components: {

		}

	}
</script>

<style scoped>
.undraw-state{
		border:1px solid #F3F3F3;
	}
	.draw-state{
		/*border-color: #3a8ee6;*/
		border:1px solid #3a8ee6;
		/*background-color: #409EFF;*/
	}
</style>