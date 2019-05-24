import TabType from '../../constants/TabType.js'
import common from '../../mixins/common.js'

import Tabs from '../base/Tabs.vue'
import ChartGlobal from '../base/ChartGlobal.vue'
import ChartTitle from '../base/ChartTitle.vue'
import ChartLegend from '../base/ChartLegend.vue'
import Location from '../base/Location.vue'

/**
 * 图表设置共同设置
 */
export default {
	mixins: [common],
	data() {
		
		return {
			tab: TabType.TAB_STYLE
		}
	},
	
	methods: {
		//接收Tab切换
		handleTabChange(vVal) {
			this.tab = vVal;
		},
		handleChartBgColor(val) {
			this.params.option.backgroundColor = val;
		}
	},
	computed: {
		isActiveData() {
			return this.tab === TabType.TAB_DATA ? true : false;
		},
		isActiveStyle() {
			return this.tab === TabType.TAB_STYLE ? true : false;
		}
	},
	components: {
		Tabs,
		ChartGlobal,
		Location,
		ChartLegend,
		ChartTitle
	},
	watch: {
		ukey() {
			this.tab = TabType.TAB_STYLE;
		},
		"selfGrid": {
			handler(newval) {
				this.params.option.grid.x = this.toPercent(newval.x / this.location.width);
				this.params.option.grid.y = this.toPercent(newval.y / this.location.height);
				this.params.option.grid.x2 = this.toPercent(newval.x2 / this.location.width);
				this.params.option.grid.y2 = this.toPercent(newval.y2 / this.location.height);
			},
			deep: true
		}
	}
}