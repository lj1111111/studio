/****
 * echarts图表默认配置
 */

//柱状图默认配置
const BarOption = {
	"backgroundColor": "rgba(173,148,148,0)",
	"grid": {
		"x": "15%",
		"y": "15%",
		"x2": "10%",
		"y2": "10%"
	},
	"title": {
		"show": false,
		"text": "图表标题",
		"textStyle": {
			"color": "#2F4554",
			"fontSize": 12,
			"fontWeight": "normal"
		},
		"x": 'center',
		"y": "top"
	},

	"tooltip": {
		"trigger": "axis",
		"axisPointer": {
			"type": "shadow"
		}
	},
	"xAxis": {
		"name": "", //一般用于坐标轴单位设置
		"nameTextStyle": { //与轴标签表示一致
			"color": "#FF0000",
			"fontSize": 12,
			"fontWeight": "normal"
		},
		"boundaryGap": true,
		"splitNumber": 5,
		"show": true,
		"type": "category",
		"axisLine": {
			"show": true,
			"lineStyle": {
				"color": "#2F4554",
				"width": 1
			}
		},
		"splitLine": {
			"show": false,
			"lineStyle": {
				"color": "#1E1D1D",
				"type": "solid" //'solid' | 'dotted' | 'dashed'
			}
		},
		"splitArea": {
			"show": false,
			"areaStyle": {
				"color": [
					'rgba(250,250,250,0.3)',
					'rgba(200,200,200,0.3)'
				]
			}
		},
		"axisLabel": {
			"show": true,
			"rotate": 0,
			"textStyle": {
				"color": "#2F4554",
				"fontSize": 12,
				"fontWeight": "normal"
			}
		},
		"axisTick": {
			"show": false,
			"alignWithLabel": true,
			"lineStyle": {
				"color": "#2F4554"
			}
		},
		"data": [
			"类别1",
			"类别2",
			"类别3",
			"类别4"
		],
		"scale": false
	},
	"yAxis": {
		"name": "", //一般用于坐标轴单位设置
		"nameTextStyle": { //与轴标签表示一致
			"color": "#FF0000",
			"fontSize": 12,
			"fontWeight": "normal"
		},
		"boundaryGap": true,
		"splitNumber": 5,
		"barWidth": "10%",
		"show": true,
		"type": "value",
		"axisLine": {
			"show": true,
			"lineStyle": {
				"color": "#2F4554",
				"width": 1
			}
		},
		"splitLine": {
			"show": false,
			"lineStyle": {
				"color": "#1E1D1D",
				"type": "solid" //'solid' | 'dotted' | 'dashed'
			}
		},
		"splitArea": {
			"show": false,
			"areaStyle": {
				"color": [
					'rgba(250,250,250,0.3)',
					'rgba(200,200,200,0.3)'
				]
			}
		},
		"axisLabel": {
			"show": true,
			"rotate": 0,
			"textStyle": {
				"color": "#2F4554",
				"fontSize": 12,
				"fontWeight": "normal"
			}
		},
		"axisTick": {
			"show": false,
			"alignWithLabel": true,
			"lineStyle": {
				"color": "#2F4554"
			}
		},
		"data": [
			//			"类别1","类别2","类别3","类别4"
		],
		"scale": false
	},
	"legend": {
		"show": true,
		"textStyle": {
			"color": "#2F4554",
			"fontSize": 12
		},
		"orient": "horizontal",
		"x": "left",
		"y": "top",
	},
	"series": [{
		"name": "系列1",
		"type": "bar",
		"stack": '',
		"label": {
			"show": false,
			"position": "inside",
			"fontSize": 12,
			"color": "#FFFFFF",
			"fontWeight": "normal"
		},
		"itemStyle": {
			"color": "#61A0A8"
		},
		"data": [
			52,
			200,
			334,
			390
		]
	}]
}
//折线图默认配置
const LineOption = {
	"backgroundColor": "rgba(173,148,148,0)",
	"grid": {
		"x": "15%",
		"y": "15%",
		"x2": "10%",
		"y2": "10%"
	},
	"title": {
		"show": false,
		"text": "图表标题",
		"textStyle": {
			"color": "#2F4554",
			"fontSize": 12,
			"fontWeight": "normal"
		},
		"x": 'left',
		"y": "top"
	},

	"tooltip": {
		"trigger": "axis",
		"axisPointer": {
			"type": "shadow"
		}
	},
	"xAxis": {
		"name": "", //一般用于坐标轴单位设置
		"nameTextStyle": { //与轴标签表示一致
			"color": "#FF0000",
			"fontSize": 12,
			"fontWeight": "normal"
		},
		"boundaryGap": false,
		"splitNumber": 5,
		"show": true,
		"type": "category",
		"axisLine": {
			"show": true,
			"lineStyle": {
				"color": "#2F4554",
				"width": 1
			}
		},
		"splitLine": {
			"show": false,
			"lineStyle": {
				"color": "#1E1D1D",
				"type": "solid" //'solid' | 'dotted' | 'dashed'
			}
		},
		"splitArea": {
			"show": false,
			"areaStyle": {
				"color": [
					'rgba(250,250,250,0.3)',
					'rgba(200,200,200,0.3)'
				]
			}
		},
		"axisLabel": {
			"show": true,
			"rotate": 0,
			"textStyle": {
				"color": "#2F4554",
				"fontSize": 12,
				"fontWeight": "normal"
			}
		},
		"axisTick": {
			"show": true,
			"alignWithLabel": true,
			"lineStyle": {
				"color": "#2F4554"
			}
		},
		"data": [
			"类别1",
			"类别2",
			"类别3",
			"类别4"
		],
		"scale": false
	},
	"yAxis": {
		"name": "",
		"nameTextStyle": {
			"color": "#FF0000",
			"fontSize": 12,
			"fontWeight": "normal"
		},
		"boundaryGap": true,
		"splitNumber": 5,
		"show": true,
		"type": "value",
		"axisLine": {
			"show": true,
			"lineStyle": {
				"color": "#2F4554",
				"width": 1
			}
		},
		"splitLine": {
			"show": false,
			"lineStyle": {
				"color": "#1E1D1D",
				"type": "solid" //'solid' | 'dotted' | 'dashed'
			}
		},
		"splitArea": {
			"show": false,
			"areaStyle": {
				"color": [
					'rgba(250,250,250,0.3)',
					'rgba(200,200,200,0.3)'
				]
			}
		},
		"axisLabel": {
			"show": true,
			"rotate": 0,
			"textStyle": {
				"color": "#2F4554",
				"fontSize": 12,
				"fontWeight": "normal"
			}
		},
		"axisTick": {
			"show": true,
			"alignWithLabel": true,
			"lineStyle": {
				"color": "#2F4554"
			}
		},
		"data": [],
		"scale": false
	},
	"legend": {
		"show": true,
		"textStyle": {
			"color": "#2F4554",
			"fontSize": 12
		},
		"orient": "horizontal",
		"x": "center",
		"y": "top",
	},
	"series": [{
		"name": "系列1",
		"type": "line",
		"stack": '',
		"smooth": true,
		"showSymbol": true,
		"symbol": "circle",
		"symbolSize": 8,
		"lineStyle": {
			"color": "#61A0A8",
			"type": "solid",
			"width": 2
		},
		"areaStyle": {
			"color": "#91C7B0",
			"opacity": 1
		},
		"label": {
			"show": false,
			"position": "top",
			"fontSize": 12,
			"color": "#2F4554",
			"fontWeight": "normal"
		},
		"itemStyle": {
			"color": "#61A0A8"
		},
		"data": [
			52,
			200,
			334,
			390
		]
	}]
}
//饼图默认配置
const PieOption = {
	"backgroundColor": "rgba(173,148,148,0)",
	"title": {
		"show": false,
		"text": "图表标题",
		"textStyle": {
			"color": "#2F4554",
			"fontSize": 12,
			"fontWeight": "normal"
		},
		"x": 'left',
		"y": "top"
	},
	"tooltip": {
		"trigger": "item",
		"formatter": "{b} : {c} ({d}%)",
		"axisPointer": {
			"type": "shadow"
		}
	},
	"legend": {
		"show": true,
		"data": [
			"第一季度",
			"第二季度",
			"第三季度"
		],
		"textStyle": {
			"color": "#2F4554",
			"fontSize": 12
		},
		"orient": "horizontal",
		"x": "center",
		"y": "top",
	},
	"series": [{
		"type": "pie",
		"radius": [0, '50%'],
		"center": [
			"50%",
			"50%"
		],
		"label": {
			"normal": {
				"show": true,
				"position": "outer",
				"textStyle": {
					"fontSize": 12
				}
			}
		},
		"data": [{
			"value": 0,
			"itemStyle": {
				"normal": {
					"color": "#C23531"
				}
			},
			"name": "第一季度"
		}, {
			"value": 0,
			"itemStyle": {
				"normal": {
					"color": "#2F4554"
				}
			},
			"name": "第二季度"
		}, {
			"value": 0,
			"itemStyle": {
				"normal": {
					"color": "#61A0A8"
				}
			},
			"name": "第三季度"
		}]
	}]
}
//仪表盘默认配置
const GaugeOption = {
	"backgroundColor": "rgba(173,148,148,0)",
	"tooltip": {
		"formatter": "{b} : {c}"
	},
	"series": [{
		"title": {
			"show": true,
			"textStyle": {
				"color": "#2F4554",
				"fontSize": 20
			}
		},
		"radius": "80%",
		"center": [
			"50%",
			"60%"
		],
		"type": "gauge",
		"min": 0,
		"max": 100,
		"splitNumber": 10,
		"axisLine": {
			"lineStyle": {
				"color": [
					[
						0.5,
						"#C23531"
					],
					[
						0.9,
						"#2F4554"
					],
					[
						1,
						"#61A0A8"
					]
				],
				"width": 10
			}
		},
		"axisLabel": {
			"show": true,
			"textStyle": {
				"color": 'auto',
				"fontSize": 12
			}
		},
		"splitLine": {
			"show": true,
			"length": 20,
			"lineStyle": {
				"color": "auto"
			}
		},
		"axisTick": {
			"length": 15,
			"splitNumber": 5,
			"lineStyle": {
				"color": "auto"
			},
			"show": true
		},
		"detail": {
			"show": true,
			"formatter": "{value}",
			"textStyle": {
				"color": '#2F4554',
				"fontSize": 30
			}
		},
		"data": [{
			"value": 0,
			"name": "GDP\n发展指数"
		}]
	}]
}
//散点图配置
const ScatterOption = {
	"backgroundColor": "rgba(173,148,148,0)",
	"grid": {
		"x": "15%",
		"y": "15%",
		"x2": "10%",
		"y2": "10%"
	},
	"title": {
		"show": false,
		"text": "图表标题",
		"textStyle": {
			"color": "#2F4554",
			"fontSize": 12,
			"fontWeight": "normal"
		},
		"x": 'center',
		"y": "top"
	},
	"tooltip": {
		"show": false,
		"trigger": "axis",
		"axisPointer": {
			"type": "shadow"
		}
	},
	"xAxis": {
		"name": "", //一般用于坐标轴单位设置
		"nameTextStyle": { //与轴标签表示一致
			"color": "#FF0000",
			"fontSize": 12,
			"fontWeight": "normal"
		},
		"boundaryGap": true,
		"splitNumber": 5,
		"show": true,
		"type": "category",
		"axisLine": {
			"show": true,
			"lineStyle": {
				"color": "#2F4554",
				"width": 1
			}
		},
		"splitLine": {
			"show": false,
			"lineStyle": {
				"color": "#1E1D1D",
				"type": "solid" //'solid' | 'dotted' | 'dashed'
			}
		},
		"splitArea": {
			"show": false,
			"areaStyle": {
				"color": [
					'rgba(250,250,250,0.3)',
					'rgba(200,200,200,0.3)'
				]
			}
		},
		"axisLabel": {
			"show": true,
			"rotate": 0,
			"textStyle": {
				"color": "#2F4554",
				"fontSize": 12,
				"fontWeight": "normal"
			}
		},
		"axisTick": {
			"show": false,
			"alignWithLabel": true,
			"lineStyle": {
				"color": "#2F4554"
			}
		},
		//		"data": [
		//			"类别1",
		//			"类别2",
		//			"类别3",
		//			"类别4"
		//		],
		"scale": false
	},
	"yAxis": {
		"name": "", //一般用于坐标轴单位设置
		"nameTextStyle": { //与轴标签表示一致
			"color": "#FF0000",
			"fontSize": 12,
			"fontWeight": "normal"
		},
		"boundaryGap": true,
		"splitNumber": 5,
		"barWidth": "10%",
		"show": true,
		"type": "value",
		"axisLine": {
			"show": true,
			"lineStyle": {
				"color": "#2F4554",
				"width": 1
			}
		},
		"splitLine": {
			"show": false,
			"lineStyle": {
				"color": "#1E1D1D",
				"type": "solid" //'solid' | 'dotted' | 'dashed'
			}
		},
		"splitArea": {
			"show": false,
			"areaStyle": {
				"color": [
					'rgba(250,250,250,0.3)',
					'rgba(200,200,200,0.3)'
				]
			}
		},
		"axisLabel": {
			"show": true,
			"rotate": 0,
			"textStyle": {
				"color": "#2F4554",
				"fontSize": 12,
				"fontWeight": "normal"
			}
		},
		"axisTick": {
			"show": false,
			"alignWithLabel": true,
			"lineStyle": {
				"color": "#2F4554"
			}
		},
		//		"data": [
		////			"类别1","类别2","类别3","类别4"
		//		],
		"scale": false
	},
	"legend": {
		"show": true,
		"textStyle": {
			"color": "#2F4554",
			"fontSize": 12
		},
		"orient": "horizontal",
		"x": "left",
		"y": "top",
	},
	"series": [{
		"name": "系列1",
		"type": "scatter",
		"symbolSize": 20,
		"label": {
			"show": false,
			"position": "inside",
			"fontSize": 12,
			"color": "#FFFFFF",
			"fontWeight": "normal"
		},
		"itemStyle": {
			"color": "rgba(25, 100, 150, 1)",
			"borderColor": '#000',
			"borderWidth": 0,
			"borderType": 'solid',
			"shadowBlur": 0,
			"shadowColor": 'rgba(25, 100, 150, 0.5)',
			"shadowOffsetX": 0,
			"shadowOffsetY": 0
		}
	}]
}

