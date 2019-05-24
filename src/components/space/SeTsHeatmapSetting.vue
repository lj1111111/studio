<template>
	<div class="right-component-containter">
		<Tabs @tabchange="handleTabChange" :tab="tab">
		</Tabs>
		<div class="right-component-labelInfo ">
			<span>&nbsp;{{label}}</span> <span style="font-size: 14px;">{{version}}</span>
		</div>
		<div v-show="isActiveStyle">
			<!--全局-->
			<TsGlobal :global="params.global"></TsGlobal>
			<!--尺寸和位置-->
			<Location :location="location"></Location>
		</div>
		<div v-show="isActiveData">
			<TsData :data='params.data'></TsData>
		</div>
	</div>
</template>

<script>
	import ComSettingMixinBase from '../base/ComSettingMixinBase.js'
	import TsGlobal from './TsGlobal.vue'
	import TsData from './TsData.vue'
	import mixin from './mixin.js'
	export default {
		name: 'SeTsHeatmapSetting',
		message: '时空热力图组件设置',
		mixins: [ComSettingMixinBase,mixin],
		components:{
			TsGlobal,
			TsData
		},
		watch: {

		}
	}
</script>

<style>

</style>