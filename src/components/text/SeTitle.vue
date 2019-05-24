<template>
	<div style="position: absolute; " :id="ukey" :style="locationObject">
		<div style="position: absolute;width:100%; height: 100%;" :style="styleObject">
			{{params.option.title}}
		</div>
		<slot>
		</slot>

	</div>
</template>
<script>
	import common from '../../mixins/common.js'
	export default {
		message: '通用标题组件',
		name: 'SeTitle',
		mixins: [common],
		computed: {
			styleObject() {
				var obj = {};
				if(this.params && this.params.option) {
					var obj = {
						"position": "absolute",
						"font-family": this.params.option.fontFamily,
						"color": this.params.option.color,
						"font-size": this.params.option.fontSize + "px",
						"text-align": this.params.option.textAlign,
						"font-weight": this.params.option.fontWeight
					};
				}
				return obj;
			}
		}
	}
</script>

<style>

</style>