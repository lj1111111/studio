<!--<template>
	<div>
		<div class="right-component-item-header">
			<span @click="isRight=!isRight">
			<i class="el-icon-caret-right" v-show="isRight" ></i>
			<i class="el-icon-caret-bottom" v-show="!isRight" ></i>
			网格布局</span>
		</div>
		<div v-show="!isRight" class="right-component-item-content">
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="8">
					左侧列数
				</el-col>
				<el-col :span="16">
					<el-input-number v-model="location.width" :min="0" controls-position="right"></el-input-number>
				</el-col>
			</el-row>
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="8">
					中间列数
				</el-col>
				<el-col :span="16">
					<el-input-number v-model="location.height" :min="0" controls-position="right"></el-input-number>
				</el-col>
			</el-row>
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="8">
					右侧列数
				</el-col>
				<el-col :span="16">
					<el-input-number v-model="location.left"  controls-position="right"></el-input-number>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
	const props = {
		location:{
			type:Object,
			default:()=>{
				return {
					left:0,
					top:0,
					width:0,
					height:0
				}
			}
		}
	}
	export default {
		message: "位置和尺寸组件",
		name: "Location",
		props: props,
		data() {
			return {
//              selfLocation:this.location,
				isRight: true
			}
		},
		mounted() {
//			this.initValue();
		},
		methods: {
//			sendChange() {
//				this.$emit("loctionchange", {
//					left: this.tLeft,
//					top: this.tTop,
//					width: this.tWidth,
//					height: this.tHeight
//				})
//			},
//			initValue() {
//				this.tLeft = this.left;
//				this.tTop = this.top;
//				this.tWidth = this.width;
//				this.tHeight = this.height;
//			}
		},
		watch: {
//			"location":{
//				handler(newValue, oldValue) {　　
//					alert("B");　　　　
//					this.selflocation= newValue;
//				},
//				deep: true
//			},
//			selfLocation:{
//				handler(newValue, oldValue) {　　　　
//					alert("AAA");　　
//					this.$emit("loctionchange",newValue);
//				},
//				deep: true
//			}
			
		}
	}
</script>

<style>
	.el-input-number {
		width: 100%
	}
</style>-->