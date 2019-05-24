//浏览服务Mixins
export default {
	components: {
		//基本组件
		SeBackground: function(resolve) {
			require(['../components/graphics/SeBackground.vue'], resolve)
		},
		SeBorder: function(resolve) {
			require(['../components/graphics/SeBorder.vue'], resolve)
		},
		SeTitle: function(resolve) {
			require(['../components/text/SeTitle.vue'], resolve)
		},
		SeImage: function(resolve) {
			require(['../components/graphics/SeImage.vue'], resolve)
		},
		SeVideo: function(resolve) {
			require(['../components/graphics/SeVideo.vue'], resolve)
		},
		SeTime: function(resolve) {
			require(['../components/graphics/SeTime.vue'], resolve)
		},
		SeNumberTitleFlop: function(resolve) {
			require(['../components/graphics/SeNumberTitleFlop.vue'], resolve)
		},
		//图表组件
		SeBar: function(resolve) {
			require(['../components/chart/SeBar.vue'], resolve)
		},
		SeLine: function(resolve) {
			require(['../components/chart/SeLine.vue'], resolve)
		},
		SePie: function(resolve) {
			require(['../components/chart/SePie.vue'], resolve)
		},
		SeGauge: function(resolve) {
			require(['../components/chart/SeGauge.vue'], resolve)
		},
		SeScatter: function(resolve) {
			require(['../components/chart/SeScatter.vue'], resolve)
		},
		SeRadar: function(resolve) {
			require(['../components/chart/SeRadar.vue'], resolve)
		},
		//时空组件
		SeMap: function(resolve) {
			require(['../components/map/SeMap.vue'], resolve)
		},
		SeMapD3: function(resolve) {
			require(['../components/mapd3/SeMapD3.vue'], resolve)
		},
		SeTsHeatmap: function(resolve) {
			require(['../components/space/SeTsHeatmap.vue'], resolve)
		},
		SeTsAnalysis: function(resolve) {
			require(['../components/space/SeTsAnalysis.vue'], resolve)
		},
		//行业组件
		SeTrack: function(resolve) {
			require(['../components/industry/track/SeTrack.vue'], resolve)
		},
		SeTrackPlus: function(resolve) {
			require(['../components/industry/trackplus/SeTrackPlus.vue'], resolve)
		}

	}
}