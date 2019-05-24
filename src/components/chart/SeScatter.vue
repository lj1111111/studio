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
		message: '散点图组件',
		name: 'SeScatter',
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
								data.forEach(item => {
									if(item.hasOwnProperty(fieldX)) {
										if(tempList.indexOf(item[fieldX]) < 0) {
											tempList.push(item[fieldX]);
										}
									}
								})
								var row = tempList.length;
								var col = headers.length;
								var count=data.length;
								dsource.push(headers);
								for(var i = 0; i < row; i++) {
									var rowData=[];
									rowData.push(tempList[i]);
									for(var j = 1; j < col; j++) {
										var bExist=false;
										for(var k=0;k<count;k++)
										{
											var item=data[k];
											if(item[fieldX]==tempList[i] && item[fieldS]==headers[j]) {
												rowData.push(item[fieldY]);
												bExist=true;
												break;
											}
										}
										if(!bExist)
										{
											rowData.push("-");
										}
									}
									dsource.push(rowData);
								}
								params.option.dataset = {
									source: dsource
								};
								this.myChart.setOption(params.option);

							} else //数据不存在系列
							{
								dsource.push(headers);
								data.forEach(item => {
									var x = item[fieldX];
									var y = item[fieldY];
									dsource.push([x, y]);
								})
								params.option.dataset = {
									source: dsource
								};
								this.myChart.setOption(params.option);
							}
						} else {
							console.log("SeScatter no series！");
						}

						//

						//						var seriesData = params.option.series && params.option.series.length > 0 && params.option.series[0].data;
						//						var fieldValue = "";
						//						fieldValue = getField(FVALUE, fields);
						//						var count = data ? data.length : 0;
						//						seriesData && seriesData.forEach(item => {
						//							for(var i = 0; i < count; i++) {
						//								if(data[i].hasOwnProperty(fieldValue)) {
						//									var value = 0;
						//									value = data[i][fieldValue];
						//									item.value = value;
						//								}
						//							}
						//						})
						//						this.myChart.setOption(params.option);
					}
				}
			}

		}
	}
</script>

<style>

</style>