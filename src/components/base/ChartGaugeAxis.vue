<template>
	<div class="right-component-sub-title">
		<div class="right-component-item-header">
			<span @click="isRight=!isRight">
			<i class="el-icon-caret-right" v-show="isRight"></i>
			<i class="el-icon-caret-bottom" v-show="!isRight" ></i>
			坐标轴</span>
		</div>
		<div v-show="!isRight" class="right-component-item-content">
			<el-row class="right-component-item" style="padding: 8px 28px 4px;" type="flex" align='middle'>
				<el-col :span="8">
					轴标签
				</el-col>
				<el-col :span="16">
					<el-checkbox v-model="seriesData.axisLabel.show">显示</el-checkbox>
				</el-col>
			</el-row>
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="8">
					字号
				</el-col>
				<el-col :span="16">
					<el-input-number v-model="seriesData.axisLabel.textStyle.fontSize"  controls-position="right"></el-input-number>
				</el-col>
			</el-row>
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="8">
					宽度
				</el-col>
				<el-col :span="16">
					<el-input-number v-model="seriesData.axisLine.lineStyle.width" :min="0" controls-position="right"></el-input-number>
				</el-col>
			</el-row>
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="8">
					最小值
				</el-col>
				<el-col :span="16">
					<el-input-number v-model="seriesData.min" :min="0" controls-position="right"></el-input-number>
				</el-col>
			</el-row>
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="8">
					最大值
				</el-col>
				<el-col :span="16">
					<el-input-number v-model="seriesData.max" :min="0" controls-position="right"></el-input-number>
				</el-col>
			</el-row>
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="8">
					分段数
				</el-col>
				<el-col :span="16">
					<el-input-number v-model="num" :min="0" :max="20" controls-position="right"  @change='changeNum'></el-input-number>
				</el-col>
			</el-row>
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="8">
					分段列表
				</el-col>
			</el-row>
			<div v-for="(item,index) in colors" :key="index">
				<el-row class="right-component-item" type="flex" align='middle' style="padding: 8px 28px 4px;">
					<el-col :span="8">
						&nbsp;&nbsp;&nbsp;&nbsp;分段{{index+1}}
					</el-col>
					<el-col :span="16">
						<span @click="deleteSerie(index)" style="color:#409EFF; cursor: pointer;"><i class="el-icon-delete" style="font-size: 14px;">&nbsp;删除</i></span>
					</el-col>
				</el-row>
				<el-row class="right-component-item" type="flex" align='middle'>
					<el-col :span="8">
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;比例
					</el-col>
					<el-col :span="16">
						<el-input-number v-model="item[0]" :min="0" :step="0.1" :max='1' controls-position="right" ></el-input-number>
					</el-col>
				</el-row>
				<el-row class="right-component-item" type="flex" align='middle'>
					<el-col :span="8">
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;颜色
					</el-col>
					<el-col :span="16">
						<ColorPicker v-model="item[1]"></ColorPicker>
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
			type: Object,
			default: () => {
				return {
					min: 0,
					max: 100,
					axisLine: {
						lineStyle: {
							color: [

							],
							width: 10
						}
					},
					axisLabel: {
						show: true
					}
				}
			}
		}
	}
	let bDeleteAction=false;
	export default {
		message: "仪表盘坐标轴部件",
		name: "ChartGaugeAxis",
		props: props,
		data() {
			return {
				isRight: true,
				num: 3,
			}
		},
		methods: {
			deleteSerie(index) {
				if(this.seriesData.axisLine.lineStyle.color.length > 2) {
					this.$confirm('确定要删除吗?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.seriesData.axisLine.lineStyle.color.splice(index, 1);
						bDeleteAction=true;
						this.num--;
					}).catch(() => {});
				} else {
					this.$message({
						message: '分段数不能少于2，无法删除！',
						type: 'warning'
					});
				}
			},
			changeNum(){
				bDeleteAction=false;
			}
		},
		computed: {
			colors: {
				get() {
					return this.seriesData.axisLine.lineStyle.color;
				}
			}
		},
		components: {
			ColorPicker
		},
		watch: {
			num(newval) {
				if(bDeleteAction) return;
				this.seriesData.axisLine.lineStyle.color = [];
				var d = 1 / newval;
				var arr = [];
				for(var i = 0; i < newval - 1; i++) {
					var t = ((i + 1) * d).toFixed(2);
					arr = [];
					arr.push(t, ColorsUtils.randColor());
					this.$set(this.seriesData.axisLine.lineStyle.color, i, arr);
				}
				arr = [];
				arr.push(1, ColorsUtils.randColor());
				this.$set(this.seriesData.axisLine.lineStyle.color, newval - 1, arr);
			}
		}
	}
</script>

<style>

</style>