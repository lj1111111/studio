<template>
	<div style="position: absolute; box-sizing: border-box;" :id="ukey" :style="locationObject">
		<div style="position: absolute;width:100%; height: 100%;" :style="styleObject">
			<i class="custom-iconfont icon-shijian" :style="iconStyle" v-if="params.icon.show"></i>
			<span :style="timerStyle">{{time}}</span>
		</div>
		<slot>
		</slot>
	</div>
</template>
<script>
	import common from '../../mixins/common.js'
	import moment from 'moment';
	export default {
		message: '时间器组件',
		name: 'SeTime',
		mixins: [common],
		data(){
			return {
				interval: null,
				time:""
			}
		},
		mounted(){
			this.init();
		},
		computed: {
			styleObject() {
				var obj = {};
				obj = {
					"display": "flex",
					"align-items": "center"
				};
				return obj;
			},
			iconStyle() {
				if(this.params && this.params.icon) {
					var obj = {
						"font-size": this.params.icon.fontSize + "px",
						"color": this.params.icon.color,
						"padding-right": this.params.icon.padding + "px",
						"font-weight": "bold"
					};
					return obj;
				} else {
					return {};
				}
			},
			timerStyle() {
				if(this.params && this.params.timer) {
					var obj = {
						"font-size": this.params.timer.fontSize + "px",
						"color": this.params.timer.color,
						"font-family": this.params.timer.fontFamily,
						"font-weight": this.params.timer.fontWeight
					};
					return obj;
				} else {
					return {};
				}
			}
		},
		methods:{
			 init(){
			 	this.time=moment().format(this.params.timer.format);
			 	if(this.interval)
			 	{
			 		clearInterval(this.interval);
			 	}
			 	var t = this.params.timer.intervalTime;
				this.interval=setInterval(()=>{
					this.time=moment().format(this.params.timer.format);
				},t*1000);
			 }
		},
		watch:{
			"params.timer.intervalTime":{
				handler(newVal,oldVal){
					this.init();
				}
			},
			"params.timer.format":{
				handler(newVal,oldVal){
					this.init();
				}
			}
		}
	}
</script>

<style>

</style>