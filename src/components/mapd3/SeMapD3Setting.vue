<template>
	<div class="right-component-containter">
		<div v-if="isParent">
			<Tabs @tabchange="handleTabChange" :tab="tab">
			</Tabs>
			<div class="right-component-labelInfo ">
				<span>&nbsp;{{label}}</span> <span style="font-size: 14px;">{{version}}</span>
			</div>

			<div v-if="isActiveStyle">
				<!--子组件管理-->
				<MapD3Children :children="params.children" @childconfig="handleChildConfig"></MapD3Children>
				<!--全局-->
				<MapD3Global :global="params.global" :option="params.option"></MapD3Global>
				<!--尺寸和位置-->
				<Location :location="location"></Location>
				<!--组件对齐-->
			    <Align @opaction="handleOpAction"></Align>
			</div>
			<div v-if="isActiveData">
				<!--子组件管理-->
				<MapD3Children :children="params.children" @childconfig="handleChildConfig"></MapD3Children>
			</div>
		</div>
		<!--动态切换子组件-->
		<component v-else="!isParent" :is="currentView" :config="currentChildConfig" :tab="currentChildTab" @back="handleBack">
		</component>
	</div>

</template>

<script>
	import ComSettingMixinBase from '../base/ComSettingMixinBase.js'
	import TabType from '../../constants/TabType.js'
	import { makeCode } from '../../utils/util.js'
	import MapD3Children from './MapD3Children.vue'
	import MapD3Global from './MapD3Global.vue'
	import BarD3Setting from './BarD3Setting.vue'
	import LinesD3Setting from './LinesD3Setting.vue'
	import ScatterD3Setting from './ScatterD3Setting.vue'
	import SubComponentsUtil from '../../utils/SubComponentsUtil.js'

	export default {
		name: 'SeMapD3Setting',
		message: '3D地图组件设置',
		mixins: [ComSettingMixinBase],
		data() {
			return {
				code: "",
				isParent: true,
				currentView: '',
				currentChildConfig: null
				//				,
				//              currentChildTab:""
			}
		},
		mounted() {
			this.createStyle();
		},
		components: {
			MapD3Global,
			MapD3Children,
			BarD3Setting,
			LinesD3Setting,
			ScatterD3Setting
		},
		computed: {
			currentChildTab: {
				get() {
					return this.tab;
				}
				//				,
				//				set(value){
				//					this.tab=value;
				//				}
			}
		},
		methods: {
			init() {
				this.code = "";
				this.isParent = true;
				this.currentView = "";
				this.currentChildConfig = null;
				//				this.currentChildTab="";
			},
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
			},
			handleChildConfig(data) {
				if(!data) return;
				var index = data.index;
				var tab = data.tab;
				var len = this.params.children ? this.params.children.length : 0;
				var child = null;
				if(index >= 0 && index < len) {
					child = this.params.children[index];
				}
				if(child) {
					//	SE_SUB_SCATTER3D,
					//	SE_SUB_BAR3D,
					//	SE_SUB_LINES3D
					var name = child.name;
					//					this.currentChildTab = tab;
					switch(name) {
						case SubComponentsUtil.SE_SUB_BAR3D: //3D柱状图
							{
								this.isParent = false,
								this.currentView = 'BarD3Setting';
								this.currentChildConfig = child;
								break;
							}
						case SubComponentsUtil.SE_SUB_SCATTER3D: //3D气泡图
							{
								this.isParent = false,
								this.currentView = 'ScatterD3Setting';
								this.currentChildConfig = child;
								break;
							}
						case SubComponentsUtil.SE_SUB_LINES3D: //3D飞线图
							{
								this.isParent = false,
								this.currentView = 'LinesD3Setting';
								this.currentChildConfig = child;
								break;
							}
					}
				}
			},
			//子组件返回
			handleBack() {
				this.init();
			}
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