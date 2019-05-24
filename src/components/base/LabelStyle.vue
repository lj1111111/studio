<template>
	<div class="right-component-item-splitline-step2">
		<el-row class="right-component-item-step2" type="flex" align='middle'>
			<el-col :span="8">
				标签
			</el-col>
			<el-col :span="16">
				<el-checkbox v-model="labelStyle.show">显示</el-checkbox>
			</el-col>
		</el-row>
		<el-row class="right-component-item-step2" type="flex" align='middle'>
			<el-col :span="8">
				&nbsp;&nbsp;&nbsp;&nbsp;字号
			</el-col>
			<el-col :span="16">
				<el-input-number v-model="labelStyle.fontSize" controls-position="right"></el-input-number>
			</el-col>
		</el-row>
		<el-row class="right-component-item-step2" type="flex" align='middle'>
			<el-col :span="8">
				&nbsp;&nbsp;&nbsp;&nbsp;颜色
			</el-col>
			<el-col :span="16">
				<ColorPicker v-model="labelStyle.color"></ColorPicker>
			</el-col>
		</el-row>
		<el-row class="right-component-item-step2" type="flex" align='middle'>
			<el-col :span="8">
				&nbsp;&nbsp;&nbsp;&nbsp;粗细
			</el-col>
			<el-col :span="16">
				<el-select v-model="labelStyle.fontWeight" placeholder="请选择" size="small">
					<el-option v-for="item in fontWeights" :key="item.value" :label="item.label" :value="item.value">
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
		labelStyle: {
			type: Object,
			default: () => {
				return {
					show: false,
					position: "inside",
					fontSize: 12,
					color: "#FFFFFF",
					fontWeight: "normal"
				}
			}
		}
	}
	export default {
		message: "文本标签样式设置组件，用于图表组件数据系列中",
		name: "LabelStyle",
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