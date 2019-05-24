<template>
	<div>
		<div class="aside-header">
			排列布局
		</div>
		<el-row class="split-item" type="flex" align='middle'  justify="center" style="text-align: center;">
			<el-col :span="8">
				水平对齐
			</el-col>
			<el-col :span="16">
				<el-button-group  >
					<el-button type="primary" size="small"  class="custom-iconfont icon-zuoduiqi" title="左对齐" @click="hovLeft"></el-button>
					<el-button type="primary" size="small"  class="custom-iconfont icon-chuizhijuzhongduiqi" title="水平居中" @click="hovCenter"></el-button>
					<el-button type="primary" size="small"  class="custom-iconfont icon-youduiqi" title="右对齐" @click="hovRight"></el-button>
				</el-button-group>
			</el-col>
		</el-row>
		<el-row class="split-item" type="flex" align='middle'  justify="center" style="text-align: center;">
			<el-col :span="8">
				垂直对齐
			</el-col>
			<el-col :span="16">
				<el-button-group>
					<el-button type="primary" size="small"  class="custom-iconfont icon-shangduiqi" title="顶端对齐" @click="verTop"></el-button>
					<el-button type="primary" size="small"  class="custom-iconfont icon-shuipingjuzhongduiqi" title="垂直居中"  @click="verCenter"></el-button>
					<el-button type="primary" size="small"  class="custom-iconfont icon-xiaduiqi" title="底端对齐" @click="verBottom"></el-button>
				</el-button-group>
			</el-col>
		</el-row>
		<el-row class="split-item" type="flex" align='middle'  justify="start" style="text-align: center;">
			<el-col :span="8">
				排列分布
			</el-col>
			<el-col :span="16">
				<el-button-group>
					<el-button type="primary" size="small"  class="custom-iconfont icon-shangduiqi" title="水平分布" @click="locHOR"></el-button>
					<el-button type="primary" size="small"  class="custom-iconfont icon-shuipingjuzhongduiqi" title="垂直分布" @click="locVER"></el-button>
					<!--<el-button type="primary" size="small"  class="custom-iconfont icon-xiaduiqi" title="平均分布" @click="locAVG"></el-button>-->
				</el-button-group>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import ACTION from '../constants/OperateAction.js'
	export default {
		name: 'AlignSetting',
		message: '排列布局',
		data() {
			return {}
		},
		methods:{
			sendAction(optype){
				this.$emit("opaction",optype);
			},
			hovLeft(){
				this.sendAction(ACTION.OP_HOR_LEFT);
			},
			hovCenter(){
				this.sendAction(ACTION.OP_HOR_CENTER);
			},
			hovRight(){
				this.sendAction(ACTION.OP_HOR_RIGHT);
			},
			verTop(){
				this.sendAction(ACTION.OP_VER_TOP);
			},
			verCenter(){
				this.sendAction(ACTION.OP_VER_CENTER);
			},
			verBottom(){
				this.sendAction(ACTION.OP_VER_BOTTOM);
			},
			locHOR(){
				this.sendAction(ACTION.OP_LOC_HOR);
			},
			locVER(){
				this.sendAction(ACTION.OP_LOC_VER);
			},
			locAVG(){
				this.sendAction(ACTION.OP_LOC_AVG);
			}
		}
	}
</script>

<style scoped>
	.aside-header {
		text-align: center;
		padding: 8px;
		background-color: #FBFDFF;
		border-bottom: solid 1px #DCDEE3;
		font-size: 18px;
	}
	
	.split-item {
		margin-left: 10px;
		padding: 10px;
		border-bottom: solid 1px #DCDEE3;
	}
	
	.split-item-last {
		margin-left: 10px;
		padding: 10px;
	}
	
	.split-item-radio-top {
		/*margin-left: 10px;*/
		padding-top: 10px;
	}
	
	.split-item-bg-img-container {
		display: flex;
		border: 1px dashed #BBBBBB;
		border-radius: 4px;
		flex-direction: column;
		align-items: center;
		padding: 10px;
	}
	
	.split-item-bg-img-container:hover {
		border-color: #66B1FF;
	}
	
	.split-item-bg-img-container>div:first-child {
		width: 60%;
		height: 80px;
		background-color: #0E2A42;
	}
	
	.split-item-bg-img-container>div:last-child {
		text-align: center;
		padding-top: 5px;
		cursor: pointer;
		color: #0d9dff ;/*#606266;*/
		font-size: 14px;
	}
</style>