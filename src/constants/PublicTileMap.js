/****
 * 公共地图常量
 */
const mapLists = [
	{
		id: 1,
		name: '天地图矢量地图', //4326
		thumbnail:'',//缩略图URL
		epsg:'EPSG:4326'
	},
	{
		id: 2,
		name: '天地图影像地图', //4326
		thumbnail:'',//缩略图URL
		epsg:'EPSG:4326'
	},
	{
		id: 3,
		name: '高德矢量地图',
		thumbnail:'',//缩略图URL
		epsg:'EPSG:3857'
	},
	{
		id: 4,
		name: '高德影像地图',
		thumbnail:'',//缩略图URL
		epsg:'EPSG:3857'
	},
	{
		id: 5,
		name: '腾讯矢量地图',
		thumbnail:'',//缩略图URL
		epsg:'EPSG:3857'
	},
	{
		id: 6,
		name: '腾讯影像地图',
		thumbnail:'',//缩略图URL
		epsg:'EPSG:3857'
	},
	{
		id: 7,
		name: '谷歌矢量地图',
		thumbnail:'',//缩略图URL
		epsg:'EPSG:3857'
	},
	{
		id: 8,
		name: '谷歌影像地图',
		thumbnail:'',//缩略图URL
		epsg:'EPSG:3857'
	},
	{
		id: 9,
		name: '智图矢量地图',
		thumbnail:'',//缩略图URL
		epsg:'EPSG:3857'
	},
	{
		id: 10,
		name: '智图蓝色地图',
		thumbnail:'',//缩略图URL
		epsg:'EPSG:3857'
	},
	{
		id: 11,
		name: 'OSM矢量地图',
		thumbnail:'',//缩略图URL
		epsg:'EPSG:3857'
	}
];

/****
 * 根据类型查询图层信息
 * @param {Object} type
 */
function findTileLayerInfo(type){
	var len=mapLists.length;
	for(var i=0;i<len;i++)
	{
		if(mapLists[i].id==type){
			return mapLists[i];
		}
	}
	return null;
}
/****
 * 
 * @param {Object} type
 */
function createTileLayers(type) {
	var array = [];
	switch(type) {
		case 1: //天地图矢量地图
			{
				array.push(L.PBM.createTileLayer(L.PBMType.tdt_vec_4326, "天地图矢量地图"));
				array.push(L.PBM.createTileLayer(L.PBMType.tdt_vec_a_4326, "天地图矢量地图"));
				break;
			}
		case 2: //天地图影像地图
			{
				array.push(L.PBM.createTileLayer(L.PBMType.tdt_img_4326, "天地图影像地图"));
				array.push(L.PBM.createTileLayer(L.PBMType.tdt_ter_a_4326, "天地图影像地图"));
				break;
			}
		case 3: //高德矢量地图
			{
				array.push(L.PBM.createTileLayer(L.PBMType.gaode_vec_3857, "高德矢量地图"));
				break;
			}
		case 4: //高德影像地图
			{
				array.push(L.PBM.createTileLayer(L.PBMType.gaode_img_3857, "高德影像地图"));
				break;
			}
		case 5: //腾讯矢量地图
			{
				array.push(L.PBM.createTileLayer(L.PBMType.tencent_vec_3857, "腾讯矢量地图"));
				break;
			}
		case 6: //腾讯影像地图
			{
				array.push(L.PBM.createTileLayer(L.PBMType.tencent_img_3857, "腾讯影像地图"));
				break;
			}
		case 7: //谷歌矢量地图
			{
				array.push(L.PBM.createTileLayer(L.PBMType.google_vec_3857, "谷歌矢量地图"));
				break;
			}
		case 8: //谷歌影像地图
			{
				array.push(L.PBM.createTileLayer(L.PBMType.google_img_3857, "谷歌影像地图"));
				break;
			}
		case 9: //智图矢量地图
			{
				array.push(L.PBM.createTileLayer(L.PBMType.geoq_vec_3857, "智图矢量地图"));
				break;
			}
		case 10: //智图蓝色地图
			{
				array.push(L.PBM.createTileLayer(L.PBMType.geoq_vec_purplishBlue_3857, "智图蓝色地图"));
				break;
			}
		case 11: //OSM矢量地图
			{
				array.push(L.PBM.createTileLayer(L.PBMType.osm_vec_3857, "OSM矢量地图"));
				break;
			}
	}
	return array;
}
export default {
	mapLists,
	createTileLayers,
	findTileLayerInfo
}