<template>
	<div class="right-component-item-splitline-step2">
		<el-row class="right-component-item-step2" type="flex" align='middle'>
			<el-col :span="8">
				填充
			</el-col>
		</el-row>
		<el-row class="right-component-item-step2" type="flex" align='middle'>
			<el-col :span="8">
				&nbsp;&nbsp;&nbsp;&nbsp;颜色
			</el-col>
			<el-col :span="16">
				<ColorPicker v-model="areaStyle.color"></ColorPicker>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import ColorPicker from '../../base/ColorPicker.vue'
	const props = {
		areaStyle : {
			type: Object,
			default: () => {
				return {
					color:"#2F4554"
				}
			}
		}
	}
	export default {
		message: "填充设置组件",
		name: "AreaStyle",
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
			ColorPicker
		},
		watch: {

		}
	}
</script>

<style>
	
</style>