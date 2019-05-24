import common from '../../mixins/common.js'
import { mapState } from 'vuex'
//const deepClone = (obj) => {
//	return JSON.parse(JSON.stringify(obj));
//}
///**
//*这里需要先用Number进行数据类型转换，然后去指定截取转换后的小数点后几位(按照四舍五入)，这里是截取一位，0.1266转换后会变成12.7%
//*/
//const toPercent=(point)=>{
//  var str=Number(point*100).toFixed(1);
//  str+="%";
//  return str;
//}
/***
 * 图表实现
 */
export default {
	mixins: [common],
	data() {
		return {
			myChart: undefined
		}
	},
	methods: {
		init(eleid, newval) {
			this.$nextTick(() => {
				if(this.myChart) {
					this.myChart.dispose();
				}
				this.myChart = this.$echarts.init(document.getElementById(eleid));
				if(this.params.data.datasource.type == 3) //数据库模式，目前未处理
				{
					this.$message({
						message: '正在开发中...',
						type: 'warning'
					});

				} else if(this.params.data.datasource.type == 4) //API
				{
					this.dowithAPI();//调用子mixin
				} else {
					this.myChart.setOption(newval.option);
				}
			})
		},
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
		},
		...mapState([
				'dbUrl'
			])
	},
	mounted() {
		this.init(this.chartid, this.params);
	},
	watch: {
		'params': {
			handler(curVal, oldVal) {　　　　　　　　　　　　
				this.init(this.chartid, curVal);　　　　　　　　
			},
			deep: true
		},
		location: {
			handler(curVal, oldVal) {　　　　　　　　　　　　
				this.resize(curVal);　　　　
			},
			deep: true
		}
	}
}