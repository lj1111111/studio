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
			<!--静态数据或CSV数据-->
			<StaticJSON v-if="params.data.datasource.type==1||params.data.datasource.type==2" :json-data="text" @data-change="handleDataChange" class="right-component-item" style="flex:1;overflow-y: auto;">

			</StaticJSON>
			<!--数据库-->
			<DataBaseData v-if="params.data.datasource.type==3" class="right-component-item" style="flex:1;" :sql="text">

			</DataBaseData>
			<!--API-->
			<APIData v-if="params.data.datasource.type==4" class="right-component-item" style="flex:1;" :rest="text">

			</APIData>
			<el-row class="right-component-item" type="flex" align='middle' justify="center">
				<el-col :span="8">
					<el-checkbox v-model="params.data.autoUpdate">自动更新</el-checkbox>
				</el-col>
				<el-col :span="16">
					<el-button size="medium" style="color:#FFF;background-color:#106ba9;" @click.native="handleDataResult">查看数据响应结果</el-button>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
	/****
	 * 已废弃，改用Datasource.vue 组件 
	 */
	import DataSourceType from '../../constants/DataSourceType.js'
	import LocalFile from '../base/LocalFile.vue'
	import StaticJSON from '../base/StaticJSON.vue'
	import DataBaseData from '../base/DataBaseData.vue'
	import APIData from '../base/APIData.vue'
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
		message: "饼图数据面板",
		name: "PieData",
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
					var list = [];
					var fieldX = this.params.data.fields.fieldX.target ? this.params.data.fields.fieldX.target : this.params.data.fields.fieldX.source;
					var fieldY = this.params.data.fields.fieldY.target ? this.params.data.fields.fieldY.target : this.params.data.fields.fieldY.source;
					if(series && series.length > 0 && series[0].data && series[0].data) {
						series[0].data.forEach((item) => {
							var obj = {};
							obj[fieldX] = item.name;
							obj[fieldY] = item.value;
							list.push(obj);
						})
					}
					this.isState = true;
					return list;
				} else if(this.params.data.datasource.type == 3) //数据库模式，目前未处理
				{
					this.isState = true;
					return "";
				} else if(this.params.data.datasource.type == 4) //API，目前未处理
				{
					this.isState = true;
					return "";
				}
			},
			//			//静态数据或CSV文件
			//			handleDataChange(data) {
			//				if(data) {
			//					var fieldX = this.params.data.fields.fieldX.target ? this.params.data.fields.fieldX.target : this.params.data.fields.fieldX.source;
			//					var fieldY = this.params.data.fields.fieldY.target ? this.params.data.fields.fieldY.target : this.params.data.fields.fieldY.source;
			//					var count = data.length;
			//					var bNotVaild = false;
			//					for(var i = 0; i < count; i++) {
			//						if(!data[i].hasOwnProperty(fieldX) || !data[i].hasOwnProperty(fieldY)) {
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
			//						this.params.option.series[0].data && this.params.option.series[0].data.forEach((item) => {
			//							for(var i = 0; i < count; i++) {
			//								if(data[i].hasOwnProperty(fieldX) && data[i].hasOwnProperty(fieldY)) {
			//									if(item.name==data[i][fieldX])
			//									{
			//										item.value=data[i][fieldY];
			//										break;
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
			//
			dataChange(data,bFile){
				if(data && this.isArray(data)) {
					var count = data.length;
					if(count == 0) {
						this.isState = false;
						this.$message.error('数据格式不正确为空！');
						return;
					}
					var fieldX = this.params.data.fields.fieldX.target ? this.params.data.fields.fieldX.target : this.params.data.fields.fieldX.source;
					var fieldY = this.params.data.fields.fieldY.target ? this.params.data.fields.fieldY.target : this.params.data.fields.fieldY.source;
					var bNotVaild = false;
					for(var i = 0; i < count; i++) {
						if(!data[i].hasOwnProperty(fieldX) || !data[i].hasOwnProperty(fieldY)) {
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
						if(bFile)
						{
							this.text = data;
						}
						this._tempData = data;
					}
				} else {
					this.isState = false;
					this.$message.error('数据格式不正确！');
				}
			},
			//静态数据
			handleDataChange(data) {
				this.dataChange(data,false)
			},
			//CSV
			handleFileDataChange(data) {
				this.dataChange(data,true)
			},
			//查看数据响应结果
			handleDataResult() {
				if(!this.isState) {
					this.$message.error('数据匹配失败，无法查看！');
					return;
				}
				this.text = this._tempData;
				if(this.params.data.datasource.type == 1 || this.params.data.datasource.type == 2) {
					var data = this.text;
					if(data && this.isArray(data)) {
						var count = data.length;
						if(count == 0) {
							this.isState = false;
							this.$message.error('数据格式不正确为空！');
							return;
						}
						var fieldX = this.params.data.fields.fieldX.target ? this.params.data.fields.fieldX.target : this.params.data.fields.fieldX.source;
						var fieldY = this.params.data.fields.fieldY.target ? this.params.data.fields.fieldY.target : this.params.data.fields.fieldY.source;
						var bNotVaild = false;
						for(var i = 0; i < count; i++) {
							if(!data[i].hasOwnProperty(fieldX) || !data[i].hasOwnProperty(fieldY)) {
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
							//数据X值必需在Series中
							this.params.option.series[0].data && this.params.option.series[0].data.forEach((item) => {
								for(var i = 0; i < count; i++) {
									if(data[i].hasOwnProperty(fieldX) && data[i].hasOwnProperty(fieldY)) {
										if(item.name == data[i][fieldX]) {
											item.value = data[i][fieldY];
											break;
										}
									}
								}
							})
						}
					} else {
						this.isState = false;
						this.$message.error('数据格式不正确为空！');
					}
				} else if(this.params.data.datasource.type == 3) //数据库模式，目前未处理
				{
					this.$message({
						message: '正在开发中...',
						type: 'warning'
					});

				} else if(this.params.data.datasource.type == 4) //API，目前未处理
				{
					this.$message({
						message: '正在开发中...',
						type: 'warning'
					});
				}
			}
		},
		computed: {
			//自动更新数据控制是否需要显示，只针对动态数据时有效
			isShowAutoUpdate() {
				return this.params.data.datasource.type == 1 || this.params.data.datasource.type == 2 ? false : true;
			}
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
			}
		}
	}
</script>

<style>

</style>