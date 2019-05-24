/****
 * @LJ
 * @子组件模块
 * @2018-06-27
 */
import EChartsGLDefault from "../constants/EChartsGLDefault.js"
import { deepClone } from './util.js'
import DataType from '../constants/DataType.js'

/**
 * 版本
 */
var ver = "v1.0.0";
/****
 * 子组件类型
 */
const SE_SUB_SCATTER3D = 'scatter3D'; //3D气泡图
const SE_SUB_BAR3D = 'bar3D'; //3D柱状图
const SE_SUB_LINES3D = 'lines3D'; //3D飞线
/****
 * 子组件类型
 */
const SE_SUB_SCATTER3D_LABEL = '三维气泡图层'; //3D气泡图
const SE_SUB_BAR3D_LABEL = '三维柱状图层'; //3D柱状图
const SE_SUB_LINES3D_LABEL = '三维飞线图层'; //3D飞线
/***
 * 3D子组件列表
 */
const subComponents3D = [
//  {
//		name: SE_SUB_SCATTER3D,
//		label: SE_SUB_SCATTER3D_LABEL,
//		version: ver
//	},
	{
		name: SE_SUB_BAR3D,
		label: SE_SUB_BAR3D_LABEL,
		version: ver
	},
	{
		name: SE_SUB_LINES3D,
		label: SE_SUB_LINES3D_LABEL,
		version: ver
	}
]
/****
 * 创建子组件
 * @param {Object} name 组件key
 * @param {Object} id  唯一ID号 
 */
function createSubComponentConfig(name, id) {
	//每一项组件存储必需数据格式
	//{
	//  "id":String
	//	"name":'String',
	//	"label":'String',
	//	"version":"String",
	//	"params":Object,
	//} 
	var obj = {};
	obj.id = id;
	obj.name = name;
	obj.version = ver;
	obj.params = {}; //格式params:{option:{},dataconfig:{}}
	obj.params.dataConfig = {}; //data config
	let dsconfig = {
		fields: [{
				source: "name", //源字段
				target: "", //映射字段
				memo: "地名(可选)" //说明
			}, {
				source: "lng", //源字段
				target: "", //映射字段
				memo: "经度" //说明
			},
			{
				source: "lat", //源字段
				target: "", //映射字段
				memo: "纬度" //说明
			},
			{
				source: "value", //源字段
				target: "", //映射字段
				memo: "值" //说明
			}
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
		dbConfig:{
			tableName:'', //表名 
			condition: '' //查询条件
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
	switch(name) {
		case SE_SUB_BAR3D:
			{
				obj.label = SE_SUB_BAR3D_LABEL;
				obj.params.option = EChartsGLDefault.BarD3Option;
				dsconfig.data = EChartsGLDefault.BarD3OptionData;
				obj.params.dataConfig = dsconfig;
				break;
			}
		case SE_SUB_SCATTER3D:
			{
				obj.label = SE_SUB_SCATTER3D_LABEL;
				obj.params.option = EChartsGLDefault.ScatterD3Option;
				obj.params.dataConfig = dsconfig;
				break;
			}
		case SE_SUB_LINES3D:
			{
				obj.label = SE_SUB_LINES3D_LABEL;
				obj.params.option = EChartsGLDefault.LinesD3Option;
				dsconfig.data = EChartsGLDefault.LinesD3OptionData;
				dsconfig.fields = [{
					source: "from", //源字段
					target: "", //映射字段
					memo: "起点" //说明
				}, {
					source: "to", //源字段
					target: "", //映射字段
					memo: "终点" //说明
				}];
				obj.params.dataConfig = dsconfig;
				break;
			}
		default:
			{
				obj = null;
				break;
			}
	}
	if(obj) {
		obj = deepClone(obj);
	}
	return obj
}
export default {
	SE_SUB_SCATTER3D,
	SE_SUB_BAR3D,
	SE_SUB_LINES3D
}
export {
	subComponents3D,
	createSubComponentConfig
}