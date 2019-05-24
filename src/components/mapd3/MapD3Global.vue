<template>
	<div class="right-component-sub-title">
		<div class="right-component-item-header">
			<span @click="isRight=!isRight">
			<i class="el-icon-caret-right" v-show="isRight" ></i>
			<i class="el-icon-caret-bottom" v-show="!isRight" ></i>
			全局设置</span>
		</div>
		<div v-show="!isRight" class="right-component-item-content">
			<!--地图缩放-->
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="6">
					地图缩放
				</el-col>
				<el-col :span="18">
					<el-slider v-model="global.zoom" :min="1" :max="20"></el-slider>
				</el-col>
			</el-row>
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="18" :offset="6">
					<el-row :gutter="2" type="flex" align='middle'>
						<el-col :span="6">
							<el-input :value="1" :disabled="true"></el-input>
						</el-col>
						<el-col :span="12">
							<el-input-number v-model="global.zoom" :min="1" :max="20" controls-position="right"></el-input-number>
						</el-col>
						<el-col :span="6">
							<el-input :value="20" :disabled="true"></el-input>
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
					地图视角
				</el-col>
			</el-row>
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="6">
					&nbsp;&nbsp;&nbsp;&nbsp;经度
				</el-col>
				<el-col :span="18">
					<el-slider v-model="global.rotateY" :min="-180" :max="180" :step="0.01"></el-slider>
				</el-col>
			</el-row>
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="18" :offset="6">
					<el-row :gutter="2" type="flex" align='middle'>
						<el-col :span="6">
							<el-input :value="-180" :disabled="true"></el-input>
						</el-col>
						<el-col :span="12">
							<el-input-number v-model="global.rotateY" :min="-180" :max="180" :step="0.01" controls-position="right"></el-input-number>
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
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="6">
					&nbsp;&nbsp;&nbsp;&nbsp;纬度
				</el-col>
				<el-col :span="18">
					<el-slider v-model="global.rotateX" :min="-90" :max="90" :step="0.01"></el-slider>
				</el-col>
			</el-row>
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="18" :offset="6">
					<el-row :gutter="2" type="flex" align='middle'>
						<el-col :span="6">
							<el-input :value="-90" :disabled="true"></el-input>
						</el-col>
						<el-col :span="12">
							<el-input-number v-model="global.rotateX" :min="-90" :max="90" :step="0.01" controls-position="right"></el-input-number>
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
					地图颜色
				</el-col>
				<el-col :span="18">
					<ColorPicker v-model="option.geo3D.itemStyle.color"></ColorPicker>
				</el-col>
			</el-row>
			<el-row class="right-component-item" style="padding: 8px 28px 4px;" type="flex" align='middle'>
				<el-col :span="6">
					地图背景
				</el-col>
				<el-col :span="18">
					<el-checkbox v-model="global.showBg">显示</el-checkbox>
				</el-col>
			</el-row>
			<el-row class="right-component-item" type="flex" align='middle' v-show="global.showBg">
				<el-col :span="6">
					&nbsp;&nbsp;&nbsp;&nbsp;颜色
				</el-col>
				<el-col :span="18">
					<ColorPicker v-model="global.bgColor"></ColorPicker>
				</el-col>
			</el-row>
			<el-row class="right-component-item" style="padding: 8px 28px 4px;" type="flex" align='middle'>
				<el-col :span="6">
					地图边框
				</el-col>
				<el-col :span="18">
					<el-checkbox v-model="global.showBorder">显示</el-checkbox>
				</el-col>
			</el-row>
			<el-row class="right-component-item" type="flex" align='middle' v-show="global.showBorder">
				<el-col :span="6">
					&nbsp;&nbsp;&nbsp;&nbsp;宽度
				</el-col>
				<el-col :span="18">
					<el-input-number v-model="global.borderWidth" :min="0" controls-position="right"></el-input-number>
				</el-col>
			</el-row>
			<el-row class="right-component-item" type="flex" align='middle' v-show="global.showBorder">
				<el-col :span="6">
					&nbsp;&nbsp;&nbsp;&nbsp;颜色
				</el-col>
				<el-col :span="18">
					<ColorPicker v-model="global.borderColor"></ColorPicker>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
	import ColorPicker from '../base/ColorPicker.vue'
	const props = {
		global: {
			type: Object,
			default: () => {
				return {
					showBg: false,
					bgColor: '#000',
					showBorder: false,
					borderWidth: 1,
					borderColor: '#000',
					zoom: 10,
					rotateX: 40, //alpha:40,//视角旋转X轴角度
					rotateY: 0 //beta:0 //视角绕 y轴，即左右旋转的角度。
				}
			}
		},
		option:{
			type:Object,
			default:()=>{
				return {}
			}
		}
	}
	export default {
		message: "全局设置",
		name: "MapD3Global",
		props: props,
		data() {
			return {
				isRight: true
			}
		},
		computed: {
			//			inpNum: {
			//				get: function() {
			//					return this.value1;
			//
			//				},
			//				set: function(newValue) {
			//					this.value1 = newValue.replace(/[^\d]/g, '');
			//				}
			//			}
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