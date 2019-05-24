<template>
	<div class="right-component-containter">
		<Tabs @tabchange="handleTabChange" :tab="tab">
		</Tabs>
		<div class="right-component-labelInfo ">
			<span>&nbsp;{{label}}</span> <span style="font-size: 14px;">{{version}}</span>
		</div>
		<div v-show="isActiveStyle">
			<!--全局-->
			<MapGlobal :global="params.global" :map-init="params.mapInit"></MapGlobal>
			<!--公共地图-->
			<PublicMap :public-map="params.publicMap"></PublicMap>
			<!--地图交互-->
			<MapInteract :map-interact="params.mapInteract"></MapInteract>
			<!--尺寸和位置-->
			<Location :location="location"></Location>
			<!--组件对齐-->
			<Align @opaction="handleOpAction"></Align>
		</div>
		<div v-show="isActiveData">
			<VectorMap :data='params.data'></VectorMap>
		</div>
	</div>
</template>

<script>
	import ComSettingMixinBase from '../base/ComSettingMixinBase.js'
	import MapGlobal from './MapGlobal.vue'
	import PublicMap from './PublicMap.vue'
	import VectorMap from './VectorMap.vue'
	import MapInteract from './MapInteract.vue'
	export default {
		name: 'SeMapSetting',
		message: '地图组件设置',
		mixins: [ComSettingMixinBase],
		components: {
			MapGlobal,
			PublicMap,
			VectorMap,
			MapInteract
		},
		mounted() {
			this.createStyle();
		},
		methods: {
			createStyle() {
				var obj = {
					"position": "absolute"
				};
				if(this.params.global.showBg) {
					obj["background-color"] = this.params.global.bgColor;
				}
				if(this.params.global.showBorder) {
					obj["border"] = this.params.global.borderWidth + "px solid " + this.params.global.borderColor;
				}
				this.$emit("createstyle", obj);
			}
		},
		computed:{
			
		},
		watch: {
			'params.global': {
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