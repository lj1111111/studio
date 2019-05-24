/****
 * 图例组件
 */
L.InfoControl = L.Control.extend({
	options: {
		position: 'bottomright',
		colors: [{
			value: 0,
			color: '#8B0F05'
		}, {
			value: 30,
			color: '#EB0911'
		}, {
			value: 60,
			color: '#FFCE0A'
		}, {
			value: 80,
			color: '#00CE33'
		}],
		title: '图例'
	},
	initialize: function(options) {
		L.Util.setOptions(this, options);
	},
	onAdd: function(map) {
		this._div = L.DomUtil.create('div', 'speed-info');
		this.update();
		return this._div;
	},
	update: function() {
		var colors = this.options.colors;
		var len = colors ? colors.length : 0;
		var substr = "";
		if(len > 0) {
			if(len == 1) {
				substr += '<li><i style="background-color:' + colors[0].color + ';width: 16px;height:16px;display: inline-block;"></i><span style="padding: 8px;">+' + colors[0].label + '</span></li>';
			} else {
				for(var i = 0; i < len - 1; i++) {
					substr += '<li><i style="background-color:' + colors[i].color + ';width: 16px;height:16px;display: inline-block;"></i><span style="padding: 8px;">+' + colors[i].label + '&ndash;'
					colors[i + 1].label + '</span></li>';
				}
				substr += '<li><i style="background-color:' + colors[len - 1].color + ';width: 16px;height:16px;display: inline-block;"></i><span style="padding: 8px;">+' + colors[len - 1].label + '+</span></li>';
			}
		}
		this._div.innerHTML = '<div class="speed-info">' +
			'<div class="speed-info-title">' + this.options.title + '</div>' +
			+'<ul style="list-style: none; margin: 0; padding: 0;text-align: center;">' +
			substr +
			'</ul>' +
			'</div>';
	}
})