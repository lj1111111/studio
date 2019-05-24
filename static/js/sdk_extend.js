/***
 * 基于leaflet1.3.1版本
 */
L.SeCanvas.include({
	_destroyContainer: function() {
		delete this._ctx;
		L.DomUtil.remove(this._container);
		L.DomEvent.off(this._container);
		delete this._container;
	}
})