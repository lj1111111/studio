<template>
	<div class="right-component-sub-title">
		<div class="right-component-item-header">
			<span @click="isRight=!isRight">
			<i class="el-icon-caret-right" v-show="isRight" ></i>
			<i class="el-icon-caret-bottom" v-show="!isRight" ></i>
			地图交互</span>
		</div>
		<div v-show="!isRight" class="right-component-item-content">
			<!--<el-row class="right-component-item" style="padding: 8px 28px 4px;" type="flex" align='middle'>
				<el-col :span="8">
					地图缩放
				</el-col>
				<el-col :span="16">
					<el-checkbox v-model="mapInteract.showZoom">显示</el-checkbox>
				</el-col>
			</el-row>-->
			<!--先屏蔽-->
			<!--<el-row class="right-component-item" style="padding: 8px 28px 4px;" type="flex" align='middle'>
				<el-col :span="8">
					矢量图层
				</el-col>
				<el-col :span="16">
					<el-checkbox v-model="mapInteract.showLayers">显示</el-checkbox>
				</el-col>
			</el-row>-->
			<el-row class="right-component-item" style="padding: 8px 28px 4px;" type="flex" align='middle'>
				<el-col :span="8">
					影眼图
				</el-col>
				<el-col :span="16">
					<el-checkbox v-model="mapInteract.showMiniMap">显示</el-checkbox>
				</el-col>
			</el-row>
			<!--先屏蔽-->
			<!--<el-row class="right-component-item" style="padding: 8px 28px 4px;" type="flex" align='middle'>
				<el-col :span="8">
					工具条
				</el-col>
				<el-col :span="16">
					<el-checkbox v-model="mapInteract.showToolBar">显示</el-checkbox>
				</el-col>
			</el-row>-->
			<el-row class="right-component-item" style="padding: 8px 28px 4px;" type="flex" align='middle'>
				<el-col :span="8">
					地图信息
				</el-col>
				<el-col :span="16">
					<el-checkbox v-model="mapInteract.showMapInfo">显示</el-checkbox>
				</el-col>
			</el-row>
			
		</div>
	</div>
</template>

<script>
	const props = {
		mapInteract: {
			type: Object,
			default: () => {
				return {
					showZoom: false,
					showToolBar: false,
					showMapInfo: false,
					showLayers: false,
					showMiniMap:false
				}
			}
		}
	}
	export default {
		message: "地图交互",
		name: "MapInteract",
		props: props,
		data() {
			return {
				isRight: true
			}
		}
	}
</script>

<style>

</style>