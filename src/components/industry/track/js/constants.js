const QUERY_BY_NUM='queryByNum';//按设备查询
const QUERY_BY_MAP='queryByMap';//按地图查询
/***
 * 轨迹查询类型
 */
export const TrackQueryType={
	QUERY_BY_NUM,
	QUERY_BY_MAP
}
/***
 * tab切换事件名
 */
export const TabChangeTypeEvent="tab-change-type";
/***
 * 按设备号查询事件名
 */
export const QueryTrackByCodeEvent = "queryTrackByCode";
/****
 * 根据范围和时间查询设备事件名称
 */
export const QueryDevicesByRectEvent = "QueryDevicesByRect";
/****
 * 设备查询结果事件
 */
export const QueryDevicesResultEvent = "QueryDevicesResult";
/****
 * 设备轨迹线居中事件
 */
export const LocationTrackEvent = "LocationTrack";
/****
 * 设备实时位置事件
 */
export const LocationEvent = "Location";
