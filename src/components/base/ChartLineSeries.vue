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
			<div v-for="(item,index) in seriesData" :key="index">
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
				<!--<el-row class="right-component-item" type="flex" align='middle'>
					<el-col :span="8">
						&nbsp;&nbsp;&nbsp;&nbsp;类型
					</el-col>
					<el-col :span="16">
						<el-radio v-model="item.type" label="bar">柱状</el-radio>
						<el-radio v-model="item.type" label="line">折线</el-radio>
					</el-col>
				</el-row>
				<el-row class="right-component-item" type="flex" align='middle'>
					<el-col :span="8">
						&nbsp;&nbsp;&nbsp;&nbsp;堆叠
					</el-col>
					<el-col :span="16">
						<el-checkbox v-model='item.stack' true-label="group" false-label="">显示</el-checkbox>
					</el-col>
				</el-row>
				<el-row class="right-component-item" type="flex" align='middle'>
					<el-col :span="8">
						&nbsp;&nbsp;&nbsp;&nbsp;颜色
					</el-col>
					<el-col :span="16">
						<ColorPicker v-model="item.itemStyle.normal.color"></ColorPicker>
					</el-col>
				</el-row>-->
				<!--折线-->
				<el-row class="right-component-item" type="flex" align='middle' style="padding: 8px 28px 4px;">
					<el-col :span="8">
						折线
					</el-col>
				</el-row>
				<el-row class="right-component-item" type="flex" align='middle'>
					<el-col :span="8">
						&nbsp;&nbsp;&nbsp;&nbsp;颜色
					</el-col>
					<el-col :span="16">
						<ColorPicker v-model="item.lineStyle.color"></ColorPicker>
					</el-col>
				</el-row>
				<el-row class="right-component-item" type="flex" align='middle'>
					<el-col :span="8">
						&nbsp;&nbsp;&nbsp;&nbsp;线型
					</el-col>
					<el-col :span="16">
						<el-select placeholder="请选择" v-model="item.lineStyle.type">
							<el-option v-for="item in lineTypes" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-col>
				</el-row>
				<el-row class="right-component-item" type="flex" align='middle'>
					<el-col :span="8">
						&nbsp;&nbsp;&nbsp;&nbsp;线宽
					</el-col>
					<el-col :span="16">
						<el-input-number :min="0" v-model="item.lineStyle.width" controls-position="right"></el-input-number>
					</el-col>
				</el-row>
				<el-row class="right-component-item" type="flex" align='middle'>
					<el-col :span="8">
						&nbsp;&nbsp;&nbsp;&nbsp;平滑曲线
					</el-col>
					<el-col :span="16">
						<el-checkbox v-model='item.smooth'></el-checkbox>
					</el-col>
				</el-row>
				<!--圆点-->
				<el-row class="right-component-item" type="flex" align='middle' style="padding: 8px 28px 4px;">
					<el-col :span="8">
						圆点
					</el-col>
					<el-col :span="16">
						<el-checkbox v-model="item.showSymbol">显示</el-checkbox>
					</el-col>
				</el-row>
				<el-row class="right-component-item" type="flex" align='middle'>
					<el-col :span="8">
						&nbsp;&nbsp;&nbsp;&nbsp;颜色
					</el-col>
					<el-col :span="16">
						<ColorPicker v-model="item.itemStyle.color"></ColorPicker>
					</el-col>
				</el-row>
				<el-row class="right-component-item" type="flex" align='middle'>
					<el-col :span="8">
						&nbsp;&nbsp;&nbsp;&nbsp;类型
					</el-col>
					<el-col :span="16">
						<el-select placeholder="请选择" v-model="item.symbol">
							<el-option v-for="item in symbolTypes" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-col>
				</el-row>
				<el-row class="right-component-item" type="flex" align='middle'>
					<el-col :span="8">
						&nbsp;&nbsp;&nbsp;&nbsp;半径
					</el-col>
					<el-col :span="16">
						<el-input-number :min="0" v-model="item.symbolSize" controls-position="right"></el-input-number>
					</el-col>
				</el-row>
				<!--区域-->
				<el-row class="right-component-item" type="flex" align='middle' style="padding: 8px 28px 4px;">
					<el-col :span="8">
						区域
					</el-col>
					<el-col :span="16">
						<el-checkbox v-model="item.areaStyle.opacity" :true-label="1" :false-label="0">显示</el-checkbox>
					</el-col>
				</el-row>
				<el-row class="right-component-item" type="flex" align='middle'>
					<el-col :span="8">
						&nbsp;&nbsp;&nbsp;&nbsp;颜色
					</el-col>
					<el-col :span="16">
						<ColorPicker v-model="item.areaStyle.color"></ColorPicker>
					</el-col>
				</el-row>
				<!--标签-->
				<el-row class="right-component-item" type="flex" align='middle' style="padding: 8px 28px 4px;">
					<el-col :span="8">
						标签
					</el-col>
					<el-col :span="16">
						<el-checkbox v-model="item.label.show">显示</el-checkbox>
					</el-col>
				</el-row>
				<el-row class="right-component-item" type="flex" align='middle'>
					<el-col :span="8">
						&nbsp;&nbsp;&nbsp;&nbsp;字号
					</el-col>
					<el-col :span="16">
						<el-input-number v-model="item.label.fontSize" controls-position="right"></el-input-number>
					</el-col>
				</el-row>
				<el-row class="right-component-item" style="padding: 8px 28px 4px;" type="flex" align='middle'>
					<el-col :span="8">
						&nbsp;&nbsp;&nbsp;&nbsp;颜色
					</el-col>
					<el-col :span="16">
						<ColorPicker v-model="item.label.color"></ColorPicker>
					</el-col>
				</el-row>
				<el-row class="right-component-item" type="flex" align='middle'>
					<el-col :span="8">
						&nbsp;&nbsp;&nbsp;&nbsp;粗细
					</el-col>
					<el-col :span="16">
						<el-select v-model="item.label.fontWeight" placeholder="请选择" size="small">
							<el-option v-for="item in fontWeights" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-col>
				</el-row>
			</div>
		</div>
	</div>
