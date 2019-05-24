<template>
	<div>
		<div class="right-component-item-header">
			<span @click="isRight=!isRight">
			<i class="el-icon-caret-right" v-show="isRight" ></i>
			<i class="el-icon-caret-bottom" v-show="!isRight" ></i>
			标签</span>
			<el-checkbox style="float: right" v-model='label.normal.show'>显示</el-checkbox>
		</div>
		<div v-show="!isRight" class="right-component-item-content">
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="8">
					字号
				</el-col>
				<el-col :span="16">
					<el-input-number v-model="label.normal.textStyle.fontSize"  controls-position="right"></el-input-number>
				</el-col>
			</el-row>
			<!--<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="8">
					颜色
				</el-col>
				<el-col :span="16">
					<ColorPicker v-model="label.normal.textStyle.color"></ColorPicker>
				</el-col>
			</el-row>-->
			<el-row class="right-component-item" style="padding: 8px 28px 4px;" type="flex" align='middle'>
				<el-col :span="8">
					显示位置
				</el-col>
				<el-col :span="16">
					<el-radio v-model='label.normal.position' label="outer">外部</el-radio>
					<el-radio v-model='label.normal.position' label="inner">内部</el-radio>
				</el-col>
			</el-row>

		</div>
	</div>
</template>

<script>
	import ColorPicker from './ColorPicker.vue'
	const props = {
		label: {
			type: Object,
			default: () => {
				return {
					normal: {
						show: true,
						position: 'outer', //饼图可选为：'outer'（外部） | 'inner'（内部）
						textStyle: {
							fontSize: 12
							//							,
							//							color: '#000'
						}
					}
				}
			}
		}
	}
	export default {
		message: "饼图标签",
		name: "ChartPieLabel",
		props: props,
		data() {
			return {
				isRight: true
			}
		},
		mounted() {
			console.log(this.seriesData);
		},
		components: {
			ColorPicker
		}

	}
</script>

<style>

</style>