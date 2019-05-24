import ChartSettingMixinBase from './ChartSettingMixinBase.js'

import ChartPieLabel from '../base/ChartPieLabel.vue'
import ChartPieGlobal from '../base/ChartPieGlobal.vue'
import ChartPieSeries from '../base/ChartPieSeries.vue'
//import PieData from './PieData.vue'
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
		ChartPieGlobal,
		ChartPieLabel,
		ChartPieSeries,
		Datasource
	},
	watch: {
		'params.option.series': {
			handler(newval) {
				this.params.option.legend.data = [];
				newval && newval.forEach((item) => {
					item && item.data && item.data.forEach((item2)=>{
						this.params.option.legend.data.push(item2.name);
					})
					
				})
			},
			deep: true
		}
	}
}