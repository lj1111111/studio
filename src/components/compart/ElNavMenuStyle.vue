<template>
	<div>
		<div class="right-component-item-header">
			<span @click="isRight=!isRight">
			<i class="el-icon-caret-right" v-show="isRight" ></i>
			<i class="el-icon-caret-bottom" v-show="!isRight" ></i>
			导航菜单</span>
		</div>
		<div v-show="!isRight" class="right-component-item-content">
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="8">
					背景色
				</el-col>
				<el-col :span="16">
					<ColorPicker v-model="navMenuStyle.backgroundColor"></ColorPicker>
				</el-col>
			</el-row>
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="8">
					文本色
				</el-col>
				<el-col :span="16">
					<ColorPicker v-model="navMenuStyle.textColor"></ColorPicker>
				</el-col>
			</el-row>
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="8">
					选中色
				</el-col>
				<el-col :span="16">
					<ColorPicker v-model="navMenuStyle.activeTextColor"></ColorPicker>
				</el-col>
			</el-row>

		</div>
	</div>
</template>
<script>
	import ColorPicker from '../base/ColorPicker.vue'
	const props = {
		navMenuStyle: {
			type: Object,
			default: () => {
				return {
					backgroundColor: "#545c64",
					textColor: "#fff",
					activeTextColor: "#ffd04b"
				}
			}
		}
	}
	export default {
		message: "导航菜单样式针对elementui",
		name: "ElNavMenuStyle",
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
			ColorPicker
		},
		watch: {

		}
	}
</script>

<style>

</style>