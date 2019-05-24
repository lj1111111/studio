import common from '../../mixins/common.js'
//import { isdatetime } from '../../utils/dateUtil.js'
import moment from 'moment'
import { mapState } from 'vuex'
const deepClone = (obj) => {
	return JSON.parse(JSON.stringify(obj));
}

function isInteger(obj) {
	return typeof obj === 'number' && obj % 1 === 0; //是整数，则返回true，否则返回false  
}
var axisFormat = null;

function isdatetime(str) {

	if(str.length != 0) {
		var reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/;
		var r = str.match(reg);
		if(r == null) {
			return false;
		} else {
			return true;
		}
	} else {
		return false;
	}
}

function dataformat(value) {
	var bRet = isdatetime(value);
	if(bRet) {
		return moment(value, axisFormat.responseFormat).format(axisFormat.showFormat);
	} else {
		return value;
	}
}
//时间戳
function dataformat2(value) {
	var sss = moment(value).format(axisFormat.showFormat);
	return sss;
}
///**
//*这里需要先用Number进行数据类型转换，然后去指定截取转换后的小数点后几位(按照四舍五入)，这里是截取一位，0.1266转换后会变成12.7%
//*/
//const toPercent=(point)=>{
//  var str=Number(point*100).toFixed(1);
//  str+="%";
//  return str;
//}
/***
 * 图表实现
 */
