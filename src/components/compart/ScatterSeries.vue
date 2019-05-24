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
			<div v-for="(item,index) in seriesData" :key="index" class="right-component-item-splitline-step1">
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
						&nbsp;&nbsp;&nbsp;&nbsp;符号大小
					</el-col>
					<el-col :span="16">
						<el-input-number v-model="item.symbolSize" :min="0" controls-position="right"></el-input-number>
					</el-col>
				</el-row>
				<ItemStyle :item-style="item.itemStyle">
				</ItemStyle>
				<LabelStyle :label-style="item.label">

				</LabelStyle>
			</div>
		</div>
	</div>
</template>

<script>
	import LabelStyle from "../base/LabelStyle.vue"
	import ItemStyle from "../base/ItemStyle.vue"
	const props = {
		seriesData: {
			type: Array,
			default: () => {
				return []; //[{name:"系列名称",itemStyle:{normal:{color:''}},type:'bar|line',stack:""}]
			}
		}
	}
	export default {
		message: "散点图数据系列",
		name: "ScatterSeries",
		props: props,
		data() {
			return {
				isRight: true,
				levelIndex: 1
			}
		},
		methods: {
			addSeries() {
				//let index = this.seriesData ? this.seriesData.length : 0;
				let obj = {
					name: '未知' + (this.levelIndex++),
					"type": "scatter",
					"symbolSize": 20,
					"label": {
						"show": false,
						"position": "inside",
						"fontSize": 12,
						"color": "#FFFFFF",
						"fontWeight": "normal"
					},
					"itemStyle": {
						"color": "rgba(25, 100, 150, 1)",
						"borderColor": '#000',
						"borderWidth": 0,
						"borderType": 'solid',
						"shadowBlur": 0,
						"shadowColor": 'rgba(25, 100, 150, 0.5)',
						"shadowOffsetX": 0,
						"shadowOffsetY": 0
					}
				}
				this.seriesData.push(obj);
				this.isRight = false;
			},
			deleteSerie(index) {
				this.$confirm('确定要删除吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.seriesData.splice(index, 1);
				}).catch(() => {});
			}
		},
		components: {
			LabelStyle,
			ItemStyle
		},
		watch: {

		}
	}
</script>

<style>

</style>