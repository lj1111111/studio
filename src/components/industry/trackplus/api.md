TrackDB 标准接口文档

# 1、数据接入文档

## 1.1 创建索引
接口形式： HTTP-JSON

接口方法： POST

访问路径： xx.com/api/index

创建id唯一的索引，用于后续数据管理。

参数格式：

```json
{
    "id":"asdfghjk"
}
```

返回格式：

```json
{
    "state":0,
    "message":"success"
}
```

## 1.2 获取所有索引
接口形式： HTTP-JSON

接口方法： GET

访问路径： xx.com/api/index

获取所有的索引列表

参数格式：无

返回格式：

```json
{
    "state":0,
    "message":"success",
    "index": ["a","b","c"]
}
```


## 1.3 上传定位数据
接口形式： HTTP-JSON

接口方法： POST

访问路径： xx.com/api/submit_gps?index=asdfg

index 为 1.1 中创建的索引id。

参数格式：
```json
{
    "id": "abcdefg",
    "track": [120,30,1537856769]
}
```
**参数说明**：

"id" ： 定位设备的唯一id，用于标明数据的来源身份。

"track" ： 定位信息，数值型数组，分别是 x、y、t。

多条记录同时发送，可组成 [x,y,t,x,y,t...] 的数组，
数组长度需要是 3 的倍数，否则做截断处理。

x、y 为经纬度坐标，WGS84 坐标系。
t 为定位时间戳，单位为 秒 。

## 1.4 绑定设备属性
接口形式： HTTP-JSON

接口方法： POST

访问路径： xx.com/api/device?index=asdfg

index 为 1.1 中创建的索引id。

参数格式：
```json
{
    "id": "abcdefg",
    "type":"",
    "city":""
}
```
**参数说明**：

为唯一id绑定属性， type类型。

# 2、数据查询
## 2.1 查询设备信息列表
接口形式： HTTP-JSON

接口方法： GET

访问路径： xx.com/api/device?index=asdfg

*index为索引ID*

**参数说明**：

| 名称  |   意义    | 可选 |   备注   |
| ---- | -------  | ---- |   -----  |
|key    |关键字匹配 |是    |模糊匹配ID  |
|type   |车辆类型   |是    |空则查询全部|
|size   |分页大小   |是     |空则返回全部|
|page   |分页页号   |是     |从0开始，默认0，只取第一页数据|

返回数据： JSON

```json
{
    "state": 0,
    "info": {
        "page_size":20,
        "page":1,
        "data_count":30,
        "item":[
          {
            "id":"123",
            "type":"A1"
          }
        ]
    }
}
```
**参数说明**：
"state" 为返回状态码。0 表示正确无误。
"page_size" 总页数
"page" 页码
"data_count" 数据总数

"item" 为符合条件的设备信息json对象数组。


## 2.2 按bbox查询设备
接口形式： HTTP-JSON

接口方法： POST

访问路径： xx.com/api/query/device/bbox?index=asdfg

*index为索引ID*

**请求参数示例**：
```json
{
    "key":"",
    "bbox": [{
        "minx":120,
        "maxx": 130,
        "miny": 20,
        "maxy": 30
    }],
    "type":["A1"],
    "begin":"",
    "end":"",
    "fence_list":[],
    "size":20,
    "page":0
}
```
参数说明：

|  名称 |     意义  |  可选 |    备注    |
|:------|:----------|:------|:-----------|
|bbox   |空间范围   |是     |外包矩形    |
|type   |车辆类型   |是     |空则查询全部|
|begin  |起始时间   |是     |格式：yyyy-MM-dd HH:mm:ss|
|end    |结束时间   |是     |begin、end都为空，则查询所有轨迹|
|size   |分页大小   |是     |空则返回全部|
|page   |分页页号   |是     |从0开始，默认0，只取第一页数据|

**返回数据： JSON**

```json
{
    "state": 0,
    "info": {
        "page_size":20,
        "page":1,
        "data_count":30,
        "item":[
          {
            "id":"123",
            "type":"A1"
          }
        ]
    }
}
```
参数说明：
"state" 为返回状态码。0 表示正确无误。

"info" 为符合条件的设备信息json对象数组。

## 2.3 按geometry查询设备
接口形式： HTTP-JSON

接口方法： POST

访问路径： xx.com/api/query/device/geometry?index=asdfg

*index为索引ID*

