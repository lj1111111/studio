<template>
	<div class="right-component-sub-title">
		<div class="right-component-item-header">
			<span @click="isRight=!isRight">
			<i class="el-icon-caret-right" v-show="isRight" ></i>
			<i class="el-icon-caret-bottom" v-show="!isRight" ></i>
			全局</span>
		</div>
		<div v-show="!isRight" class="right-component-item-content">
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="8">
					线型
				</el-col>
				<el-col :span="16">
					<el-select v-model="border.borderStyle" placeholder="请选择">
						<el-option v-for="item in borderStyles" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-col>
			</el-row>
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="8">
					线宽
				</el-col>
				<el-col :span="16">
					<el-input-number v-model="border.borderWidth" :min="0" controls-position="right"></el-input-number>
				</el-col>
			</el-row>
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="8">
					颜色
				</el-col>
				<el-col :span="16">
					<ColorPicker v-model="border.borderColor"></ColorPicker>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
	const borderStyles = [{
			label: "无边框",
			value: "none"
		},
		{
			label: "点线边框",
			value: "dotted"
		},
		{
			label: "虚线边框",
			value: "dashed"
		},
		{
			label: "实线边框",
			value: "solid"
		},
		{
			label: "双边框",
			value: "double"
		},
		{
			label: "凹槽边框",
			value: "groove"
		},
		{
			label: "垄状边框",
			value: "ridge"
		},
		{
			label: "嵌入边框",
			value: "inset"
		},
		{
			label: "外凸边框",
			value: "outset"
		}
	]
	const props = {
		border: {
			type: Object,
			default: () => {
				return {
					borderStyle: "solid",
					borderWidth: 1,
					borderColor: "#000000"
				}
			}
		}
	}
	import ColorPicker from '../base/ColorPicker.vue'
	export default {
		message: "边框全局组件",
		name: "BorderGlobal",
		props: props,
		data() {
			return {
				isRight: true,
				borderStyles
			}
		},
		components: {
			ColorPicker
		}
	}
</script>

<style>

</style>