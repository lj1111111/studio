<template>
	<div class="right-component-containter">
		<Tabs @tabchange="handleTabChange" :tab="tab">
		</Tabs>
		<div class="right-component-labelInfo">
			<span>&nbsp;{{label}}</span> <span style="font-size: 14px;">{{version}}</span>
		</div>
		<div v-if="isActiveStyle">
			<!--全局-->
			<ChartGlobal :grid="selfGrid" :backgroundColor='params.option.backgroundColor' @chartbgcolor="handleChartBgColor"></ChartGlobal>
			<!--标题-->
			<ChartTitle :title="params.option.title"></ChartTitle>
			<!--X轴-->
			<ChartAxis :axis-type="AXISX" :axis-label="AXISX_LABEL" :axis="params.option.xAxis"  :data-format="params.dataConfig.dataFormat" @changeaxistype='handleChangeAxisType'></ChartAxis>
			<!--Y轴-->
			<ChartAxis :axis-type="AXISY" :axis-label="AXISY_LABEL" :axis="params.option.yAxis"  :data-format="params.dataConfig.dataFormat" @changeaxistype='handleChangeAxisType' ></ChartAxis>
			<!--图例-->
			<ChartLegend :legend="params.option.legend"></ChartLegend>
			<!--数据系列-->
			<ScatterSeries :series-data="params.option.series"></ScatterSeries>
			<!--尺寸和位置-->
			<Location :location="location"></Location>
			<!--组件对齐-->
			<Align @opaction="handleOpAction"></Align>
		</div>
		<Datasource v-if="isActiveData" :label="label" :data-config="params.dataConfig"></Datasource>
		<!--<ChartBarOrLineData v-show="isActiveData" :label="label" :params="params"></ChartBarOrLineData>-->
	</div>
</template>

<script>
	import ChartScatterSettingMixin from '../mixins/ChartScatterSettingMixin.js'
	export default {
		name: 'SeScatterSetting',
		message: '散点图设置',
		mixins: [ChartScatterSettingMixin]
	}
</script>

<style>

</style>