import ComMixinBase from './ComMixinBase.js'
/***
 * 图表组件实现扩展版,后期图表引用此文件
 * 日期：2018-07-25
 * 
 */
export default {
	mixins: [ComMixinBase],
	data() {
		return {
			myChart: undefined
		}
	},
	methods: {
		//重置Chart容器大小
		resize(newval) {
			this.$nextTick(() => {
				var d = 2;
				let chartdiv = document.getElementById(this.chartid);
				chartdiv.style.width = (newval.width - d) + "px";
				chartdiv.style.height = (newval.height - d) + "px";
				this.myChart && this.myChart.resize();
			})
		}
	},
	computed: {
		chartid() {
			return 'EChart_' + this.ukey;
		}
	},
	watch: {
		location: {
			handler(curVal, oldVal) {　　　　　　　　　　　　
				this.resize(curVal);　　　　
			},
			deep: true
		}
	}
}