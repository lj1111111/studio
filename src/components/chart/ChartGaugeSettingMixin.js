import ChartSettingMixinBase from './ChartSettingMixinBase.js'

import ChartGaugeTitle from '../base/ChartGaugeTitle.vue'

import ChartGaugeGlobal from '../base/ChartGaugeGlobal.vue'


import ChartGaugeAxis from '../base/ChartGaugeAxis.vue'
import ChartGaugeAxisTick from '../base/ChartGaugeAxisTick.vue'
import ChartGaugeSplitLine from '../base/ChartGaugeSplitLine.vue'
import ChartGaugeDetail from '../base/ChartGaugeDetail.vue'
//import GaugeData from './GaugeData.vue'
import Datasource from '../data/Datasource.vue'

/**
 *饼图设置页面
 */
export default {
	mixins: [ChartSettingMixinBase],
	data() {
		return {
			
		}
	},
	mounted() {},
	methods: {
		
	},
	components: {
		ChartGaugeTitle,
		ChartGaugeGlobal,
		
		ChartGaugeAxis,
		ChartGaugeAxisTick,
		ChartGaugeSplitLine,
		ChartGaugeDetail,
		Datasource
		
	}
}