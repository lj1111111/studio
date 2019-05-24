import enLocale from 'element-ui/lib/locale/lang/en'
//英文语言包
const en = {
	message:{
		no_query_results:'no query results!',//无查询结果
		ask_create_fence:'Are you sure you want to create a fence?',//确定要创建围栏吗?
		prompt:'prompt',//提示
		ok:'ok',//确定
		cancel:'cancel',//取消
		input_vehicle_number:"input vehicle number!",//请输入车牌编号
		enter_fence_name:'Please enter the fence name!', //请输入围栏名称！
		set_fence_area:'Please set the fence area!', // 请设置围栏区域！
		select_fence_area:'Please select the fence area!', // 请选择围栏区域！
		set_query_time:'Please set the query time!',//请先设置查询时间！
		no_legal_track:'No legal track!',//无合法轨迹！
		set_analyzed_track:'Please set the track to be analyzed first!', //请先设置需要分析的轨迹！
		select_vehicle:'Please select vehicle!',//请选择车辆！
		no_track_data:'No track data!',//无轨迹数据！
		draw_area:'Please draw a area!', //请绘制范围！
		server_error:'Server error!',//服务器错误！
		set_query_conditions:'Please set query conditions！' ,//请设置查询条件！
		select_vehicle_type:'Please select type！' ,//请选择车辆类型！
		total:'total:' //接入轨迹
	},
	speed:'speed',//时速
	se_space:'super engine time and space',//超擎时空
	track_big_analysis:'Trajectory big data analysis',//轨迹大数据分析
	querybycode:'query by vehicle number',//按车牌号查询
	querybyspatial:'query by spatial',//按空间范围查询
	location_0:"center",//居中
	location_1:"cluster",//聚集
	location_2:"not cluster",//不聚集
	A1:"taxi",//出租车
	B1:"police car",//警车
	C1:'bus',//公交车
	D1:'car',//私家车
	E1:'truck',//货车
	createbydraw:'draw manually',//手动绘制
	createbyselect:'select polygon',//选择范围
	vehicle:'vehicle', //车辆
	enter_fence:'enter the electronic fence',//进入电子围栏
	location:'location',//坐标
	popup:{
		title:"properties", //设备属性
		device_number:'number',//设备号码
		longitude:'longitude',//经度
		latitude:'latitude',//纬度
		location_time:'location time',//定位时间
		type:'type'//设备类型
	},
	Common: {
		enter_time:'enter time:',//'进入时间'
		leave_time:'leave time:',//'离开时间'
		select_all: 'select', //全选
		unselect_all: 'unselect', //全不选
		start_time: 'start time', //开始时间
		end_time: 'hour interval', //结束时间
		minute_interval: 'minute interval', //分钟
		select_date: 'select date', //选择日期
		select_time: 'select time', //选择时间
		reset: 'reset', //重置
		start_monitor: 'start monitor', //开始监测
		vehicles_statistics: 'statistics', //各类型车辆类型统计
		unit_quantity:'(unit:quantity)', //（单位：量）
		statistics_total:'total:', //总数
		query_mode:"query mode",//查询方式
		draw_mode:"draw mode",//绘制方式
		draw_region:"draw region",//绘制区域
		vehicle_number:'vehicle number', //车辆编号
		query:'query', //查询
		create_mode:"create mode",//创建方式
		create:"create",//创建
		select_datetime:"select datetime",//选择日期时间
		input_vehicle_number:"input vehicle number",//请输入车牌编号
		input_name:"input name",//请输入名称
		legend:'legend', //图例
		area_radius_meter:'area radius (meter)', //区域半径(米)
		analysis:'analysis', //分析
		select:'select', //请选择
		draw_rectangle:'draw rectangle', //绘制矩形
		draw_polygon:'draw polygon', //绘制多边形
		clear:'clear', //清除
		play:'play', //播放
		stop:'stop',//停止
		back:'back'//返回
	},
	SeTrackPlus: {
		menu_monitor: 'monitor',
		menu_query: 'query',
		menu_analysis: 'analysis',
		real_location: 'real-time location',
		vehicle_monitor: 'vehicle monitor',
		track_query: 'track query',
		vehicle_query: 'vehicle query',
		heatmap: 'heatmap',
		track_analysis: 'track analysis',
	},
	CarType: {
		vehicle_type: 'vehicle type' //车辆类型
	},
	FenceMonitor: {
		fence_monitor: 'fence monitor', //围栏监测
		select_fence:'select fence',//选择围栏
	},
	FenceManage: {
		fence_manage: 'fence manage', //围栏管理
		fence_name: 'fence name', //围栏名称
	},
	TrackPlay: {
		track_playback: 'track playback', //轨迹回放
		speed_setting: 'speed setting', //速度设置
		location_mode:'location mode',//定位方式
	},
	...enLocale
}
export default en