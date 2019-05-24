import ChartSettingMixinBase from './ChartSettingMixinBase.js'

import ChartAxis from '../base/ChartAxis.vue'
import ChartLineSeries from '../base/ChartLineSeries.vue'
import ChartBarSeries from '../base/ChartBarSeries.vue'
import ChartBarOrLineData from './ChartBarOrLineData.vue'
import moment from 'moment';

import { randomNum } from '../../utils/util.js';
//坐标轴类型
const AXISTYPE = {
	X: 'X',
	Y: 'Y'
}
/**
 *折线图与柱状图设置页面
 */
export default {
	mixins: [ChartSettingMixinBase],
	data() {
		var selfGrid = this.selfGrid2();
		return {
			AXISX: AXISTYPE.X,
			AXISY: AXISTYPE.Y,
			AXISX_LABEL: AXISTYPE.X + "轴",
			AXISY_LABEL: AXISTYPE.Y + "轴",
			selfGrid
		}
	},
	mounted() {

	},
	methods: {
		//监听X轴标签类型发生变化时，处理的函数
		handleChangeAxisType(val) {
			//初始化数据,之前的状态不保存
			var axisData1 = []; //category
			var axisData2 = []; //time
			var count = 4;
			var format = this.params.data.dataFormat;
			var now = moment();
			for(var i = 0; i < count; i++) {
				axisData1.push("类别" + (i + 1));
				axisData2.push(now.add(1, "h").format(format.responseFormat));
			}
			if(val.axisType == AXISTYPE.X) {
				if(val.value == "category" || val.value == "time") {
					this.params.option.yAxis.type = "value";
				} else {
					this.params.option.yAxis.type = "category";
				}
			} else {
				if(val.value == "category" || val.value == "time") {
					this.params.option.xAxis.type = "value";
				} else {
					this.params.option.xAxis.type = "category";
				}
//				
//				if(val.value == "category") {
//					this.params.option.xAxis.type = "value";
//				} else if(val.value == "time") { //
//					this.params.option.xAxis.type = "value";
//				} else {
//					this.params.option.xAxis.type = "category";
//				}
			}
			var axisData = null;
			if(this.params.option.xAxis.type == "category") {
				this.params.option.xAxis.data = axisData1;
				this.params.option.yAxis.data = [];
				this.params.option.xAxis.max=null ;
				this.params.option.yAxis.max="dataMax";
				axisData = axisData1;
			} else if(this.params.option.xAxis.type == "time") {
				this.params.option.xAxis.data = []; //axisData2
				this.params.option.yAxis.data = [];
				this.params.option.xAxis.max=null ;
				this.params.option.yAxis.max="dataMax";
				axisData = axisData2;
			} else if(this.params.option.xAxis.type == "value") {
				if(this.params.option.yAxis.type == "category") {
					this.params.option.xAxis.data = [];
					this.params.option.yAxis.data = axisData1;
					this.params.option.xAxis.max="dataMax" ;
				    this.params.option.yAxis.max=null;
					axisData = axisData1;
				} else if(this.params.option.yAxis.type == "time") {
					this.params.option.xAxis.data = [];
					this.params.option.yAxis.data = []; //axisData2
					this.params.option.xAxis.max="dataMax" ;
				    this.params.option.yAxis.max=null;
					axisData = axisData2;
				}
			}
			//坐标轴切换时,初始化数据
			var series = this.params.option.series;
			series && series.forEach(item => {
				item.data = [];
				if(this.params.option.yAxis.type == "time" || this.params.option.xAxis.type == "time") { //有时间轴处理
					axisData && axisData.forEach(item2 => {
						var aa = randomNum();
						if(this.params.option.yAxis.type == "value") {
							item.data.push([item2, aa]);
						} else {
							item.data.push([aa, item2]);
						}
					})
				} else {
					axisData && axisData.forEach(item2 => {
						var aa = randomNum();
						item.data.push(aa);
					})
				}
			});
		},
		//百分数转成小数
		toPoint(percent) {
			var str = percent.replace("%", "");
			str = str / 100;
			return str;
		},
		/**
		 *这里需要先用Number进行数据类型转换，然后去指定截取转换后的小数点后几位(按照四舍五入)，这里是截取一位，0.1266转换后会变成12.7%
		 */
		toPercent(point) {
			var str = Number(point * 100).toFixed(4);
			str += "%";
			return str;
		},
		selfGrid2() {
			if(this.params.option.grid && this.location) {
				var x = Math.round(this.toPoint(this.params.option.grid.x) * this.location.width);
				var y = Math.round(this.toPoint(this.params.option.grid.y) * this.location.height);
				var x2 = Math.round(this.toPoint(this.params.option.grid.x2) * this.location.width);
				var y2 = Math.round(this.toPoint(this.params.option.grid.y2) * this.location.height);
				return {
					x,
					y,
					x2,
					y2
				}
			} else {
				return {
					x: 80,
					y: 60,
					x2: 80,
					y2: 60
				}
			}
		}

	},
	components: {
		ChartAxis,
		ChartLineSeries,
		ChartBarSeries,
		ChartBarOrLineData
	},
	watch: {
//		'params.option.series': {
//			handler(newval) {
//								this.params.option.legend.data = [];
//								newval && newval.forEach((item) => {
//									this.params.option.legend.data.push(item.name);
//								})
//			},
//			deep: true
//		},
		"params.option.grid": {
			handler(newval) {
				this.selfGrid = this.selfGrid2();
			},
			deep: true
		},
		"location": {
			handler(newval) {
				this.selfGrid = this.selfGrid2();
			},
			deep: true
		}
	}
}