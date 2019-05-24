<template>
	<div style="display: flex; flex-direction: column;">
		<el-row type="flex" align='middle' class="row-item">
			<el-col :span="8">
				选择表名称：
			</el-col>
			<el-col :span="16">
				<el-select v-model="dbConfig.id" placeholder="请选择" size="small" style="width: 100%;" @change="tableChange">
					<el-option v-for="item in tables" :key="item.id" :label="item.alias" :value="item.id">
					</el-option>
				</el-select>
			</el-col>
		</el-row>
		<el-row type="flex" align='middle' class="row-item" style="padding: 8px 0px;">
			<el-col :span="8">
				字段列表：
			</el-col>
		</el-row>
		<el-row class="right-component-item"  type="flex" align='middle' style="background-color: #3883fa;padding: 8px 20px;color:#FFF;">
			<el-col :span="12">
				名称
			</el-col>
			<el-col :span="12">
				类型
			</el-col>
		</el-row>
		<div style="overflow-y: auto;flex:3;border: #3883fa solid 1px;background-color: #FFF;">
			<el-row v-for="(item,index)  in fields"  align='middle' :key="index" type="flex" class="right-component-item" style="padding: 8px 20px;" :class="[index%2!=0?'f-bg':'']">
				<el-col :span="12">
					{{item.name}}
				</el-col>
				<el-col :span="12">
					{{item.type}}
				</el-col>
			</el-row>
		</div>
		<el-row type="flex" align='middle' class="row-item" style="padding: 8px 0px;">
			<el-col :span="8">
				查询条件：
			</el-col>
		</el-row>
		<div style="flex:1;">
			<textarea style="height:100%;width: 100%;font-size: 16px;line-height:1.5;" v-model="dbConfig.condition"></textarea>
		</div>
	</div>
</template>

<script>
	import { mapState } from 'vuex'
	import service from '../../api/service.js'
	const props = {
		dbConfig: {
			type: Object,
			default: () => {
				return {
					id:1,
					tableName: '', //表名 
					condition: '' //查询条件
				}
			}
		}
	}
	export default {
		message: '数据库组件',
		name: "DataBaseDataV2",
		props: props,
		data() {
			return {
				tables: [],
				fields: []
			}
		},
		mounted(){
			this.init();
		},
		methods: {
			init(){
				this.getTables();
			},
			//获取用户表数据列表
			getTables() {
				var url = this.dbRestUrl + service.USER_DATASOURCE_LIST;
				var params = {
					uid: this.uid
				};
				this.$fetch(url, params).then(repsone => {
					if(repsone && repsone.code==200 && repsone.data)
					{
						this.tables= repsone.data;
						this.tableChange(this.dbConfig.id);
					}
					else
					{
						this.$message.error('数据库服务失败！');
						this.tables=[];
						this.fields=[];
					}
				}).catch(error => {
					this.$message.error('数据库服务失败！');
					this.tables=[];
					this.fields=[];
				});
			},
			//表change
			tableChange(id) {
				var fields=[];
				this.fields=[];
				var url = this.dbRestUrl + service.USER_DATASOURCE_FIELDS+"/"+id;
				this.$fetch(url).then(repsone => {
					if(repsone && repsone.code==200 && repsone.data)
					{
						this.fields=repsone.data;
						//this.tableChange(this.dbConfig.id);
					}
					else
					{
						this.$message.error('字段获取失败！');
						this.fields=[];
					}
				}).catch(error => {
					this.$message.error('字段获取失败！');
					this.fields=[];
				});
				
				
//				var len=this.tables?this.tables.length:0;
//				for(var i=0;i<len;i++)
//				{
//					if(this.tables[i].name==item)
//					{
//						fields=this.tables[i].fieldsjson;
//					}
//				}
//				this.fields=[];
//              fields && fields.forEach((item)=>{
//              	switch(item.type)
//              	{
//              		case "integer":
//              		{
//              			this.fields.push({"name":item.name,"type":"整数型"});
//              			break;
//              		}
//              		case "double":
//              		{
//              			this.fields.push({"name":item.name,"type":"小数型"});
//              			break;
//              		}case "varchar":
//              		{
//              			this.fields.push({"name":item.name,"type":"文本型"});
//              			break;
//              		}case "datetime":
//              		{
//              			this.fields.push({"name":item.name,"type":"日期型"});
//              			break;
//              		}
//              	}
//              })
			}
		},
		components: {

		},
		computed: {
			...mapState([
				'dbUrl', 'uid',"dbRestUrl"
			])
		},
	}
</script>

<style>
	.row-item {
		font-size: 14px;
		/*padding: 4px 0px;*/
	}
	
	.f-bg {
		background-color: #ebebeb;
	}
</style>