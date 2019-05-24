<template>
	<div class="right-component-containter" >
		<Tabs @tabchange="handleTabChange" :tab="tab">
		</Tabs>
		<div class="right-component-labelInfo">
			<i class="el-icon-arrow-left sub-icon" title="返回" @click="sendBack"></i>
			<span>&nbsp;{{config.label}}</span> <span style="font-size: 14px;">{{config.version}}</span>
		</div>
		<div v-if="isActiveStyle">
			<LinesD3Effect :effect="config.params.option.effect"></LinesD3Effect>
			<LineStyle :line-style="config.params.option.lineStyle"></LineStyle>
			<CitiesCenter></CitiesCenter>
		</div>
		<LinesD3Data  v-if="isActiveData" :data-config="config.params.dataConfig" :label="config.label"></LinesD3Data>
	</div>
</template>

<script>
	import SubComSettingMixinBase from '../base/SubComSettingMixinBase.js'
	import LinesD3Effect from './LinesD3Effect.vue'
	import LineStyle from '../base/LineStyle.vue'
	import LinesD3Data from './LinesD3Data.vue'
	import CitiesCenter from '../base/CitiesCenter.vue'
	export default {
		name: 'LinesD3Setting',
		message: '3D飞线图组件设置',
		mixins: [SubComSettingMixinBase],
		data() {
			return {

			}
		},
		mounted() {

		},
		methods: {

		},
		components: {
			LinesD3Effect,
			LineStyle,
			LinesD3Data,
			CitiesCenter
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