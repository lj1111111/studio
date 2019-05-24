<template>
	<el-tabs :stretch="true" style="background-color:#F7F8FA ; color:#2c3e50; height:calc(100%);" type="border-card" v-model="localActiveName" >
		<el-tab-pane :label="$t('SeTrackPlus.track_query')" name="track_query">
			<TrackQuery :params="params" :map="map" :height="height" ref="trackquery" @trackquery="handleTrackQuery"></TrackQuery>
		</el-tab-pane>
		<el-tab-pane :label="$t('SeTrackPlus.vehicle_query')"  name="car_query" >
			<div  class="tr-center " style="overflow-y: auto;overflow-x: hidden;" :style="heightStyle">
				<CarQuery :params="params" :map="map" @searchpositon="handleSearchPositon" ref="carquery"></CarQuery>
			</div>
		</el-tab-pane>
		
	</el-tabs>
</template>

<script>
    import { TrackModuleType} from '../js/constants.js'
    import CarQuery from './CarQuery.vue'
	import TrackQuery from './TrackQuery.vue'
	import { mapState } from 'vuex'
	import service from '../../../../api/service.js'
	import mixins from './mixins.js'
	
	const props = {
		map: {
			type: Object
		},
		params: {
			type: Object
		},
		height:{
			type:Number,
			default:0
		},
		activeName:{
			type:String,
			default:TrackModuleType.TRACK_QUERY
		}
		
	}
	export default {
		name: 'TrackQueryModule',
		message: '轨迹查询容器组件',
		props,
		mixins: [mixins],
		data() {
			return {
				localActiveName: TrackModuleType.TRACK_QUERY
			}
		},
		mounted() {
			this.localActiveName = this.activeName;
		},
		activated() {
			this.localActiveName=TrackModuleType.TRACK_QUERY;
		},
		deactivated() {
			this.$refs.trackquery.reset();
			this.$refs.carquery.reset();
		},
		beforeDestroy(){
			this.$refs.trackquery.reset();
			this.$refs.carquery.reset();
		},
		methods: {
			//释放轨迹查询
			handleSearchPositon(){
				this.$refs.trackquery.reset();
			},
			//释放车辆查询
			handleTrackQuery(){
				this.$refs.carquery.reset();
			}
		},
		computed: {
			...mapState([
				'spaceRestUrl',
				'maps'
			])
		},
		components: {
			CarQuery,
			TrackQuery
		},
		watch:{
			activeName(curval, oldval) {
				this.localActiveName = curval;
			}
		}

	};
</script>

<style  scoped>
	/*.el-tabs--border-card {
		background: #F7F8FA;
		border: 1px solid #dcdfe6;
		-webkit-box-shadow: 0 0px 0px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
		box-shadow: 0 0px 0px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
	}*/
	
	/*.el-tabs__header {
		padding: 0;
		position: relative;
		margin: 0;
	}*/
	.tr-center {
		overflow: hidden;
	}
	
	.tr-center::-webkit-scrollbar {
		width: 4px;
		height: 4px;
	}
	
	.tr-center::-webkit-scrollbar-thumb {
		border-radius: 2px;
		-webkit-box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.2);
		background: #c0c4cc;
		
	}
</style>