export default {
	mixins: [common],
	data() {
		return {
			interval: null,
			mChart: undefined
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

				if(this.params.data.datasource.type == 3) //数据库模式
				{
					this.dowithDataBase(); //调用子mixin
					var func = this.dowithDataBase;
					if(newval.data.autoUpdate) {
						var t = isInteger(newval.data.intervalTime);
						if(t) {
							this.interval = setInterval(this.dowithDataBase, newval.data.intervalTime * 1000);
						} else {
							this.interval = setInterval(this.dowithDataBase, 5 * 1000);
						}
					}

				} else if(this.params.data.datasource.type == 4) //API
				{
					this.dowithAPI(); //调用子mixin
					var func = this.dowithAPI;
					if(newval.data.autoUpdate) {
						var t = isInteger(newval.data.intervalTime);
						if(t) {
							this.interval = setInterval(this.dowithAPI, newval.data.intervalTime * 1000);
						} else {
							this.interval = setInterval(this.dowithAPI, 5 * 1000);
						}
					}
				} else {
					var params2 = deepClone(this.params);
					this.formatAxis(params2);
					this.myChart.setOption(params2.option);
				}
			})
		},
		//格式化显示坐标轴数据
		formatAxis(params2) {
			var params = params2.option;
			axisFormat = params2.data.dataFormat;
			if(params.xAxis.type == "time") {
				params.xAxis.axisLabel.formatter = dataformat2;
				delete params.yAxis.axisLabel.formatter;
			} else if(params.xAxis.type == "category") {
				params.xAxis.axisLabel.formatter = dataformat;
				delete params.yAxis.axisLabel.formatter;
			} else {
				if(params.yAxis.type == "time") {
					params.yAxis.axisLabel.formatter = dataformat2;
					delete params.xAxis.axisLabel.formatter;
				} else if(params.yAxis.type == "category") {
					params.yAxis.axisLabel.formatter = dataformat;
					delete params.xAxis.axisLabel.formatter;
				}
			}
		},
		//重置Chart容器大小
		resize(newval) {
			this.$nextTick(() => {
				var d = 0;
				let chartdiv = document.getElementById(this.chartid);
				chartdiv.style.width = (newval.width - d) + "px";
				chartdiv.style.height = (newval.height - d) + "px";
				this.myChart && this.myChart.resize();
			})
		},
		dowithAPI() {
			var params = deepClone(this.params);
			this.formatAxis(params);
			this.$fetch(params.data.datasource.api.rest).then(repsone => {
				var data = repsone;
				if(data && data.length > 0) {
					var fieldX = params.data.fields.fieldX.target ? params.data.fields.fieldX.target : params.data.fields.fieldX.source;
					var fieldY = params.data.fields.fieldY.target ? params.data.fields.fieldY.target : params.data.fields.fieldY.source;
					var fieldS = params.data.fields.fieldS.target ? params.data.fields.fieldS.target : params.data.fields.fieldS.source; //可选字段
					var bNotVaild = false;
					var count = data.length;
					for(var i = 0; i < count; i++) {
						if(!data[i].hasOwnProperty(fieldX) || !data[i].hasOwnProperty(fieldY) /*|| !data[i].hasOwnProperty(fieldS)*/ ) {
							bNotVaild = true;
							break;
						}
					}
					if(bNotVaild) {
						this.$message.error('数据字段匹配失败！');
					} else {
						//this.isState = true;
						//备注:s要么每条记录都有，要么都没有
						if(params.option.xAxis.type == 'time' || params.option.yAxis.type == 'time') //时间轴坐标系处理
						{
							params.option.xAxis.data = [];
							params.option.yAxis.data = [];
							//清除数据
							var bHasSeries = data[0].hasOwnProperty(fieldS) ? true : false;
							var seriesNames = [];
							params.option.series && params.option.series.forEach((item) => {
								item.data = [];
								seriesNames.push(item.name);
							})
							var index44 = 0;
							if(bHasSeries) {
								index44 = seriesNames.indexOf(data[0][fieldS]);
							}
							if(index44 < 0) {
								index44 = 0;
							}
							for(var i = 0; i < count; i++) {
								if(data[i].hasOwnProperty(fieldX) && data[i].hasOwnProperty(fieldY)) {
									if(params.option.xAxis.type == "value") {
										params.option.series[index44].data.push([data[i][fieldY], data[i][fieldX]]);
									} else {
										params.option.series[index44].data.push([data[i][fieldX], data[i][fieldY]]);
									}
								}
							}
						} else {
							var XArray = [];
							for(var i = 0; i < count; i++) {
								if(data[i].hasOwnProperty(fieldX)) {
									if(XArray.indexOf(data[i][fieldX]) < 0) {
										XArray.push(data[i][fieldX]);
									}
								}
							}
							var len = XArray ? XArray.length : 0;
							if(params.option.xAxis.type == 'category') {
								params.option.xAxis.data = XArray;
								params.option.yAxis.data = [];
							}
							//else if(this.params.option.xAxis.type == 'time') {
							//	this.params.option.xAxis.data = [];
							//	this.params.option.yAxis.data = [];
							//} 
							else if(params.option.yAxis.type == 'category') {
								params.option.yAxis.data = XArray;
								params.option.xAxis.data = [];
							}
							var bHasSeries = data[0].hasOwnProperty(fieldS) ? true : false;
							//释放之前数据
							var seriesNames = [];
							params.option.series && params.option.series.forEach((item) => {
								item.data = [];
								seriesNames.push(item.name);
							})
							//系列不能为空，系列为顺序,不存在系列的数据不显示
							if(bHasSeries) {
								params.option.series && params.option.series.forEach((item) => {
									item.data = [];
									for(var j = 0; j < len; j++) {
										for(var i = 0; i < count; i++) {
											if(data[i].hasOwnProperty(fieldX) && data[i].hasOwnProperty(fieldY) && data[i].hasOwnProperty(fieldS)) {
												if(item.name == data[i][fieldS] && XArray[j] == data[i][fieldX]) {
													item.data.push(data[i][fieldY]);
													break;
												}
											}
										}
									}
								})
							} else {
								for(var i = 0; i < count; i++) {
									if(data[i].hasOwnProperty(fieldX) && data[i].hasOwnProperty(fieldY)) {
										params.option.series[0].data.push(data[i][fieldY]);
									}
								}
							}
						}
					}
					this.myChart.setOption(params.option);
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
		//处理数据库数据源
		dowithDataBase() {
			var params = deepClone(this.params);
			this.formatAxis(params);
			var dbConfig = params.data.datasource.dbConfig;
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
							var fieldX = this.params.data.fields.fieldX.target ? this.params.data.fields.fieldX.target : this.params.data.fields.fieldX.source;
							var fieldY = this.params.data.fields.fieldY.target ? this.params.data.fields.fieldY.target : this.params.data.fields.fieldY.source;
							var fieldS = this.params.data.fields.fieldS.target ? this.params.data.fields.fieldS.target : this.params.data.fields.fieldS.source; //可选字段
							var bNotVaild = false;
							var count = data.length;
							for(var i = 0; i < count; i++) {
								if(!data[i].hasOwnProperty(fieldX) || !data[i].hasOwnProperty(fieldY) /*|| !data[i].hasOwnProperty(fieldS)*/ ) {
									bNotVaild = true;
									break;
								}
							}
							if(bNotVaild) {
								this.$message.error('数据字段匹配失败！');
							} else {
								//this.isState = true;
								//备注:s要么每条记录都有，要么都没有
								if(params.option.xAxis.type == 'time' || params.option.yAxis.type == 'time') //时间轴坐标系处理
								{
									params.option.xAxis.data = [];
									params.option.yAxis.data = [];
									//清除数据
									var bHasSeries = data[0].hasOwnProperty(fieldS) ? true : false;
									var seriesNames = [];
									params.option.series && params.option.series.forEach((item) => {
										item.data = [];
										seriesNames.push(item.name);
									})
									var index44 = 0;
									if(bHasSeries) {
										index44 = seriesNames.indexOf(data[0][fieldS]);
									}
									if(index44 < 0) {
										index44 = 0;
									}
									for(var i = 0; i < count; i++) {
										if(data[i].hasOwnProperty(fieldX) && data[i].hasOwnProperty(fieldY)) {
											if(params.option.xAxis.type == "value") {
												params.option.series[index44].data.push([data[i][fieldY], data[i][fieldX]]);
											} else {
												params.option.series[index44].data.push([data[i][fieldX], data[i][fieldY]]);
											}
										}
									}
								} else {
									var XArray = [];
									for(var i = 0; i < count; i++) {
										if(data[i].hasOwnProperty(fieldX)) {
											if(XArray.indexOf(data[i][fieldX]) < 0) {
												XArray.push(data[i][fieldX]);
											}
										}
									}
									var len = XArray ? XArray.length : 0;
									if(params.option.xAxis.type == 'category') {
										params.option.xAxis.data = XArray;
										params.option.yAxis.data = [];
									}
									//else if(this.params.option.xAxis.type == 'time') {
									//	this.params.option.xAxis.data = [];
									//	this.params.option.yAxis.data = [];
									//} 
									else if(params.option.yAxis.type == 'category') {
										params.option.yAxis.data = XArray;
										params.option.xAxis.data = [];
									}
									var bHasSeries = data[0].hasOwnProperty(fieldS) ? true : false;
									//释放之前数据
									var seriesNames = [];
									params.option.series && params.option.series.forEach((item) => {
										item.data = [];
										seriesNames.push(item.name);
									})
									//系列不能为空，系列为顺序,不存在系列的数据不显示
									if(bHasSeries) {
										params.option.series && params.option.series.forEach((item) => {
											item.data = [];
											for(var j = 0; j < len; j++) {
												for(var i = 0; i < count; i++) {
													if(data[i].hasOwnProperty(fieldX) && data[i].hasOwnProperty(fieldY) && data[i].hasOwnProperty(fieldS)) {
														if(item.name == data[i][fieldS] && XArray[j] == data[i][fieldX]) {
															item.data.push(data[i][fieldY]);
															break;
														}
													}
												}
											}
										})
									} else {
										for(var i = 0; i < count; i++) {
											if(data[i].hasOwnProperty(fieldX) && data[i].hasOwnProperty(fieldY)) {
												params.option.series[0].data.push(data[i][fieldY]);
											}
										}
									}
								}
							}
							this.myChart.setOption(params.option);
						} else {
							this.$message.error('无数据！');
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
	},
	computed: {
		chartid() {
			return 'EChart_' + this.ukey;
		},
		...mapState([
			'dbUrl'
		])
	},
	mounted() {
		this.init(this.chartid, this.params);
	},
	watch: {
		'params': {
			handler(curVal, oldVal) {　　　　　　　　　　　　
				this.init(this.chartid, curVal);　　　　　　　　
			},
			deep: true
		},
		location: {
			handler(curVal, oldVal) {　　　　　　　　　　　　
				this.resize(curVal);　　　　
			},
			deep: true
		}
	}
}