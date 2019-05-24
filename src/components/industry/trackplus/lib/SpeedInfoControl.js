/****
 * 速度组件
 */
L.SpeedInfoControl = L.Control.extend({
	options: {
		//		colors: [{
		//			value: 0,
		//			color: '#8B0F05'
		//		}, {
		//			value: 30,
		//			color: '#EB0911'
		//		}, {
		//			value: 60,
		//			color: '#FFCE0A'
		//		}, {
		//			value: 80,
		//			color: '#00CE33'
		//		}],
		title: '时速'
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
		this._div.innerHTML = '<div class="speed-info">' +
			'	<div class="speed-info-title">'+this.options.title+'</div>' +
			'	<div class="speed-info-content-container">' +
			'		<div class="speed-info-content-left">' +
			'		</div>' +
			'	<div class="speed-info-content-right">' +
			'			<span>80</span>' +
			'			<span>60</span>' +
			'			<span>30</span>' +
			'			<span>0</span>' +
			'		</div>' +
			'	</div>' +
			'</div>';
	}
})