/**
 * Created by LJ on 2018/5/16.
 */
//支持的屏幕分辨率
var screenArray = [{
	value: '1920,1200',
	label: '1920*1200 (16:10)'
}, {
	value: '1920,1080',
	label: '1920*1080 (16:9)'
}, {
	value: '1680,1050',
	label: '1680*1050 (16:10)'
}, {
	value: '1440,900',
	label: '1440*900 (16:10)'
}, {
	value: '1366,768',
	label: '1366*768 (16:9)'
}, {
	value: '1024,768',
	label: '1024*768 (4:3)'
}, {
	value: '1242,2208,phone',
	label: '1242*2208 (手机竖屏)'
}, {
	value: '1080,1920,phone',
	label: '1080*1920 (手机竖屏)'
}, {
	value: '720,1200,phone',
	label: '720*1200 (手机竖屏)'
}, {
	value: '750,1334,phone',
	label: '750*1334 (手机竖屏)'
}, {
	value: '2208,1242,phone',
	label: '2208*1242 (手机横屏)'
}, {
	value: '1920,1080,phone',
	label: '1920*1080 (手机横屏)'
}, {
	value: '1200,720,phone',
	label: '1200*720 (手机横屏)'
}, {
	value: '1334,750,phone',
	label: '1334*750 (手机横屏)'
},{
	value: '3840,2193',
	label: '3840*2193'
},{
	value: '17280,3240',
	label: '17280*3240'
}];
//轨迹分析组件中车辆类型
var cars_type = [{
	label: "出租车",
	key: "A1"
}, {
	label: "警车",
	key: "B1"
}, {
	label: "公交车",
	key: "C1"
}, {
	label: "私家车",
	key: "D1"
}, {
	label: "货车",
	key: "E1"
}]
var Config = {
	spurl: "http://192.168.1.171:8088", //时空网站服务REST根目录http://192.168.1.171:8088
	uid: '5514f18335574ec38469796050c9cea4', //时空网站用户uid '5514f18335574ec38469796050c9cea4'
	token: '79fb054e94d0284966a416a852a6924a', //当前用户token，79fb054e94d0284966a416a852a6924a[矢量服务器]，调试模式下起作用，浏览模式下万能TOKEN
	screens: screenArray, //支持的屏幕
	debug: true,
	testMode:true,//软件评测模式
	spaceRestUrl:"http://192.168.1.184:8080",   //时空引擎服务restful根目录http://192.168.1.72:8080
	devicesTypes:cars_type,   //实体分类
	locale:'cn'//语言类型 ，en表示英文版(目前只针对轨迹分析组件)；cn表示中文版，默认中文版
}