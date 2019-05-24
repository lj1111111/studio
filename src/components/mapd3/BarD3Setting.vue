<template>
	<div class="right-component-containter" >
		<Tabs @tabchange="handleTabChange" :tab="selfTab">
		</Tabs>
		<div class="right-component-labelInfo">
			<i class="el-icon-arrow-left sub-icon" title="返回" @click="sendBack"></i>
			<span>{{config.label}}</span> <span style="font-size: 14px;">{{config.version}}</span>
		</div>
		<div v-if="isActiveStyle">
			<!--全局设置组件-->
			<BarD3Global :option="config.params.option"></BarD3Global>
		</div>
		<BarD3Data v-if="isActiveData" :data-config="config.params.dataConfig" :label="config.label"></BarD3Data>
	</div>
</template>

<script>
	import SubComSettingMixinBase from '../base/SubComSettingMixinBase.js'
	import BarD3Global from './BarD3Global.vue'
	import BarD3Data from './BarD3Data.vue'
	export default {
		name: 'BarD3Setting',
		message: '3D柱状图组件设置',
		mixins: [SubComSettingMixinBase],
		mounted() {
			
		},
		methods: {

		},
		components: {
			BarD3Global,
			BarD3Data
		},
		watch: {

		}
	}
</script>

<style scoped>
	.sub-icon {
		color: #21aed7;
		font-weight: bold;
		cursor: pointer;
	}
</style>