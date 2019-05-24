<template>
	<div class="right-component-item-splitline-step2">
		<el-row class="right-component-item-step2" type="flex" align='middle'>
			<el-col :span="8">
				线型
			</el-col>
		</el-row>
		<el-row class="right-component-item-step2" type="flex" align='middle'>
			<el-col :span="8">
				&nbsp;&nbsp;&nbsp;&nbsp;颜色
			</el-col>
			<el-col :span="16">
				<ColorPicker v-model="lineStyle.color"></ColorPicker>
			</el-col>
		</el-row>
		<el-row class="right-component-item-step2" type="flex" align='middle'>
			<el-col :span="8">
				&nbsp;&nbsp;&nbsp;&nbsp;宽度
			</el-col>
			<el-col :span="16">
				<el-input-number v-model="lineStyle.width" :min="0" :step="1" controls-position="right"></el-input-number>
			</el-col>
		</el-row>
		<el-row class="right-component-item-step2" type="flex" align='middle'>
			<el-col :span="8">
				&nbsp;&nbsp;&nbsp;&nbsp;线型
			</el-col>
			<el-col :span="16">
				<el-select v-model="lineStyle.type" placeholder="请选择">
					<el-option v-for="item in lineTypes" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import ColorPicker from '../../base/ColorPicker.vue'
	import { lineTypes, lineStyle } from "../../../constants/Constants.js"
	const props = {
		lineStyle: {
			type: Object,
			default: () => {
				return lineStyle;
			}
		}
	}
	export default {
		message: "线型设置组件",
		name: "LineStyle",
		props: props,
		data() {
			return {
				lineTypes
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