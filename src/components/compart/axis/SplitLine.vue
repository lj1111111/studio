<template>
	<div>
		<el-row class="right-component-item" style="padding: 8px 28px 4px;" type="flex" align='middle'>
			<el-col :span="8">
				分隔线
			</el-col>
			<el-col :span="16">
				<el-checkbox v-model="splitLine.show">显示</el-checkbox>
			</el-col>
		</el-row>
		<LineStyleExt :line-style="splitLine.lineStyle"></LineStyleExt>
	</div>
</template>
<script>
	import LineStyleExt from "../../base/LineStyleExt.vue"
	import { lineStyle } from "../../../constants/Constants.js"
	const props = {
		splitLine: {
			type: Object,
			default: () => {
				return {
					show: false,
					lineStyle: lineStyle
				}
			}
		}
	}
	export default {
		message: "分隔线设置组件",
		name: "SplitLine",
		props: props,
		data() {
			return {

			}
		},
		mounted() {

		},
		methods: {

		},
		components: {
			LineStyleExt
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