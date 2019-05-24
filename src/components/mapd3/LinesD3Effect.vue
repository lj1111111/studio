<template>
	<div>
		<div class="right-component-item-header">
			<span @click="isRight=!isRight">
			<i class="el-icon-caret-right" v-show="isRight" ></i>
			<i class="el-icon-caret-bottom" v-show="!isRight" ></i>
		         尾迹特效</span>
		</div>
		<div v-show="!isRight" class="right-component-item-content">
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="8">
					周期
				</el-col>
				<el-col :span="16">
					<el-input-number v-model="effect.period" :min="0" :step="1" controls-position="right"></el-input-number>
				</el-col>
			</el-row>
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="8">
					宽度
				</el-col>
				<el-col :span="16">
					<el-input-number v-model="effect.trailWidth" :min="0" :step="1" controls-position="right"></el-input-number>
				</el-col>
			</el-row>
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="8">
					颜色
				</el-col>
				<el-col :span="16">
					<ColorPicker v-model="effect.trailColor"></ColorPicker>
				</el-col>
			</el-row>
			<!--长度-->
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="8">
					长度
				</el-col>
				<el-col :span="16">
					<el-slider v-model="effect.trailLength" :min="0" :max="1" :step="0.1"></el-slider>
				</el-col>
			</el-row>
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="16" :offset="8">
					<el-row :gutter="4" type="flex" align='middle'>
						<el-col :span="6">
							<el-input :value="0" :disabled="true"></el-input>
						</el-col>
						<el-col :span="12">
							<el-input-number v-model="effect.trailLength" :min="0" :max="1" :step="0.1" controls-position="right"></el-input-number>
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
			<!--透明度-->
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="8">
					透明度
				</el-col>
				<el-col :span="16">
					<el-slider v-model="effect.trailOpacity" :min="0" :max="1" :step="0.1"></el-slider>
				</el-col>
			</el-row>
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="16" :offset="8">
					<el-row :gutter="4" type="flex" align='middle'>
						<el-col :span="6">
							<el-input :value="0" :disabled="true"></el-input>
						</el-col>
						<el-col :span="12">
							<el-input-number v-model="effect.trailOpacity" :min="0" :max="1" :step="0.1" controls-position="right"></el-input-number>
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
		effect: {
			type: Object,
			default: () => {
				return {
					show: true,
					period: 1,
					trailWidth: 4,
					trailLength: 0.4,
					trailOpacity: 1,
					trailColor: '#0087f4'
				}
			}
		}
	}
	export default {
		message: "3D飞线尾迹设置组件",
		name: "LinesD3Effect",
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