**请求参数示例**：
```json
{
    "geometry": {
       "type":"Polygon",
       "coordinates": [
            [125.6, 10.1],
            [125.6, 10.1]
        ]
    },
    "type":["A1"],
    "begin":"",
    "end":"",
    "size":20,
    "page":0
}
```

**参数说明：**

|  名称  |     意义    |  可选 |    备注     |
|:------|:----------|:----- |:--------- |
|geometry|几何空间范围 |是     |外包矩形     |
|type    |车辆类型     |是     |空则查询全部 |
|begin   |起始时间     |是     |格式：yyyy-MM-dd HH:mm:ss|
|end     |结束时间     |是     |begin、end都为空，则查询所有轨迹|
|size    |分页大小     |是     |空则返回全部             |
|page    |分页页号     |是     |从0开始，默认0，只取第一页数据|

**返回数据： JSON**

```json
{
    "state": 0,
    "info": {
        "page_size":20,
        "page":1,
        "data_count":30,
        "item":[
          {
            "id":"123",
            "type":"A1"
          }
        ]
    }
}
```
参数说明：
"state" 为返回状态码。0 表示正确无误。

"info" 为符合条件的设备信息json对象数组。


## 2.4 查询轨迹数据

接口形式： HTTP-JSON

接口方法： POST

访问路径： xx.com/api/query/track?index=asdfg

*index为索引id*。

**请求参数示例**：

```json
{
    "id":["苏EABCDE"],
    "key":"",
    "bbox": [
      {
        "minx": 120,
        "maxx": 130,
        "miny":  20,
        "maxy":  30
      }
    ],
    "type":["A1"],
    "begin":"",
    "end":"",
    "fence_list"：[]
}
```

**参数说明：**

|  名称 |     意义  |  可选 |    备注    |
|:------|:----------|:------|:-----------|
|id     |设备id     |是     |            |
|bbox   |空间范围   |是     |外包矩形    |
|type   |车辆类型   |是     |空则查询全部|
|key    |关键字搜索 |是     |匹配ID（和id筛选不能同时存在，若存在则以id为主）|
|begin  |起始时间   |是     |格式：yyyy-MM-dd HH:mm:ss|
|end    |结束时间   |是     |begin、end都为空，则查询所有轨迹|
|fence_list|围栏id数组|是   |为空时，不做围栏判断且不返回围栏标志量|

**返回数据： JSON**

```json
{
    "state": 0,
    "features": [{
      "type": "Feature",
      "geometry": {
        "type": "LineString",
        "coordinates": [
            [125.6, 10.1],
            [125.6, 10.1],
            [125.6, 10.1]
        ]
      },
      "properties": {
        "id": "abcdefg",
        "type":"A1",
        "time": [1537856769,1537856769,1537856769],
        "fence_status":[]
      }
    }]
}
```

**返回参数说明：**

查询id为"abcdefg"的设备历史轨迹。
返回的 "geometry" 为标准 GeoJson 数据, 轨迹数据为 LineString 类型。
属性里带有基础属性为："id" ： 数据的唯一id，"time" ： 轨迹每个点的时间。
fence_status为围栏标志量，1表示在围栏中，0为否，只有在使用了fence_list参数时才返回。

## 2.5 几何范围查询轨迹

接口形式： HTTP-JSON

接口方法： POST

访问路径： xx.com/api/query/geometry?index=asdfg

*index为索引id*。

**请求参数示例**：

```json
{
    "id":["苏EABCDE"],
    "key":"",
    "geometry": {
       "type":"Polygon",
       "coordinates": [
            [125.6, 10.1],
            [125.6, 10.1]
        ]
    },
    "type":["A1"],
    "begin":"",
    "end":"",
    "fence_list"：[]
}
```

**参数说明：**

|  名称  |     意义  |  可选 |    备注    |
|:------|:----------|:------|:-----------|
|id      |设备id       |是  |            |
|geometry|几何空间范围 |是  |外包矩形    |
|type    |车辆类型   |是     |空则查询全部|
|key     |关键字搜索 |是     |匹配ID（和id筛选不能同时存在，若存在则以id为主）|
|begin   |起始时间   |是     |格式：yyyy-MM-dd HH:mm:ss|
|end     |结束时间   |是     |begin、end都为空，则查询所有轨迹|
|fence_list|围栏id数组|是   |为空时，不做围栏判断且不返回围栏标志量|

**参数说明**:

