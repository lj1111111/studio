import { createBaseDefault } from '../ComponentDefault.js'
import DataSourceType from '../../constants/DataSourceType.js'
/***
 * 轨迹分析默认值
 */
function createConfig() {
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
				name:"track_car"
			},
			lineStyle: { //轨迹动画线
				color: "#FFFF00",
				width: 4
			}
		},
		mapInit: {
			zoom: 10,
			center: [116.4012,39.876]
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
	var fields = [{
			source: "id", //源字段
			target: "", //映射字段
			required: true, //必需字段
			memo: "主键" //说明
		}, {
			source: "code", //源字段
			target: "", //映射字段
			required: true, //必需字段
			memo: "编号" //说明
		}, {
			source: "lng", //源字段
			target: "", //映射字段
			required: true, //必需字段
			memo: "经度" //说明
		},
		{
			source: "lat", //源字段
			target: "", //映射字段
			required: true, //必需字段
			memo: "纬度" //说明
		},
		{
			source: "time", //源字段
			target: "", //映射字段
			required: true, //必需字段
			memo: "时间" //说明 格式为YYYY-MM-DD hh:mm:ss
		}
	];
	obj.params.dataConfig.type=3;
	obj.params.dataConfig.dbConfig.id=1;//
	obj.params.dataConfig.fields = fields;
	return obj;
}
export default {
	createConfig
}