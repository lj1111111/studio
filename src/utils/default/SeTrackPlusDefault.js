import { createBaseDefault } from '../ComponentDefault.js'
import DataSourceType from '../../constants/DataSourceType.js'
/***
 * 轨迹分析默认值
 */
function createConfig(options) {
	var obj = createBaseDefault();
	obj.params.option = {
		//左侧导航按钮
		navMenuStyle: {
			backgroundColor: "#545c64",
			textColor: "#fff",
			activeTextColor: "#ffd04b"
		},
		animation: {
			icon: {
				//轨迹动画Marker图标
				name: "track_car"
			},
			lineStyle: { //轨迹动画线
				color: "#FFFF00",
				width: 4
			}
		},
		layout:{
			left:2,
			center:5,
			right:17
		},
		mapInit: {
			zoom: 10,
			center: [116.46, 39.92]
		},
		panelStyle: {
			showBg: false,
			bgColor: 'rgba(0,0,0,1)',
			showBorder: false,
			borderWidth: 1,
			borderColor: 'rgba(0,0,0,1)'
		},
		publicMap: {
			isCustomService: false, //表示自定义地图,true表示自定义WMTS服务，4326坐标系
			id: 2, //内置底图编号
			titleUrl: 'http://www.njmap.gov.cn:8280/ResourcesProxy/Gateway/jcvxwrbcer/NJDLG_DT_NJ/wmts?layer=NJDLG_DT_10_20&tilematrixSet=Matrix_0&format=image/png', //当isCustomService为true需求设置此值
			epsg: "EPSG:4326" //预留字段
		}
	};
	//修改默认大小
	if(options && options.width>0){
		obj.location.width=options.width;
	}
	if(options && options.height>0){
		obj.location.height=options.height;
	}
	obj.params.dataConfig = {
		dsId: "beijing"
	};
	obj.params.monitors=[];//围栏监控结果
	return obj;
}
export default {
	createConfig
}