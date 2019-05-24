<template>
	<div>
		<el-row class="right-component-item" style="padding: 8px 28px 4px;" type="flex" align='middle'>
			<el-col :span="8">
				{{label}}
			</el-col>
			<el-col :span="16">
				<el-checkbox v-model="axisLine.show">显示</el-checkbox>
			</el-col>
		</el-row>
		<el-row class="right-component-item" type="flex" align='middle'>
			<el-col :span="8">
				&nbsp;&nbsp;&nbsp;&nbsp;符号
			</el-col>
			<el-col :span="16">
				<el-select v-model="axisLine.symbol[1]" placeholder="请选择">
					<el-option v-for="item in symbolStyles" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-col>
		</el-row>
		<el-row class="right-component-item" type="flex" align='middle'>
			<el-col :span="8">
				&nbsp;&nbsp;&nbsp;&nbsp;大小
			</el-col>
			<el-col :span="16">
				<el-input-number v-model="axisLine.symbolSize" :min="0" :step="1" controls-position="right"></el-input-number>
			</el-col>
		</el-row>
		<LineStyleExt :line-style="axisLine.lineStyle"></LineStyleExt>
	</div>
</template>

<script>
	import LineStyleExt from "../../base/LineStyleExt.vue"
	import { lineStyle } from "../../../constants/Constants.js"
	const symbolStyles = [{
			"value": "none",
			"label": "无"
		},
		{
			"value": "arrow",
			"label": "箭头"
		}
	]
	const props = {
		label:{
			type:String,
			default:"轴线"
		},
		axisLine: {
			type: Object,
			default: () => {
				return {
					show: false,
					symbol: ['none', 'arrow'],
					symbolSize: 10,
					lineStyle: lineStyle
				}
			}
		}
	}
	export default {
		message: "轴线设置组件",
		name: "AxisLine",
		props: props,
		data() {
			return {
				symbolStyles
			}
		},
		mounted() {

		},
		methods: {

		},
		components: {
			LineStyleExt
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