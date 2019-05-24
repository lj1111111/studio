<template>
	<div>
		<div class="right-component-item-header">
			<span @click="isRight=!isRight">
			<i class="el-icon-caret-right" v-show="isRight" ></i>
			<i class="el-icon-caret-bottom" v-show="!isRight" ></i>
			时间器</span>
		</div>
		<div v-show="!isRight" class="right-component-item-content">
			<el-row class="right-component-item" style="padding: 8px 28px 4px;" type="flex" align='middle'>
				<el-col :span="8">
					文本样式
				</el-col>
			</el-row>
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="8">
					&nbsp;&nbsp;&nbsp;&nbsp;字号
				</el-col>
				<el-col :span="16">
					<el-input-number v-model="timer.fontSize" controls-position="right"></el-input-number>
				</el-col>
			</el-row>
			<el-row class="right-component-item" style="padding: 8px 28px 4px;" type="flex" align='middle'>
				<el-col :span="8">
					&nbsp;&nbsp;&nbsp;&nbsp;颜色
				</el-col>
				<el-col :span="16">
					<ColorPicker v-model="timer.color"></ColorPicker>
				</el-col>
			</el-row>
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="8">
					&nbsp;&nbsp;&nbsp;&nbsp;粗细
				</el-col>
				<el-col :span="16">
					<el-select v-model="timer.fontWeight" placeholder="请选择" size="small">
						<el-option v-for="item in fontWeights" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-col>
			</el-row>
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="8">
					&nbsp;&nbsp;&nbsp;&nbsp;字体
				</el-col>
				<el-col :span="16">
					<el-select v-model="timer.fontFamily" placeholder="请选择" size="small">
						<el-option v-for="item in fonts" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-col>
			</el-row>
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="8">
					格式化
				</el-col>
				<el-col :span="16">
					<el-select v-model="timer.format" placeholder="请选择" size="small">
						<el-option v-for="item in timeFormats" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-col>
			</el-row>
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="8">
					时间间隔(秒)
				</el-col>
				<el-col :span="16">
					<el-input-number v-model="timer.intervalTime" :min="1" controls-position="right"></el-input-number>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
	import ColorPicker from '../base/ColorPicker.vue'
	import {fontWeights,fonts,timeFormats} from "../../constants/Constants.js"
	const props = {
		timer: {
			type: Object,
			default: () => {
				return {
					fontSize: 12,
					color: '#000',
					fontWeight: "normal",
					fontFamily: "Microsoft Yahei",
					format: "YYYY-MM-DD HH:mm:ss",
					intervalTime: 1 //时间间隔，单位秒
				}
			}
		}
	}
	export default {
		message: "时间器设置组件",
		name: "TimeText",
		props: props,
		data() {
			return {
				isRight: true,
				fontWeights,
				fonts,
				timeFormats
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