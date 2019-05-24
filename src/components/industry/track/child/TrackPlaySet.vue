<template>
	<div>
		<div class="right-component-item-header">
			<span @click="isRight=!isRight">
			<i class="el-icon-caret-right" v-show="isRight" ></i>
			<i class="el-icon-caret-bottom" v-show="!isRight" ></i>
			轨迹回放</span>
		</div>
		<div v-show="!isRight" class="right-component-item-content">
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="8">
					速度设置
				</el-col>
				<el-col :span="16">
					<el-select v-model="curSpeed" placeholder="请选择" style="width: 100% !important;">
						<el-option v-for="item in speeds" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-col>
			</el-row>
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="8">
					定位方式
				</el-col>
				<el-col :span="16">
					<el-select v-model="locationMode" placeholder="请选择" style="width: 100% !important;">
						<el-option v-for="item in locations" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-col>
			</el-row>
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="8">
					播放进度
				</el-col>
				<el-col :span="16">
					<el-progress :text-inside="true" :stroke-width="8" :percentage="percentage" :show-text="false" style="width: 100% !important;"></el-progress>
				</el-col>
			</el-row>
			<el-row class="right-component-item" type="flex" align='middle' justify="center">
				<el-col :span="8">
					播放控制
				</el-col>
				<el-col :span="8" style="text-align: center;">
					<img src="../images/play.png" style="width:26px;height: auto;" title="播放" class="Num-pause-btn" @click="play">
					<!--<img src="../../../../assets/img/pause.png" title="暂停" class="Num-pause-btn" v-else @click="pause">-->
				</el-col>
				<el-col :span="8" style="text-align: center;">
					<!--<img src="../../../../assets/img/stop.png" title="停止" class="Num-pause-btn" v-if="SelectOrstart">-->
					<img src="../images/stop.png" title="停止" style="width:32px;height: auto;" class="Num-pause-btn" @click="stop">
				</el-col>
			</el-row>

		</div>
	</div>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		message: "轨迹播放控制组件",
		name: "TrackPlaySet",
		data() {
			return {
				isRight: true,
				curSpeed: 500,
				speeds: [{
						value: 3000,
						label: '0.5X'
					},
					{
						value: 2500,
						label: '0.75X'
					},
					{
						value: 2000,
						label: '1X'
					},
					{
						value: 1500,
						label: '1.25X'
					},
					{
						value: 1000,
						label: '1.5X'
					},
					{
						value: 500,
						label: '2X'
					}
				],
				locationMode: 2,
				locations: [{
						value: 0,
						label: '居中'
					},
					{
						value: 1,
						label: '聚焦'
					},
					{
						value: 2,
						label: '不聚焦'
					}
				],
				percentage: 0,
				PauseOrStop: true,
				SelectOrstart: true,
			}
		},
		mounted() {
			this.bus.$on("play-progress", this.handlePlayProgress);
		},
		methods: {
			//播放轨迹
			play() {
				var data = {
					speed: this.curSpeed, //播放速度
					locationMode: this.locationMode //定位方式
				}
				this.bus.$emit("play", data);
			},
			//暂停
			pause() {

			},
			//停止
			stop() {
				this.bus.$emit("stop");
			},
			//当前轨迹播放进度
			handleplayStatus(value) {
				this.percentage = value;
			},
			//分发播放轨迹参数事件
			firePlayTrackConfigEvent() {
				this.bus.$emit("play-track-conf", {
					speed: this.curSpeed, //播放速度
					locationMode: this.locationMode //定位方式});
				});
			}
		},
		computed: {
			...mapState([
				'bus'
			])
		},
		watch: {
			locationMode: 'firePlayTrackConfigEvent',
			curSpeed: 'firePlayTrackConfigEvent'
		}
	}
</script>

<style>
	.el-progress-bar__outer {
		height: 6px;
		border-radius: 100px;
		background-color: #bec4c3;
		overflow: hidden;
		position: relative;
		vertical-align: middle;
	}
	
	.Num-pause-btn {
		cursor: pointer;
		width: 30px;
		height: 30px;
	}
</style>