<template>
	<div class="right-component-containter">
		<Tabs @tabchange="handleTabChange" :tab="tab">
		</Tabs>
		<div class="right-component-labelInfo">
			<span>&nbsp;{{label}}</span> <span style="font-size: 14px;">{{version}}</span>
		</div>
		<div v-if="isActiveStyle">
			<!--地图全局-->
			<MapGlobal :mapInit="params.option.mapInit" :panelStyle="params.option.panelStyle"></MapGlobal>
			<!--瓦片地图-->
			<TileMap :publicMap="params.option.publicMap"></TileMap>
			<!--导航菜单-->
			<!--<ElNavMenuStyle :navMenuStyle="params.option.navMenuStyle"></ElNavMenuStyle>-->
		    <!--布局比例设置-->
			<LayoutScale :layout="params.option.layout"></LayoutScale>
			<!--尺寸和位置-->
			<Location :location="location"></Location>
			<!--组件对齐-->
			<Align @opaction="handleOpAction"></Align>
		</div>
		<TrackData v-if="isActiveData" :label="label" :data-config="params.dataConfig" ></TrackData>
	</div>
</template>

<script>
	import ComSettingMixinBase from '../../base/ComSettingMixinBase.js'
	import DataSourceType from '../../../constants/DataSourceType.js'
	import MapGlobal from '../../compart/MapGlobal.vue'
	import ElNavMenuStyle from '../../compart/ElNavMenuStyle.vue'
	import TileMap from '../../compart/TileMap.vue'
	import TrackData from './child/TrackData.vue'
	import LayoutScale from './child/LayoutScale.vue'
	export default {
		name: 'SeTrackSetting',
		message: '轨迹分析设置',
		mixins: [ComSettingMixinBase],
		data(){
			var temp=DataSourceType.type;
			temp.forEach(item=>{
				if(item.value==DataSourceType.DS_DATABASE)
				{
					item.visible=true;
				}
				else
				{
				    item.visible=false;	
				}
			})
			return {
				dataSourceType:temp
			}
		},
		components:{
			MapGlobal,
			ElNavMenuStyle,
			TileMap,
			TrackData,
			LayoutScale
		}
		
	}
</script>

<style>

</style>