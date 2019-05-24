<template>
	<div style="overflow: hidden;">
		<!--查询车辆 -->
		<div class="right-component-item-content " style="border-bottom: solid 1px #DCDEE3;padding: 4px 0px;" v-show="isQueryDevice">
			<!--选择时间-->
			<el-row class="right-component-item split-item" type="flex" align='middle'>
				<el-col :span="8">
					开始时间
				</el-col>
				<el-col :span="16">
					<el-date-picker v-model="startTime" type="datetime" placeholder="选择日期时间" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" style="width: 100% !important;">
					</el-date-picker>
				</el-col>
			</el-row>
			<el-row class="right-component-item split-item" type="flex" align='middle'>
				<el-col :span="8">
					结束时间
				</el-col>
				<el-col :span="16">
					<el-date-picker v-model="endTime" type="datetime" placeholder="选择日期时间" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" style="width: 100% !important;">
					</el-date-picker>
				</el-col>
			</el-row>
			<!--<el-row class="right-component-item split-item" type="flex" align='middle' v-if="!isCustom">
				<el-col :span="8">
					绘制范围
				</el-col>
				<el-col :span="16">
					<el-date-picker v-model="endTime" type="datetime" placeholder="选择日期时间" style="width: 100% !important;">
					</el-date-picker>
				</el-col>
			</el-row>-->
			<el-row class="right-component-item split-item" type="flex" align='middle' justify="center">
				<el-col :span="8" :offset="8" style="text-align: center;">
					<el-button type="primary" plain size="small" @click="resetMapQuery">重置</el-button>
				</el-col>
				<el-col :span="8" style="text-align: center;">
					<el-button type="primary" plain size="small" @click="queryDevice">查询</el-button>
				</el-col>
			</el-row>
		</div>
		<!--车辆列表-->
		<div :style="heightStyle" class="tr-center">
			<div class="right-component-item-content " v-show="!isQueryDevice">
				<div style="padding: 0px 10px;">
					<el-row class="right-component-item split-item" type="flex" align='middle' justify="center" v-for="(lcc,index) in devices" :key="lcc.label">
						<el-col :span="12" v-show="lcc.isQueryTrack">
							<el-checkbox style="font-size: 20px !important;" v-model="lcc.selected">{{lcc.label}}</el-checkbox>
						</el-col>
						<el-col :span="24" v-show="!lcc.isQueryTrack">
							<el-checkbox style="font-size: 20px !important;" v-model="lcc.selected">{{lcc.label}}</el-checkbox>
						</el-col>
						<el-col :span="12" v-show="lcc.isQueryTrack">
							<el-row type="flex" align='middle' justify="center">
								<el-col :span="12" style="text-align: right;">
									<div class="c-track-second-color" v-bind:style="{background:lcc.color}" @click="locationTrack(index)"></div>
								</el-col>
								<el-col :span="6" style="text-align: right;">
									<img src="../images/play.png" title="播放" style="width: 20px;height: auto;" class="Num-pause-btn" @click="play(lcc)">
								</el-col>
								<el-col :span="6" style="text-align: right;">
									<img src="../images/stop.png" style="width: 24px;height: auto;" title="停止" class="Num-pause-btn" @click="stop">
								</el-col>
							</el-row>
						</el-col>
					</el-row>
				</div>
			</div>
		</div>
		<div style="border-top: solid 1px #DCDEE3;padding: 4px 0px;" v-show="!isQueryDevice">
			<el-row class="right-component-item split-item" type="flex" align='middle' justify="center">
				<!--<el-col :span="6" style="text-align: center;">
						<el-button type="primary" plain size="small" @click="backToQueryDevice">全选</el-button>
					</el-col>
					<el-col :span="6" style="text-align: center;">
						<el-button type="primary" plain size="small" @click="backToQueryDevice">反选</el-button>
					</el-col>-->
				<el-col :span="12" style="text-align: center;">
					<el-button type="primary" plain size="small" @click="queryTrack">查询</el-button>
				</el-col>
				<el-col :span="12" style="text-align: center;">
					<el-button type="primary" plain size="small" @click="backToQueryDevice">返回</el-button>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
	import { mapState } from 'vuex'
	import service from '../../../../api/service.js'
	import { QueryDevicesByRectEvent, QueryDevicesResultEvent, LocationTrackEvent } from '../js/constants.js'
	const props = {
		map: {
			type: Object
		},
		params: {
			type: Object
		},
		height:{
			type:Number,
			default:0
		}
		
		
	}
	export default {
		message: "地图查询设置组件",
		name: "MapDefine",
		props,
		data() {
			return {
				//map: null,
				drawnItems: [],
				startTime: '',
				endTime: '',
				boxs: [], //范围数组
				isQueryDevice: true,
				devices: [] //查询的设备结果
			}
		},
		mounted() {
			this.$nextTick(() => {
				this.bus.$on(QueryDevicesResultEvent, this.handleQueryDevicesResult);
				//				if(this.map) {
				//						this.map.off('pm:create', this.handleDrawCreate);
				//						this.map.off('pm:remove', this.handleDrawRemove);
				//						this.map.on('pm:create', this.handleDrawCreate);
				//						this.map.on('pm:remove', this.handleDrawRemove);
				//					}
				//				this.bus.$on("initPM", (pv) => {
				//					this.map=pv;
				//					if(this.map) {
				//						this.map.off('pm:create', this.handleDrawCreate);
				//						this.map.off('pm:remove', this.handleDrawRemove);
				//						this.map.on('pm:create', this.handleDrawCreate);
				//						this.map.on('pm:remove', this.handleDrawRemove);
				//					}
				//				});
			})
		},
		beforeDestroy() {
			//this.bus.$off(QueryDevicesResultEvent, this.handleQueryDevicesResult);
		},
		methods: {
			//			handleDrawCreate(e) {
			//				if(e.layer) {
			//					this.drawnItems.push(e.layer);
			//					this.boxs.push({
			//						minX: e.layer.getBounds().getWest(),
			//						maxX: e.layer.getBounds().getEast(),
			//						minY: e.layer.getBounds().getSouth(),
			//						maxY: e.layer.getBounds().getNorth()
			//					});
			//				}
			//			},
			//			handleDrawRemove(e) {
			//				var index = this.drawnItems.indexOf(e.layer);
			//				if(index >= 0) {
			//					this.drawnItems.splice(index, 1);
			//					this.boxs.splice(index, 1);
			//				}
			//			},
			//返回查询设备组件
			backToQueryDevice() {
				this.isQueryDevice = true;
				this.devices = [];
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
					this.$message.warning('请先选择需要查询的设备！');
					return false;
				}
				if(!this.startTime || !this.endTime) {
					this.$message.warning('请先设置查询时间！');
					return false;
				}
				var data = {
					codes: codes,
					startTime: this.startTime,
					endTime: this.endTime
				}
				this.bus.$emit("queryTrackByCode", data)
			},
			//查询设备
			queryDevice() {
				if(!this.startTime || !this.endTime) {
					this.$message.warning('请设置查询时间！');
					return;
				}
				var data = {
					startTime: this.startTime,
					endTime: this.endTime
				}
				this.bus.$emit(QueryDevicesByRectEvent, data);
				//				console.log(this.boxs);
				//				if(!this.boxs || this.boxs.length == 0) {
				//					this.$message.warning('请绘制查询范围！');
				//					return;
				//				}
				//				var params = (this.params);
				//				var dataConfig = params.dataConfig;
				//				if(dataConfig) {
				//					var url = this.dbRestUrl + service.TRACK_QUERY_DEVICE + "?id=" + dataConfig.dbConfig.id;
				//					var data2 = {
				//						boxs: this.boxs,
				//						fields: dataConfig.fields,
				//						startTime: this.startTime,
				//						endTime: this.endTime
				//					};
				//					this.$post(url, data2).then(repsone => {
				//						this.devices = [];
				//						if(repsone && repsone.code == 200) {
				//							if(repsone.data && repsone.data.length > 0) {
				//								console.log(repsone.data);
				//								this.isQueryDevice = false;
				//
				//								var r, g, b;
				//								var len = repsone.data.length;
				//								for(var i = 0; i < len; i++) {
				//									r = Math.floor(Math.random() * 256);
				//									g = Math.floor(Math.random() * 256);
				//									b = Math.floor(Math.random() * 256);
				//									this.devices.push({
				//										'label': repsone.data[i],
				//										'color': "rgba(" + r + "," + g + "," + b + ",1)",
				//										'tof': false,
				//										'selected': false
				//									});
				//								}
				//							} else {
				//								this.$message({
				//									message: '查询结果为空！',
				//									type: 'warning'
				//								});
				//							}
				//						} else {
				//							this.$message.error(repsone.msg);
				//						}
				//					}).catch(error => {
				//						this.$message.error('服务器错误！');
				//					});
				//				} else {
				//					this.$message.error('缺少必需参数！');
				//				}
			},
			handleQueryDevicesResult(pv) {
				if(!pv) {
					pv = [];
				}
				this.isQueryDevice = false;
				this.devices = pv;
			},
			/****
			 * 某设备轨迹定位
			 */
			locationTrack(index) {
				//console.log(index);
				if(this.devices && index >= 0 && index < this.devices.length) {
					this.bus.$emit(LocationTrackEvent, this.devices[index].label);
				}
			},
			resetMapQuery() {
				this.startTime = '';
				this.endTime = '';
				this.isQueryDevice = true;
				this.devices = []; //查询的设备结果
				this.bus.$emit("resetMapQuery");
			},
			play(item) {
				var data = {
					code: item.label
				}
				this.bus.$emit("play", data);
			},
			stop() {
				this.bus.$emit("stop");
			}
		},
		computed: {
			heightStyle(){
				if(this.devices && this.devices.length>0)
				{
					return {"height":(this.height-80)+"px",
					"overflow":'hidden auto'
					}
				}
				else
				{
					return {};
				}
				
			},
			...mapState([
				'dbUrl', 'dbRestUrl', 'bus'
			])
		},
		watch: {

		}
	}
</script>

<style scoped>
	.split-item {
		padding: 4px 15px;overflow: hidden auto; 
	}
	
	.c-track-second-color {
		width: 100%;
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
</style>