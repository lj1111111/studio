<template>
	<div class="right-component-sub-title">
		<div class="right-component-item-header">
			<span @click="isRight=!isRight">
			<i class="el-icon-caret-right" v-show="isRight" ></i>
			<i class="el-icon-caret-bottom" v-show="!isRight"></i>
			标题</span>
			<el-checkbox style="float: right" v-model="seriesData.title.show">显示</el-checkbox>
		</div>
		<div v-show="!isRight" class="right-component-item-content">
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="8">
					标题名
				</el-col>
				<el-col :span="16">
					<el-input placeholder="请输入内容" v-model="seriesData.data[0].name"></el-input>
				</el-col>
			</el-row>
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="8">
					字号
				</el-col>
				<el-col :span="16">
					<el-input-number v-model="seriesData.title.textStyle.fontSize"  controls-position="right"></el-input-number>
				</el-col>
			</el-row>
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="8">
					颜色
				</el-col>
				<el-col :span="16">
					<ColorPicker v-model="seriesData.title.textStyle.color"></ColorPicker>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
	import ColorPicker from './ColorPicker.vue'
	const props = {
		seriesData: {
			type: Object,
			default: () => {
				return {
					title: {
						show: true,
						textStyle: {
							fontSize: 18,
							color: '#FFF'
						}
					},
					data: []
				}
			}
		}
	}
	export default {
		message: "仪表盘标题部件",
		name: "ChartGaugeTitle",
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