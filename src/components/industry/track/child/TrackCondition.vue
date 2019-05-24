<template>
	<el-tabs :stretch="true" style="background-color:#F7F8FA ; color:#2c3e50; height:calc(100%);"  v-model="activeName" @tab-click="handleClick">
		<el-tab-pane label="设备查询" :name="TrackQueryType.QUERY_BY_NUM" >
			<div  class="tr-center" style="overflow-y: auto;overflow-x: hidden;" :style="heightStyle">
				<IdentityQuery></IdentityQuery>
			</div>
		</el-tab-pane>
		<el-tab-pane label="地图查询" :name="TrackQueryType.QUERY_BY_MAP">
			<MapQuery :params="params" :map="map" :height="height"></MapQuery>
		</el-tab-pane>
	</el-tabs>
</template>

<script>
	import IdentityQuery from './IdentityQuery.vue'
	import MapQuery from './MapQuery.vue'
	import { mapState } from 'vuex'
	import service from '../../../../api/service.js'
	import {TrackQueryType,TabChangeTypeEvent} from '../js/constants.js'
	/****
	 * 按设备查询事件名称
	 */
	const QueryTrackByCodeEvent = "queryTrackByCode";
	const trackLineStyle = {
		color: "#00A",
		weight: 3,
	}
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
//		activeName:{
//			type:String,
//			default:TrackQueryType.QUERY_BY_NUM
//		}
		
	}
	export default {
		name: 'TrackCondition',
		message: '轨迹条件组件',
		props,
		data() {
			var activeName=TrackQueryType.QUERY_BY_NUM;
			return {
				TrackQueryType,
				activeName,
				trackLines: [], //轨迹线
				markers: [] //Marker标记
			}
		},
		mounted() {
			//this.bus.$on(QueryTrackByCodeEvent, this.handleQueryTrackByCode);
		},
		methods: {
			handleClick(tab, event) {
				//console.log(tab, event);
				this.bus.$emit(TabChangeTypeEvent,this.activeName);
			},
//			clearAllLayers() {
//				this.map && this.trackLines.forEach(item => {
//					this.map.removeLayer(item);
//				})
//				this.map && this.markers.forEach(item => {
//					this.map.removeLayer(item);
//				})
//			},
//			/***
//			 * 根据时间和设备号查询轨迹
//			 */
//			handleQueryTrackByCode(data) {
//				console.log(data);
//				if(data == null) {
//					this.$message.error('缺少必需参数！');
//					return false;
//				}
//				var params = (this.params);
//				var dataConfig = params.dataConfig;
//				if(dataConfig) {
//					var url = this.dbRestUrl + service.TRACK_LIST + "?id=" + dataConfig.dbConfig.id;
//					var data2 = {
//						fields: dataConfig.fields,
//						cars: [data.code],
//						startTime: data.startTime,
//						endTime: data.endTime
//					};
//					this.clearAllLayers();
//					this.$post(url, data2).then(repsone => {
//						if(repsone && repsone.code == 200) {
//							var data = repsone.data;
//							if(data && data.length == 1) {
//								var coordinates = data[0].coordinates;
//								var len = coordinates ? coordinates.length : 0
//								var latlngs = [];
//								var marker=[];
//								for(var i = 0; i <len; i += 2) {
//									latlngs.push([coordinates[i + 1], coordinates[i]]);
//									
//								}
//								var polyLine = L.polyline(latlngs, trackLineStyle).addTo(this.map);
//								this.trackLines.push(polyLine);
//								
//							} else if(data && data.length > 1) {
//								data.forEach(item => {
//									var coordinates = data[0].coordinates;
//									var len = coordinates ? coordinates.length : 0
//									var latlngs = [];
//									for(var i = 0; i <  len; i += 2) {
//										latlngs.push([coordinates[i + 1], coordinates[i]]);
//									}
//									var polyLine = L.polyline(latlngs, trackLineStyle).addTo(this.map);
//									this.trackLines.push(polyLine);
//								})
//							} else {
//								this.$message({
//									message: '查询结果为空！',
//									type: 'warning'
//								});
//							}
//						} else {
//							this.$message.error('服务器错误！');
//						}
//					}).catch(error => {
//						this.$message.error('服务器错误！');
//					});
//				} else {
//					this.$message.error('缺少必需参数！');
//				}
//			}
		},
		computed: {
			heightStyle(){
				return {"height":(this.height-40)+"px"}
			},
			...mapState([
				'bus', 'dbRestUrl'
			])
		},
		components: {
			IdentityQuery,
			MapQuery
		},
		watch:{
			
		}

	};
</script>

<style >
	/*.el-tabs--border-card {
		background: #F7F8FA;
		border: 1px solid #dcdfe6;
		-webkit-box-shadow: 0 0px 0px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
		box-shadow: 0 0px 0px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
	}*/
	
	.el-tabs__header {
		padding: 0;
		position: relative;
		margin: 0;
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