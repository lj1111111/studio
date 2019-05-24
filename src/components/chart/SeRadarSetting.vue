<template>
	<div class="right-component-containter">
		<Tabs @tabchange="handleTabChange" :tab="tab">
		</Tabs>
		<div class="right-component-labelInfo">
			<span>&nbsp;{{label}}</span> <span style="font-size: 14px;">{{version}}</span>
		</div>
		<div v-if="isActiveStyle">
			<!--坐标轴-->
			<ChartTitle :title="params.option.title"></ChartTitle>
			<!--图例-->
			<ChartLegend :legend="params.option.legend"></ChartLegend>
			<!--坐标轴-->
			<RadarAxis :axis="params.option.radar"></RadarAxis>
			<!--坐标轴-->
			<RadarIndicator :radar="params.option.radar"></RadarIndicator>
			<!--数据系列-->
			<RadarSeries :series-data="params.option.series"></RadarSeries>
			<!--尺寸和位置-->
			<Location :location="location"></Location>
			<!--组件对齐-->
			<Align @opaction="handleOpAction"></Align>
		</div>
		<Datasource v-if="isActiveData" :label="label" :data-config="params.dataConfig"></Datasource>
	</div>
</template>

<script>
	import ChartRadarSettingMixin from '../mixins/ChartRadarSettingMixin.js'
	export default {
		name: 'SeRadarSetting',
		message: '雷达图设置',
		mixins: [ChartRadarSettingMixin]
	}
</script>

<style>

</style>