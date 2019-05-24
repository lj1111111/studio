<template>
	<div class="right-component-sub-title">
		<div class="right-component-item-header">
			<span @click="isRight=!isRight">
			<i class="el-icon-caret-right" v-show="isRight" ></i>
			<i class="el-icon-caret-bottom" v-show="!isRight" ></i>
			全局</span>
		</div>
		<div v-show="!isRight" class="right-component-item-content">
			<el-row class="right-component-item" style="padding: 8px 28px 4px;" type="flex" align='middle'>
				<el-col :span="8">
					背景
				</el-col>
				<el-col :span="16">
					<el-checkbox v-model="global.showBg">显示</el-checkbox>
				</el-col>
			</el-row>
			<el-row class="right-component-item" type="flex" align='middle' v-show="global.showBg">
				<el-col :span="8">
					&nbsp;&nbsp;&nbsp;&nbsp;颜色
				</el-col>
				<el-col :span="16">
					<ColorPicker v-model="global.bgColor"></ColorPicker>
				</el-col>
			</el-row>
			<!--边框-->
			<el-row class="right-component-item" style="padding: 8px 28px 4px;" type="flex" align='middle'>
				<el-col :span="8">
					边框
				</el-col>
				<el-col :span="16">
					<el-checkbox v-model="global.showBorder">显示</el-checkbox>
				</el-col>
			</el-row>
			<div v-show="global.showBorder">
				<el-row class="right-component-item" type="flex" align='middle' >
					<el-col :span="8">
						&nbsp;&nbsp;&nbsp;&nbsp;宽度
					</el-col>
					<el-col :span="16">
						<el-input-number v-model="global.borderWidth" :min="0" controls-position="right"></el-input-number>
					</el-col>
				</el-row>
				<el-row class="right-component-item" type="flex" align='middle'>
					<el-col :span="8">
						&nbsp;&nbsp;&nbsp;&nbsp;颜色
					</el-col>
					<el-col :span="16">
						<ColorPicker v-model="global.borderColor"></ColorPicker>
					</el-col>
				</el-row>
			</div>
			<!--标题-->
			<el-row class="right-component-item" style="padding: 8px 28px 4px;" type="flex" align='middle'>
				<el-col :span="8">
					标题
				</el-col>
				<el-col :span="16">
					<el-checkbox v-model="global.showTitle">显示</el-checkbox>
				</el-col>
			</el-row>
			<div v-show="global.showTitle">
				<el-row class="right-component-item" type="flex" align='middle'>
					<el-col :span="8">
						&nbsp;&nbsp;&nbsp;&nbsp;大小
					</el-col>
					<el-col :span="16">
						<el-input-number v-model="global.titleSize" :min="0" controls-position="right"></el-input-number>
					</el-col>
				</el-row>
				<el-row class="right-component-item" style="padding: 8px 28px 4px;" type="flex" align='middle'>
					<el-col :span="8">
						&nbsp;&nbsp;&nbsp;&nbsp;颜色
					</el-col>
					<el-col :span="16">
						<ColorPicker v-model="global.titleColor"></ColorPicker>
					</el-col>
				</el-row>
				<el-row class="right-component-item" style="padding: 8px 28px 4px;" type="flex" align='middle'>
					<el-col :span="8">
						&nbsp;&nbsp;&nbsp;&nbsp;位置
					</el-col>
					<el-col :span="16">
						<el-radio v-model='global.titleLocation' label="top">上方</el-radio>
						<el-radio v-model='global.titleLocation' label="bottom">下方</el-radio>
					</el-col>
				</el-row>
			</div>
		</div>
	</div>
</template>

<script>
	import ColorPicker from '../base/ColorPicker.vue'
	const props = {
		global: {
			type: Object
		}
	}
	export default {
		message: "全局",
		name: "TsGlobal",
		props: props,
		data() {
			return {
				isRight: true
			}
		},
		components: {
			ColorPicker
		}
	}
</script>

<style>

</style>