<template>
	<div>
		<div class="right-component-item-header">
			<span @click="isRight=!isRight">
			<i class="el-icon-caret-right" v-show="isRight" ></i>
			<i class="el-icon-caret-bottom" v-show="!isRight" ></i>
			坐标轴</span>
		</div>
		<div v-show="!isRight" class="right-component-item-content">
			<AxisLine :axis-line="axis.axisLine"></AxisLine>
			<SplitLine :split-line="axis.splitLine"></SplitLine>
		</div>
	</div>
</template>
<script>
	import AxisLine from './axis/AxisLine.vue'
	import SplitLine from './axis/SplitLine.vue'
	const props = {
		axis:{
			type:Object,
			default:()=>{
				return {
					
				}
			}
		}
	}
	export default {
		message: "雷达图坐标轴组件",
		name: "RadarAxis",
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
			AxisLine,
			SplitLine
		},
		watch: {

		}
	}
</script>

<style>

</style>