<template>
	<div>
		<div class="right-component-item-header">
			<span @click="isRight=!isRight">
			<i class="el-icon-caret-right" v-show="isRight" ></i>
			<i class="el-icon-caret-bottom" v-show="!isRight" ></i>
			全局</span>
		</div>
		<div v-show="!isRight" class="right-component-item-content">
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="8">
					字号
				</el-col>
				<el-col :span="16">
					<el-input-number v-model="option.fontSize" :min="0" controls-position="right"></el-input-number>
				</el-col>
			</el-row>
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="8">
					字体颜色
				</el-col>
				<el-col :span="16">
					<ColorPicker v-model="option.color"></ColorPicker>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
	import ColorPicker from '../base/ColorPicker.vue'
	const props = {
		option: {
			type: Object,
			default: () => {
				return {
					color: "#000",
					city:"苏州",
					fontSize: 16
				};
			}
		}
	}
	export default {
		message: "天气全局设置组件",
		name: "WeatherGlobal",
		props: props,
		data() {
			return {
				isRight: true
			}
		},
		mounted() {

		},
		components: {
			ColorPicker
		},
		methods: {

		},
		watch: {

		}
	}
</script>

<style>

</style>