import TabType from '../../constants/TabType.js'
import Tabs from './Tabs.vue'

//	obj.id = id;
//  obj.label
//	obj.name = name;
//	obj.version = ver;
//	obj.params = {};
//	obj.params.dataConfig = {}; //data config
const props = {
	config: {
		type: Object,
		default: () => {
			return {}
		}
	},
	tab: {
		type: String,
		default: TabType.TAB_STYLE
	}
}
/**
 * 子组件组件共同设置
 */
export default {
	props: props,
	data() {
			return {
              selfTab:this.tab
			}
		},
	mounted() {
		this.init();
	},
	methods: {
		//初始化，组件里可以实现
		init() {

		},
		//接收Tab切换
		handleTabChange(vVal) {
			this.selfTab = vVal;
		},
		//分发返回事件
		sendBack() {
			this.$emit("back");
		}
	},
	computed: {
		isActiveData() {
			return this.selfTab === TabType.TAB_DATA ? true : false;
		},
		isActiveStyle() {
			return this.selfTab === TabType.TAB_STYLE ? true : false;
		}
	},
	components: {
		Tabs
	},
	watch: {
		
	}
}