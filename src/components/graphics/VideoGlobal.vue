<template>
	<div class="right-component-sub-title">
		<div class="right-component-item-header">
			<span @click="isRight=!isRight">
			<i class="el-icon-caret-right" v-show="isRight" ></i>
			<i class="el-icon-caret-bottom" v-show="!isRight" ></i>
			全局</span>
		</div>
		<div v-show="!isRight" class="right-component-item-content">
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="8">
					视频地址
				</el-col>
				<el-col :span="16">
					<el-input placeholder="请输入视频url地址" v-model="options.sources[0].src" :title="options.sources[0].src"></el-input>
				</el-col>
			</el-row>
			<el-row class="right-component-item" style="padding: 8px 28px 4px;" type="flex" align='middle'>
				<el-col :span="8">
					自动播放
				</el-col>
				<el-col :span="16">
					<el-checkbox v-model="options.autoplay"></el-checkbox>
				</el-col>
			</el-row>
			<el-row class="right-component-item" style="padding: 8px 28px 4px;" type="flex" align='middle'>
				<el-col :span="8">
					循环播放
				</el-col>
				<el-col :span="16">
					<el-checkbox v-model="options.loop"></el-checkbox>
				</el-col>
			</el-row>
			<el-row class="right-component-item" style="padding: 8px 28px 4px;" type="flex" align='middle'>
				<el-col :span="8">
					控制条
				</el-col>
				<el-col :span="16">
					<el-checkbox v-model="options.controls"></el-checkbox>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
	const props = {
		options: {
			type: Object,
			default: () => {
				return {
					autoplay: true,
					loop: true,
					controls: true,
					sources: [{
						type: "video/mp4",
						src: "http://vjs.zencdn.net/v/oceans.mp4",
					}]
				}
			}
		}
	}
	export default {
		message: "边视频全局组件",
		name: "VideoGlobal",
		props,
		data() {
			return {
				isRight: true
			}
		}
	}
</script>

<style>

</style>