/***
 * url格式：
 * http://127.0.0.1/studio.html?uid=1&token=user_token&service=JSON.stringify(serviceinfo)
 */
//获取token
function getUrlParam(name) {
	//构造一个含有目标参数的正则表达式对象  
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	//匹配目标参数  
	var r = decodeURI(window.location.search).substr(1).match(reg);
	//返回参数值  
	if(r != null) return (r[2]);
	return null;
}
//当前矢量平台用户token
var uk = "";
var uid = ""; //时空用户UID
//应用模板基本信息
var serviceinfo = {
	"isEdit": false,
	"serviceName": "测试",
	"beOpen": false,
	"beShow": true,
	"applyArea": "物流",
	"summary": "测试",
	"applyID": -999, //-999表示空白模板
	"token": ""
}
if(Config.debug) //调试模式
{
	Config.serviceInfo = serviceinfo;
} else {
	uid = getUrlParam("uid");
	Config.uid = uid;
	uk = getUrlParam("token");
	Config.token = uk;
	serviceinfo["summary"]=getUrlParam("summary");
	serviceinfo["applyID"]=Number(getUrlParam("applyID"));
	serviceinfo["beOpen"]=getUrlParam("beOpen")==='true'?true:false;
	serviceinfo["isEdit"]=getUrlParam("isEdit")==='true'?true:false;
	serviceinfo["serviceName"]=getUrlParam("serviceName");
	serviceinfo["token"]=getUrlParam("stoken");
	Config.serviceInfo = serviceinfo;
}
if(!uk) {
	//	window.location.href = "./maperror.html";
}