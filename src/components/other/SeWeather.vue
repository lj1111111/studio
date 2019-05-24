<template>
	<div style="position: absolute; " :id="ukey" :style="locationObject">
		<div style="position: absolute;width:100%; height: 100%;" :style="styleObject">
			<iframe scrolling="no" :src="iframeSource" frameborder="0" id="frm1" width="100%" height="100%" allowtransparency="true"></iframe>
		</div>
		<!--<div style="position: absolute;width:100%; height: 100%; ">
		</div>-->
		<div style="position: absolute;width:100%; height: 100%; " v-show="editmode">
		</div>
		<slot>
		</slot>

	</div>
</template>
<script>
	import common from '../../mixins/common.js'
	export default {
		message: '天气组件',
		name: 'SeWeather',
		mixins: [common],
		computed: {
			styleObject() {
				var obj = {};
				return obj;
			},
			iframeSource() {
				var url = "//tianqiapi.com/api.php?style=ts&skin=yahoo";
				if(this.params.option) {
					if(this.params.option.city) {
						url += "&city=" + this.params.option.city;
					}
					if(this.params.option.fontSize) {
						url += "&fontsize=" + this.params.option.fontSize;
					}
					if(this.params.option.color) {
						var colorStr = this.params.option.color;
						url += "&color=" + colorStr.substring(1);
					}
					//					if(document.getElementById("frm1") && document.getElementById("frm1").contentWindow && document.getElementById("frm1").contentWindow.document ){
					//						var doc=  document.getElementById("frm1").contentWindow.document;
					//					    doc.getElementsByName("li").style.fontSize="50px";
					//					}
				}
				return url;
			}
		},
		methods: {
			changeSize() {
//				this.$nextTick(() => {
//					if(document.getElementById("frm1") && document.getElementById("frm1").contentWindow && document.getElementById("frm1").contentWindow.document) {
//						var doc = document.getElementById("frm1").contentWindow.document;
//						doc.getElementsByTagName("li").style.fontSize = "50px";
//					}
//				})
			}
		},
		watch: {
			"params.option.fontSize": {
				handler(newVal, oldVal) {
this.changeSize();
				},
				deep: true
			}
		}
	}
</script>

<style>

</style>