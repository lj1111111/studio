import ComSettingMixinBase from '../base/ComSettingMixinBase.js'

import ChartGlobal from '../base/ChartGlobal.vue'
import ChartTitle from '../base/ChartTitle.vue'
import ChartLegend from '../base/ChartLegend.vue'
import Location from '../base/Location.vue'

/**
 * 图表设置共同设置,后期增加的组件改用此文件,chart目录的文件后期不在使用，
 * 日期：2018-07-24
 * 作者：LJ
 */
export default {
	mixins: [ComSettingMixinBase],
	methods: {
		handleChartBgColor(val) {
			this.params.option.backgroundColor = val;
		}
	},
	components: {
		ChartGlobal,
		Location,
		ChartLegend,
		ChartTitle
	}
}