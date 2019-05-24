<template>
	<div>
		<div class="right-component-item-header">
			<span @click="isRight=!isRight">
			<i class="el-icon-caret-right" v-show="isRight" ></i>
			<i class="el-icon-caret-bottom" v-show="!isRight" ></i>
			详情</span>
			<el-checkbox style="float: right" v-model='seriesData.detail.show'>显示</el-checkbox>
		</div>
		<div v-show="!isRight" class="right-component-item-content">
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="8">
					字号
				</el-col>
				<el-col :span="16">
					<el-input-number v-model="seriesData.detail.textStyle.fontSize" :min="0" controls-position="right"></el-input-number>
				</el-col>
			</el-row>
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="8">
					颜色
				</el-col>
				<el-col :span="16">
					<ColorPicker v-model="seriesData.detail.textStyle.color"></ColorPicker>
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
					detail: {
						show: true,
						formatter: "{value}",
						textStyle: {
							color: '#FFFFFF',
							fontSize: 30
						}
					},
				}
			}
		}
	}
	export default {
		message: "仪表盘详情部件",
		name: "ChartGaugeDetail",
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