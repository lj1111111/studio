<template>
	<div>
		<div class="right-component-item-header">
			<span @click="isRight=!isRight">
			<i class="el-icon-caret-right" v-show="isRight" ></i>
			<i class="el-icon-caret-bottom" v-show="!isRight" ></i>
			对齐设置</span>
		</div>
		<div v-show="!isRight" class="right-component-item-content">
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="8">
					水平对齐
				</el-col>
				<el-col :span="16" style="text-align: center;">
					<el-button-group>
						<el-button type="primary" size="small" class="custom-iconfont icon-zuoduiqi" title="左对齐" @click="hovLeft"></el-button>
						<el-button type="primary" size="small" class="custom-iconfont icon-chuizhijuzhongduiqi" title="水平居中" @click="hovCenter"></el-button>
						<el-button type="primary" size="small" class="custom-iconfont icon-youduiqi" title="右对齐" @click="hovRight"></el-button>
					</el-button-group>
				</el-col>
			</el-row>
			<el-row class="right-component-item" type="flex" align='middle' justify="center">
				<el-col :span="8">
					垂直对齐
				</el-col>
				<el-col :span="16" style="text-align: center;">
					<el-button-group>
						<el-button type="primary" size="small" class="custom-iconfont icon-shangduiqi" title="顶端对齐" @click="verTop"></el-button>
						<el-button type="primary" size="small" class="custom-iconfont icon-shuipingjuzhongduiqi" title="垂直居中" @click="verCenter"></el-button>
						<el-button type="primary" size="small" class="custom-iconfont icon-xiaduiqi" title="底端对齐" @click="verBottom"></el-button>
					</el-button-group>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
	import ACTION from '../../constants/OperateAction.js'
	const props = {
		location: {
			type: Object,
			default: () => {
				return {
					left: 0,
					top: 0,
					width: 0,
					height: 0
				}
			}
		}
	}
	export default {
		message: "对齐组件",
		name: "Align",
		props: props,
		data() {
			return {
				isRight: true
			}
		},
		mounted() {

		},
		methods: {
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

		},
		watch: {

		}
	}
</script>

<style>

</style>