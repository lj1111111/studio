<template>
	<div class="right-component-item-splitline-step2"> 
		<el-row class="right-component-item-step2" type="flex" align='middle'>
			<el-col :span="8">
				图形
			</el-col>
		</el-row>
		<el-row class="right-component-item-step2" type="flex" align='middle'>
			<el-col :span="8">
				&nbsp;&nbsp;&nbsp;&nbsp;颜色
			</el-col>
			<el-col :span="16">
				<ColorPicker v-model="itemStyle.color"></ColorPicker>
			</el-col>
		</el-row>
		<el-row class="right-component-item-step2" type="flex" align='middle'>
			<el-col :span="8">
				&nbsp;&nbsp;&nbsp;&nbsp;阴影大小
			</el-col>
			<el-col :span="16">
					<el-input-number v-model="itemStyle.shadowBlur" :min="0" controls-position="right"></el-input-number>
			</el-col>
		</el-row>
		<el-row class="right-component-item-step2" type="flex" align='middle'>
			<el-col :span="8">
				&nbsp;&nbsp;&nbsp;&nbsp;阴影颜色
			</el-col>
			<el-col :span="16">
				<ColorPicker v-model="itemStyle.shadowColor"></ColorPicker>
			</el-col>
		</el-row>
		<el-row class="right-component-item-step2" type="flex" align='middle'>
			<el-col :span="8">
				&nbsp;&nbsp;&nbsp;&nbsp;水平距离
			</el-col>
			<el-col :span="16">
					<el-input-number v-model="itemStyle.shadowOffsetX"  controls-position="right"></el-input-number>
			</el-col>
		</el-row>
		<el-row class="right-component-item-step2" type="flex" align='middle'>
			<el-col :span="8">
				&nbsp;&nbsp;&nbsp;&nbsp;垂直距离
			</el-col>
			<el-col :span="16">
					<el-input-number v-model="itemStyle.shadowOffsetY"  controls-position="right"></el-input-number>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import ColorPicker from './ColorPicker.vue'
	import { fontWeights, fonts } from "../../constants/Constants.js"
	const props = {
		itemStyle: {
			type: Object,
			default: () => {
				return {
					color: "rgb(129, 227, 238)",
					borderColor: '#000',
					borderWidth: 0,
					borderType: 'solid',
					shadowBlur: 0,
					shadowColor: 'rgba(25, 100, 150, 0.5)',
					shadowOffsetX: 0,
					shadowOffsetY: 5
				}
			}
		}
	}
	export default {
		message: "图形样式设置组件，用于图表组件数据系列中",
		name: "ItemStyle",
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