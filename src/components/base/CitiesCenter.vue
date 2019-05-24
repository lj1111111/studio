<template>
	<div style="display: flex;flex-direction: column;">
		<div class="right-component-item-header">
			<span @click="isRight=!isRight">
			<i class="el-icon-caret-right" v-show="isRight" ></i>
			<i class="el-icon-caret-bottom" v-show="!isRight" ></i>
			城市列表</span>
		</div>
		<div v-show="!isRight" class="right-component-item-content">
			<el-row class="right-component-item" type="flex" align='middle' justify="center">
				<StaticJSON :json-data="jsonData" style="padding: 4px 0px;flex:1;height: 500px;"></StaticJSON>
			</el-row>
		</div>
	</div>
</template>

<script>
    import {getCities} from '../../data/china_cities.js'
	import StaticJSON from './StaticJSON.vue'
	export default {
		message: "城市中心坐标组件",
		name: "Location",
		data() {
			return {
				isRight: true,
			    jsonData:[]
			}
		},
		mounted() {
            this.jsonData=getCities();
		},
		methods: {

		},
		components:{
			StaticJSON
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