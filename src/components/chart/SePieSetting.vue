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
			<ChartPieGlobal :series-data="params.option.series[0]" :backgroundColor='params.option.backgroundColor' @chartbgcolor="handleChartBgColor"></ChartPieGlobal>
			<!--标题-->
			<ChartTitle :title="params.option.title"></ChartTitle>
			<!--图例-->
			<ChartLegend :legend="params.option.legend"></ChartLegend>
			<!--标签-->
			<ChartPieLabel :label="params.option.series[0].label"></ChartPieLabel>
			<!--图形位置-->
			<!--<ChartPosition :center="params.option.series[0].center" :radius="params.option.series[0].radius"></ChartPosition>-->
			<!--数据系列-->
			<ChartPieSeries :series-data="params.option.series"></ChartPieSeries>
			<!--尺寸和位置-->
			<Location :location="location"></Location>
			<!--组件对齐-->
			<Align @opaction="handleOpAction"></Align>
		</div>
		<!--<PieData v-show="isActiveData" :label="label" :params="params"></PieData>-->
        <Datasource v-if="isActiveData" :label="label" :data-config="params.dataConfig"></Datasource>
	</div>
</template>

<script>
	import ChartPieSettingMixin from './ChartPieSettingMixin.js'
	export default {
		name: 'SePieSetting',
		message: '饼图设置',
		mixins: [ChartPieSettingMixin]
	}
</script>

<style>

</style>