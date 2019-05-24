<template>
	<div>
		<div class="right-component-item-header">
			<span @click="isRight=!isRight">
			<i class="el-icon-caret-right" v-show="isRight" ></i>
			<i class="el-icon-caret-bottom" v-show="!isRight" ></i>
			图形位置</span>
		</div>
		<div v-show="!isRight" class="right-component-item-content">
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="8">
					中心点X
				</el-col>
				<el-col :span="16">
					<el-input v-model="center[0]" placeholder="请输入内容"></el-input>
				</el-col>
			</el-row>
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="8">
					中心点Y
				</el-col>
				<el-col :span="16">
					<el-input v-model="center[1]" placeholder="请输入内容"></el-input>
				</el-col>
			</el-row>
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="8">
					半径
				</el-col>
				<el-col :span="16">
					<el-input v-model="radius[1]" placeholder="请输入内容"></el-input>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
	import ColorPicker from './ColorPicker.vue'
	const props = {
		center:{
			type:Array,
			default:()=>{
				return ['50%', '50%'];
			}
		},
		radius:{
			type:Array,
			default:()=>{
				return [0, '75%'];
			}
		}
	}
	export default {
		message: "饼图圆心和半径",
		name: "ChartPosition",
		props: props,
		data() {
			return {
				isRight: true
			}
		},
		components: {
			ColorPicker
		}

	}
</script>

<style>

</style>