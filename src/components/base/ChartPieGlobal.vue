<template>
	<div class="right-component-sub-title">
		<div class="right-component-item-header">
			<span @click="isRight=!isRight">
			<i class="el-icon-caret-right" v-show="isRight" ></i>
			<i class="el-icon-caret-bottom" v-show="!isRight"></i>
			全局</span>
		</div>
		<div v-show="!isRight" class="right-component-item-content">
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="8">
					背景色
				</el-col>
				<el-col :span="16">
					<ColorPicker v-model="color"></ColorPicker>
				</el-col>
			</el-row>
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="8">
					中心点X
				</el-col>
				<el-col :span="16">
					<el-input v-model="seriesData.center[0]" placeholder="请输入内容"></el-input>
				</el-col>
			</el-row>
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="8">
					中心点Y
				</el-col>
				<el-col :span="16">
					<el-input v-model="seriesData.center[1]" placeholder="请输入内容"></el-input>
				</el-col>
			</el-row>
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="8">
					半径
				</el-col>
				<el-col :span="16">
					<el-input v-model="seriesData.radius[1]" placeholder="请输入内容"></el-input>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
	import ColorPicker from './ColorPicker.vue'
	const props = {
		backgroundColor: {
			type: String,
			default: 'rgba(0,0,0,0)'
		},
		seriesData: {
			type: Object,
			default: () => {
				return {
					center: ['50%', '50%'],
					radius: [0, '50%'],
				}
			}
		}
	}
	export default {
		message: "饼图全局",
		name: "ChartPieGlobal",
		props: props,
		data() {
			return {
				isRight: true,
				color: this.backgroundColor
			}
		},
		components: {
			ColorPicker
		},
		watch: {
			backgroundColor(val) {
				this.color = val;
			},
			color(val) {
				this.$emit("chartbgcolor", val)
			}
		}
	}
</script>

<style>

</style>