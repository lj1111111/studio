<template>
	<div>
		<div class="right-component-item-header">
			<span @click="isRight=!isRight">
			<i class="el-icon-caret-right" v-show="isRight" ></i>
			<i class="el-icon-caret-bottom" v-show="!isRight" ></i>
			指示器</span>
			<el-checkbox style="float: right" v-model="radar.name.show">显示</el-checkbox>
		</div>
		<div v-show="!isRight" class="right-component-item-content">
			<!--起始角度-->
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="8">
					起始角度
				</el-col>
				<el-col :span="16">
					<el-slider v-model="radar.startAngle" :min="0" :max="360"></el-slider>
				</el-col>
			</el-row>
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="16" :offset="8">
					<el-row :gutter="2" type="flex" align='middle'>
						<el-col :span="6">
							<el-input :value="0" :disabled="true"></el-input>
						</el-col>
						<el-col :span="12">
							<el-input-number v-model="radar.startAngle" :min="0" :max="360" controls-position="right"></el-input-number>
						</el-col>
						<el-col :span="6">
							<el-input :value="360" :disabled="true"></el-input>
						</el-col>
					</el-row>
				</el-col>
			</el-row>
			<el-row class="right-component-item " type="flex" align='middle'>
				<el-col :span="16" :offset="8">
					<el-row :gutter="2" type="flex" align='middle' class="ft">
						<el-col :span="6">
							<span>最小值</span>
						</el-col>
						<el-col :span="6" :offset="12">
							<span>最大值</span>
						</el-col>
					</el-row>
				</el-col>
			</el-row>
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="8">
				     最大值
				</el-col>
				<el-col :span="16">
					<el-input-number v-model="radar.maxValue"  controls-position="right"></el-input-number>
				</el-col>
			</el-row>
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="8">
					分隔段数
				</el-col>
				<el-col :span="16">
					<el-input-number v-model="radar.splitNumber" :min="1" controls-position="right"></el-input-number>
				</el-col>
			</el-row>
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="8">
					图形类型
				</el-col>
				<el-col :span="16">
					<el-select v-model="radar.shape" placeholder="请选择">
						<el-option v-for="item in shapeTypes" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-col>
			</el-row>
			<TextStyle :text-style="radar.name.textStyle"></TextStyle>
		</div>
	</div>
</template>
<script>
	import TextStyle from '../base/TextStyle.vue'
	import { lineStyle } from "../../constants/Constants.js"
	/****
	 * 雷达图绘制类型
	 */
	export const shapeTypes = [{
			"value": "polygon",
			"label": "多边形"
		},
		{
			"value": "circle",
			"label": "圆形"
		}
	]
	const props = {
		radar: {
			type: Object,
			default: () => {
				return {
					center: ['50%', '50%'],
					radius: "75%",
					startAngle: 90,
					splitNumber: 5,
					shape: "polygon", //'polygon'、'circle'
					name: {
						show: true,
						lineStyle
					}
				}
			}
		}
	}
	export default {
		message: "雷达图指示器组件",
		name: "RadarIndicator",
		props: props,
		data() {
			return {
				isRight: true,
				shapeTypes
			}
		},
		mounted() {

		},
		methods: {

		},
		components: {
			TextStyle
		},
		watch: {

		}
	}
</script>

<style>

</style>