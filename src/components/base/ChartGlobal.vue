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
					背景色
				</el-col>
				<el-col :span="16">
					<ColorPicker v-model="color"></ColorPicker>
				</el-col>
			</el-row>
			<!--图表Grid参数-->
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="8">
					左边距
				</el-col>
				<el-col :span="16">
					<el-input-number v-model="grid.x" :min="0" controls-position="right"></el-input-number>
				</el-col>
			</el-row>
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="8">
					顶边距
				</el-col>
				<el-col :span="16">
					<el-input-number v-model="grid.y" :min="0" controls-position="right"></el-input-number>
				</el-col>
			</el-row>
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="8">
					右边距
				</el-col>
				<el-col :span="16">
					<el-input-number v-model="grid.x2" :min="0" controls-position="right"></el-input-number>
				</el-col>
			</el-row>
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="8">
					底边距
				</el-col>
				<el-col :span="16">
					<el-input-number v-model="grid.y2" :min="0" controls-position="right"></el-input-number>
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
		grid: {
			type: Object,
			default: () => {
				return {
					x: 80,
					y: 60,
					x2: 80,
					y2: 60
				}
			}
		}
	}
	export default {
		message: "全局样式，图表组件，主要用于设置背景色，边距",
		name: "ChartGlobal",
		props: props,
		data() {
			return {
				isRight: true,
//				selfGrid: this.grid,
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