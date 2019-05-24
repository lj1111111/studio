<template>
	<div>
		<div class="right-component-item-header">
			<span @click="isRight=!isRight">
			<i class="el-icon-caret-right" v-show="isRight" ></i>
			<i class="el-icon-caret-bottom" v-show="!isRight" ></i>
			翻牌器</span>
		</div>
		<div v-show="!isRight" class="right-component-item-content">
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="8">
					数值
				</el-col>
				<el-col :span="16">
					<el-input-number v-model="num.digit"  controls-position="right"></el-input-number>
				</el-col>
			</el-row>
			<TextStyle :text-style="num.textStyle"></TextStyle>
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="8">
					数字分隔符
				</el-col>
				<el-col :span="16">
					<el-input placeholder="请输入分隔符" v-model="num.separatingSymbol"></el-input>
				</el-col>
			</el-row>
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="8">
					小数位数
				</el-col>
				<el-col :span="16">
					<el-input-number v-model="num.decimal" :min="0" controls-position="right"></el-input-number>
				</el-col>
			</el-row>
		</div>
	</div>
</template>
<script>
	import TextStyle from '../base/TextStyle.vue'
	const props = {
		num: {
			type: Object,
			default: () => {
				return {
					textStyle: {
						fontFamily: "Microsoft Yahei",
						color: "#000",
						fontSize: 24,
						fontWeight: "normal"
					},
					marginRight: 0,
					backgroundColor: "rgba(51,51,51,0)",
					backgroundRadius: 6,
					separatingBackground: false,
					digit: 0,
					rounding: true,
					decimal: 0,
					separatingChart: true,
					separatingSymbol: ",",
					decimalSymbol: ".",
					fixedWidth: 0,
					sameDataFlip: false
				}
			}
		}
	}
	export default {
		message: "翻牌器组件",
		name: "Numbers",
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
			TextStyle
		},
		watch: {

		}
	}
</script>

<style>

</style>