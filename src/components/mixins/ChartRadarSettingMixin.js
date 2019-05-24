import ChartSettingMixinBase from './ChartSettingMixinBase.js'

import RadarAxis from '../compart/RadarAxis.vue'
import RadarIndicator from '../compart/RadarIndicator.vue'
import RadarSeries from '../compart/RadarSeries.vue'
import Datasource from '../data/Datasource.vue'
/**
 *雷达图设置页面
 */
export default {
	mixins: [ChartSettingMixinBase],
	data() {
		return {};
	},
	mounted() {

	},
	methods: {

	},
	components: {
		RadarAxis,
		RadarIndicator,
		RadarSeries,
		Datasource
	},
	watch: {

	}
}