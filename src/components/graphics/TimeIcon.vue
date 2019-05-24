<template>
	<div>
		<div class="right-component-item-header">
			<span @click="isRight=!isRight">
			<i class="el-icon-caret-right" v-show="isRight" ></i>
			<i class="el-icon-caret-bottom" v-show="!isRight" ></i>
			图标样式</span>
			<el-checkbox style="float: right" v-model="icon.show">显示</el-checkbox>
		</div>
		<div v-show="!isRight" class="right-component-item-content">
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="8">
					大小
				</el-col>
				<el-col :span="16">
					<el-input-number v-model="icon.fontSize" :min="0" controls-position="right"></el-input-number>
				</el-col>
			</el-row>
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="8">
					颜色
				</el-col>
				<el-col :span="16">
					<ColorPicker v-model="icon.color"></ColorPicker>
				</el-col>
			</el-row>
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="8">
					边距
				</el-col>
				<el-col :span="16">
					<el-input-number v-model="icon.padding" :min="0" controls-position="right"></el-input-number>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
	import ColorPicker from '../base/ColorPicker.vue'
	const props = {
		icon: {
			type: Object,
			default: () => {
				return {
					show: true,
					fontSize: 12,
					color: '#000',
					padding: 5
				}
			}
		}
	}
	export default {
		message: "时间图标样式组件",
		name: "TimeIcon",
		props: props,
		data() {
			return {
				isRight: true
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