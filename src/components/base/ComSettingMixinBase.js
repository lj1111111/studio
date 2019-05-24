import TabType from '../../constants/TabType.js'
import common from '../../mixins/common.js'


import Tabs from './Tabs.vue'
import Location from './Location.vue'


/**
 * 组件共同设置
 */
export default {
	mixins: [common],
	data() {
		return {
			tab: TabType.TAB_STYLE
		}
	},
	mounted(){
		this.init();
	},
	methods: {
		//接收Tab切换
		handleTabChange(vVal) {
			this.tab = vVal;
		},
		//初始化，组件里可以实现
		init(){
			
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
		Location
	},
	watch: {
		ukey() {
			this.tab = TabType.TAB_STYLE;
			this.init();
		}
	}
}