<template>
	<div style="position: absolute; box-sizing: border-box;" :id="ukey" :style="locationObject">
		<div style="position: absolute;width:100%; height: 100%;" :id="chartid">
		</div>
		<div style="position: absolute;width:100%; height: 100%;z-index: 2000;" v-show="editmode">

		</div>
		<slot>
		</slot>
	</div>
</template>

<script>
	import ChartMixin from '../base/ChartMixin.js'
	import { getField, deepClone ,isInteger} from '../../utils/util.js'
	const FVALUE = "value";
	export default {
		message: '仪表盘组件',
		name: 'SeGauge',
		mixins: [ChartMixin],
		data() {
			return {
				interval: null
			}
		},
		methods: {
			init(eleid, newval) {
				this.$nextTick(() => {
					if(this.interval) {
						clearInterval(this.interval);
					}
					if(this.myChart) {
						this.myChart.dispose();
					}
					this.myChart = this.$echarts.init(document.getElementById(eleid));

					if(this.params.dataConfig.type == 3) //数据库模式
					{
						this.dowithDataBase(); //调用子mixin
						var func = this.dowithDataBase;
						if(newval.dataConfig.autoUpdate) {
							var t = isInteger(newval.dataConfig.intervalTime);
							if(t) {
								this.interval = setInterval(this.dowithDataBase, newval.dataConfig.intervalTime * 1000);
							} else {
								this.interval = setInterval(this.dowithDataBase, 5 * 1000);
							}
						}

					} else if(this.params.dataConfig.type == 4) //API
					{
						this.dowithAPI(); //调用子mixin
						var func = this.dowithAPI;
						if(newval.dataConfig.autoUpdate) {
							var t = isInteger(newval.dataConfig.intervalTime);
							if(t) {
								this.interval = setInterval(this.dowithAPI, newval.dataConfig.intervalTime * 1000);
							} else {
								this.interval = setInterval(this.dowithAPI, 5 * 1000);
							}
						}
					} else {
						var params2 = deepClone(this.params);
						this.createChart(params2);
					}
				})
			},
			createChart(params) {
				if(params && params.dataConfig) {
					var data = params.dataConfig.data;
					var fields = params.dataConfig.fields;
					if(data && data.length > 0 && fields) {
						var seriesData = params.option.series && params.option.series.length > 0 && params.option.series[0].data;
						var fieldValue = "";
						fieldValue = getField(FVALUE, fields);
						var count = data ? data.length : 0;
						seriesData && seriesData.forEach(item => {
							for(var i = 0; i < count; i++) {
								if(data[i].hasOwnProperty(fieldValue)) {
									var value = 0;
									value = data[i][fieldValue];
									item.value = value;
								}
							}
						})
						this.myChart.setOption(params.option);
					}
				}
			},
			//API
			dowithAPI() {
				var params = deepClone(this.params);
				this.$fetch(params.dataConfig.api.rest).then(repsone => {
					var data = repsone;
					if(data && data.length > 0) {
						params.dataConfig.data = data;
						this.createChart(params);
					} else {
						this.$message({
							message: '数据为空！',
							type: 'warning'
						});
					}
				}).catch(error => {
					this.$message.error('服务器错误！');
				});
			},
			//DB数据源
			dowithDataBase() {
				var params = deepClone(this.params);
				var dbConfig = params.dataConfig.dbConfig;
				if(dbConfig && dbConfig.tableName) {
					var url = this.dbUrl + "/dboperation/v3/dboperation/selectrecord";
					var params2 = {
						tablename: dbConfig.tableName,
						fields: '*',
						filter: dbConfig.condition ? dbConfig.condition : ''
					};
					this.$fetch(url, params2).then(repsone => {
						var data = repsone;
						if(repsone && repsone.status == 0) {
							var data = repsone.result;
							if(data && data.length > 0) {
								params.dataConfig.data = data;
								this.createChart(params);
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
			}
		}
	}
</script>

<style>

</style>

