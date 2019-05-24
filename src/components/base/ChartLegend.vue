<template>
	<div>
		<div class="right-component-item-header">
			<span @click="isRight=!isRight">
			<i class="el-icon-caret-right" v-show="isRight" ></i>
			<i class="el-icon-caret-bottom" v-show="!isRight" ></i>
			图例</span>
			<el-checkbox style="float: right" v-model='legend.show'>显示</el-checkbox>
		</div>
		<div v-show="!isRight" class="right-component-item-content">
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="8">
					字号
				</el-col>
				<el-col :span="16">
					<el-input-number v-model="legend.textStyle.fontSize"  controls-position="right"></el-input-number>
				</el-col>
			</el-row>
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="8">
					颜色
				</el-col>
				<el-col :span="16">
					<ColorPicker v-model="legend.textStyle.color"></ColorPicker>
				</el-col>
			</el-row>
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="8">
					布局方式
				</el-col>
				<el-col :span="16">
					<el-radio v-model='legend.orient' label="horizontal">水平</el-radio>
					<el-radio v-model='legend.orient' label="vertical">垂直</el-radio>
				</el-col>
			</el-row>
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="8">
					水平位置
				</el-col>
				<el-col :span="16">
					<el-radio v-model='legend.x' label="left">左</el-radio>
					<el-radio v-model='legend.x' label="center">中</el-radio>
					<el-radio v-model='legend.x' label="right">右</el-radio>
				</el-col>
			</el-row>
			<el-row class="right-component-item" style="padding: 8px 28px 4px;" type="flex" align='middle'>
				<el-col :span="8">
					垂直位置
				</el-col>
				<el-col :span="16">
					<el-radio v-model='legend.y' label="top">上</el-radio>
					<el-radio v-model='legend.y' label="center">中</el-radio>
					<el-radio v-model='legend.y' label="bottom">下</el-radio>
				</el-col>
			</el-row>

		</div>
	</div>
</template>

<script>
	import ColorPicker from './ColorPicker.vue'
	const props = {
		legend: {
			type: Object,
			default: () => {
				return {
					show: true,
					orient: 'horizontal',
					x: 'center', //center' | 'left' | 'right
					y: 'top', //'top' | 'bottom' | 'center' 
					textStyle: {
						color: '#000',
						fontSize: 12
					}
//					,
//					data: [
//
//					]
				}
			}
		}
	}
	export default {
		message: "图表图例",
		name: "ChartLegend",
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