"geometry" 为标准 Geojson 的 Geometry 部分，包含 “type” 和 “coordinates”
"type" 支持参数包括: "Polygon"

**可选参数列表**：

以下参数跟在请求的url后面。

| 名称      |     意义   | 可选 | 备注    |
| -------- | -------- | ---- | ------- |
| id        | 数据唯一id | 是   | 从结果中过滤id。支持多id，如 id=1&id=2 |
| begin     | 起始时间   | 是   |         |
| end       | 结束时间   | 是   | begin、end都为空，则查询所有轨迹 |
| precision | 坐标精度   | 是   | 小数点后面的精度，默认5位        |

**返回值**：

格式同 “2.4 查询轨迹数据” 的返回结果。


# 3、实时状态

# 3.1 查询设备实时位置

接口形式： HTTP-JSON

接口方法： POST

访问路径： xx.com/api/real/device?index=asdfg

**参数格式**：

```json
{
    "id":["abcdefg","gfedcba"],
    "key":"",
    "bbox": {
        "minx":120,
        "maxx": 130,
        "miny": 20,
        "maxy": 30
    },
    "type":["A1"]
}
```
id 可以为空，代表不筛选。

key 关键字搜索，匹配ID（和id筛选不能同时存在，若存在则以id为主）。

bbox 可以为空，代表没有范围过滤。

type可以为空，代表不限制类型

**可选参数列表**：

| 名称        | 意义           | 备注                        |
| ----------- | -------------- | --------------------------- |
| precision   | 坐标精度       | 小数点后面的精度，默认5位   |
| avoid_scale | 数据避让比例尺 | 屏幕大小除以地理大小        |

**返回结果**：
返回最近的两个活动坐标点

```json
{
    "state":0,
    "tick": 1537856769,
    "info":{
        "item":[
            {
                "id":"abcdefg",
                "type":"A1",
                "time":1598951653,
                "coordinates":[[120,30],[120,30]]
            }
        ]
    }
}
```

## 3.2 [TODO]查询最近活动的设备

接口形式： HTTP-JSON

接口方法： POST

访问路径： xx.com/api/real/active?index=asdfg

**参数格式**：

```json
{
    "id":["abcdefg","gfedcba"],
    "key":"",
    "duration":10,
    "type":["A1"]
}
```

id 可以为空，代表不筛选。

key 关键字搜索，匹配ID（和id筛选不能同时存在，若存在则以id为主）。

“duration” 为持续时间，单位为秒，如最近 10秒内活动的设备："duration":10。


# 4、数据分析

## 4.1 极速热力图(群体)

接口形式： HTTP-JSON

接口方法： POST

访问路径： xx.com/api/analyse/heatmap?index=asdfg

*index为索引名称*

**参数格式**：

```json
{
    "key":"",
    "type":["A1"],
    "begin": "",
    "end": "",
    "split":50
}
```

**参数说明：**

|  名称  |     意义    |  可选 |    备注     |
|:----  |:----------|:------|:--------- |
|key     |设备id匹配   |是     |模糊逼迫     |
|type    |车辆类型     |是     |空则查询全部 |
|begin   |起始时间     |否     |  不能为空   |
|end     |结束时间     |否     |  不能为空   |
|split   |分块数量     |否     |  默认50     |

**返回参数：**

```json
{
    "state":0,
    "message": "success",
    "info":{
        "item":[{
            "x":120.12345,
            "y":31.6789,
            "count":1568
        }],
        "max":0,
    }
}
```

item为热力数据数组，x、y为坐标,count为对应坐标位置的热力值。
max为本次返回数据中最大count值。

## 4.2 单一轨迹热力密度分析

接口形式： HTTP-JSON

接口方法： POST

访问路径： xx.com/api/analyse/density?index=asdfg

*index为索引名称*

**参数格式**：

```json
{
    "id":["a","b"]
    "begin": "2018-08-31 05:01:00",
    "end": "2018-08-31 06:01:00",
    "split":50
}
```

**参数说明：**

|  名称  |     意义    |  可选 |    备注     |
|:----  |:----------|:------|:--------- |
|id      |设备id       |否     |  数组    |
|begin   |起始时间     |否     |  不能为空   |
|end     |结束时间     |否     |  不能为空   |
|split   |分块数量     |否     |  默认50     |

**返回参数：**

```json
{
    "state":0,
    "message": "success",
    "info":{
        "item":[{
            "x":120.12345,
            "y":31.6789,
            "count":1568
        }],
        "max":0,
    }
}
```

