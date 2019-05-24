import DataType from '../constants/DataType.js'
import EChartsDefault from '../constants/EChartsDefault.js'
import {deepClone} from './util.js'
/***
 * 组件默认配置
 */
//组件初始大小和位置
const COMPONENTLOCATION = {
	left: 0,
	top: 0,
	width: 400,
	height: 300
};
/****
 * 数据配置
 */
var dsconfig = {
	fields: [
		//	{
		//			source: "name", //源字段
		//			target: "", //映射字段
		//			memo: "地名(可选)" //说明
		//		}, {
		//			source: "lng", //源字段
		//			target: "", //映射字段
		//			memo: "经度" //说明
		//		},
		//		{
		//			source: "lat", //源字段
		//			target: "", //映射字段
		//			memo: "纬度" //说明
		//		},
		//		{
		//			source: "value", //源字段
		//			target: "", //映射字段
		//			memo: "值" //说明
		//		}
	],
	type: 1,
	/*1表示静态数据；2表示CSV文件；3表示数据库，4表示API*/
	//API配置参数
	api: {
		rest: "http://bigv.credit.datangnet.com.cn/v1/apistatis/all/area/sum", //"http://127.0.0.1/test", //目前仅支持http协议Get请求
		condition: '', //条件
		method: "get"
	},
	//DB数据源配置
	dbConfig: {
		fields: "*", //查询的字段
		tableName: '', //表名 
		condition: ''//查询条件
	},
	data: [], //静态数据配置
	dataFormat: {
		type: DataType.DF_ARRAY,
		responseFormat: 'YYYY/MM/DD HH:mm:ss', //主要针对时间类型数据，服务器返回的格式
		showFormat: 'HH:mm:ss' //主要针对时间，数据显示格式
	},
	autoUpdate: false,
	/*定时获取数据，静态数据不起作用,true表示需要定时轮询获取数据*/
	intervalTime: 5 //秒
};
/***
 * 修改函数为导入模块，用于每个子组件创建默认值
 */
export function createBaseDefault() {
	var obj = {};
	obj.location = deepClone(COMPONENTLOCATION); //位置和大小
	obj.style = {};
	obj.attrs = {};
	obj.params = {};
	obj.params.option = {}; //样式配置
	obj.params.children = []; //子组件
	obj.params.dataConfig = deepClone(dsconfig); //data config
	return obj;
}
/***
 * 翻牌器配置默认值
 */
function createDefaultNumberTitle() {
	var obj = createBaseDefault();
	obj.params.option = {
		title: {
			content: "我是标题",
			textStyle: {
				fontFamily: "Microsoft Yahei",
				fontSize: 36,
				color: "#000",
				fontWeight: "lighter"
			}
		},
		prefix: {
			content: "",
			textStyle: {
				fontFamily: "Microsoft Yahei",
				color: "#000",
				fontSize: 24,
				fontWeight: "normal"
			}
		},
		numbers: {
			textStyle: {
				fontFamily: "Microsoft Yahei",
				color: "#000",
				fontSize: 36,
				fontWeight: "normal"
			},
			marginRight: 0,
			backgroundColor: "rgba(51,51,51,0)",
			backgroundRadius: 6,
			separatingBackground: false,
			digit: 0,
			rounding: true,
			decimal: 0,
			separatingChart: true,
			separatingSymbol: ",",
			decimalSymbol: ".",
			fixedWidth: 0,
			sameDataFlip: false
		},
		suffix: {
			content: "",
			textStyle: {
				fontFamily: "Microsoft Yahei",
				color: "#000",
				fontSize: 24,
				fontWeight: "normal"
			}
		}
	};
	var fields = [{
			source: "name", //源字段
			target: "", //映射字段
			required: true, //必需字段
			memo: "标题" //说明
		},
		{
			source: "value", //源字段
			target: "", //映射字段
			required: true, //必需字段
			memo: "值" //说明
		}
	];
	var data = [{
		"name": "我是标题",
		"value": 0
	}];
	obj.params.dataConfig = dsconfig;
	obj.params.dataConfig.data = data;
	obj.params.dataConfig.fields = fields;
	return obj;
}
/***
 * 散点图配置默认值
 */
function createDefaultScatter() {
	var obj = createBaseDefault();
	obj.params.option = EChartsDefault.ScatterOption;
	var fields = [{
			source: "x", //源字段
			target: "", //映射字段
			required: true, //必需字段
			memo: "类目" //说明
		},
		{
			source: "y", //源字段
			target: "", //映射字段
			required: true, //必需字段
			memo: "值" //说明
		},
		{
			source: "s", //源字段
			target: "", //映射字段
			required: false, //必需字段
			memo: "系列(可选)" //说明
		}
	];
	var data = [{
			"x": "类别1",
			"y": 100,
			"s": "系列1"
		},
		{
			"x": "类别2",
			"y": 200,
			"s": "系列1"
		}, {
			"x": "类别3",
			"y": 300,
			"s": "系列1"
		}, {
			"x": "类别4",
			"y": 400,
			"s": "系列1"
		}
	];
	obj.params.dataConfig = dsconfig;
	obj.params.dataConfig.data = data;
	obj.params.dataConfig.fields = fields;
	return obj;
}
/***
 * 雷达图配置默认值
 */
function createDefaultRadar() {
	var obj = createBaseDefault();
	obj.params.option = EChartsDefault.RadarOption;
	var fields = [{
			source: "x", //源字段
			target: "", //映射字段
			required: true, //必需字段
			memo: "类目" //说明
		},
		{
			source: "y", //源字段
			target: "", //映射字段
			required: true, //必需字段
			memo: "值" //说明
		},
		{
			source: "s", //源字段
			target: "", //映射字段
			required: false, //必需字段
			memo: "系列(可选)" //说明
		}
	];
	var data = [{
			"x": "指标一",
			"y": 80,
			"s": "系列1"
		},
		{
			"x": "指标二",
			"y": 40,
			"s": "系列1"
		}, {
			"x": "指标三",
			"y": 70,
			"s": "系列1"
		}, {
			"x": "指标四",
			"y": 55,
			"s": "系列1"
		}, {
			"x": "指标五",
			"y": 90,
			"s": "系列1"
		}, {
			"x": "指标六",
			"y": 30,
			"s": "系列1"
		}
	];
	obj.params.dataConfig = dsconfig;
	obj.params.dataConfig.data = data;
	obj.params.dataConfig.fields = fields;
	return obj;
}
export default {
	createDefaultNumberTitle,
	createDefaultScatter,
	createDefaultRadar
}