/**
 * Created by lt on 2017/7/13.
 */
L.PBMType = {
  /**
   * 天地图矢量（4326）
   */
  tdt_vec_4326: 1,
  /**
   * 天地图矢量注记（4326）
   */
  tdt_vec_a_4326: 2,
  /**
   * 天地图影像（4326）
   */
  tdt_img_4326: 3,
  /**
   * 天地图影像注记（4326）
   */
  tdt_img_a_4326: 4,
  /**
   * 天地图地形（4326）
   */
  tdt_ter_4326: 5,
  /**
   * 天地图地形注记（4326）
   */
  tdt_ter_a_4326: 6,
  /**
   * 天地图矢量（3857）
   */
  tdt_vec_3857: 7,
  /**
   * 天地图矢量注记（3857）
   */
  tdt_vec_a_3857: 8,
  /**
   * 天地图影像(3857)
   */
  tdt_img_3857: 9,
  /**
   * 天地图影像注记(3857)
   */
  tdt_img_a_3857: 10,
  /**
   * 天地图地形（3857）
   */
  tdt_ter_3857: 11,
  /**
   * 天地图地形注记（3857）
   */
  tdt_ter_a_3857: 12,
  /**
   * 高德矢量（3857）
   */
  gaode_vec_3857: 13,
  /**
   * 高德影像（3857）
   */
  gaode_img_3857: 14,
  /**
   * 谷歌矢量地图（3857）
   */
  google_vec_3857: 15,
  /**
   * 谷歌影像地图(3857)
   */
  google_img_3857: 16,
  /**
   * GeoQ矢量地图（3857）
   */
  geoq_vec_3857: 17,
  /**
   * GeoQ灰色主题（3857）
   */
  geoq_vec_gray_3857: 18,
  /**
   * GeoQ冷色主题（3857）
   */
  geoq_vec_cold_3857: 19,
  /**
   * GeoQ蓝黑主题（3857）
   */
  geoq_vec_purplishBlue_3857: 20,
  /**
   * openstreetmap地图（3857）
   */
  osm_vec_3857: 21,
  /**
   * bing矢量地图（3857）
   */
  bing_vec_3857: 22,
  /**
   * bing影像地图（3857）
   */
  bing_img_3857: 23,
  /**
   * 腾讯矢量地图(3857)
   */
  tencent_vec_3857: 24,
  /**
   * 腾讯影像地图(3857)
   */
  tencent_img_3857: 25,
  /**
   * 腾讯地形地图(3857)
   */
  tencent_ter_3857: 26,
}
L.PBMList = [{
    name: "天地图矢量(4326)",
    type: L.PBMType.tdt_vec_4326,
    crs: "EPSG:4326"
  },
  {
    name: "天地图矢量注记(4326)",
    type: L.PBMType.tdt_vec_a_4326,
    crs: "EPSG:4326"
  },
  {
    name: "天地图影像(4326)",
    type: L.PBMType.tdt_img_4326,
    crs: "EPSG:4326"
  },
  {
    name: "天地图影像注记(4326)",
    type: L.PBMType.tdt_img_a_4326,
    crs: "EPSG:4326"
  },
  {
    name: "天地图地形(4326)",
    type: L.PBMType.tdt_ter_4326,
    crs: "EPSG:4326"
  },
  {
    name: "天地图地形注记(4326)",
    type: L.PBMType.tdt_ter_a_4326,
    crs: "EPSG:4326"
  },
  {
    name: "天地图矢量(3857)",
    type: L.PBMType.tdt_vec_3857,
    crs: "EPSG:3857"
  },
  {
    name: "天地图矢量注记(3857)",
    type: L.PBMType.tdt_vec_a_3857,
    crs: "EPSG:3857"
  },
  {
    name: "天地图影像(3857)",
    type: L.PBMType.tdt_img_3857,
    crs: "EPSG:3857"
  },
  {
    name: "天地图影像注记(3857)",
    type: L.PBMType.tdt_img_a_3857,
    crs: "EPSG:3857"
  },
  {
    name: "天地图地形(3857)",
    type: L.PBMType.tdt_ter_3857,
    crs: "EPSG:3857"
  },
  {
    name: "天地图地形注记(3857)",
    type: L.PBMType.tdt_ter_a_3857,
    crs: "EPSG:3857"
  },

  {
    name: "高德矢量地图(3857)",
    type: L.PBMType.gaode_vec_3857,
    crs: "EPSG:3857"
  },
  {
    name: "高德影像地图(3857)",
    type: L.PBMType.gaode_img_3857,
    crs: "EPSG:3857"
  },

  {
    name: "谷歌矢量地图(3857)",
    type: L.PBMType.google_vec_3857,
    crs: "EPSG:3857"
  },
  {
    name: "谷歌影像地图(3857)",
    type: L.PBMType.google_img_3857,
    crs: "EPSG:3857"
  },

  {
    name: "GeoQ矢量地图(3857)",
    type: L.PBMType.geoq_vec_3857,
    crs: "EPSG:3857"
  },
  {
    name: "GeoQ灰色主题(3857)",
    type: L.PBMType.geoq_vec_gray_3857,
    crs: "EPSG:3857"
  },
  {
    name: "GeoQ冷色主题(3857)",
    type: L.PBMType.geoq_vec_cold_3857,
    crs: "EPSG:3857"
  },
  {
    name: "GeoQ蓝黑主题(3857)",
    type: L.PBMType.geoq_vec_purplishBlue_3857,
    crs: "EPSG:3857"
  },

  {
    name: "osm矢量地图(3857)",
    type: L.PBMType.osm_vec_3857,
    crs: "EPSG:3857"
  },

  {
    name: "bing矢量地图(3857)",
    type: L.PBMType.bing_vec_3857,
    crs: "EPSG:3857"
  },
  {
    name: "bing影像地图(3857)",
    type: L.PBMType.bing_img_3857,
    crs: "EPSG:3857"
  },

  {
    name: "腾讯矢量地图(3857)",
    type: L.PBMType.tencent_vec_3857,
    crs: "EPSG:3857"
  },
  {
    name: "腾讯影像图(3857)",
    type: L.PBMType.tencent_img_3857,
    crs: "EPSG:3857"
  },
  {
    name: "腾讯地形图(3857)",
    type: L.PBMType.tencent_ter_3857,
    crs: "EPSG:3857"
  },
]
const tk='f5ee1422c3f7ddece57315de7acb7308';
const tdt_base_url="http://t{s}.tianditu.gov.cn/DataServer";
L.PBMProviders = [{
    type: L.PBMType.tdt_vec_4326,
    url: tdt_base_url+"?T=vec_c&X={x}&Y={y}&L={z}&tk="+tk,
    subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
    zoomOffset: 1
  },
  {
    type: L.PBMType.tdt_vec_a_4326,
    url: tdt_base_url+"?T=cva_c&X={x}&Y={y}&L={z}&tk="+tk,
    subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
    zoomOffset: 1
  },
  {
    type: L.PBMType.tdt_img_4326,
    url: tdt_base_url+"?T=img_c&X={x}&Y={y}&L={z}&tk="+tk,
    subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
    zoomOffset: 1
  },
  {
    type: L.PBMType.tdt_img_a_4326,
    url: tdt_base_url+"?T=cia_c&X={x}&Y={y}&L={z}&tk="+tk,
    subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
    zoomOffset: 1
  },
  {
    type: L.PBMType.tdt_ter_4326,
    url: tdt_base_url+"?T=ter_c&X={x}&Y={y}&L={z}&tk="+tk,
    subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
    zoomOffset: 1
  },
  {
    type: L.PBMType.tdt_ter_a_4326,
    url: tdt_base_url+"?T=cta_c&X={x}&Y={y}&L={z}&tk="+tk,
    subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
    zoomOffset: 1
  },
  {
    type: L.PBMType.tdt_vec_3857,
    url: tdt_base_url+"?T=vec_w&X={x}&Y={y}&L={z}&tk="+tk,
    subdomains: ['0', '1', '2', '3', '4', '5', '6', '7']
  },
  {
    type: L.PBMType.tdt_vec_a_3857,
    url: tdt_base_url+"?T=cva_w&X={x}&Y={y}&L={z}&tk="+tk,
    subdomains: ['0', '1', '2', '3', '4', '5', '6', '7']
  },
  {
    type: L.PBMType.tdt_img_3857,
    url: tdt_base_url+"?T=img_w&X={x}&Y={y}&L={z}&tk="+tk,
    subdomains: ['0', '1', '2', '3', '4', '5', '6', '7']
  },
  {
    type: L.PBMType.tdt_img_a_3857,
    url: tdt_base_url+"?T=cia_w&X={x}&Y={y}&L={z}&tk="+tk,
    subdomains: ['0', '1', '2', '3', '4', '5', '6', '7']
  },
  {
    type: L.PBMType.tdt_ter_3857,
    url: tdt_base_url+"?T=ter_w&X={x}&Y={y}&L={z}&tk="+tk,
    subdomains: ['0', '1', '2', '3', '4', '5', '6', '7']
  },
  {
    type: L.PBMType.tdt_ter_a_3857,
    url: tdt_base_url+"?T=cta_w&X={x}&Y={y}&L={z}&tk="+tk,
    subdomains: ['0', '1', '2', '3', '4', '5', '6', '7']
  },
  {
    type: L.PBMType.gaode_vec_3857,
    url: "http://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
    subdomains: ["1", "2", "3", "4"]
  },
  {
    type: L.PBMType.gaode_img_3857,
    url: "http://webst0{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
    subdomains: ["1", "2", "3", "4"]
  },
  {
    type: L.PBMType.google_vec_3857,
    url: "http://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}",
    subdomains: []
  },
  {
    type: L.PBMType.google_img_3857,
    url: "http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}",
    subdomains: []
  },
  {
    type: L.PBMType.geoq_vec_3857,
    url: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}",
    subdomains: []
  },
  {
    type: L.PBMType.geoq_vec_gray_3857,
    url: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetGray/MapServer/tile/{z}/{y}/{x}",
    subdomains: []
  },
  {
    type: L.PBMType.geoq_vec_cold_3857,
    url: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetCold/MapServer/tile/{z}/{y}/{x}",
    subdomains: []
  },
  {
    type: L.PBMType.geoq_vec_purplishBlue_3857,
    url: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}",
    subdomains: []
  },
  {
    type: L.PBMType.osm_vec_3857,
    url: "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    subdomains: ['a', 'b', 'c']
  },
  {
    type: L.PBMType.tencent_vec_3857,
    url: "http://rt{s}.map.gtimg.com/realtimerender?z={z}&x={x}&y={y}&type=vector&style=0",
    subdomains: ['0', '1', '2', '3']
  },
  {
    type: L.PBMType.tencent_img_3857,
    url: "http://p{s}.map.gtimg.com/sateTiles/{z}/{x16}/{y16}/{x}_{y}.jpg",
    subdomains: ['0', '1', '2', '3']
  },
  {
    type: L.PBMType.tencent_ter_3857,
    url: "http://p{s}.map.gtimg.com/demTiles/{z}/{x16}/{y16}/{x}_{y}.jpg",
    subdomains: ['0', '1', '2', '3']
  },

]

