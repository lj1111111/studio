//var serviceinfo = {
//	"isEdit": false,
//	"serviceName": "测试",
//	"beOpen": false,
//	"beShow": false,
//	"applyArea": "物流",
//	"summary": "测试",
//	"applyID": undefined,
//	"token": undefined
//}
import Vue from 'vue'
/***
 * 状态管理
 */
export default {
	bus:new Vue(), //事件分发机制
	uid:'',//时空用户的UID
	token:'',//用户token,矢量平台的用户token
	url:'' ,//矢量平台服务接口地址,例如:http://127.0.0.1:8080
	dbUrl:'',//DB数据服务根目录,
	dbRestUrl:'',//DB2.0数据服务根目录,2018-08-27
	serviceInfo:undefined, //应用模板基本信息
	screens:null, //支持的屏幕列表
	dbRestApiVer:"v1.0", //时空数据服务版本
	ak:undefined, //系统矢量平台ak
	spaceRestUrl:'',//超擎时空引擎服务restful根目录
	maps:undefined, //行业组件地图列表格式为[{id:id,map:L.map}]
	devicesTypes:undefined //轨迹分析组件中分类
}
