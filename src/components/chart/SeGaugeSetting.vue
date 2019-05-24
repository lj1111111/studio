<template>
	<div class="right-component-containter">
		<Tabs @tabchange="handleTabChange" :tab="tab">
		</Tabs>
		<div class="right-component-labelInfo">
			<span>&nbsp;{{label}}</span> <span style="font-size: 14px;">{{version}}</span>
		</div>
		<div style=""></div>
		<div v-if="isActiveStyle">
			<!--全局-->
			<ChartGaugeGlobal :series-data="params.option.series[0]" :backgroundColor='params.option.backgroundColor' @chartbgcolor="handleChartBgColor"></ChartGaugeGlobal>
			<!--坐标轴-->
			<ChartGaugeAxis :series-data="params.option.series[0]"></ChartGaugeAxis>
			<!--刻度线-->
			<ChartGaugeAxisTick :series-data="params.option.series[0]"></ChartGaugeAxisTick>
			<!--分割线-->
			<ChartGaugeSplitLine :series-data="params.option.series[0]"></ChartGaugeSplitLine>
			<!--标题-->
			<ChartGaugeTitle :series-data="params.option.series[0]"></ChartGaugeTitle>
			<!--详情-->
			<ChartGaugeDetail :series-data="params.option.series[0]"></ChartGaugeDetail>
			<!--尺寸和位置-->
			<Location :location="location"></Location>
			<!--组件对齐-->
			<Align @opaction="handleOpAction"></Align>
		</div>
		<!--<GaugeData v-if="isActiveData" :label="label" :params="params"></GaugeData>-->
		<Datasource v-if="isActiveData" :label="label" :data-config="params.dataConfig"></Datasource>
	</div>
</template>

<script>
	import ChartGaugeSettingMixin from './ChartGaugeSettingMixin.js'

	export default {
		name: 'SeGaugeSetting',
		message: '仪表盘设置',
		mixins: [ChartGaugeSettingMixin]
	}
</script>

<style>

</style>