<template>
	<div>
		<div class="right-component-item-header">
			<span @click="isRight=!isRight">
			<i class="el-icon-caret-right" v-show="isRight" ></i>
			<i class="el-icon-caret-bottom" v-show="!isRight" ></i>
		         线条样式</span>
		</div>
		<div v-show="!isRight" class="right-component-item-content">
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="8">
					宽度
				</el-col>
				<el-col :span="16">
					<el-input-number v-model="lineStyle.width" :min="0" :step="1" controls-position="right"></el-input-number>
				</el-col>
			</el-row>
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="8">
					颜色
				</el-col>
				<el-col :span="16">
					<ColorPicker v-model="lineStyle.color"></ColorPicker>
				</el-col>
			</el-row>
			<!--透明度-->
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="8">
					透明度
				</el-col>
				<el-col :span="16">
					<el-slider v-model="lineStyle.opacity" :min="0" :max="1" :step="0.1"></el-slider>
				</el-col>
			</el-row>
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="16" :offset="8">
					<el-row :gutter="4" type="flex" align='middle'>
						<el-col :span="6">
							<el-input :value="0" :disabled="true"></el-input>
						</el-col>
						<el-col :span="12">
							<el-input-number v-model="lineStyle.opacity" :min="0" :max="1" :step="0.1" controls-position="right"></el-input-number>
						</el-col>

						<el-col :span="6">
							<el-input :value="1" :disabled="true"></el-input>
						</el-col>
					</el-row>
				</el-col>
			</el-row>
			<el-row class="right-component-item " type="flex" align='middle'>
				<el-col :span="16" :offset="8">
					<el-row :gutter="10" type="flex" align='middle' class="ft">
						<el-col :span="8">
							<span>最小值</span>
						</el-col>
						<el-col :span="8" :offset="8">
							<span>最大值</span>
						</el-col>
					</el-row>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
	import ColorPicker from '../base/ColorPicker.vue'
	const props = {
		lineStyle: {
			type: Object,
			default: () => {
				return {
					width: 1,
					color: '#000',
					opacity: 1
				}
			}
		}
	}
	export default {
		message: "线条样式组件",
		name: "LineStyle",
		props: props,
		data() {
			return {
				isRight: false
			}
		},
		mounted() {

		},
		methods: {

		},
		components: {
			ColorPicker
		},
		watch: {}
	}
</script>

<style>
	.el-input-number {
		width: 100%
	}
</style>