L.PBM = {
  createTileLayer: function(type, name, options) {
    var offsetX = 0.00947,
      offsetY = 0.00117;
    var tileLayer = null;
    switch (type) {
      case L.PBMType.tdt_vec_4326:
      case L.PBMType.tdt_vec_a_4326:
      case L.PBMType.tdt_img_4326:
      case L.PBMType.tdt_img_a_4326:
      case L.PBMType.tdt_ter_4326:
      case L.PBMType.tdt_ter_a_4326:
      case L.PBMType.tdt_vec_3857:
      case L.PBMType.tdt_vec_a_3857:
      case L.PBMType.tdt_img_3857:
      case L.PBMType.tdt_img_a_3857:
      case L.PBMType.tdt_ter_3857:
      case L.PBMType.tdt_ter_a_3857:
      case L.PBMType.osm_vec_3857:
        {
          var provider = this.getProvider(type);
          if (!provider) return null;
          var url = provider.url;
          if (!options) options = {};
          options.subdomains = provider.subdomains;
          if (provider.zoomOffset) {
            options.zoomOffset = provider.zoomOffset;
          }
          if (options.noWrap == undefined) {
            options.noWrap = true;
          }
          tileLayer = new L.TileLayer(url, options);
          break;
        }

      case L.PBMType.gaode_vec_3857:
      case L.PBMType.gaode_img_3857:

      case L.PBMType.google_vec_3857:
      case L.PBMType.google_img_3857:

      case L.PBMType.geoq_vec_3857:
      case L.PBMType.geoq_vec_gray_3857:
      case L.PBMType.geoq_vec_cold_3857:
      case L.PBMType.geoq_vec_purplishBlue_3857:
        {
          var provider = this.getProvider(type);
          if (!provider) return null;
          var url = provider.url;
          if (!options) options = {};
          options.subdomains = provider.subdomains;
          if (provider.zoomOffset) {
            options.zoomOffset = provider.zoomOffset;
          }
          if (options.noWrap == undefined) {
            options.noWrap = true;
          }
          options.lngOffset = offsetX;
          options.latOffset = offsetY;
          tileLayer = new L.TileLayer(url, options);
          break;
        }
      case L.PBMType.bing_vec_3857:
        {
          var BING_KEY = 'AuhiCJHlGzhg93IqUH_oCpl_-ZUrIE6SPftlyGYUvr9Amx5nzA-WqGcPquyFZl4L';
          tileLayer = L.tileLayer.bing({
            bingMapsKey: BING_KEY,
            imagerySet: "Road"
          })
          break;
        }
      case L.PBMType.bing_img_3857:
        {
          var BING_KEY = 'AuhiCJHlGzhg93IqUH_oCpl_-ZUrIE6SPftlyGYUvr9Amx5nzA-WqGcPquyFZl4L';
          tileLayer = L.tileLayer.bing({
            bingMapsKey: BING_KEY,
            imagerySet: "AerialWithLabels"
          })
          break;
        }
      case L.PBMType.tencent_vec_3857:
      case L.PBMType.tencent_img_3857:
      case L.PBMType.tencent_ter_3857:
        {
          var provider = this.getProvider(type);
          if (!provider) return null;
          var url = provider.url;
          if (!options) options = {};
          options.subdomains = provider.subdomains;
          options.lngOffset = offsetX;
          options.latOffset = offsetY;
          tileLayer = new L.TencentLayer(url, options);
          break;
        }
    }
    if (tileLayer) {
      tileLayer.visible = true;
      tileLayer.name = name;
    }
    return tileLayer;
  },
  getProvider: function(type) {
    var providers = L.PBMProviders;
    var len = providers.length;
    for (var i = 0; i < len; i++) {
      var provider = providers[i];
      if (provider.type == type) {
        return provider;
      }
    }
    return null;
  }
}

