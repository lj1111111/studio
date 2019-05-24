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
					标题名
				</el-col>
				<el-col :span="16">
					<el-input placeholder="请输入内容" v-model="option.title"></el-input>
				</el-col>
			</el-row>
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="8">
					字体
				</el-col>
				<el-col :span="16">
					<el-select v-model="option.fontFamily" placeholder="请选择" size="small">
						<el-option v-for="item in fonts" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-col>
			</el-row>
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
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="8">
					字体粗细
				</el-col>
				<el-col :span="16">
					<el-select v-model="option.fontWeight" placeholder="请选择" size="small">
						<el-option v-for="item in fontWeights" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-col>
			</el-row>
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="8">
					对齐方式
				</el-col>
				<el-col :span="16">
					<el-select v-model="option.textAlign" placeholder="请选择" size="small">
						<el-option v-for="item in textAligns" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
	import ColorPicker from '../base/ColorPicker.vue'
	//字体
	const fonts = [{
		value: "Microsoft Yahei",
		label: "微软雅黑"
	}, {
		value: "SimSun",
		label: "宋体"
	}, {
		value: "SimHei",
		label: "黑体"
	}, {
		value: "arial",
		label: "arial"
	}, {
		value: "sans-serif",
		label: "sans-serif"
	}]
	//字体粗细
	const fontWeights = [{
		value: "normal",
		label: "正常"
	}, {
		value: "bold",
		label: "粗体"
	}]
	//对齐方式
	const textAligns = [{
		value: "center",
		label: "居中对齐"
	}, {
		value: "left",
		label: "左边对齐"
	}, {
		value: "right",
		label: "右边对齐"
	}, {
		value: "justify",
		label: "两端对齐"
	}]
	const props = {
		option: {
			type: Object,
			default: () => {
				return {
					fontFamily: 'Microsoft Yahei',
					color: "#FFFFFF",
					title: "我是标题",
					fontSize: 36,
					textAlign: 'center',
					fontWeight: "normal"
				};
			}
		}
	}
	export default {
		message: "文本样式组件",
		name: "TitleGlobal",
		props: props,
		data() {
			return {
				isRight: true,
				fonts,
				textAligns,
				fontWeights
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