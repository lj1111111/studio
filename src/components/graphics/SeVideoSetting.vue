<template>
	<div class="right-component-containter">
		<Tabs @tabchange="handleTabChange" :tab="tab" :is-show-data="showData">
		</Tabs>
		<div class="right-component-labelInfo ">
			<span>&nbsp;{{label}}</span> <span style="font-size: 14px;">{{version}}</span>
		</div>
		<div v-show="isActiveStyle">
			<!--全局组件-->
			<VideoGlobal :options="params.option"></VideoGlobal>
			<!--尺寸和位置-->
			<Location :location="location"></Location>
			<!--组件对齐-->
			<Align @opaction="handleOpAction"></Align>

		</div>

	</div>
</template>

<script>
	import ComSettingMixinBase from '../base/ComSettingMixinBase.js'
	import VideoGlobal from './VideoGlobal.vue'
	export default {
		name: 'SeVideoSetting',
		message: '视频组件设置',
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

			}
		},
		components: {
			VideoGlobal
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