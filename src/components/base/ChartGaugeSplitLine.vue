<template>
	<div>
		<div class="right-component-item-header">
			<span  @click="isRight=!isRight">
			<i class="el-icon-caret-right" v-show="isRight" ></i>
			<i class="el-icon-caret-bottom" v-show="!isRight" ></i>
			分隔线</span>
			<el-checkbox style="float: right" v-model='seriesData.splitLine.show'>显示</el-checkbox>
		</div>
		<div v-show="!isRight" class="right-component-item-content">
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="8">
					分隔数
				</el-col>
				<el-col :span="16">
					<el-input-number v-model="seriesData.splitNumber" :min="10" controls-position="right"></el-input-number>
				</el-col>
			</el-row>
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="8">
					长度
				</el-col>
				<el-col :span="16">
					<el-input-number v-model="seriesData.splitLine.length" :min="10" controls-position="right"></el-input-number>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
	const props = {
		seriesData: {
			type: Object,
			default: () => {
				return {
					splitNumber: 10,
					splitLine: {
						show: true,
						length: 20,
						lineStyle: {
							color: "auto"
						}
					}
				}
			}
		}
	}
	export default {
		message: "仪表盘主分隔线",
		name: "ChartGaugeSplitLine",
		props: props,
		data() {
			return {
				isRight: true
			}
		}
	}
</script>

<style>

</style>