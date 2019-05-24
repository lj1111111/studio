<template>
	<div class="right-component-containter">
		<Tabs @tabchange="handleTabChange" :tab="tab" :is-show-data="showData">
		</Tabs>
		<div class="right-component-labelInfo ">
			<span>&nbsp;{{label}}</span> <span style="font-size: 14px;">{{version}}</span>
		</div>
		<div v-show="isActiveStyle">
			<!--全局-->
			<TitleGlobal :option="params.option"></TitleGlobal>
			<!--尺寸和位置-->
			<Location :location="location"></Location>
			<!--组件对齐-->
			<Align @opaction="handleOpAction"></Align>
		</div>

	</div>
</template>

<script>
	import ComSettingMixinBase from '../base/ComSettingMixinBase.js'
	import TitleGlobal from './TitleGlobal.vue'
	export default {
		name: 'SeTitleSetting',
		message: '通用标题组件设置',
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
				this.$emit("createstyle", obj);
			}
		},
		components: {
			TitleGlobal

		},
		watch: {
			'params.option': {
				handler(curVal, oldVal) {　
					this.createStyle();
				},
				deep: true
			}
		}
	}
</script>

<style>

</style>