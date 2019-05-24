/****
 * 3D中国平面地图默认配置项
 */
var regions = [{
	name: "新疆",
	itemStyle: {
		color: '#2384B7',
		opacity: 0.18,
		borderWidth: 0.4,
		borderColor: '#CCC'
	}
}, {
	name: "西藏",
	itemStyle: {
		color: '#27B1DE',
		opacity: 0.18,
		borderWidth: 0.4,
		borderColor: '#CCC'
	}
}, {
	name: "甘肃",
	itemStyle: {
		color: '#206199',
		opacity: 0.18,
		borderWidth: 0.4,
		borderColor: '#CCC'
	}
}, {
	name: "青海",
	itemStyle: {
		color: '#216CA3',
		opacity: 0.18,
		borderWidth: 0.4,
		borderColor: '#CCC'
	}
}]

/****
 * 三维散点/气泡图
 */
const ScatterD3Option = {

}

/***
 * 三维柱状图
 */
const BarD3Option = {
	name: '',
	type: "bar3D",
	coordinateSystem: 'geo3D',
	barSize: 1, //柱子粗细
	shading: 'lambert',
	itemStyle: {
		color: "#22D2E8",
		opacity: 1
	},
	silent: false,
	bevelSize: 0.3,
	minHeight: 1,
	silent: true
	//data: [] //把此项提到数据配置项里
}
/***
 * 三维柱状图数据配置
 */
const BarD3OptionData = [{
		name: "",
		lng: 108.948024,
		lat: 34.263161,
		value: 4000
	},
	{
		name: "",
		lng: 126.642464,
		lat: 45.756967,
		value: 200
	},
	{
		name: "",
		lng: 116.405285,
		lat: 39.904989,
		value: 200
	},
	{
		name: "",
		lng: 113.665412,
		lat: 34.757975,
		value: 200
	},
	{
		name: "",
		lng: 119.306239,
		lat: 26.075302,
		value: 200
	}
]
/****
 * 飞线数据配置
 */
var LinesD3OptionData = [{
	"from": "108.948024,34.263161", 
	"to": "116.405285,39.904989" 
}, {
	"from": "126.642464,45.756967",
	"to": "116.405285,39.904989" 
}, {
	"from": "113.665412,34.757975",
	"to": "116.405285,39.904989"
}, {
	"from": "119.306239,26.075302", 
	"to": "116.405285,39.904989"
}]
/****
 * 三维飞线图
 */
const LinesD3Option = {
	type: 'lines3D',
	coordinateSystem: 'geo3D',
	effect: {
		show: true,
		period: 1,
		trailWidth: 4,
		trailLength: 0.8,
		trailOpacity: 0.4,
		trailColor: '#0087f4',
		loop:true
	},
	lineStyle: {
		width: 0.5,
		color: '#0087f4',
		opacity: 1
//		,
//		curveness:1
	},
	blendMode: 'lighter'
}
const MapD3Option = {
	//		tooltip: {
	//			show: false,
	//			// formatter:(params)=>{
	//			//   let data = "测试1:"+params.name + "<br/>"+"值:"+ params.value[2]+"<br/>"+"地理坐标:[" + params.value[0]+","+params.value[1] +"]";
	//			//   return data;
	//			// },
	//		},
	//	visualMap: [{
	//		show: false,
	//		type: 'continuous',
	//		seriesIndex: 0,
	//		calculable: true,
	//		max: 300,
	//		inRange: {
	//			color: ['#87aa66', '#eba438', '#d94d4c']
	//		}
	//	}, {
	//		show: false,
	//		type: 'continuous',
	//		seriesIndex: 1,
	//		left: 'right',
	//		max: 100,
	//		calculable: true,
	//		inRange: {
	//			color: ['#000', 'blue', 'purple']
	//		}
	//	}],
	geo3D: {
		map: 'china',
		viewControl: {
			minDistance: 10,
			minAlpha: -90,
			maxAlpha: 90,
			minBeta: -360 * 1000,
			maxBeta: 360 * 1000,
			panMouseButton: "left",
			rotateMouseButton: "left",
			distance: 100,
			alpha: 40, //视角旋转X轴角度
			beta: 0 //视角绕 y轴，即左右旋转的角度。
		},
		silent: true,
		itemStyle: {
			color:  '#2F4554', //'#2C6192',
			opacity: 0.6,
			borderWidth: 0.4,
			borderColor: '#CCC' //'#6696BC'
		},
//		label: {
//			show: false,
//			textStyle: {
//				color: '#FFF', //地图初始化区域字体颜色
//				fontSize: 12,
//				opacity: 1,
//				backgroundColor: 'rgba(0,23,11,0)'
//			},
//		},
//		emphasis: { //当鼠标放上去  地区区域是否显示名称
//			label: {
//				show: false,
//				textStyle: {
//					color: '#fff',
//					fontSize: 3,
//					backgroundColor: 'rgba(0,23,11,0)'
//				}
//			},
//			itemStyle: {
//				//color: '#2C6192'
//			}
//		},
		//shading: 'lambert',
		light: { //光照阴影
			main: {
				color: '#fff', //光照颜色
				intensity: 1.2, //光照强度
				//shadowQuality: 'high', //阴影亮度
				shadow: false, //是否显示阴影
				alpha: 55,
				beta: 10
			},
			ambient: {
				intensity: 0.3
			}
		},
		regionHeight: 0.01
	},
	series: [

	]
};

export default {
	MapD3Option,
	ScatterD3Option,
	BarD3Option,
	BarD3OptionData,
	LinesD3Option,
	LinesD3OptionData
}