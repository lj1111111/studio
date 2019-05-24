import EChartsDefault from '../constants/EChartsDefault.js'
import EChartsGLDefault from '../constants/EChartsGLDefault.js'
import ComponentType from '../constants/ComponentType.js'
import { deepClone, tranformStr } from './util.js'
import comDefault from './ComponentDefault.js'
import DataType from '../constants/DataType.js'
import SeTrackDefault from './default/SeTrackDefault.js'
import SeTrackPlusDefault from './default/SeTrackPlusDefault.js'
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
//每一项组件存储必需数据格式
//{
//	"name":'String',
//	"label":'String',
//	"url":"String",
//	"version":"String",
//	"location":Object,
//	"style":Object,
//	"params":Object,
//	"attrs":Object
//}
/***
 * 根据组件名称获取对应的默认配置参数
 * @param {Object} name
 */
function findDefaultOptionByName(name,options) {
	let obj = {};
	obj.location = COMPONENTLOCATION; //位置和大小
	obj.style = {};
	obj.attrs = {};
	obj.params = {};
	obj.params.data = {}; //data config
	let barOrlineData = {
		fields: {
			fieldX: {
				source: "x", //源字段
				target: "" //映射字段
			},
			fieldY: {
				source: "y",
				target: ""
			},
			fieldS: {
				source: "s",
				target: ""
			}
		},
		datasource: {
			type: 1,
			/*1表示静态数据；2表示CSV文件；3表示数据库，4表示API*/
			api: {
				rest: "http://bigv.credit.datangnet.com.cn/v1/apistatis/all/api/second", //"http://127.0.0.1/test", //目前仅支持http协议Get请求
				condition: '', //条件
				method: "get"
			},
			//DB数据源配置
			dbConfig: {
				tableName: '', //表名 
				condition: '' //查询条件
			},
		},
		dataFormat: {
			responseFormat: 'YYYY/MM/DD HH:mm:ss', //主要针对时间类型数据，服务器返回的格式
			showFormat: 'HH:mm:ss' //主要针对时间，数据显示格式
		},
		autoUpdate: false,
		/*定时获取数据，静态数据不起作用,true表示需要定时轮询获取数据*/
		intervalTime: 5 //秒
	};
	switch(name) {
		case ComponentType.SE_BACKGROUND: //自定义背景
			{
				obj.params = {
					background: {
						showImage: false, //true:表示支持背景图片设置
						bgColor: "#1A2147",
						bgImage: ''
					},
					borderRadius: {
						borderTopLeftRadius: 0, //左上
						borderBottomLeftRadius: 0, //左下
						borderTopRightRadius: 0, //右上
						borderBottomRightRadius: 0 //右下
					}
				};
				break;
			}
		case ComponentType.SE_BORDER: //边框
			{
				obj.params = {
					border: {
						borderStyle: "solid",
						borderWidth: 1,
						borderColor: "#1A2147"
					},
					borderRadius: {
						borderTopLeftRadius: 0, //左上
						borderBottomLeftRadius: 0, //左下
						borderTopRightRadius: 0, //右上
						borderBottomRightRadius: 0 //右下
					}
				};
				break;
			}
		case ComponentType.SE_IMAGE:
			{
				obj.params = {
					source: {
						isLocal: false, //true:表示上传本地图片
						localSrc: "", //本地图片base64,
						remoteSrc: "./static/img/image.svg" //远程图片URL
					}
				};
				break;
			}
		case ComponentType.SE_VIDEO: //视频组件
			{
				obj.params = {
					option: {
						languages: {
							'zh-CN': {
								Play: '播放',
								'Play Video': '播放',
								Pause: '暂停',
								Mute: "声音",
								Fullscreen: "全屏"
							}
						},
						language: 'zh-CN',
						autoplay: true,
						loop: true,
						controls: true,

						//width: 640,
						//height: 264,
						//fluid: true,
						//poster: "http://vjs.zencdn.net/v/oceans.png",
						preload: 'true',
						sources: [{
							type: "video/mp4",
							src: "http://vjs.zencdn.net/v/oceans.mp4"
						}]
					}
				};
				break;
			}
		case ComponentType.SE_TITLE: //通用标题
			{
				obj.params.option = {
					fontFamily: 'Microsoft Yahei',
					color: "#000",
					title: "我是标题",
					fontSize: 24,
					textAlign: 'center',
					fontWeight: "normal"
				};
				obj.location = {
					left: 0,
					top: 0,
					width: 200,
					height: 50
				}
				break;
			}
		case ComponentType.SE_TIME: //时间器
			{
				obj.params = {
					icon: {
						show: true,
						fontSize: 16,
						color: '#000',
						padding: 5
					},
					timer: {
						fontSize: 16,
						color: '#000',
						fontWeight: "normal",
						fontFamily: "Microsoft Yahei",
						format: "YYYY-MM-DD HH:mm:ss",
						intervalTime: 1 //时间间隔，单位秒
					}
				};
				obj.location = {
					left: 0,
					top: 0,
					width: 200,
					height: 50
				}
				break;
			}
		case ComponentType.SE_WEATHER: //天气
			{
				obj.params.option = {
					color: "#000",
					city: "苏州",
					fontSize: 16
				};
				obj.location = {
					left: 0,
					top: 0,
					width: 400,
					height: 300
				}
				break;
			}
		case ComponentType.SE_NUMBERTITLEFLOP: //翻牌器
			{
				obj = comDefault.createDefaultNumberTitle();
				break;
			}
		case ComponentType.SE_TABLE:
		case ComponentType.SE_PANEL:
		case ComponentType.SE_HLINE:
		case ComponentType.SE_BAR:
			{
				//				var temp2 = deepClone(EChartsDefault.BarOption); //调整数据格式
				//				temp2.series.forEach(item => {
				//					if(temp2.yAxis.type == "value") {
				//						temp2.xAxis.data.forEach((item2, index) => {
				//							var val = item.data[index];
				//							item.data[index] = [item2, val];
				//						})
				//					} else {
				//                     temp2.yAxis.data.forEach((item2, index) => {
				//							var val = item.data[index];
				//							item.data[index] = [val,item2];
				//						})
				//					}
				//				})
				obj.params.option = EChartsDefault.BarOption;
				obj.params.data = barOrlineData;
				obj.params.data.datasource.api.rest = "http://bigv.credit.datangnet.com.cn/v1/apistatis/all/area/sum";
				break;
			}
		case ComponentType.SE_LINE:
			{
				//				var temp2 = deepClone(EChartsDefault.LineOption);
				//				temp2.series.forEach(item => {
				//					temp2.xAxis.data.forEach((item2, index) => {
				//						var val = item.data[index];
				//						item.data[index] = [item2, val];
				//					})
				//				})
				obj.params.option = EChartsDefault.LineOption;
				obj.params.data = barOrlineData;
				break;
			}
		case ComponentType.SE_PIE: //饼图
			{
				obj.params.option = EChartsDefault.PieOption;
				obj.params.dataConfig = dsconfig;
				var fields = [{
						source: "name", //源字段
						target: "", //映射字段
						required: true, //必需字段
						memo: "类目" //说明
					},
					{
						source: "value", //源字段
						target: "", //映射字段
						required: true, //必需字段
						memo: "值" //说明
					}
				];
				var pieData = [{
						name: "第一季度",
						value: 100
					},
					{
						name: "第二季度",
						value: 120
					}, {
						name: "第三季度",
						value: 150
					}
				];
				obj.params.dataConfig.data = pieData;
				obj.params.dataConfig.fields = fields;
				break;
			}
		case ComponentType.SE_GAUGE:
			{
				obj.params.option = EChartsDefault.GaugeOption;
				obj.params.dataConfig = dsconfig;
				var fields = [{
					source: "value", //源字段
					target: "", //映射字段
					required: true, //必需字段
					memo: "值" //说明
				}];
				var gaugeData = [{
					value: 86
				}];
				obj.params.dataConfig.data = gaugeData;
				obj.params.dataConfig.fields = fields;
				break;
			}
		case ComponentType.SE_SCATTER: //散点图
			{
				obj = comDefault.createDefaultScatter();
				break;
			}
		case ComponentType.SE_RADAR: //散点图
			{
				obj = comDefault.createDefaultRadar();
				break;
			}
		case ComponentType.SE_MAP:
			{
				obj.params = {
					global: {
						showBg: false,
						bgColor: 'rgba(0,0,0,1)',
						showBorder: false,
						borderWidth: 1,
						borderColor: 'rgba(0,0,0,1)'
					},
					mapInit: {
						center: [121, 31],
						zoom: 10,
					},
					mapInteract: {
						showZoom: false,
						showToolBar: false,
						showMapInfo: false,
						showLayers: false,
						showMiniMap: false //影眼图
					},
					publicMap: {
						id: 1
					},
					data: {
						id: '6474168554419761152'
					}
				};
				break;
			}
		case ComponentType.SE_MAP_D3: //三维中国平面地图
			{
				obj.params.option = EChartsGLDefault.MapD3Option;
				obj.params.children = [];
				obj.params.global = {
					showBg: false,
					bgColor: 'rgba(0,0,0,1)',
					showBorder: false,
					borderWidth: 1,
					borderColor: 'rgba(0,0,0,1)',
					zoom: 10,
					rotateX: 40, //alpha:40,//视角旋转X轴角度
					rotateY: 0 //beta:0 //视角绕 y轴，即左右旋转的角度。
				};
				break;
			}
		case ComponentType.SE_TS_HEATMAP:
			{
				obj.params = {
					global: {
						showBg: false,
						bgColor: 'rgba(0,0,0,1)',
						showBorder: false,
						borderWidth: 1,
						borderColor: 'rgba(0,0,0,1)',
						showTitle: false,
						content: '热力图',
						//						imgUrl: '../../assets/img/heatmap.png',
						titleColor: 'rgba(255,255,255,1)',
						titleSize: 12,
						titleLocation: 'bottom' //bottom|top
					},
					data: {
						id: -1
					}
				};
				break;
			}
		case ComponentType.SE_TS_ANALYSIS:
			{
				obj.params = {
					global: {
						showBg: false,
						bgColor: 'rgba(0,0,0,1)',
						showBorder: false,
						borderWidth: 1,
						borderColor: 'rgba(0,0,0,1)',
						showTitle: false,
						content: '时空分析',
						//						imgUrl: '../../assets/img/heatmap.png',
						titleColor: 'rgba(0,0,0,1)',
						titleSize: 12,
						titleLocation: 'bottom' //bottom|top
					},
					data: {
						id: -1
					}
				};
				break;
			}
		case ComponentType.SE_TRACK: //轨迹分析
			{
				obj = SeTrackDefault.createConfig();
				break;
			}
		case ComponentType.SE_TRACK_PLUS: //轨迹分析PLUS
			{
				obj = SeTrackPlusDefault.createConfig(options);
				break;
			}
		case ComponentType.SE_QUICKLOCATION:
		case ComponentType.SE_ADDROUTE:
		case ComponentType.SE_CHARTTHEME:
		case ComponentType.SE_GRADESIZETHEME:
		case ComponentType.SE_GRADECOLORTHEME:
			{
				break;
			}
	}
	return obj;
}

export default {
	findDefaultOptionByName
}