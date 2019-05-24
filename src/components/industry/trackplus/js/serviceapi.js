 /***
  * 查询设备信息列表,GET请求
  * **参数说明**：

| 名称 |   意义   | 可选 |   备注   |
| ---- | -------  | ---- |   -----  |
|key   |关键字匹配|是    |模糊匹配ID  |
|type  |车辆类型  |是    |空则查询全部|

返回数据： JSON

```json
{
    "state": 0,
    "info": [
      {"id":"123", "type":"A1"}
    ]
}
  */
 export const DEVICE_QUERY = "/api/device?index=";
 /****
  * 查询设备实时位置，POST请求
  * 参数:
  * {
  *    box:{
  * 	minx,maxx,miny,maxy
  *     }
  *    type:[]
  *  }
  * 结果:
  * {
  * 	"state":0,
    "tick": 1537856769,
    "info":[{
        "id":"abcdefg",
        "type":"",//类型
        "coordinates":[120,30],
        "time":1537856769
    }]
  * 
  * }
  * 
  */
 export const TRACK_REAL_POSITION = "/api/real/device?index=";
 /****
 * 根据车牌号或者BOX范围、时间以及类型查询车辆列表
 * 请求：POST
 * 参数：
    {
      "id":["abcdefg"]
      "type":["A1"],
      "bbox":[{minx,miny,maxx,maxy}]
      "begin":"",
      "end":""
    }
 * 结果：标准GeoJSON
 * 
 */
export const TRACK_QUERY= "/api/query/track?index=";

/****
 * 历史数据播放
 * 请求：POST
 * 参数：
 * 结果：标准GeoJSON
 * 
 */
export const TRACK_QUERY_PAST= "/api/query/past?index=";
 
 
 
/****
 * 根据时间段和类型查询轨迹
 * 请求：POST
 * 参数：
 * {
 * 	id:[],//车辆列表可选
 *  box:{
 * 	minx,maxx,miny,maxy
 * }
 *  begin:'',//开始时间格式：yyyy-MM-dd HH:mm:ss
 *  end:'',//结束时间格式：yyyy-MM-dd HH:mm:ss
 *  type:[]//车辆类型数组
 * }
 * 结果：
 * 标准的GeoJSON
 */
export const TRACK_QUERY_BY_BOX = "/api/query/bbox?index=";
/****
 * 根据车牌号和类型查询最新的位置
 * 请求：POST
 * 参数：
 * {
 	key:'',//车牌号
 *  type:[]//车辆类型数组
 * }
 * 结果：
 * {
  * 	"state":0,
    "tick": 1537856769,
    "info":[{
        "id":"abcdefg",
        "type":"",//类型
        "coordinates":[120,30],
        "time":1537856769
    }]
  * 
  * }
 */
export const TRACK_QUERY_DEVICE_BY_CODE = "/api/device?index=";
/****
 * 根据车牌号或者范围、时间以及类型查询车辆列表
 * 请求：POST
 * 参数：
    {"key":'',
    "box": {
        "minx":120,
        "maxx": 130,
        "miny": 20,
        "maxy": 30
    },
    "type":["A1"],
    "begin":"",
    "end":""}
 * 结果：
 * {
  "state": 0,
    "info": [
      {"id":"123", "type":"A1"}
    ]
  * 
  * }
 */
export const TRACK_QUERY_DEVICE_BY_BBOX = "/api/query/device/bbox?index=";
/****
 * 根据车牌号或者范围、时间以及类型查询车辆列表
 * 请求：POST
 
 * 结果：
 * {
  "state": 0,
    "info": [
      {"id":"123", "type":"A1"}
    ]
  * 
  * }
 */
export const TRACK_QUERY_DEVICE_BY_GEOMETRY = "/api/query/device/geometry?index=";


/****
 * 获取用户围栏列表
 * 请求：GET
 * 结果：标准GeoJSON
 * 
 */
export const FENCE_QUERY= "/api/fence";
/****
 * 创建围栏
 * 请求：POST
 * 参数：标准GeoJSON
 * 结果：{
  "state": 0,
    "message":"success",
    "id": "abc-de-fgh"
  * 
  * }
 * 
 */
export const FENCE_CREATE= "/api/fence";
/****
 * 围栏实时监控
 * 请求：POST
 * 参数：
 * {
 * 	fences:[], //围栏ID数组
 *  type:[],//车辆类型
 * box:{
 * 	minx,maxx,miny,maxy
 * }
 * }
 */
export const FENCE_REAL_MONITOR= "/api/real/monitor?index=";
/****
 * 模拟围栏实时监控
 * 请求：POST
 * 参数：
 * {
 * 	fences:[], //围栏ID数组
 *  type:[],//车辆类型
 *   begin:"",
   end:"",
 *    box:{
 * 	minx,maxx,miny,maxy
 * }
 * }
 */
export const FENCE_NOREAL_MONITOR= "/api/noreal/monitor?index=";

/****
 * 轨迹相似分析
 * 请求：POST
 * 参数：
 * {
 	begin:'',
 	end:'',
 	geometry:{
 		
 	}

 * }
 */
export const TRACK_ANALYSIS= "/api/analyse/gang?index=";
/****
 * 获取索引列表
 * 请求：GET
 */
export const TRACK_INDEX= "/api/index";
/***
 * 热力图
 * 请求：POST
 * 参数：
 * {
    "key":"",
    "type":["A1"],
    "begin": "",
    "end": ""
}
  结果：
  {
    "state":0,
    "message": "success",
    "info":[{
        "x":120.12345,
        "y":31.6789,
        "count":1568
    }]
}
 */
export const HEAT_QUERY= "/api/analyse/heatmap?index=";

/****
 *单一轨迹热力密度分析
 * 请求POST
 * 参数：
 * {
    "id":["a","b"]
    "begin": "2018-08-31 05:01:00",
    "end": "2018-08-31 06:01:00",
    "split":50
}
 * 
 */
export const HEAT_QUERY_DENSITY= "/api/analyse/density?index=";

/****
 * 坐标点数量统计
 * 请求GET
 */
export const TOTAL_COUNT= "/api/statistics/points?index=";













