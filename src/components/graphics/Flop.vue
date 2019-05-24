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
					标题名
				</el-col>
				<el-col :span="16">
					<el-input placeholder="请输入内容" v-model="title.content"></el-input>
				</el-col>
			</el-row>
			<TextStyle :text-style="title.textStyle"></TextStyle>

		</div>
	</div>
</template>

<script>
	import ColorPicker from '../base/ColorPicker.vue'
	import TextStyle from '../base/TextStyle.vue'
	const props = {
		title: {
			type: Object,
			default: () => {
				return {
					"content": "我是标题",
					"textStyle": {
						"fontFamily": "Microsoft Yahei",
						"fontSize": 41,
						"color": "#ffffff",
						"fontWeight": "lighter"
					}
				}
			}
		}
	}
	export default {
		message: "数字翻牌器标题组件",
		name: "NumberTitleFlopTitle",
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
			ColorPicker,
			TextStyle
		},
		watch: {

		}
	}
</script>

<style>
	/*.el-input-number {
		width: 100%
	}*/
</style>