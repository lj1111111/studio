<template>
	<div>
		<el-row class="right-component-item" type="flex" align='middle'>
			<el-col :span="8">
				文本样式
			</el-col>
		</el-row>
		<el-row class="right-component-item" type="flex" align='middle'>
			<el-col :span="8">
				&nbsp;&nbsp;&nbsp;&nbsp;字号
			</el-col>
			<el-col :span="16">
				<el-input-number v-model="textStyle.fontSize" controls-position="right"></el-input-number>
			</el-col>
		</el-row>
		<el-row class="right-component-item"  type="flex" align='middle'>
			<el-col :span="8">
				&nbsp;&nbsp;&nbsp;&nbsp;颜色
			</el-col>
			<el-col :span="16">
				<ColorPicker v-model="textStyle.color"></ColorPicker>
			</el-col>
		</el-row>
		<el-row class="right-component-item" type="flex" align='middle'>
			<el-col :span="8">
				&nbsp;&nbsp;&nbsp;&nbsp;粗细
			</el-col>
			<el-col :span="16">
				<el-select v-model="textStyle.fontWeight" placeholder="请选择" >
					<el-option v-for="item in fontWeights" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-col>
		</el-row>
		<el-row class="right-component-item" type="flex" align='middle'>
			<el-col :span="8">
				&nbsp;&nbsp;&nbsp;&nbsp;字体
			</el-col>
			<el-col :span="16">
				<el-select v-model="textStyle.fontFamily" placeholder="请选择" >
					<el-option v-for="item in fonts" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-col>
		</el-row>
		</div>
</template>

<script>
	import ColorPicker from './ColorPicker.vue'
	import { fontWeights, fonts } from "../../constants/Constants.js"
	const props = {
		textStyle: {
			type: Object,
			default: () => {
				return {
					fontSize: 12,
					color: '#000',
					fontWeight: "normal",
					fontFamily: "Microsoft Yahei"
				}
			}
		}
	}
	export default {
		message: "文本样式设置组件",
		name: "TextStyle",
		props: props,
		data() {
			return {
				fontWeights,
				fonts
			}
		},
		mounted() {

		},
		methods: {

		},
		components: {
			ColorPicker
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