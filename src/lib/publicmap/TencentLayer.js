/**
 * Created by lt on 2017/7/14.
 */
L.TencentLayer = L.TileLayer.extend({
  options: {
    noWrap: true
  },
  getTileUrl: function(coords) {
    var data = {
      r: L.Browser.retina ? '@2x' : '',
      s: this._getSubdomain(coords),
      x: coords.x,
      y: coords.y,
      z: this._getZoomForUrl()
    };
    if (this._map && !this._map.options.crs.infinite) {
      var invertedY = this._globalTileRange.max.y - coords.y;
      if (this.options.tms) {
        data['y'] = invertedY;
      }
      data['-y'] = invertedY;
    }
    data.y = Math.pow(2, data.z) - 1 - data.y;
    data.x16 = Math.floor(data.x / 16);
    data.y16 = Math.floor(data.y / 16);
    return L.Util.template(this._url, L.extend(data, this.options));
  }
});
