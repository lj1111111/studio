<template>
	<div>
		<div class="right-component-item-header">
			<span @click="isRight=!isRight">
			<i class="el-icon-caret-right" v-show="isRight" ></i>
			<i class="el-icon-caret-bottom" v-show="!isRight" ></i>
		          柱子设置</span>
		</div>
		<div v-show="!isRight" class="right-component-item-content">
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="8">
					颜色
				</el-col>
				<el-col :span="16">
					<ColorPicker v-model="option.itemStyle.color"></ColorPicker>
				</el-col>
			</el-row>
			<!--<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="8">
					透明度
				</el-col>
				<el-col :span="16">
					<el-input-number   v-model="option.itemStyle.opacity"  :min="0" :max="1" :step="0.1" controls-position="right"></el-input-number>
				</el-col>
			</el-row>-->
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="8">
					粗细
				</el-col>
				<el-col :span="16">
					<el-input-number v-model="option.barSize" :min="0" :step="0.1" controls-position="right"></el-input-number>
				</el-col>
			</el-row>
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="8">
				最小高度
				</el-col>
				<el-col :span="16">
					<el-input-number  v-model="option.minHeight " :min="0" controls-position="right"></el-input-number>
				</el-col>
			</el-row>
			<!--透明度-->
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="8">
					透明度
				</el-col>
				<el-col :span="16">
					<el-slider v-model="option.itemStyle.opacity" :min="0" :max="1" :step="0.1"></el-slider>
				</el-col>
			</el-row>
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="16" :offset="8">
					<el-row :gutter="4" type="flex" align='middle'>
						<el-col :span="6">
							<el-input :value="0" :disabled="true"></el-input>
						</el-col>
						<el-col :span="12">
							<el-input-number   v-model="option.itemStyle.opacity"  :min="0" :max="1" :step="0.1" controls-position="right"></el-input-number>
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
		option: {
			type: Object,
			default: () => {
				return {}
			}
		}
	}
	export default {
		message: "3D柱状图全局设置组件",
		name: "BarD3Global",
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