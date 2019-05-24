import Resource from '../js/Resource.js'
import { getContentPosition, computeSegmentHeading } from '../js/with.js'
const EVENT_TRACK_PLAY = "play"; //轨迹播放事件
const EVENT_TRACK_STOP = "stop"; //轨迹停止事件
const EVENT_PLAY_TRACK_CONFIG = "play-track-conf"; //播放轨迹参数
/***
 * 播放的轨迹样式
 */
const playtrackLineStyle = {
	color: "#a09e97",
	weight: 8
}
/****
 * 轨迹组件混合
 */
export default {
	data() {
		return {
			tempTrackLayer: null, //当前已播放的轨迹
			curProgress: 0, //当前播放的进度 
			//timer: null, //播放定时器
			playTrackConfig: {
				speed: 500, //播放速度
				locationMode: 2 //定位方式
			}
		}
	},
	mounted() {
		this.bus.$on(EVENT_TRACK_PLAY, this.handlePlay);
		this.bus.$on(EVENT_TRACK_STOP, this.handleStop);
		this.bus.$on(EVENT_PLAY_TRACK_CONFIG, this.handlePlayTrackConfig);
	},
	methods: {
		handlePlayTrackConfig(data) {
			if(data && data.speed) {
				this.playTrackConfig.speed = data.speed;
			}
			if(data && data.locationMode != undefined) {
				this.playTrackConfig.locationMode = data.locationMode;
			}
		},
		//清除播放轨迹的图层等信息
		clearPlayTrack() {
			//清除临时轨迹线
			if(this.map && this.tempTrackLayer) {
				if(this.map.hasLayer(this.tempTrackLayer)) {
					this.map.removeLayer(this.tempTrackLayer);
				}
			}
			this.tempTrackLayer = null;
			//清除定位点
			if(this.map && this.locationMarker) {
				if(this.map.hasLayer(this.locationMarker)) {
					this.map.removeLayer(this.locationMarker);
				}
			}
			this.locationMarker = null;
			this.curProgress = 0;
		},
		/***
		 * 根据设备编号查找对应的轨迹图层
		 */
		findTrackLineByCode(code) {
			var len = this.trackLines ? this.trackLines.length : 0;
			for(var i = 0; i < len; i++) {
				if(this.trackLines[i].code == code) {
					return this.trackLines[i];
				}
			}
			return null;
		},
		//播放轨迹
		handlePlay(conf) {
			var speed = conf.speed == undefined ? this.playTrackConfig.speed : conf.speed;
			var locationMode = conf.locationMode == undefined ? this.playTrackConfig.locationMode : conf.locationMode;
			var code = conf.code == undefined ? this.trackLines[0].code : conf.code; //当前播放的轨迹设备编号
			var trackLine = this.findTrackLineByCode(code);
			if(!trackLine) {
				this.$message({
					message: '无轨迹数据！',
					type: 'warning'
				});
				return;
			}
			this.clearInterval();
			this.clearPlayTrack();
			//this.clearTimer();
			var _self = this;
			var drawTrack = function() {
				var latLngs = trackLine.getLatLngs();
				var len = latLngs ? latLngs.length : 0;
				if(len > 0 && _self.curProgress < len) {
					var curLatLng = null;
					var nextLatLng = null;
					var angle = 0; //旋转角度
					curLatLng = latLngs[_self.curProgress];
					if(_self.curProgress + 1 < len) {
						nextLatLng = latLngs[_self.curProgress + 1];
					} else {
						curLatLng = latLngs[_self.curProgress - 1];
						nextLatLng = latLngs[_self.curProgress];
					}
					angle = computeSegmentHeading(_self.map.project(curLatLng), _self.map.project(nextLatLng)) - 90;
					var icon = L.icon({
						iconUrl: Resource.findSymbol(_self.params.option.animation.icon.name).url,
						iconSize: [52, 26],
						iconAnchor: [26, 13] //图标的偏移
					});
					var dataTemp = {};
					dataTemp["code"] = trackLine.code;
					dataTemp["time"] = trackLine.times[_self.curProgress];
					dataTemp["lat"] = latLngs[_self.curProgress].lat;
					dataTemp["lng"] = latLngs[_self.curProgress].lng;
					//添加图标
					if(_self.locationMarker != null) {
						_self.map.removeLayer(_self.locationMarker);
						_self.locationMarker = null;
					}
					//Marker水平图标
					_self.locationMarker = L.marker(latLngs[_self.curProgress], {
						rotationAngle: angle, ////repsone.data.angle + 180,
						icon: icon
					}).addTo(_self.map).bindPopup(getContentPosition(dataTemp)); //.openPopup();
					if(_self.tempTrackLayer == null) {
						_self.tempTrackLayer = new L.Polyline(latLngs[_self.curProgress], playtrackLineStyle);
						_self.tempTrackLayer.addLatLng(latLngs[_self.curProgress]);
						_self.tempTrackLayer.addTo(_self.map);
					} else {
						_self.tempTrackLayer.addLatLng(latLngs[_self.curProgress]);
					}
					switch(locationMode) //定位方式
					{
						case 0: //以位置点为中心
							{
								var latlngT = latLngs[_self.curProgress];
								if(_self.params.option.publicMap.isCustomService) //自定义底图服务
								{
									_self.map.panTo(latlngT, {
										animate: true
									});
								} else {
									_self.map.flyTo(latlngT);
								}
								break;
							}
						case 1: //以轨迹范围居中
							{
								_self.map.fitBounds(trackLine.getBounds());
								break;
							}
						case 2: //不聚集，当位置点不在当前范围内时，移动到此点
							{
								var latlngT = latLngs[_self.curProgress];
								//不在地图范围内移至到地图中心
								if(!_self.map.getBounds().contains(latlngT)) {
									if(_self.params.option.publicMap.isCustomService) //自定义底图服务
									{
										_self.map.panTo(latlngT, {
											animate: true
										});
									} else {
										_self.map.flyTo(latlngT);
									}
								}

								break;
							}
					}
					_self.curProgress++;
				} else {
					_self.clearInterval();
					_self.clearPlayTrack();
				}
			}
			//drawTrack();
			var latLngs = trackLine.getLatLngs();
			var len = latLngs ? latLngs.length : 0;
			var latlng = len > 0 ? latLngs[0] : null;
			if(latlng) {
				//地图移动到起点位置
				if(_self.params.option.publicMap.isCustomService) //自定义底图服务
				{
					_self.map.panTo(latlng, {
						animate: true
					});
				} else {
					_self.map.flyTo(latlng);
				}
			}
			this.interval = setInterval(drawTrack, speed);
		},
		//轨迹停止
		handleStop() {
			this.clearInterval();
			this.clearPlayTrack();
		}

	}
}