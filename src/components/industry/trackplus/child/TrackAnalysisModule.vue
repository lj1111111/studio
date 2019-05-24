<template>
	<el-tabs :stretch="true" style="background-color:#F7F8FA ; color:#2c3e50; height:calc(100%);" type="border-card" v-model="localActiveName" @tab-click="handleClick">
		<el-tab-pane :label="$t('SeTrackPlus.heatmap')" name="track_heat">
		    <!--<div style="overflow: hidden;">
				<div :style="heightStyle" class="tr-center">
					<TrackHeat :params="params" :map="map" @trackheat="handleTrackHeat" ref="trackheat"></TrackHeat>
				</div>
			</div>-->
			<TrackHeat :params="params" :map-obj="map" @trackheat="handleTrackHeat" :height="height" ref="trackheat"></TrackHeat>
		</el-tab-pane>
		<el-tab-pane :label="$t('SeTrackPlus.track_analysis')" name="track_analysis">
			<track-analysis :params="params" :map="map" :height="height" @trackanalysis="handleTrackAnalysis" ref="trackanalysis" ></track-analysis>
		</el-tab-pane>
		
	</el-tabs>
</template>

<script>
	import TrackHeat from './TrackHeat.vue'
	import TrackAnalysis from './TrackAnalysis.vue'
	import { TrackModuleType } from '../js/constants.js'
	const props = {
		map: {
			type: Object
		},
		params: {
			type: Object
		},
		activeName: {
			type: String,
			default: TrackModuleType.TRACK_HEAT
		},
		height: {
			type: Number,
			default: 0
		}
	}
	export default {
		name: 'TrackAnalysisModule',
		message: '轨迹分析容器组件',
		props,
		data() {
			return {
				localActiveName: TrackModuleType.TRACK_HEAT
			}
		},
		mounted() {
			this.localActiveName = this.activeName;
		},
		activated() {
			this.localActiveName = TrackModuleType.TRACK_HEAT;
		},
		beforeDestroy(){
			this.$refs.trackheat.reset();
			this.$refs.trackanalysis.reset();
			//this.map=null;
		},
		deactivated() {
			this.$refs.trackheat.reset();
			this.$refs.trackanalysis.reset();
		},
		components: {
			TrackHeat,
			TrackAnalysis
		},
		methods:{
			handleTrackAnalysis(){
			   //this.$refs.trackheat.reset();
			   this.$refs.trackheat.hideHeatLayer();
			},
			handleTrackHeat(){
				this.$refs.trackanalysis.reset();
			},
			handleClick(tab, event){
				if(tab.name=='track_heat')
				{
					 this.$refs.trackheat && this.$refs.trackheat.showHeatLayer();
					 this.$refs.trackanalysis.reset();
				}
				else
				{
					if(this.$refs.trackanalysis && !this.$refs.trackanalysis.isQueryDevice){
						 this.$refs.trackheat && this.$refs.trackheat.hideHeatLayer();
					}
					this.$refs.trackheat.stop();
				}
			}
		},
		computed: {
			heightStyle() {
				return {
					maxHeight: this.height - 52 + "px",
					overflow: 'auto'
				}
			}
		},
		watch: {
			activeName(curval, oldval) {
				this.localActiveName = curval;
				
			}
		}
	}
</script>

<style>

</style>