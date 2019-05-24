import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
// 简体中文语言包
const cn = {
	message:{
		no_query_results:'无查询结果！',//无查询结果
		ask_create_fence:'确定要创建围栏吗?',//确定要创建围栏吗?
		prompt:'提示',//提示
		ok:'确定',//确定
		cancel:'取消',//取消
		input_vehicle_number:"请输入车牌编号！",//请输入车牌编号
		enter_fence_name:'请输入围栏名称！', //请输入围栏名称！
		set_fence_area:'请设置围栏区域！', // 请设置围栏区域！
		select_fence_area:'请选择围栏区域！', // 请选择围栏区域！
		set_query_time:'请先设置查询时间！',//请先设置查询时间！
		no_legal_track:'无合法轨迹！',//无合法轨迹！
		set_analyzed_track:'请先设置需要分析的轨迹！', //请先设置需要分析的轨迹！
		select_vehicle:'请选择车辆！',//请选择车辆！
		no_track_data:'无轨迹数据！',//无轨迹数据！
		draw_area:'请绘制范围！', //请绘制范围！Please draw a area!
		server_error:'服务器错误！',//服务器错误！
		set_query_conditions:'请设置查询条件！' ,//请设置查询条件！
		select_vehicle_type:'请选择车辆类型！' ,//请选择车辆类型！
		total:'总数：' //接入轨迹
	},
	speed:'时速',//时速
	se_space:'超擎时空',//超擎时空
	track_big_analysis:'轨迹大数据分析',//轨迹大数据分析
	querybycode:'按车牌号查询',//按车牌号查询
	querybyspatial:'按空间范围查询',//按空间范围查询
	location_0:"居中",//居中
	location_1:"聚集",//聚集
	location_2:"不聚集",//不聚集
	A1:"出租车",//出租车
	B1:"警车",//警车
	C1:'公交车',//公交车
	D1:'私家车',//私家车
	E1:'货车',//货车
	createbydraw:'手动绘制',//手动绘制
	createbyselect:'选择范围',//选择范围
	vehicle:'车辆', //车辆
	enter_fence:'进入电子围栏',//进入电子围栏
	location:'坐标',//坐标
	popup:{
		title:"设备属性", //设备属性
		device_number:'设备号码',//设备号码
		longitude:'经度坐标',//经度
		latitude:'纬度坐标',//纬度
		location_time:'定位时间',//定位时间
		type:'设备类型'//设备类型
	},
	Common: {
		enter_time:'进入时间:',//'进入时间'
		leave_time:'离开时间:',//'离开时间'
		select_all: '全选', //全选
		unselect_all: '全不选', //全不选
		start_time: '开始时间', //开始时间
		end_time: '小时间隔', //结束时间
		minute_interval: '分钟间隔', //分钟
		select_date: '选择日期', //选择日期
		select_time: '选择时间', //选择时间
		reset: '重置', //重置
		start_monitor: '开始监测', //开始监测
		vehicles_statistics: '各类型车辆类型统计', //各类型车辆类型统计
		unit_quantity:'（单位：辆）' ,//（单位：辆）
		statistics_total:'总数:', //总数
		query_mode:"查询方式",//查询方式
		draw_mode:"绘制方式",//绘制方式
		draw_region:"绘制区域",//绘制区域
		vehicle_number:'车辆编号', //车辆编号
		query:'查询', //查询
		create_mode:"创建方式",//创建方式
		create:"创建",//创建
		select_datetime:"选择日期时间",//选择日期时间
		input_vehicle_number:"请输入车牌编号",//请输入车牌编号
		input_name:"请输入名称",//请输入名称
		legend:'图例', //图例
		area_radius_meter:'区域半径(米)', //区域半径(米)
		analysis:'分析', //分析
		select:'请选择', //请选择
		draw_rectangle:'绘制矩形', //绘制矩形
		draw_polygon:'绘制多边形', //绘制多边形
		clear:'清除', //清除
		play:'播放', //播放
		stop:'停止',//停止
		back:'返回'//返回
	},
	SeTrackPlus: {
		menu_monitor: '监测',
		menu_query: '查询',
		menu_analysis: '分析',
		real_location: '实时位置',
		vehicle_monitor: '车辆监控',
		track_query: '轨迹查询',
		vehicle_query: '车辆查询',
		heatmap: '热力图',
		track_analysis: '轨迹分析'
	},
	CarType: {
		vehicle_type: '车辆类型'
	},
	FenceMonitor: {
		fence_monitor: '围栏监测', //围栏监测
		select_fence:'选择围栏'//选择围栏
	},
	FenceManage: {
		fence_manage: '围栏管理', //围栏管理
		fence_name: '围栏名称' //围栏名称
	},
	TrackPlay: {
		track_playback: '轨迹回放', //轨迹回放
		speed_setting: '速度设置', //速度设置
		location_mode:'定位方式'//定位方式
	},
	...zhLocale
}
export default cn