item为热力数据数组，x、y为坐标,count为对应坐标位置的热力值。
max为本次返回数据中最大count值。

## 4.3 相近轨迹分析

接口形式： HTTP-JSON

接口方法： POST

访问路径： xx.com/api/analyse/gang?index=asdfg

**参数格式**：

```json
{
    "begin": "2018-01-01 12:00:01",
    "end": "2018-01-01 12:00:02",
    "track": [[120.1,30.1],[120.1,30.1]],
    "distance": 10
}
```

**参数说明：**

|  名称  |     意义    |  可选 |    备注     |
|:----  |:----------|:------|:--------- |
|begin   |起始时间     |否     |  不能为空,日期字符串或时间戳  |
|end     |结束时间     |否     |  不能为空   |
|tack    |轨迹坐标     |否     |  不能为空   |
|distance|缓冲区半径   |是     |  单位(米),默认10   |

**返回参数：**

```json
{
    "state":0,
    "message": "success",
    "info":{
        "item":[{
            "id":"京QQYSR",
            "count":100
        }],
    }
}
```

item为相似轨迹数组，id 设备ID，count 相近的点的数量。

## 4.4 [TODO]轨迹碰撞分析

接口形式： HTTP-JSON

接口方法： POST

访问路径： xx.com/api/analyse/collision?index=asdfg

**参数格式**：

```json
{
    "id":["abcdefg","gfedcba"],
    "begin": 1537856769,
    "end": 1537856769
}
```

判断N条轨迹是否有相遇可能性

**返回参数：**

待定

## 4.5 轨迹聚类分布



# 5、辅助工具api

## 5.1 创建缓冲区

接口形式： HTTP-JSON

接口方法： POST

访问路径： xx.com/api/utilty/buffer

**参数格式**：

```json
{
    "geometry": {},
    "distance": 10
}
```

"geometry" 为标准 GeoJson 格式的 Geometry 部分，包括 "type" 和 “coordinates”。

“distance” 为外扩范围，单位为 米。

**返回格式：**

```json
{
    "state":0,
    "geometry":{}
}
```


## 5.2 计算距离

接口形式： HTTP-JSON

接口方法： POST

访问路径： xx.com/api/utilty/distance

计算给定点的距离，计算方法为计算WGS84的地表大圆弧距离，单位”米“。

**参数格式**：

```json
{
    "coordinates": [
        [125.6, 10.1],
        [125.6, 10.1],
        [125.6, 10.1],
    ]
}
```

**返回格式：**

```json
{
    "state":0,
    "result":[10,10]
}
```


# 6、电子围栏

## 6.1 创建围栏

接口形式： HTTP-JSON

接口方法： POST

访问路径： xx.com/api/fence

**参数格式**：

```json
{
    "geometry": {
        "type":"Polygon",
        "coordinates": [[
        [116.0498, 39.8104],
        [116.0499, 39.8104],
        [116.0499, 39.8103],
        [116.0498, 39.8103],
        [116.0498, 39.8104]
      ]]
    },
    "type": "Feature",
    "properties": {
        "name": "名称",
    }
}
```
参数为标准geojson中feature部分，只支持Polygon，如要创建多个多边形，请多次调用创建多个电子围栏。

**返回格式：**

```json
{
    "state":0,
    "message":"success",
    "id": "abc-de-fgh"
}
```
id为创建的电子围栏ID。


## 6.2 获取围栏列表
接口形式： HTTP-JSON

接口方法： GET

访问路径： xx.com/api/fence

**可选参数**：

|   名称 |   意义     |可选|   备注        |
| ----- |--------- |----|   ----      |
|key     |关键字匹配 | 是  | 模糊匹配名称  |
|id      |指定围栏I D| 是  | ID精确查询时，其他参数失效|

**返回格式**：

```json
{
    "state":0,
    "message":"success",
    "info": [
        {
            "geometry": {
                "type":"Polygon",
                "coordinates": [
                [
                    [116.0498, 39.8104],
                    [116.0499, 39.8104],
                    [116.0499, 39.8103],
                    [116.0498, 39.8103],
                    [116.0498, 39.8104]
                ]
              ]
            },
            "type": "Feature",
            "properties": {
                "name": "名称",
                "id":"123"
            }
        }
    ]
}
```

info为电子围栏对象数组。