</template>

<script>
	import ColorPicker from './ColorPicker.vue'
	//网格线型
	const lineTypes = [{
			"value": "solid",
			"label": "实线"
		},
		{
			"value": "dotted",
			"label": "点线"
		},
		{
			"value": "dashed",
			"label": "虚线"
		}
	]
	//字体粗细
	const fontWeights = [{
		value: "normal",
		label: "正常"
	}, {
		value: "bold",
		label: "粗体"
	}]
	//符号类型'circle' | 'rectangle' | 'triangle' | 'diamond' |'emptyCircle' | 'emptyRectangle' | 'emptyTriangle' | 'emptyDiamond' 
	const symbolTypes = [{
			"value": "circle",
			"label": "实心圆"
		},
		{
			"value": "rectangle",
			"label": "实心矩形"
		},
		{
			"value": "triangle",
			"label": "实心三角形"
		},
		{
			"value": "diamond",
			"label": "实心菱形"
		},
		{
			"value": "emptyCircle",
			"label": "空心圆"
		},
		{
			"value": "emptyRectangle",
			"label": "空心矩形"
		},
		{
			"value": "emptyTriangle",
			"label": "空心三角形"
		},
		{
			"value": "emptyDiamond",
			"label": "空心菱形"
		}
	]
	const props = {
		seriesData: {
			type: Array,
			default: () => {
				return []; //[{name:"系列名称",itemStyle:{normal:{color:''}},type:'bar|line',stack:""}]
			}
		}
	}
	export default {
		message: "折线图数据系列",
		name: "ChartBarOrLineSeries",
		props: props,
		data() {
			return {
				isRight: true,
				levelIndex: 1,
				lineTypes,
				symbolTypes,
				fontWeights
			}
		},
		methods: {
			addSeries() {
				//let index = this.seriesData ? this.seriesData.length : 0;
				let obj = {
					name: '未知' + (this.levelIndex++),
					type: 'line',
					stack: '',
					smooth: false,
					symbol: "circle",
					showSymbol: true,
					symbolSize: 8,
					lineStyle: {
						color: "#6CF5F2",
						type: "solid",
						width: 2
					},
					areaStyle: {
						color: "#000",
						opacity: 0
					},
					label: {
						show: false,
						position:"top", 
						fontSize: 12,
						color: "#EFE7E7",
						fontWeight: "normal"
					},
					itemStyle: {
						color: '#000'
					},
					data: [

					]
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
			ColorPicker
		},
		watch: {

		}
	}
</script>

<style>

</style>