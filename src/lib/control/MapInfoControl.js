L.Control.MapInfo = L.Control.extend({
	options: {
		position: 'bottomright',
		mousePosShow: true,
		zoomShow: true,
		scaleShow: true
	},

	onAdd: function(map) {
		this._container = L.DomUtil.create('div', 'leaflet-control-mapinfo');
		if(L.DomEvent) {
			L.DomEvent.disableClickPropagation(this._container);
		}
		var events = {
			moveend: this._change,
			viewreset: this._change,
			mousemove: this._onMouseMove
		}
		map.on(events, this);
		this._mousePosPane = L.DomUtil.create('span');
		this._zoomInfoPane = L.DomUtil.create('span');
		this._scaleInfoPane = L.DomUtil.create('span');
		if(!this.options.mousePosShow) {
			this._mousePosPane.style.display = "none";
		}
		if(!this.options.zoomShow) {
			this._zoomInfoPane.style.display = "none";
		}
		if(!this.options.scaleShow) {
			this._scaleInfoPane.style.display = "none";
		}
		this._container.appendChild(this._mousePosPane);
		this._container.appendChild(this._zoomInfoPane);
		this._container.appendChild(this._scaleInfoPane);
		this._change();
		return this._container;
	},
	_change: function(e) {
		var zoom = this._map.getZoom();
		this._zoomInfoPane.innerHTML = "层级：" + zoom;
		var scale = this._map.getScale();
		this._scaleInfoPane.innerHTML = "1:" + scale;
	},
	_onMouseMove: function(e) {
		var p = e.latlng;
		var x = p.lng.toFixed(4);
		var y = p.lat.toFixed(4);
		this._mousePosPane.innerHTML = "X：" + x + "&nbsp;&nbsp;&nbsp;Y：" + y;
	},
	onRemove: function(map) {
		map && map.off('moveend viewreset', this._change, this);
		map && map.off('mousemove', this._onMouseMove, this);
	}
});