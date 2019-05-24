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
			<!--字段 -->
			<Fields :fields="dataConfig.fields" :state="isState"></Fields>
			<!--数据源-->
			<el-row class="right-component-item" :gutter="4" type="flex" align='middle' style="border-top: solid 1px #DCDEE3;">
				<el-col :span="8">
					数据源类型：
				</el-col>
				<el-col :span="16">
					<el-select v-model="dataConfig.type" placeholder="请选择" size="small" style="width: 100%;" @change="datasourceChange">
						<el-option v-for="item in DataSourceType" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-col>
			</el-row>
			<component :is="currentView" :json-data="content" class="right-component-item" style="flex:1;overflow-y: auto;" :api="dataConfig.api" :db-config="dataConfig.dbConfig" @data-change="handleDataChange" @filechange="handleFileChange">

			</component>
			<el-row class="right-component-item" type="flex" align='middle' justify="center">
				<el-col :span="7">
					<el-checkbox v-model="dataConfig.autoUpdate">自动更新:</el-checkbox>
				</el-col>
				<el-col :span="2">
					&nbsp;&nbsp;每
				</el-col>
				<el-col :span="9">
					<el-input v-model="dataConfig.intervalTime" placeholder="请输入数字" size="small"></el-input>
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
	import Fields from '../data/Fields.vue'
	import CSVFile from '../data/CSVFile.vue'
	import StaticJSON from '../base/StaticJSON.vue'
	import DataBaseData from '../base/DataBaseData.vue'
	import APIData from '../base/APIData.vue'
	import { mapState } from 'vuex'
	const FFROM = "from";
	const FTO = "to";
	const props = {
		label: {
			type: String,
			default: ""
		},
		dataConfig: {
			type: Object,
			default: () => {
				return {}
			}
		}
	}
	export default {
		name: "BarD3Data",
		props: props,
		message: "3D柱状图数据设置组件",
		data() {
			return {
				isRight: false,
				isState: true,
				DataSourceType: DataSourceType.type,
				content: null,
				tempData: null
			}
		},
		mounted() {
			this.content = this.getData();
			this.tempData = this.content;
		},
		methods: {
			datasourceChange() {
				this.content = this.getData();
				this.tempData = this.content;
			},

			getField(fieldName) {
				var fields = this.dataConfig && this.dataConfig.fields;
				var name = "";
				var len = fields ? fields.length : 0;
				for(var i = 0; i < len; i++) {
					if(fieldName == fields[i].source) {
						name = fields[i].target ? fields[i].target : fields[i].source;
						break;
					}
				}
				return name;
			},
			//JSON数据
			handleDataChange(data) {
				this.tempData = data;
				this.isState = this.isStateSuccess(data);
				//		    	if(this.isState)
				//		    	{
				//		    		this.content=this.tempData;
				//		    	}
			},
			//文件改变
			handleFileChange(data) {
				this.tempData = data;
				this.isState = this.isStateSuccess(data);
				//		    	if(this.isState)
				//		    	{
				//		    		this.content=this.tempData;
				//		    	}
			},
			/***
			 * 判断参数配置是否成功
			 * return {Boolean} true 表示成功
			 */
			isStateSuccess(data) {
				/**
				 * true:条件每条记录匹配都成功，才算成功，value必需，name 和lng、lat之一组匹配成功就可以
				 */
				var len = data ? data.length : 0;
				var ffrom = this.getField(FFROM);
				var fto = this.getField(FTO);
				var bRet = true;
				for(var i = 0; i < len; i++) {
					if(data[i].hasOwnProperty(ffrom) && data[i].hasOwnProperty(fto)) {
						bRet = true;
					} else {
						bRet = false;
						break;
					}
				}
				return bRet;
			},
			getData() {
				if(this.dataConfig.type == DataSourceType.DS_STATIC || this.dataConfig.type == DataSourceType.DS_CSVFILE) //静态数据和CSV文件
				{
					var list = [];
					var tData = this.dataConfig.data;
					this.isState = this.isStateSuccess(tData);
					if(!this.isState) {
						this.$message.error('数据字段匹配失败！');
						return tData;
					}
					var ffrom = this.getField(FFROM);
					var fto = this.getField(FTO);
					var len = tData ? tData.length : 0;
					for(var i = 0; i < len; i++) {
						var temp = tData[i];
						var obj = {};
						var bl = false;
						if(ffrom in temp) {
							obj[ffrom] = temp[ffrom];
							bl = true;
						}
						if(fto in temp) {
							obj[fto] = temp[fto];
							bl = true;
						}
						if(bl) {
							list.push(obj);
						}
					}
					return list;
				} else if(this.dataConfig.type == DataSourceType.DS_DATABASE) //数据库模式
				{
					return this.validDataBase();
				} else if(this.dataConfig.type == DataSourceType.DS_API) //API
				{
					return this.validAPI();
				}
			},
			/****
			 * 验证数据库
			 */
			validDataBase(bShowDialogResult) {
				var dbConfig = this.dataConfig.dbConfig;
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
							this.isState = this.isStateSuccess(list);
							if(!this.isState) {
								this.$message.error('数据字段匹配失败！');
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
				return this.dataConfig.dbConfig;
			},
			//验证API数据源匹配是否成功
			validAPI(bShowDialogResult) {
				this.$fetch(this.dataConfig.api.rest).then(repsone => {
					var data = repsone;
					this.isState = this.isStateSuccess(data);
					if(!this.isState) {
						this.$message.error('数据字段匹配失败！');
					}
					if(bShowDialogResult) {
							this.bus.$emit("dialog-data", data);
						}
				}).catch(error => {
					this.isState = false;
				});
				return this.dataConfig.api;
			},
			//查看数据响应结果
			handleDataResult() {
				if(!this.isState) {
					this.$message.error('数据匹配失败，无法查看！');
					return;
				}
				if(this.dataConfig.type == 1 || this.dataConfig.type == 2) {
					this.content = this.tempData;
					this.dataConfig.data = this.content
				} else if(this.dataConfig.type == 3) //数据库模式
				{
					this.validDataBase(true);
				} else if(this.dataConfig.type == 4) //API
				{
					this.validAPI(true);
				}
			}
		},
		computed: {
			currentView() {
				if(this.dataConfig.type == 1) //静态数据
				{
					return "StaticJSON";
				} else if(this.dataConfig.type == 2) //文件数据源
				{
					return "CSVFile";
				} else if(this.dataConfig.type == 3) //数据库
				{
					return "DataBaseData";
				} else if(this.dataConfig.type == 4) //API
				{
					return "APIData";
				} else {
					return "";
				}
			},
			...mapState([
				'dbUrl','bus'
			])
		},
		components: {
			Fields,
			StaticJSON,
			CSVFile,
			DataBaseData,
			APIData
		},
		watch: {
			"dataConfig.fields": {
				handler(newVal) {
					this.content = this.getData();
					this.tempData = this.content;
				},
				deep: true
			},
			"dataConfig.api": {
				handler(newVal) {
					this.content = this.getData();
					this.tempData = this.content;
				},
				deep: true
			},
			"dataConfig.dbConfig": {
				handler(newVal) {
					this.content = this.getData();
					this.tempData = this.content;
				},
				deep: true
			}
		}
	}
</script>

<style>

</style>