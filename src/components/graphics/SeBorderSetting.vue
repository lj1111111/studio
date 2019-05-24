<template>
	<div class="right-component-containter">
		<Tabs @tabchange="handleTabChange" :tab="tab" :is-show-data="showData">
		</Tabs>
		<div class="right-component-labelInfo ">
			<span>&nbsp;{{label}}</span> <span style="font-size: 14px;">{{version}}</span>
		</div>
		<div v-show="isActiveStyle">
			<!--边框全局-->
			<BorderGlobal :border="params.border"></BorderGlobal>
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
	import BorderGlobal from './BorderGlobal.vue'
	import Radius from './Radius.vue'
	export default {
		name: 'SeBorderSetting',
		message: '边框组件设置',
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
				var obj = {
					"box-sizing": "border-box",
					"position": "absolute",
					"border": this.params.border.borderWidth + "px " + this.params.border.borderStyle + " " + this.params.border.borderColor,
					"border-radius": sBorderRadius
				};
				this.$emit("createstyle", obj);
			}
		},
		components: {
			BorderGlobal,
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