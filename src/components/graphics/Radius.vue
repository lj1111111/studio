<template>
	<div>
		<div class="right-component-item-header">
			<span @click="isRight=!isRight">
			<i class="el-icon-caret-right" v-show="isRight" ></i>
			<i class="el-icon-caret-bottom" v-show="!isRight" ></i>
			圆角</span>
		</div>
		<div v-show="!isRight" class="right-component-item-content">
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="8">
					左上角
				</el-col>
				<el-col :span="16">
					<el-input-number v-model="borderRadius.borderTopLeftRadius" :min="0" controls-position="right"></el-input-number>
				</el-col>
			</el-row>
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="8">
					左下角
				</el-col>
				<el-col :span="16">
					<el-input-number v-model="borderRadius.borderBottomLeftRadius" :min="0" controls-position="right"></el-input-number>
				</el-col>
			</el-row>
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="8">
					右上角
				</el-col>
				<el-col :span="16">
					<el-input-number v-model="borderRadius.borderTopRightRadius" :min="0" controls-position="right"></el-input-number>
				</el-col>
			</el-row>
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="8">
					右下角
				</el-col>
				<el-col :span="16">
					<el-input-number v-model="borderRadius.borderBottomRightRadius" :min="0" controls-position="right"></el-input-number>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
	const props = {
		borderRadius: {
			type: Object,
			default: () => {
				return {
					borderTopLeftRadius: 0, //左上
					borderBottomLeftRadius: 0, //左下
					borderTopRightRadius: 0, //右上
					borderBottomRightRadius: 0 //右下
				}
			}
		}
	}
	export default {
		message: "圆角组件",
		name: "Radius",
		props: props,
		data() {
			return {
				isRight: true
			}
		},
		mounted() {

		},
		methods: {

		},
		watch: {

		}
	}
</script>

<style>
	.el-input-number {
		width: 100%
	}
</style>