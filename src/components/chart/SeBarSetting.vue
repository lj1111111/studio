<template>
	<div class="right-component-containter">
		<Tabs @tabchange="handleTabChange" :tab="tab">
		</Tabs>
		<div class="right-component-labelInfo ">
			<span>&nbsp;{{label}}</span> <span style="font-size: 14px;">{{version}}</span>
		</div>
		<div v-show="isActiveStyle">
			<!--全局-->
			<ChartGlobal :grid="selfGrid" :backgroundColor='params.option.backgroundColor' @chartbgcolor="handleChartBgColor"></ChartGlobal>
			<!--标题-->
			<ChartTitle :title="params.option.title"></ChartTitle>
			<!--X轴-->
			<ChartAxis :axis-type="AXISX" :axis-label="AXISX_LABEL" :axis="params.option.xAxis" :data-format="params.data.dataFormat" @changeaxistype='handleChangeAxisType'></ChartAxis>
			<!--Y轴-->
			<ChartAxis :axis-type="AXISY" :axis-label="AXISY_LABEL" :data-format="params.data.dataFormat" :axis="params.option.yAxis"  @changeaxistype='handleChangeAxisType'></ChartAxis>
			<!--图例-->
			<ChartLegend :legend="params.option.legend"></ChartLegend>
			<!--数据系列-->
			<ChartBarSeries :seriesData="params.option.series"></ChartBarSeries>
			<!--尺寸和位置-->
			<Location :location="location"></Location>
			<!--组件对齐-->
			<Align @opaction="handleOpAction"></Align>
		</div>
		<ChartBarOrLineData v-show="isActiveData" :label="label" :params="params"></ChartBarOrLineData>
	</div>
</template>

<script>
	import ChartBarOrLineSettingMixin from './ChartBarOrLineSettingMixin.js'

	export default {
		name: 'SeBarSetting',
		message: '柱状图设置',
		mixins: [ChartBarOrLineSettingMixin]
	}
</script>

<style>

</style>