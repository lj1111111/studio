 /****
  * 异步加载浏览页面组件
  */
 export function loadViewAsyncComponents() {
 	return {
 		//基本组件
 		'SeBackground': () =>
 			import('../components/graphics/SeBackground.vue'),
 		'SeBorder': () =>
 			import('../components/graphics/SeBorder.vue'),
 		'SeTitle': () =>
 			import('../components/text/SeTitle.vue'),
 		'SeImage': () =>
 			import('../components/graphics/SeImage.vue'),
 		'SeVideo': () =>
 			import('../components/graphics/SeVideo.vue'),
 		'SeTime': () =>
 			import('../components/graphics/SeTime.vue'),
 		'SeNumberTitleFlop': () =>
 			import('../components/graphics/SeNumberTitleFlop.vue'),
 		//图表组件
 		'SeBar': () =>
 			import('../components/chart/SeBar.vue'),
 		'SeLine': () =>
 			import('../components/chart/SeLine.vue'),
 		'SePie': () =>
 			import('../components/chart/SePie.vue'),
 		'SeGauge': () =>
 			import('../components/chart/SeGauge.vue'),
 		"SeScatter": () =>
 			import('../components/chart/SeScatter.vue'),
 		"SeRadar": () =>
 			import('../components/chart/SeRadar.vue'),
 		//时空组件
 		'SeMap': () =>
 			import('../components/map/SeMap.vue'),
 		// 		'SeMapD3': () =>
 		// 			import('../components/mapd3/SeMapD3.vue'),
 		'SeTsHeatmap': () =>
 			import('../components/space/SeTsHeatmap.vue'),
 		'SeTsAnalysis': () =>
 			import('../components/space/SeTsAnalysis.vue'),
 		//行业组件
 		"SeTrack": () =>
 			import('../components/industry/track/SeTrack.vue')
 		//,
 		// 		"SeTrackPlus": () =>
 		// 			import('../components/industry/trackplus/SeTrackPlus.vue')
 	}
 }

 /****
  * 异步加载编辑器页面组件
  */
 export function loadEditAsyncComponents() {
 	return {
 		//基本组件
 		"SeBackground": () =>
 			import('../components/graphics/SeBackground.vue'),
 		"SeBackgroundSetting": () =>
 			import('../components/graphics/SeBackgroundSetting.vue'),
 		"SeBorder": () =>
 			import('../components/graphics/SeBorder.vue'),
 		"SeBorderSetting": () =>
 			import('../components/graphics/SeBorderSetting.vue'),
 		"SeTitle": () =>
 			import('../components/text/SeTitle.vue'),
 		"SeTitleSetting": () =>
 			import('../components/text/SeTitleSetting.vue'),
 		"SeImage": () =>
 			import('../components/graphics/SeImage.vue'),
 		"SeImageSetting": () =>
 			import('../components/graphics/SeImageSetting.vue'),
 		"SeVideo": () =>
 			import('../components/graphics/SeVideo.vue'),
 		"SeVideoSetting": () =>
 			import('../components/graphics/SeVideoSetting.vue'),
 		"SeTime": () =>
 			import('../components/graphics/SeTime.vue'),
 		"SeTimeSetting": () =>
 			import('../components/graphics/SeTimeSetting.vue'),
 		"SeWeather": () =>
 			import('../components/other/SeWeather.vue'),
 		"SeWeatherSetting": () =>
 			import('../components/other/SeWeatherSetting.vue'),
 		"SeNumberTitleFlop": () =>
 			import('../components/graphics/SeNumberTitleFlop.vue'),
 		"SeNumberTitleFlopSetting": () =>
 			import('../components/graphics/SeNumberTitleFlopSetting.vue'),
 		//图表组件
 		"SeBar": () =>
 			import('../components/chart/SeBar.vue'),
 		"SeBarSetting": () =>
 			import('../components/chart/SeBarSetting.vue'),
 		"SeLine": () =>
 			import('../components/chart/SeLine.vue'),
 		"SeLineSetting": () =>
 			import('../components/chart/SeLineSetting.vue'),
 		"SePie": () =>
 			import('../components/chart/SePie.vue'),
 		"SePieSetting": () =>
 			import('../components/chart/SePieSetting.vue'),
 		"SeGauge": () =>
 			import('../components/chart/SeGauge.vue'),
 		"SeGaugeSetting": () =>
 			import('../components/chart/SeGaugeSetting.vue'),
 		"SeScatter": () =>
 			import('../components/chart/SeScatter.vue'),
 		"SeScatterSetting": () =>
 			import('../components/chart/SeScatterSetting.vue'),
 		"SeRadar": () =>
 			import('../components/chart/SeRadar.vue'),
 		"SeRadarSetting": () =>
 			import('../components/chart/SeRadarSetting.vue'),
 		//时空组件
 		"SeMap": () =>
 			import('../components/map/SeMap.vue'),
 		"SeMapSetting": () =>
 			import('../components/map/SeMapSetting.vue'),
 		"SeMapD3": () =>
 			import('../components/mapd3/SeMapD3.vue'),
 		"SeMapD3Setting": () =>
 			import('../components/mapd3/SeMapD3Setting.vue'),
 		"SeTsHeatmap": () =>
 			import('../components/space/SeTsHeatmap.vue'),
 		"SeTsHeatmapSetting": () =>
 			import('../components/space/SeTsHeatmapSetting.vue'),
 		"SeTsAnalysis": () =>
 			import('../components/space/SeTsAnalysis.vue'),
 		"SeTsAnalysisSetting": () =>
 			import('../components/space/SeTsAnalysisSetting.vue'),
 		//行业组件 
 		"SeTrack": () =>
 			import('../components/industry/track/SeTrack.vue'),
 		"SeTrackSetting": () =>
 			import('../components/industry/track/SeTrackSetting.vue'),
 		"SeTrackPlus": () =>
 			import('../components/industry/trackplus/SeTrackPlus.vue'),
 		"SeTrackPlusSetting": () =>
 			import('../components/industry/trackplus/SeTrackPlusSetting.vue'),
 		//功能组件配置组件
 		"PageSetting": () =>
 			import('../components/PageSetting.vue'),
 		"AlignSetting": () =>
 			import('../components/AlignSetting.vue')
 	}
 }