L.GridLayer.include({
  _isValidTile: function(coords) {
    var crs = this._map.options.crs;

    if (!crs.infinite) {
      // don't load tile if it's out of bounds and not wrapped
      var bounds = this._globalTileRange;
      if (this.options.noWrap && (coords.x < 0 || coords.x > bounds.max.x)) {
        return false;
      }
      if (!crs.wrapLng && (coords.x < bounds.min.x || coords.x > bounds.max.x) || !crs.wrapLat && (coords.y < bounds.min.y || coords.y > bounds.max.y)) {
        return false;
      }
    }

    if (!this.options.bounds) {
      return true;
    }

    // don't load tile if it doesn't intersect the bounds in options
    var tileBounds = this._tileCoordsToBounds(coords);
    return L.latLngBounds(this.options.bounds).overlaps(tileBounds);
  }
})

L.TileLayer.mergeOptions({
  //纬度偏移 y
  latOffset: 0,
  //经度偏移 x
  lngOffset: 0
})

L.TileLayer.include({
  _getTilePos: function(coords) {
    var offset = this._getPixelOffset();
    return coords.scaleBy(this.getTileSize()).subtract(this._level.origin).subtract(offset);
  },
  _getTiledPixelBounds: function(center) {
    var map = this._map,
      mapZoom = map._animatingZoom ? Math.max(map._animateToZoom, map.getZoom()) : map.getZoom(),
      scale = map.getZoomScale(mapZoom, this._tileZoom),
      pixelCenter = map.project(center, this._tileZoom).floor(),
      halfSize = map.getSize().divideBy(scale * 2);
    var offset = this._getPixelOffset();
    pixelCenter = pixelCenter.add(offset);
    return new L.Bounds(pixelCenter.subtract(halfSize), pixelCenter.add(halfSize));
  },
  _getPixelOffset: function() {
    var offset = new L.Point(0, 0);
    // var offsetX = 0.00464,offsetY = -0.0018;
    var offsetX = this.options.lngOffset,
      offsetY = this.options.latOffset;
    if (offsetX || offsetY) {
      var map = this._map;
      var center = map.getCenter();
      var pixelCenter = map.project(center, this._tileZoom);
      var pixelCenter1 = map.project(new L.LatLng(center.lat + offsetY, center.lng + offsetX), this._tileZoom);
      offset.x = pixelCenter1.x - pixelCenter.x;
      offset.y = pixelCenter1.y - pixelCenter.y;
    }
    return offset;
  }
})
