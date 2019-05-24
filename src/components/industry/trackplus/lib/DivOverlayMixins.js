L.DivOverlay.include({
	_onCloseButtonClick: function (e) {
		this.fire("popupclose");
		this._close();
		DomEvent.stop(e);
	}
})
