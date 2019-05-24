/****
 * 针对数据服务定义的Rest服务RUL子地址接口
 */
 const DB_SUB_VALIDURI="/dboperation/v3/dboperation/selectrecord"; 
 /****
  * 获取用户数据源列表,格式：/datasource?uid=:uid
  */
 const USER_DATASOURCE_LIST="/datasource"; 
 /****
  * 获取用户数据源列表,格式：/datasource/fields/{id}
  */
 const USER_DATASOURCE_FIELDS="/datasource/fields"; 
 /****
  * 获取轨迹一条数据用于检验，[GET]格式：/track?id=:id
  */
 const TRACK_TOP="/track"; 
 /****
  * 获取轨迹数据，[POST]格式：/track/list?id=:id
  */
 const TRACK_LIST="/track/list"; 
 /****
  * 获取设备数据，[POST]格式：/track/device?id=:id
  */
 const TRACK_QUERY_DEVICE="/track/device"; 
 /***
  * 设备最后的位置
  */
 const TRACK_LASTLOCATION="/track/lastlocation";
 export default{
 	DB_SUB_VALIDURI,
 	USER_DATASOURCE_LIST,
 	USER_DATASOURCE_FIELDS,
 	TRACK_TOP,
 	TRACK_LIST,
 	TRACK_QUERY_DEVICE,
 	TRACK_LASTLOCATION
 }
 