//雷达图默认配置
const RadarOption = {
	"backgroundColor": "rgba(173,148,148,0)",
	"title": {
		"show": false,
		"text": "图表标题",
		"textStyle": {
			"color": "#2F4554",
			"fontSize": 12,
			"fontWeight": "normal",
			"fontFamily": "Microsoft Yahei"
		},
		"x": 'center',
		"y": "top"
	},
	"tooltip": {
		"show": false,
		"trigger": "axis",
		"axisPointer": {
			"type": "shadow"
		}
	},
	"legend": {
		"show": false,
		"textStyle": {
			"color": "#2F4554",
			"fontSize": 12
		},
		"orient": "horizontal",
		"x": "left",
		"y": "top",
	},
	"radar": {
		"center": ['50%', '50%'],
		"radius": "75%",
		"startAngle": 90,
		"splitNumber": 5,
		"shape": "polygon", //'polygon'、'circle'
		"maxValue":100,//指示器最大值
		"name": {
			"show": true,
			"textStyle": {
				"color": "#2F4554",
				"fontSize": 12,
				"fontWeight": "normal",
				"fontFamily": "Microsoft Yahei"
			}
		},
		"axisLine": {
			"show": true,
			"symbol": ['none', 'none'], //'none', 'arrow'
			"symbolSize": 10,
			"lineStyle": {
				"color": 'blue',
				"width": 1,
				"type": "solid" //'solid','dashed','dotted'
			}
		},
		"splitLine": {
			"show": true,
			"lineStyle": {
				"color": 'red',
				"width": 1,
				"type": "solid" //'solid','dashed','dotted'
			}
		},
		"splitArea": {
			"show": false
		}
	},
	"series": [{
		"name": "系列1",
		"type": "radar",
		"symbol": "none", // 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
		"symbolSize": 4,
		"label": {
			"show": false,
			"position": "top",
			"fontSize": 12,
			"color": "#FFFFFF",
			"fontWeight": "normal"
		},
		"itemStyle": {
			"color": "#2F4554",
			"borderColor": '#000',
			"borderWidth": 0,
			"borderType": 'solid',
			"shadowBlur": 0,
			"shadowColor": 'rgba(25, 100, 150, 0.5)',
			"shadowOffsetX": 0,
			"shadowOffsetY": 0
		},
		"lineStyle": {
			"color": 'blue',
			"width": 1,
			"type": "solid" //'solid','dashed','dotted'
		},
		"areaStyle": {
			"color": "#2F4554"
		}
	}]
}

export default {
	BarOption,
	LineOption,
	PieOption,
	GaugeOption,
	ScatterOption,
	RadarOption
}