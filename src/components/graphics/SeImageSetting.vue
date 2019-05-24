<template>
	<div class="right-component-containter">
		<Tabs @tabchange="handleTabChange" :tab="tab" :is-show-data="showData">
		</Tabs>
		<div class="right-component-labelInfo ">
			<span>&nbsp;{{label}}</span> <span style="font-size: 14px;">{{version}}</span>
		</div>
		<div v-show="isActiveStyle">
			<!--图片全局-->
			<ImgGlobal :source="params.source"></ImgGlobal>
			<!--尺寸和位置-->
			<Location :location="location"></Location>
			<!--组件对齐-->
			<Align @opaction="handleOpAction"></Align>

		</div>

	</div>
</template>

<script>
	import ComSettingMixinBase from '../base/ComSettingMixinBase.js'
	import ImgGlobal from './ImgGlobal.vue'
	export default {
		name: 'SeBorderSetting',
		message: '单张图片组件设置',
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
				var obj = {
					"position": "absolute",
					"display": "block",
					"background-size":"100% 100%",
					"background-image":this.params.source.isLocal?"url("+this.params.source.localSrc+")":"url("+this.params.source.remoteSrc+")"
				};
				this.$emit("createstyle", obj);
			}
		},
		components: {
			ImgGlobal
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
	.a{
		
	}

</style>