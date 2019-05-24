<template>
	<div class="right-component-sub-title">
		<div class="right-component-item-header">
			<span @click="isRight=!isRight">
			<i class="el-icon-caret-right" v-show="isRight" ></i>
			<i class="el-icon-caret-bottom" v-show="!isRight" ></i>
			地图设置</span>
		</div>
		<div v-show="!isRight" class="right-component-item-content">
			<!--地图缩放-->
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="6">
					地图缩放
				</el-col>
				<el-col :span="18">
					<el-slider v-model="mapInit.zoom" :min="minZoom" :max="maxZoom"></el-slider>
				</el-col>
			</el-row>
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="18" :offset="6">
					<el-row :gutter="2" type="flex" align='middle'>
						<el-col :span="6">
							<el-input :value="minZoom" :disabled="true"></el-input>
						</el-col>
						<el-col :span="12">
							<el-input-number v-model="mapInit.zoom" :min="minZoom" :max="maxZoom" controls-position="right"></el-input-number>
						</el-col>
						<el-col :span="6">
							<el-input :value="maxZoom" :disabled="true"></el-input>
						</el-col>
					</el-row>
				</el-col>
			</el-row>
			<el-row class="right-component-item " type="flex" align='middle'>
				<el-col :span="18" :offset="6">
					<el-row :gutter="2" type="flex" align='middle' class="ft">
						<el-col :span="6">
							<span>最小值</span>
						</el-col>
						<el-col :span="6" :offset="12">
							<span>最大值</span>
						</el-col>
					</el-row>
				</el-col>
			</el-row>
			<!--地图中心-->
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="6">
					地图中心
				</el-col>
			</el-row>
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="6">
					&nbsp;&nbsp;&nbsp;&nbsp;经度
				</el-col>
				<el-col :span="18">
					<el-slider v-model="mapInit.center[0]" :min="-180" :max="180" :step="0.01"></el-slider>
				</el-col>
			</el-row>
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="18" :offset="6">
					<el-row :gutter="2" type="flex" align='middle'>
						<el-col :span="6">
							<el-input :value="-180" :disabled="true"></el-input>
						</el-col>
						<el-col :span="12">
							<el-input-number v-model="mapInit.center[0]" :min="-180" :max="180" :step="0.01" controls-position="right"></el-input-number>
						</el-col>
						<el-col :span="6">
							<el-input :value="180" :disabled="true"></el-input>
						</el-col>
					</el-row>
				</el-col>
			</el-row>
			<el-row class="right-component-item " type="flex" align='middle'>
				<el-col :span="18" :offset="6">
					<el-row :gutter="2" type="flex" align='middle' class="ft">
						<el-col :span="6">
							<span>最小值</span>
						</el-col>
						<el-col :span="6" :offset="12">
							<span>最大值</span>
						</el-col>
					</el-row>
				</el-col>
			</el-row>
			<!--纬度-->
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="6">
					&nbsp;&nbsp;&nbsp;&nbsp;纬度
				</el-col>
				<el-col :span="18">
					<el-slider v-model="mapInit.center[1]" :min="-90" :max="90" :step="0.01"></el-slider>
				</el-col>
			</el-row>
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="18" :offset="6">
					<el-row :gutter="2" type="flex" align='middle'>
						<el-col :span="6">
							<el-input :value="-90" :disabled="true"></el-input>
						</el-col>
						<el-col :span="12">
							<el-input-number v-model="mapInit.center[1]" :min="-90" :max="90" :step="0.01" controls-position="right"></el-input-number>
						</el-col>
						<el-col :span="6">
							<el-input :value="90" :disabled="true"></el-input>
						</el-col>
					</el-row>
				</el-col>
			</el-row>
			<el-row class="right-component-item " type="flex" align='middle'>
				<el-col :span="18" :offset="6">
					<el-row :gutter="2" type="flex" align='middle' class="ft">
						<el-col :span="6">
							<span>最小值</span>
						</el-col>
						<el-col :span="6" :offset="12">
							<span>最大值</span>
						</el-col>
					</el-row>
				</el-col>
			</el-row>
			<el-row class="right-component-item" style="padding: 8px 28px 4px;" type="flex" align='middle'>
				<el-col :span="6">
					地图背景
				</el-col>
				<el-col :span="18">
					<el-checkbox v-model="panelStyle.showBg">显示</el-checkbox>
				</el-col>
			</el-row>
			<el-row class="right-component-item" type="flex" align='middle' v-show="panelStyle.showBg">
				<el-col :span="6">
					&nbsp;&nbsp;&nbsp;&nbsp;颜色
				</el-col>
				<el-col :span="18">
					<ColorPicker v-model="panelStyle.bgColor"></ColorPicker>
				</el-col>
			</el-row>
			<el-row class="right-component-item" style="padding: 8px 28px 4px;" type="flex" align='middle'>
				<el-col :span="6">
					地图边框
				</el-col>
				<el-col :span="18">
					<el-checkbox v-model="panelStyle.showBorder">显示</el-checkbox>
				</el-col>
			</el-row>
			<el-row class="right-component-item" type="flex" align='middle' v-show="panelStyle.showBorder">
				<el-col :span="6">
					&nbsp;&nbsp;&nbsp;&nbsp;宽度
				</el-col>
				<el-col :span="18">
					<el-input-number v-model="panelStyle.borderWidth" :min="0" controls-position="right"></el-input-number>
				</el-col>
			</el-row>
			<el-row class="right-component-item" type="flex" align='middle' v-show="panelStyle.showBorder">
				<el-col :span="6">
					&nbsp;&nbsp;&nbsp;&nbsp;颜色
				</el-col>
				<el-col :span="18">
					<ColorPicker v-model="panelStyle.borderColor"></ColorPicker>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
	import ColorPicker from '../base/ColorPicker.vue'
	const props = {
		panelStyle: {
			type: Object,
			default: () => {
				return {
					showBg: false,
					bgColor: 'rgba(0,0,0,1)',
					showBorder: false,
					borderWidth: 1,
					borderColor: 'rgba(0,0,0,1)'
				}
			}
		},
		mapInit: {
			type: Object,
			default: () => {
				return {
					zoom: 10,
					center: [121, 31]
				}
			}
		},
		maxZoom:{
			type:Number,
			default:18
		},
		minZoom:{
			type:Number,
			default:0
		}

	}
	export default {
		message: "二维地图全局设置",
		name: "MapGlobal",
		props: props,
		data() {
			return {
				isRight: true
			}
		},
		computed: {

		},
		components: {
			ColorPicker
		},
		watch: {

		}
	}
</script>

<style scoped>
	.ft {
		color: #c0c4cc;
		text-align: center;
	}
	
	.right-component-item {
		font-size: 14px;
		padding: 4px 8px 4px 24px;
	}
</style>