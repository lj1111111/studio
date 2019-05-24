<template>
	<div>
		<el-row class="track-split-item split-item" style="background:#FFF;cursor:pointer;" type="flex" align='middle' justify="center" @click.native="isRight=!isRight">
			<el-col :span="10">
				<span>{{$t('TrackPlay.track_playback')}}</span>
			</el-col>
			<el-col :span="14" style="text-align: right;">
				<i class="el-icon-arrow-right" v-show="isRight"></i>
				<i class="el-icon-arrow-down" v-show="!isRight"></i>
			</el-col>
		</el-row>
		<div v-show="!isRight" class="right-component-item-content item-list" style="background: #FFF;">
			<el-row class="right-component-item track-split-item" type="flex" align='middle'>
				<el-col :span="8">
					{{$t('TrackPlay.speed_setting')}}
				</el-col>
				<el-col :span="16">
					<el-select v-model="playTrackConfig.speed" :placeholder="$t('Common.select')" style="width: 100% !important;">
						<el-option v-for="item in speeds" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-col>
			</el-row>
			<el-row class="right-component-item track-split-item" type="flex" align='middle'>
				<el-col :span="8">
					{{$t('TrackPlay.location_mode')}}
				</el-col>
				<el-col :span="16">
					<el-select v-model="playTrackConfig.locationMode" :placeholder="$t('Common.select')" style="width: 100% !important;">
						<el-option v-for="item in locations" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
	const props = {
		playTrackConfig: {
			type: Object,
			default: () => {
				return {
					speed: 300, //播放速度
					locationMode: 2 //定位方式
				}
			}
		}
	}
	export default {
		message: "轨迹播放控制组件",
		name: "TrackPlaySet",
		props,
		data() {
			return {
				isRight: false,
				speeds: [{
						value: 2000,
						label: '0.5X'
					},
					{
						value: 1500,
						label: '0.75X'
					},
					{
						value: 1000,
						label: '1.0X'
					},
					{
						value: 500,
						label: '1.5X'
					},
					{
						value: 300,
						label: '2X'
					}
				]
				//				,
				//				locations: [{
				//						value: 0,
				//						label: '居中'
				//					},
				//					{
				//						value: 1,
				//						label: '聚焦'
				//					},
				//					{
				//						value: 2,
				//						label: '不聚焦'
				//					}
				//				]
			}
		},
		mounted() {
			this.$nextTick(() => {
				this.$emit("expand", this.isRight);
			})
		},
		methods: {

		},
		computed: {
			locations() {
				var locations = [
//				   {
//						value: 0,
//						label: '居中'
//					},
//					{
//						value: 1,
//						label: '聚焦'
//					},
					{
						value: 2,
						label: '不聚焦'
					}
				];
				locations.forEach(item=>{
					item.label=this.$t("location_"+item.value);
				})
				return locations;
			}
		},
		watch: {
			isRight(newval) {
				this.$emit("expand", newval);
			}
		}
	}
</script>

<style>

</style>