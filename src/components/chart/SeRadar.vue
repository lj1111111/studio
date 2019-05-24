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
	import ChartMixinExt from '../base/ChartMixinExt.js'
	import { getField, deepClone, isInteger } from '../../utils/util.js'
	const FX = "x";
	const FY = "y";
	const FS = "s";
	export default {
		message: '雷达图组件',
		name: 'SeRadar',
		mixins: [ChartMixinExt],
		data() {
			return {}
		},
		methods: {
			createComponent(params) {
				if(this.myChart) {
					this.myChart.dispose();
				}
				this.myChart = this.$echarts.init(document.getElementById(this.chartid));
				if(this.myChart && params && params.dataConfig) {
					var data = params.dataConfig.data;
					var fields = params.dataConfig.fields;
					if(data && data.length > 0 && fields) {
						var series = params.option.series;
						var seriesNames = [];
						var bHasSeries = false;
						series && series.forEach(item => {
							seriesNames.push(item.name);
							bHasSeries = true;
						})
						if(bHasSeries) {
							var fieldS = getField(FS, fields);
							var fieldX = getField(FX, fields);
							var fieldY = getField(FY, fields);
							var dsource = [];
							var headers = ["_TYPE"];
							headers = headers.concat(seriesNames);
							if(data[0].hasOwnProperty(fieldS)) //数据存在系列
							{
								var tempList = [];
								var indicator = [];
								var maxValue = params.option.radar.maxValue;
								data.forEach(item => {
									if(item.hasOwnProperty(fieldX)) {
										if(tempList.indexOf(item[fieldX]) < 0) {
											tempList.push(item[fieldX]);
											indicator.push({
												"name": item[fieldX],
												"max": maxValue
											});
										}
									}
								})
								var col = tempList.length;
								var row = seriesNames.length;
								var count = data.length;
								params.option.legend.data = seriesNames;
								params.option.radar.indicator = indicator;
								if(col > 0) {
									for(var i = 0; i < row; i++) {
										var rowData = [];
										var bExist = false;
										for(var j = 0; j < col; j++) {
											for(var k = 0; k < count; k++) {
												var item = data[k];
												if(item[fieldX] == tempList[j] && item[fieldS] == seriesNames[i]) {
													rowData.push(item[fieldY]);
													bExist = true;
													break;
												}
											}
										}
										if(!bExist) {
											rowData.push("-");
										}
										params.option.series[i].data=[rowData]
									}
								}
								this.myChart.setOption(params.option);
							} else //数据不存在系列
							{
								var indicator = [];
								var seriesData = [];
								var maxValue = params.option.radar.maxValue;
								data.forEach(item => {
									var x = item[fieldX];
									var y = item[fieldY];
									var obj = {};
									obj["name"] = x;
									obj["max"] = maxValue;
									indicator.push(obj);
									seriesData.push(y);
								})
								params.option.legend.data = seriesNames;
								params.option.radar.indicator = indicator;
								params.option.series[0].data = [seriesData];
								this.myChart.setOption(params.option);
							}
						} else {
							console.log("SeRadar no series！");
						}
					}
				}
			}
		}
	}
</script>

<style>

</style>