<template>
	<div style="position: absolute; box-sizing: border-box;" :id="ukey" :style="locationObject">
		<video :id='vid' class="video-js vjs-default-skin" style="position: absolute;width:100%; height: 100%;" :width="location.width" :height="location.height">
		</video>
		<div style="position: absolute;width:100%; height: 100%; " v-show="editmode">
		</div>
		<slot>
		</slot>
	</div>
</template>
<script>
	import common from '../../mixins/common.js'
	import 'video.js/dist/video-js.css'
	import videojs from 'video.js/dist/video.js'
	export default {
		message: '视频组件',
		name: 'SeVideo',
		mixins: [common],
		data() {
			return {
				player: null
			};
		},
		//		data() {
		//			return {
		//				playerOptions: {
		//
		//					//        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
		//					autoplay: true, //如果true,浏览器准备好时开始回放。
		//					muted: false, // 默认情况下将会消除任何音频。
		//					loop: false, // 导致视频一结束就重新开始。
		//					preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
		//					language: 'zh-CN',
		//					//					aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
		//					fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
		//					sources: [{
		//						type: "video/mp4",
		//						// mp4
		//						src: "http://vjs.zencdn.net/v/oceans.mp4",
		//					}]
		//				}
		//			}
		//		},
		mounted() {
			this.showVideo();
		},
		computed: {
			vid() {
				return 'vidoe_' + this.ukey;
			}
		},
		methods: {
			showVideo() {
				//				 {
				//					languages: {
				//					'zh-CN': {
				//						Play: '播放',
				//						'Play Video': '播放',
				//						Pause: '暂停',
				//						Mute: "声音",
				//						Fullscreen: "全屏"
				//					}
				//				},
				//				language: 'zh-CN',
				//				autoplay: false,
				//				loop: true,
				//				controls: true,
				//				
				//					preload: 'true',
				//					sources: [{
				//						type: "video/mp4",
				//						// mp4
				//						src: "http://vjs.zencdn.net/v/oceans.mp4",
				//					}]
				//
				//				}
				if(!this.player) {
					this.player = videojs(this.vid, this.params.option, function() {});
				} else {
					this.player.autoplay(this.params.option.autoplay);
					this.player.loop(this.params.option.loop);
					this.player.controls(this.params.option.controls);
					this.player.src(this.params.option.sources);
				}
			}
		},
		watch: {
			"params.option": {
				handler(newVal, oldVal) {
					this.showVideo();
				},
				deep: true
			}
		}
	}
</script>

<style>

</style>