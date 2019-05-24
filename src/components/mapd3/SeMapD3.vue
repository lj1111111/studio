<template>
	<div style="position: absolute; " :id="ukey" :style="locationObject" @mousewheel.stop>
		<div style="position: absolute;width:100%; height: 100%;box-sizing: border-box;" :id='chartid' :style="styleObject">

		</div>
		<div style="position: absolute;width:100%; height: 100%;z-index: 2000;" v-show="editmode">

		</div>
		<slot>
		</slot>
	</div>
</template>

<script>
	import ChartMixin from '../base/ChartMixin.js'
	import { deepClone } from '../../utils/util.js';
	import { findField } from '../../utils/FieldsUtil.js';
	import { findCenterByName } from '../../data/china_cities.js';
	import SubComponentsUtil from '../../utils/SubComponentsUtil.js';
	import DataSourceType from '../../constants/DataSourceType.js';

	function isInteger(obj) {
		return typeof obj === 'number' && obj % 1 === 0; //是整数，则返回true，否则返回false  
	}
	//BAR3D字段
	const FNAME = "name";
	const FLNG = "lng";
	const FLAT = "lat";
	const FVALUE = "value";
	//LINES3D字段
	const LINES3D_FROM = "from";
	const LINES3D_TO = "to";
	import { mapState } from 'vuex'
	export default {
		message: '3D地图组件',
		name: 'SeMapD3',
		mixins: [ChartMixin],
		data() {
			return {
				interval: null,
				mChart: undefined
			}
		},
		mounted() {
			this.init(this.chartid, this.params);
		},
		computed: {
			...mapState([
				'dbUrl'
			])
		},
		methods: {
			init(eleid, newval) {
				this.$nextTick(() => {
					if(this.interval) {
						clearInterval(this.interval);
					}
					var children = newval.children;
					var bRet = this.hasAPIorDataBaseSource(children);
					if(bRet) { //有动态数据请求
						this.doWithDynamicData();
						var func = this.doWithDynamicData;
						var index = this.findChildAutoUpdate(children);
						if(index >= 0) {
							var child = children[index];
							if(child && child.params && child.params.dataConfig) {
								var t = isInteger(child.params.dataConfig.intervalTime);
								if(t) {
									this.interval = setInterval(func, child.params.dataConfig.intervalTime * 1000);
								} else {
									this.interval = setInterval(func, 5 * 1000);
								}
							}
						}
					} else {
						this.doWithStaticData();
					}
				})
			},
			/***
			 * //查找有自动更新数据的子组件
			 * return {Number} 返回子组件索引
			 */
			findChildAutoUpdate(children) {
				var len = children ? children.length : 0;
				var index = -1;
				for(var i = 0; i < len; i++) {
					if(children[i].params && children[i].params.dataConfig &&
						children[i].params.dataConfig.autoUpdate) {
						index = i;
						break;
					}
				}
				return index;
			},
			/***
			 * 判断子组件是否有动态数据请求，API或数据库
			 * retrun {Boolean} true表示有
			 */
			hasAPIorDataBaseSource(children) {
				var len = children ? children.length : 0;
				var bRet = false;
				for(var i = 0; i < len; i++) {
					var dataConfig = children[i].params && children[i].params.dataConfig;
					if(dataConfig && dataConfig.type == DataSourceType.DS_API || dataConfig.type == DataSourceType.DS_DATABASE) {
						bRet = true;
						break;
					}
				}
				return bRet;
			},
			/***
			 * 动态数据源
			 */
			doWithDynamicData() {
				var tempObject = deepClone(this.params);
				if(tempObject) {
					if(this.editmode) {
						var distance = tempObject.global.zoom * 10;
						var alpha = tempObject.global.rotateX;
						var beta = tempObject.global.rotateY;
						tempObject.option.geo3D.viewControl.distance = distance;
						tempObject.option.geo3D.viewControl.alpha = alpha;
						tempObject.option.geo3D.viewControl.beta = beta;
					}
					var children = tempObject.children;
					tempObject.option.series = [];
					var requests = [];
					var paramslist = [];
					var headerslist = [];
					if(children) {
						children && children.forEach(item => {
							if(item.params.dataConfig.type == DataSourceType.DS_API) {
								requests.push(item.params.dataConfig.api.rest);
								paramslist.push({});
								headerslist.push({});
							} else if(item.params.dataConfig.type == DataSourceType.DS_DATABASE) {
								var url = this.dbUrl + "/dboperation/v3/dboperation/selectrecord";
								var params = {
									tablename: item.params.dataConfig.dbConfig.tableName,
									fields: '*',
									filter: item.params.dataConfig.dbConfig.condition ? item.params.dataConfig.dbConfig.condition : ''
								};
								requests.push(url);
								paramslist.push(params);
								headerslist.push({});
							}
						})
					}
					var index = 0;
					this.$all(requests, paramslist, headerslist).then(results => {
						tempObject.option.series = [];
						children && children.forEach(item => {
							var newData = null;
							var fields = item.params.dataConfig.fields;
							var tempData = null;
							switch(item.name) {
								case SubComponentsUtil.SE_SUB_BAR3D: //Bar3D
									{
										if(item.params.dataConfig.type == DataSourceType.DS_API) { //API
											tempData = results && results[index] && results[index].data;
											newData = this.createBar3DData(tempData, fields);
											index++;
										} else if(item.params.dataConfig.type == DataSourceType.DS_DATABASE) //数据库
										{
											tempData = results && results[index] && results[index].data;
											var tempData2 = null;
											if(tempData && tempData.status == 0) {
												tempData2 = tempData.result;
											}
											newData = this.createBar3DData(tempData2, fields);
											index++;
										} else if(item.params.dataConfig.type == DataSourceType.DS_STATIC || item.params.dataConfig.type == DataSourceType.DS_CSVFILE) {
											tempData = item.params.dataConfig.data;
											newData = this.createBar3DData(tempData, fields);
										}
										break;
									}
								case SubComponentsUtil.SE_SUB_LINES3D: //Lines3D
									{
										if(item.params.dataConfig.type == DataSourceType.DS_API) { //API数据源
											tempData = results[index] && results[index].data;
											newData = this.createLines3DData(tempData, fields);
											index++;
										} else if(item.params.dataConfig.type == DataSourceType.DS_DATABASE) //数据库
										{
											tempData = results && results[index] && results[index].data;
											var tempData2 = null;
											if(tempData && tempData.status == 0) {
												tempData2 = tempData.result;
											}
											newData = this.createLines3DData(tempData2, fields);
											index++;
										} else if(item.params.dataConfig.type == DataSourceType.DS_STATIC || item.params.dataConfig.type == DataSourceType.DS_CSVFILE) {
											tempData = item.params.dataConfig.data;
											newData = this.createLines3DData(tempData, fields);
										}
										break;
									}
							}
							if(newData && newData.length > 0) {
								item.params.option.data = newData;
								tempObject.option.series.push(item.params.option);
							}
						})
						if(this.myChart) {

							if(this.editmode) {
								this.myChart.clear();
								this.myChart.setOption(tempObject.option);
							} else {
								//								this.myChart.clear();
								//								this.myChart.setOption(tempObject.option);
								this.myChart.setOption({
									series: tempObject.option.series
								});
							}
						} else {
							this.myChart = this.$echarts.init(document.getElementById(this.chartid));
							this.myChart.setOption(tempObject.option);
						}
						this.myChart && this.myChart.resize();
					}).catch(error => {
						console.log(error);
					});
				}
			},
			/***
			 * 静态数据源
			 */
			doWithStaticData() {
				var tempObject = deepClone(this.params);
				if(tempObject) {
					if(this.editmode) {
						var distance = tempObject.global.zoom * 10;
						var alpha = tempObject.global.rotateX;
						var beta = tempObject.global.rotateY;
						tempObject.option.geo3D.viewControl.distance = distance;
						tempObject.option.geo3D.viewControl.alpha = alpha;
						tempObject.option.geo3D.viewControl.beta = beta;
					}
					var children = tempObject.children;
					tempObject.option.series = [];
					if(children) {
						children && children.forEach(item => {
							var tempData = item.params.dataConfig.data;
							var fields = item.params.dataConfig.fields;
							var newData = null;
							switch(item.name) {
								case SubComponentsUtil.SE_SUB_BAR3D: //Bar3D
									{
										newData = this.createBar3DData(tempData, fields);
										break;
									}
								case SubComponentsUtil.SE_SUB_LINES3D:
									{ //Lines3D
										newData = this.createLines3DData(tempData, fields);
										break;
									}
							}
							if(newData && newData.length > 0) {
								item.params.option.data = newData;
								tempObject.option.series.push(item.params.option);
							}
						})
					}
					if(this.myChart) {
						if(this.editmode) {
							this.myChart.clear();
							this.myChart.setOption(tempObject.option);
						} else {
							this.myChart.setOption({
								series: tempObject.option.series
							});
							//							this.myChart.clear();
							//							this.myChart.setOption(tempObject.option);
						}
					} else {
						this.myChart = this.$echarts.init(document.getElementById(this.chartid));
						this.myChart.setOption(tempObject.option);
					}
					this.myChart && this.myChart.resize();
				}
			},
			/****
			 * 创建Bar3D数据格式
			 */
			createBar3DData(data, fields) {
				var len = data ? data.length : 0;
				if(len == 0) {
					return null;
				}
				if(fields == null || fields.length == 0) {
					return null;
				}
				var array = [];
				var name = findField(FNAME, fields);
				var lng = findField(FLNG, fields);
				var lat = findField(FLAT, fields);
				var value = findField(FVALUE, fields);
				var bRet = true;
				for(var i = 0; i < len; i++) {
					if(data[i].hasOwnProperty(value)) {
						var obj = {};
						//先判断经纬度字段
						if(data[i].hasOwnProperty(lng) && data[i].hasOwnProperty(lat)) {
							obj["value"] = [data[i][lng], data[i][lat], data[i][value]];
							if(data[i].hasOwnProperty(name)) {
								obj["name"] = data[i][name];
							}
							array.push(obj);
						} else if(data[i].hasOwnProperty(name)) //根据名称查找内置坐标数据
						{
							var temp = findCenterByName(data[i][name]);
							if(temp && temp.length == 2) {
								temp.push(data[i][value]);
								obj["value"] = temp;
								obj["name"] = data[i][name];
								array.push(obj);
							}
						}
					}
				}
				return array;
			},
			/****
			 * 创建Bar3D数据格式
			 */
			createLines3DData(data, fields) {
				var len = data ? data.length : 0;
				if(len == 0) {
					return null;
				}
				if(fields == null || fields.length == 0) {
					return null;
				}
				var array = [];
				var from = findField(LINES3D_FROM, fields);
				var to = findField(LINES3D_TO, fields);
				var bRet = true;
				for(var i = 0; i < len; i++) {

					if(data[i].hasOwnProperty(from) && data[i].hasOwnProperty(to)) {
						var obj = {};
						var start = data[i][from];
						var end = data[i][to];
						var tempArray1 = start.split(",");
						var tempArray2 = end.split(",");
						if(tempArray1 && tempArray1.length == 2 && tempArray2 && tempArray2.length == 2) {
							var startArray = [];
							startArray.push(Number(tempArray1[0]), Number(tempArray1[1]));
							var endArray = [];
							endArray.push(Number(tempArray2[0]), Number(tempArray2[1]));
							//obj.push(startArray, endArray);
							obj["coords"] = [startArray, endArray];
							array.push(obj);
						}
					}
				}
				return array;
			}
		}
	}
</script>

<style>

</style>