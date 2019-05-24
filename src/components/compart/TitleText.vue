<template>
	<div>
		<div class="right-component-item-header">
			<span @click="isRight=!isRight">
			<i class="el-icon-caret-right" v-show="isRight" ></i>
			<i class="el-icon-caret-bottom" v-show="!isRight" ></i>
			{{label}}</span>
		</div>
		<div v-show="!isRight" class="right-component-item-content">
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="8">
					文本内容
				</el-col>
				<el-col :span="16">
					<el-input placeholder="请输入内容" v-model="text.content"></el-input>
				</el-col>
			</el-row>
			<TextStyle :textStyle="text.textStyle"></TextStyle>
		</div>
	</div>
</template>
<script>
	import TextStyle from '../base/TextStyle.vue'
	const props = {
		label: {
			type: String,
			default: "标题"
		},
		text: {
			type: Object,
			default: () => {
				return {
					content: "文字",
					textStyle: {
						fontFamily: "Microsoft Yahei",
						fontSize: 24,
						color: "#000",
						fontWeight: "normal"
					}
				}
			}
		}
	}
	export default {
		message: "文本组件",
		name: "TitleText",
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