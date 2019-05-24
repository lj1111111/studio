<template>
	<div class="right-component-sub-title">
		<div class="right-component-item-header">
			<span @click="isRight=!isRight">
			<i class="el-icon-caret-right" v-show="isRight" ></i>
			<i class="el-icon-caret-bottom" v-show="!isRight" ></i>
			数据系列</span>
			<span style="float: right;color:#409EFF; cursor: pointer;font-size: 14px; " @click="addSeries"><i class="custom-iconfont icon-add-2"  style="font-weight:bolder;font-size: 14px;"></i><span style="padding-left:10px; ">添加</span></span>
		</div>
		<div v-show="!isRight" class="right-component-item-content">
			<div v-for="(item,index) in seriesData[0].data" :key="index">
				<el-row class="right-component-item" type="flex" align='middle' style="padding: 8px 28px 4px;">
					<el-col :span="8">
						系列{{index+1}}
					</el-col>
					<el-col :span="16">
						<span @click="deleteSerie(index)" style="color:#409EFF; cursor: pointer;"><i class="el-icon-delete" style="font-size: 14px;">&nbsp;删除</i></span>
					</el-col>
				</el-row>
				<el-row class="right-component-item" type="flex" align='middle'>
					<el-col :span="8">
						&nbsp;&nbsp;&nbsp;&nbsp;名称
					</el-col>
					<el-col :span="16">
						<el-input v-model="item.name" placeholder="请输入内容"></el-input>
					</el-col>
				</el-row>
				<el-row class="right-component-item" type="flex" align='middle'>
					<el-col :span="8">
						&nbsp;&nbsp;&nbsp;&nbsp;颜色
					</el-col>
					<el-col :span="16">
						<ColorPicker v-model="item.itemStyle.normal.color"></ColorPicker>
					</el-col>
				</el-row>
			</div>
		</div>
	</div>
</template>

<script>
	import ColorPicker from './ColorPicker.vue'
	import ColorsUtils from '../../utils/ColorsUtils.js'
	const props = {
		seriesData: {
			type: Array,
			default: () => {
				return []
			}
		}
	}
	export default {
		message: "饼图数据系列",
		name: "ChartPieSeries",
		props: props,
		data() {
			return {
				isRight: true,
				levelIndex: 1
			}
		},
		methods: {
			addSeries() {
				let obj = {
					value: 0,
					itemStyle: {
						normal: {
							color: ColorsUtils.randColor()
						}
					},
					name: '未知' + (this.levelIndex++)
				}
				this.seriesData[0].data.push(obj);
				this.isRight = false;
			},
			deleteSerie(index) {
				this.$confirm('确定要删除吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.seriesData[0].data.splice(index, 1);
				}).catch(() => {});
			}
		},
		components: {
			ColorPicker
		},
		watch: {

		}
	}
</script>

<style>

</style>