<template>
	<div style="height: calc(100% - 90px); ">
		<div class="right-component-item-header">
			<span @click="isRight=!isRight">
			<i class="el-icon-caret-right" v-show="isRight" ></i>
			<i class="el-icon-caret-bottom" v-show="!isRight" ></i>
			{{label}}接口</span>
			<span style="float:right; cursor:default;" v-show="isState"><i class="custom-iconfont icon-yuan" style="font-size:12px;color:#08C9C9"></i><span style="font-size:16px;color:#2c3e50">&nbsp;配置完成</span></span>
			<span style="float:right; cursor:default;" v-show="!isState"><i class="custom-iconfont icon-yuan" style="font-size:12px;color:#FF7218"></i><span style="font-size:16px;color:#2c3e50">&nbsp;配置未完成</span></span>
		</div>
		<div v-show="!isRight" class="right-component-item-content" style="height: calc(100% - 42px);display: flex;flex-direction: column;">
			<el-row class="right-component-item" :gutter="4" type="flex" align='middle' style="background-color: #e3eae9;padding: 8px 30px;">
				<el-col :span="4">
					字段
				</el-col>
				<el-col :span="8">
					映射
				</el-col>
				<el-col :span="8">
					说明
				</el-col>
				<el-col :span="4">
					状态
				</el-col>
			</el-row>
			<el-row class="right-component-item" :gutter="4" type="flex" align='middle'>
				<el-col :span="4">
					x
				</el-col>
				<el-col :span="8">
					<el-input v-model="params.data.fields.fieldX.target" placeholder="可自定义" size="small"></el-input>
				</el-col>
				<el-col :span="8">
					类目
				</el-col>
				<el-col :span="4">
					<span style="cursor:default;" v-show="isState"><i class="custom-iconfont icon-yuan" style="font-size:12px;color:#08C9C9"></i><span style="font-size:14px;color:#2c3e50">&nbsp;成功</span></span>
					<span style="cursor:default;" v-show="!isState"><i class="custom-iconfont icon-yuan" style="font-size:12px;color:#FF7218"></i><span style="font-size:14px;color:#2c3e50">&nbsp;失败</span></span>
				</el-col>
			</el-row>
			<el-row class="right-component-item" :gutter="4" type="flex" align='middle'>
				<el-col :span="4">
					y
				</el-col>
				<el-col :span="8">
					<el-input v-model="params.data.fields.fieldY.target" placeholder="可自定义" size="small"></el-input>
				</el-col>
				<el-col :span="8">
					数值
				</el-col>
				<el-col :span="4">
					<span style="cursor:default;" v-show="isState"><i class="custom-iconfont icon-yuan" style="font-size:12px;color:#08C9C9"></i><span style="font-size:14px;color:#2c3e50">&nbsp;成功</span></span>
					<span style="cursor:default;" v-show="!isState"><i class="custom-iconfont icon-yuan" style="font-size:12px;color:#FF7218"></i><span style="font-size:14px;color:#2c3e50">&nbsp;失败</span></span>
				</el-col>
			</el-row>
			<el-row class="right-component-item" :gutter="4" type="flex" align='middle'>
				<el-col :span="4">
					s
				</el-col>
				<el-col :span="8">
					<el-input v-model="params.data.fields.fieldS.target" placeholder="可自定义" size="small"></el-input>
				</el-col>
				<el-col :span="8">
					系列(可选)
				</el-col>
				<el-col :span="4">
					<span style="cursor:default;" v-show="isState"><i class="custom-iconfont icon-yuan" style="font-size:12px;color:#08C9C9"></i><span style="font-size:14px;color:#2c3e50">&nbsp;成功</span></span>
					<span style="cursor:default;" v-show="!isState"><i class="custom-iconfont icon-yuan" style="font-size:12px;color:#FF7218"></i><span style="font-size:14px;color:#2c3e50">&nbsp;失败</span></span>
				</el-col>
			</el-row>
			<el-row class="right-component-item" :gutter="4" type="flex" align='middle' style="border-top: solid 1px #DCDEE3;">
				<el-col :span="8">
					数据源类型：
				</el-col>
				<el-col :span="16">
					<el-select v-model="params.data.datasource.type" placeholder="请选择" size="small" style="width: 100%;" @change="dsChange">
						<el-option v-for="item in DataSourceType" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-col>
			</el-row>
			<!--文件组件-->
			<LocalFile v-if="params.data.datasource.type==2" class="right-component-item" @data-change="handleFileDataChange">

			</LocalFile>
			<!--静态数据-->
			<StaticJSON v-if="params.data.datasource.type==1||params.data.datasource.type==2" :json-data="text" @data-change="handleDataChange" class="right-component-item" style="flex:1;overflow-y: auto;">

			</StaticJSON>
			<!--数据库-->
			<DataBaseData v-if="params.data.datasource.type==3" class="right-component-item" style="flex:1;" :db-config="text">

			</DataBaseData>
			<!--API-->
			<APIData v-if="params.data.datasource.type==4" class="right-component-item" style="flex:1;" :api="params.data.datasource.api">

			</APIData>
			<el-row class="right-component-item" type="flex" align='middle' justify="center">
				<el-col :span="7">
					<el-checkbox v-model="params.data.autoUpdate">自动更新:</el-checkbox>
				</el-col>
				<el-col :span="2">
					&nbsp;&nbsp;每
				</el-col>
				<el-col :span="9">
					<el-input v-model="params.data.intervalTime" placeholder="请输入数字" size="small"></el-input>
				</el-col>
				<el-col :span="6">
					&nbsp;秒请求一次
				</el-col>
			</el-row>
			<el-row class="right-component-item" type="flex" align='middle' justify="center">
				<el-col :span="12">
					<el-button size="medium" style="color:#FFF;background-color:#106ba9;" @click.native="handleDataResult">查看数据响应结果</el-button>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
	import DataSourceType from '../../constants/DataSourceType.js'
	import LocalFile from '../base/LocalFile.vue'
	import StaticJSON from '../base/StaticJSON.vue'
	import DataBaseData from '../base/DataBaseData.vue'
	import APIData from '../base/APIData.vue'
	import { mapState } from 'vuex'
	const props = {
		label: {
			type: String,
			default: ''
		},
		params: {
			type: Object
		}
	}
	export default {
		message: "柱状图与折线图数据面板",
		name: "ChartBarOrLineData",
		props: props,
		data() {
			return {
				isRight: true,
				isState: true,
				DataSourceType: DataSourceType.type,
				text: null,
				_tempData: null
			}
		},
		mounted() {
			this.text = this.getTextData();
			this._tempData = this.text;
		},
		methods: {
			dsChange() {
				this.text = this.getTextData();
				this._tempData = this.text;
			},
			getTextData() {
				if(this.params.data.datasource.type == 1 || this.params.data.datasource.type == 2) //静态数据和CSV文件
				{
					var series = this.params.option.series;
					if(!series || series.length == 0) {
						this.$message.error('必需参数不全，无法获取数据！');
						return [];
					}
					var list = [];
					var fieldX = this.params.data.fields.fieldX.target ? this.params.data.fields.fieldX.target : this.params.data.fields.fieldX.source;
					var fieldY = this.params.data.fields.fieldY.target ? this.params.data.fields.fieldY.target : this.params.data.fields.fieldY.source;
					var fieldS = this.params.data.fields.fieldS.target ? this.params.data.fields.fieldS.target : this.params.data.fields.fieldS.source; //可选字段
					var axisDataTemp = null;
					if(this.params.option.xAxis.type == 'category') {
						axisDataTemp = this.params.option.xAxis.data;
					} else if(this.params.option.yAxis.type == 'category') {
						axisDataTemp = this.params.option.yAxis.data;
					}
					series && series.forEach((item2) => {
						if(this.params.option.xAxis.type == "time" || this.params.option.yAxis.type == "time") {
							item2.data && item2.data.forEach(item3 => {
								if(this.params.option.xAxis.type != "value") {
									var obj = {};
									obj[fieldX] = item3[0];
									obj[fieldY] = item3[1];
									obj[fieldS] = item2.name;
									list.push(obj);
								} else {
									var obj = {};
									obj[fieldX] = item3[1];
									obj[fieldY] = item3[0];
									obj[fieldS] = item2.name;
									list.push(obj);
								}
							})
						} else {
							axisDataTemp && axisDataTemp.forEach((tItem, index) => {
								var obj = {};
								if(item2.data && item2.data.length > 0) {
									obj[fieldX] = tItem;
									obj[fieldY] = item2.data[index];
									obj[fieldS] = item2.name;
									list.push(obj);
								} else {
									obj[fieldX] = tItem;
									obj[fieldY] = 0;
									obj[fieldS] = item2.name;
									list.push(obj);
								}
							})
						}
					})
					this.isState = true;
					return list;
				} else if(this.params.data.datasource.type == 3) //数据库模式
				{
					return this.validDataBase();
				} else if(this.params.data.datasource.type == 4) //API
				{
					return this.validAPI();
				}
			},
			/****
			 * 验证数据库
			 */
			validDataBase(bShowDialogResult) {
				var dbConfig = this.params.data.datasource.dbConfig;
				if(dbConfig && dbConfig.tableName) {
					var url = this.dbUrl + "/dboperation/v3/dboperation/selectrecord";
					var params = {
						tablename: dbConfig.tableName,
						fields: '*',
						filter: dbConfig.condition ? dbConfig.condition : ''
					};
					this.$fetch(url, params).then(repsone => {
						var data = repsone;
						if(data && data.status == 0) {
							var list = data.result;
							if(list && list.length > 0) {
								var fieldX = this.params.data.fields.fieldX.target ? this.params.data.fields.fieldX.target : this.params.data.fields.fieldX.source;
								var fieldY = this.params.data.fields.fieldY.target ? this.params.data.fields.fieldY.target : this.params.data.fields.fieldY.source;
								var fieldS = this.params.data.fields.fieldS.target ? this.params.data.fields.fieldS.target : this.params.data.fields.fieldS.source; //可选字段
								var bNotVaild = false;
								var count = list.length;
								for(var i = 0; i < count; i++) {
									if(!list[i].hasOwnProperty(fieldX) || !list[i].hasOwnProperty(fieldY) /*|| !data[i].hasOwnProperty(fieldS)*/ ) {
										bNotVaild = true;
										break;
									}
								}
								if(bNotVaild) {
									this.$message.error('数据字段匹配失败！');
									this.isState = false;
								} else {
									this.isState = true;
								}
							}
						} else {
							this.isState = false;
						}
						if(bShowDialogResult) {
							this.bus.$emit("dialog-data", data);
						}
					}).catch(error => {
						this.isState = false;
					});
				} else {
					this.isState = false;
				}
				return this.params.data.datasource.dbConfig;
			},
			//验证API数据源匹配是否成功
			validAPI(bShowDialogResult) {
				//var bRet = false;
				this.$fetch(this.params.data.datasource.api.rest).then(repsone => {
					var data = repsone;
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
							this.isState = false;
						} else {
							this.isState = true;
						}
						if(bShowDialogResult) {
							this.bus.$emit("dialog-data", data);
						}
					} else {
						this.isState = false;
					}
				}).catch(error => {
					this.isState = false;
				});
				return this.params.data.datasource.api;
			},
			//			//静态数据或CSV文件
			//			handleDataChange(data) {
			//				if(data) {
			//					var fieldX = this.params.data.fields.fieldX.target ? this.params.data.fields.fieldX.target : this.params.data.fields.fieldX.source;
			//					var fieldY = this.params.data.fields.fieldY.target ? this.params.data.fields.fieldY.target : this.params.data.fields.fieldY.source;
			//					var fieldS = this.params.data.fields.fieldS.target ? this.params.data.fields.fieldS.target : this.params.data.fields.fieldS.source;
			//					var count = data.length;
			//					var bNotVaild = false;
			//					for(var i = 0; i < count; i++) {
			//						if(!data[i].hasOwnProperty(fieldX) || !data[i].hasOwnProperty(fieldY) || !data[i].hasOwnProperty(fieldS)) {
			//							bNotVaild = true;
			//							break;
			//						}
			//					}
			//					if(bNotVaild) {
			//						this.$message.error('数据字段匹配失败！');
			//						this.isState = false;
			//						return;
			//					} else {
			//						this.isState = true;
			//						var XArray = [];
			//						for(var i = 0; i < count; i++) {
			//							if(data[i].hasOwnProperty(fieldX)) {
			//								if(XArray.indexOf(data[i][fieldX]) < 0) {
			//									XArray.push(data[i][fieldX]);
			//								}
			//							}
			//						}
			//						var len = XArray ? XArray.length : 0;
			//						if(this.params.option.xAxis[0].type == 'category') {
			//							this.params.option.xAxis[0].data = XArray;
			//							this.params.option.xAxis[1].data = XArray;
			//							this.params.option.yAxis[0].data = [];
			//							this.params.option.yAxis[1].data = [];
			//						} else if(this.params.option.yAxis[0].type == 'category') {
			//							this.params.option.yAxis[0].data = XArray;
			//							this.params.option.yAxis[1].data = XArray;
			//							this.params.option.xAxis[0].data = [];
			//							this.params.option.xAxis[1].data = [];
			//						}
			//						this.params.option.series && this.params.option.series.forEach((item) => {
			//							item.data = [];
			//							for(var j = 0; j < len; j++) {
			//								for(var i = 0; i < count; i++) {
			//									if(data[i].hasOwnProperty(fieldX) && data[i].hasOwnProperty(fieldY) && data[i].hasOwnProperty(fieldS)) {
			//										if(item.name == data[i][fieldS] && XArray[j] == data[i][fieldX]) {
			//											item.data.push(data[i][fieldY]);
			//											break;
			//										}
			//									}
			//								}
			//							}
			//						})
			//						this.text = data;
			//					}
			//				} else {
			//					this.$message.error('数据不能为空！');
			//				}
			//			}
			//判断一个对象是否是数组，参数不是对象或者不是数组，返回false
			isArray(obj) {
				if(typeof obj === 'object') {
					return Object.prototype.toString.call(obj) === '[object Array]';
				}
				return false;
			},
			dataChange(data, bFile) {
				if(data && this.isArray(data)) {
					var count = data.length;
					if(count == 0) {
						this.isState = false;
						this.$message.error('数据格式不正确为空！');
						return;
					}
					var fieldX = this.params.data.fields.fieldX.target ? this.params.data.fields.fieldX.target : this.params.data.fields.fieldX.source;
					var fieldY = this.params.data.fields.fieldY.target ? this.params.data.fields.fieldY.target : this.params.data.fields.fieldY.source;
					var fieldS = this.params.data.fields.fieldS.target ? this.params.data.fields.fieldS.target : this.params.data.fields.fieldS.source;
					var bNotVaild = false;
					for(var i = 0; i < count; i++) {
						if(!data[i].hasOwnProperty(fieldX) || !data[i].hasOwnProperty(fieldY) /*|| !data[i].hasOwnProperty(fieldS)*/ ) {
							bNotVaild = true;
							break;
						}
					}
					if(bNotVaild) {
						this.$message.error('数据字段匹配失败！');
						this.isState = false;
						return;
					} else {
						this.isState = true;
						if(bFile) {
							this.text = data;
						}
						this._tempData = data;
					}
				} else {
					this.isState = false;
					this.$message.error('数据格式不正确为空！');
				}
			},
			//CSV
			handleFileDataChange(data) {
				this.dataChange(data, true);
			},
			//静态数据
			handleDataChange(data) {
				this.dataChange(data, false);
			},
			//查看数据响应结果
			handleDataResult() {
				if(!this.isState) {
					this.$message.error('数据匹配失败，无法查看！');
					return;
				}
				if(this.params.data.datasource.type == 1 || this.params.data.datasource.type == 2) {
					this.text = this._tempData;
					var data = this.text;
					if(data && this.isArray(data)) {
						var count = data.length;
						if(count == 0) {
							//this.isState = false;
							this.$message.error('数据格式不正确为空！');
							return;
						}
						//系列不能为空
						if(!this.params.option.series || this.params.option.series.length == 0) {
							this.$message.error('数据系列不能为空！');
							return;
						}
						var fieldX = this.params.data.fields.fieldX.target ? this.params.data.fields.fieldX.target : this.params.data.fields.fieldX.source;
						var fieldY = this.params.data.fields.fieldY.target ? this.params.data.fields.fieldY.target : this.params.data.fields.fieldY.source;
						var fieldS = this.params.data.fields.fieldS.target ? this.params.data.fields.fieldS.target : this.params.data.fields.fieldS.source;
						var bNotVaild = false;
						for(var i = 0; i < count; i++) {
							if(!data[i].hasOwnProperty(fieldX) || !data[i].hasOwnProperty(fieldY) /* || !data[i].hasOwnProperty(fieldS)*/ ) {
								bNotVaild = true;
								break;
							}
						}
						if(bNotVaild) {
							this.$message.error('数据字段匹配失败！');
							//this.isState = false;
							return;
						} else {
							//this.isState = true;
							//备注:s要么每条记录都有，要么都没有
							if(this.params.option.xAxis.type == 'time' || this.params.option.yAxis.type == 'time') //时间轴坐标系处理
							{
								this.params.option.xAxis.data = [];
								this.params.option.yAxis.data = [];
								//清除数据
								var bHasSeries = data[0].hasOwnProperty(fieldS) ? true : false;
								var seriesNames = [];
								this.params.option.series && this.params.option.series.forEach((item) => {
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
								//时间轴S不起作用
								for(var i = 0; i < count; i++) {
									if(data[i].hasOwnProperty(fieldX) && data[i].hasOwnProperty(fieldY)) {

										if(this.params.option.xAxis.type == "value") {
											this.params.option.series[index44].data.push([data[i][fieldY], data[i][fieldX]]);
										} else {
											this.params.option.series[index44].data.push([data[i][fieldX], data[i][fieldY]]);
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
								if(this.params.option.xAxis.type == 'category') {
									this.params.option.xAxis.data = XArray;
									this.params.option.yAxis.data = [];
								}
								//else if(this.params.option.xAxis.type == 'time') {
								//	this.params.option.xAxis.data = [];
								//	this.params.option.yAxis.data = [];
								//} 
								else if(this.params.option.yAxis.type == 'category') {
									this.params.option.yAxis.data = XArray;
									this.params.option.xAxis.data = [];
								}
								var bHasSeries = data[0].hasOwnProperty(fieldS) ? true : false;
								//释放之前数据
								var seriesNames = [];
								this.params.option.series && this.params.option.series.forEach((item) => {
									item.data = [];
									seriesNames.push(item.name);
								})
								//系列不能为空，系列为顺序,不存在系列的数据不显示
								if(bHasSeries) {
									this.params.option.series && this.params.option.series.forEach((item) => {
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
											this.params.option.series[0].data.push(data[i][fieldY]);
										}
									}
								}
							}
						}
					} else {
						//this.isState = false;
						this.$message.error('数据格式不正确为空！');
					}
				} else if(this.params.data.datasource.type == 3) //数据库模式，目前未处理
				{
					this.validDataBase(true);

				} else if(this.params.data.datasource.type == 4) //API
				{
					this.validAPI(true);
				}
			}
		},
		computed: {
			//自动更新数据控制是否需要显示，只针对动态数据时有效
			isShowAutoUpdate() {
				return this.params.data.datasource.type == 1 || this.params.data.datasource.type == 2 ? false : true;
			},
			...mapState([
				'dbUrl', 'bus'
			])
		},
		components: {
			StaticJSON,
			LocalFile,
			DataBaseData,
			APIData

		},
		watch: {
			'params.option.series': {
				handler(newval, oldval) {
					this.text = this.getTextData();
					this._tempData = this.text;
				},
				deep: true
			},
			'params.option.xAxis': {
				handler(newval, oldval) {
					this.text = this.getTextData();
					this._tempData = this.text;
				},
				deep: true
			},
			"params.data.datasource.api.rest": {
				handler(newval, oldval) {
					this.text = this.getTextData();
					this._tempData = this.text;
				},
				deep: true
			},
			"params.data.datasource.dbConfig": {
				handler(newval, oldval) {
					this.text = this.getTextData();
					this._tempData = this.text;
				},
				deep: true
			},
			"params.data.fields": {
				handler(newVal) {
					this.text = this.getTextData();
					this._tempData = this.text;
				},
				deep: true
			},

		}
	}
</script>

<style>

</style>