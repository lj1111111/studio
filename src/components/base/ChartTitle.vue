<template>
	<div class="right-component-sub-title">
		<div class="right-component-item-header">
			<span @click="isRight=!isRight">
			<i class="el-icon-caret-right" v-show="isRight" ></i>
			<i class="el-icon-caret-bottom" v-show="!isRight" ></i>
			标题</span>
			<el-checkbox style="float: right" v-model="title.show">显示</el-checkbox>
		</div>
		<div v-show="!isRight" class="right-component-item-content">
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="8">
					标题名
				</el-col>
				<el-col :span="16">
					<el-input placeholder="请输入内容" v-model="title.text"></el-input>
				</el-col>
			</el-row>
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="8">
					字号
				</el-col>
				<el-col :span="16">
					<el-input-number v-model="title.textStyle.fontSize"  controls-position="right"></el-input-number>
				</el-col>
			</el-row>
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="8">
					颜色
				</el-col>
				<el-col :span="16">
					<ColorPicker v-model="title.textStyle.color"></ColorPicker>
				</el-col>
			</el-row>
			<el-row class="right-component-item" style="padding: 8px 28px 8px;" type="flex" align='middle'>
				<el-col :span="8">
					水平位置
				</el-col>
				<el-col :span="16">
					<el-radio v-model='title.x' label="left">左</el-radio>
					<el-radio v-model='title.x' label="center">中</el-radio>
					<el-radio v-model='title.x' label="right">右</el-radio>
				</el-col>
			</el-row>
			<el-row class="right-component-item" style="padding: 8px 28px 4px;" type="flex" align='middle'>
				<el-col :span="8">
					垂直位置
				</el-col>
				<el-col :span="16">
					<el-radio v-model='title.y' label="top">上</el-radio>
					<el-radio v-model='title.y' label="center">中</el-radio>
					<el-radio v-model='title.y' label="bottom">下</el-radio>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
	//https://www.cnblogs.com/xxcanghai/p/6124699.html
	//参数
	const props = {
		title: {
			type: Object,
			default: () => {
				return {
					show: true,
					text: "",
					textStyle: {
						fontSize: 18,
						color: '#000'
					},
					x:'left',//水平位置'center' | 'left' | 'right' 
					y:'top'  //垂直位置'top' | 'bottom' | 'center' 
				}
			}
		}
		//		show: {
		//			type: Boolean,
		//			default: true
		//		},
		//		text: {
		//			type: String,
		//			default: ''
		//		},
		//		textStyle: {
		//			type: Object,
		//			default: () => {
		//				return {
		//					fontSize: 18,
		//					color: '#000'
		//				}
		//			}
		//		}
	}
	import ColorPicker from './ColorPicker.vue'
	export default {
		message: "图表组件标题",
		name: "ChartTitle",
		props: props,
		data() {
			return {
				isRight: true
			}
		},
		components: {
			ColorPicker
		},
		watch: {
			title: {
				handler(newval, oldval) {
//                  console.log(newval);
				},
				deep: true
			}
		}
	}
</script>

<style>

</style>