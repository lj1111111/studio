<template>
	<div class="right-component-containter">
		<Tabs @tabchange="handleTabChange" :tab="tab" :is-show-data="showData">
		</Tabs>
		<div class="right-component-labelInfo ">
			<span>&nbsp;{{label}}</span> <span style="font-size: 14px;">{{version}}</span>
		</div>
		<div v-show="isActiveStyle">
			<!--背景全局-->
			<BgGlobal :background="params.background"></BgGlobal>
			<!--圆角-->
			<Radius :border-radius="params.borderRadius"></Radius>
			<!--尺寸和位置-->
			<Location :location="location"></Location>
			<!--组件对齐-->
			<Align @opaction="handleOpAction"></Align>
		</div>

	</div>
</template>

<script>
	import ComSettingMixinBase from '../base/ComSettingMixinBase.js'
	import BgGlobal from './BgGlobal.vue'
	import Radius from './Radius.vue'
	export default {
		name: 'SeBackgroundSetting',
		message: '自定义背景组件设置',
		mixins: [ComSettingMixinBase],
		data() {
			return {
				showData: false
			}
		},
		mounted() {
			this.createStyle();
		},
		methods: {
			createStyle() {
				var sBorderRadius = this.params.borderRadius.borderTopLeftRadius + "px " + this.params.borderRadius.borderTopRightRadius + "px " + this.params.borderRadius.borderBottomRightRadius + "px " + this.params.borderRadius.borderBottomLeftRadius + "px";
				var base64 = "";
				if(this.params.background.showImage) {
					if(this.params.background.bgImage) {
						base64 = "url(" + this.params.background.bgImage + ")";
					}
				}
				var obj = {
					"position": "absolute",
					"background-image": base64,
					"background-repeat": "no-repeat",
					"background-position": "center",
					"background-size": "100% 100%",
					"background-color": this.params.background.bgColor,
					"border-radius": sBorderRadius
				};
				this.$emit("createstyle", obj);
			}
		},
		components: {
			BgGlobal,
			Radius
		},
		watch: {
			"params": {
				handler(newVal, oldVal) {
					this.createStyle();
				},
				deep: true
			},
			"location": {
				handler(newVal, oldVal) {
					this.createStyle();
				},
				deep: true
			}
		}
	}
</script>

<style>

</style>