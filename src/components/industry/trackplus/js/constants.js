//const QUERY_BY_NUM = 'queryByNum'; //按设备查询
//const QUERY_BY_MAP = 'queryByMap'; //按地图查询
///***
// * 轨迹查询类型
// */
//export const TrackQueryType = {
//	QUERY_BY_NUM,
//	QUERY_BY_MAP
//}
///***
// * tab切换事件名
// */
//export const TabChangeTypeEvent = "tab-change-type";
///***
// * 按设备号查询事件名
// */
//export const QueryTrackByCodeEvent = "queryTrackByCode";
///****
// * 根据范围和时间查询设备事件名称
// */
//export const QueryDevicesByRectEvent = "QueryDevicesByRect";
///****
// * 设备查询结果事件
// */
//export const QueryDevicesResultEvent = "QueryDevicesResult";
///****
// * 设备轨迹线居中事件
// */
//export const LocationTrackEvent = "LocationTrack";
///****
// * 设备实时位置事件
// */
//export const LocationEvent = "Location";
const MONITOR_LOCATION = 'monitor_location'; //实时位置面板
const MONITOR_FENCE = 'monitor_fence'; //围栏监控
const CAR_QUERY = 'car_query'; //车辆查询
const TRACK_QUERY = 'track_query'; //轨迹查询
const TRACK_HEAT = 'track_heat'; //轨迹热力图
const TRACK_ANALYSIS = 'track_analysis'; //轨迹分析
//功能模块常量
export const TrackModuleType = {
	MONITOR_LOCATION,
	MONITOR_FENCE,
	CAR_QUERY,
	TRACK_QUERY,
	TRACK_HEAT,
	TRACK_ANALYSIS
}
/****
 * 播放轨迹时定位模式
 */
export const LocationType = [{
		value: 0,
		label: '居中'
	},
	{
		value: 1,
		label: '聚焦'
	},
	{
		value: 2,
		label: '不聚焦'
	}
]
/****
 * 轨迹播放速度
 */
export const SpeedType = [{
		value: 3000,
		label: '0.5X'
	},
	{
		value: 2500,
		label: '0.75X'
	},
	{
		value: 2000,
		label: '1X'
	},
	{
		value: 1500,
		label: '1.25X'
	},
	{
		value: 1000,
		label: '1.5X'
	},
	{
		value: 500,
		label: '2X'
	}
]
export const PageSize = 25; //每页显示记录数
