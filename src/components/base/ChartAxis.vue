<template>
	<div class="right-component-sub-title">
		<div class="right-component-item-header">
			<span @click="isRight=!isRight">
			<i class="el-icon-caret-right" v-show="isRight" ></i>
			<i class="el-icon-caret-bottom" v-show="!isRight" ></i>
			{{axisLabel}}</span>
			<el-checkbox style="float: right" v-model="axis.show">显示</el-checkbox>
		</div>
		<div v-show="!isRight" class="right-component-item-content">
			<!--文本-->
			<el-row class="right-component-item" style="padding: 8px 28px 4px;" type="flex" align='middle'>
				<el-col :span="8">
					文本
				</el-col>
			</el-row>
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="8">
					&nbsp;&nbsp;&nbsp;&nbsp;字号
				</el-col>
				<el-col :span="16">
					<el-input-number v-model="textStyle.fontSize" controls-position="right"></el-input-number>
				</el-col>
			</el-row>
			<el-row class="right-component-item" style="padding: 8px 28px 4px;" type="flex" align='middle'>
				<el-col :span="8">
					&nbsp;&nbsp;&nbsp;&nbsp;颜色
				</el-col>
				<el-col :span="16">
					<ColorPicker v-model="textStyle.color"></ColorPicker>
				</el-col>
			</el-row>
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="8">
					&nbsp;&nbsp;&nbsp;&nbsp;粗细
				</el-col>
				<el-col :span="16">
					<el-select v-model="textStyle.fontWeight" placeholder="请选择" size="small">
						<el-option v-for="item in fontWeights" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-col>
			</el-row>
			<!--轴标签-->
			<el-row class="right-component-item" style="padding: 8px 28px 4px;" type="flex" align='middle'>
				<el-col :span="8">
					轴标签
				</el-col>
				<el-col :span="16">
					<el-checkbox v-model="axis.axisLabel.show">显示</el-checkbox>
				</el-col>
			</el-row>
			<div>
				<el-row class="right-component-item" type="flex" align='middle'>
					<el-col :span="8">
						&nbsp;&nbsp;&nbsp;&nbsp;数据种类
					</el-col>
					<el-col :span="16">
						<el-select v-model="selfType" placeholder="请选择">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-col>
				</el-row>
				<el-row class="right-component-item" type="flex" align='middle'>
					<el-col :span="8">
						&nbsp;&nbsp;&nbsp;&nbsp;数据格式
					</el-col>
					<el-col :span="16">
						<el-select v-model="dataFormat.responseFormat" placeholder="请选择">
							<el-option v-for="item in dataFormats" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-col>
				</el-row>
				<el-row class="right-component-item" type="flex" align='middle'>
					<el-col :span="8">
						&nbsp;&nbsp;&nbsp;&nbsp;显示格式
					</el-col>
					<el-col :span="16">
						<el-select v-model="dataFormat.showFormat" placeholder="请选择">
							<el-option v-for="item in showDataFormats" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-col>
				</el-row>
				<el-row class="right-component-item" style="padding: 8px 28px 4px;" type="flex" align='middle'>
					<el-col :span="8">
						&nbsp;&nbsp;&nbsp;&nbsp;留白
					</el-col>
					<el-col :span="16">
						<el-checkbox v-model="axis.boundaryGap"></el-checkbox>
					</el-col>
				</el-row>
			</div>
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="8">
					&nbsp;&nbsp;&nbsp;&nbsp;单位
				</el-col>
				<el-col :span="16">
					<el-input placeholder="请输入内容" v-model="axis.name"></el-input>
				</el-col>
			</el-row>
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="8">
					&nbsp;&nbsp;&nbsp;&nbsp;数量
				</el-col>
				<el-col :span="16">
					<el-input-number v-model="axis.splitNumber" :min="1" controls-position="right"></el-input-number>
				</el-col>
			</el-row>
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="8">
					&nbsp;&nbsp;&nbsp;&nbsp;角度
				</el-col>
				<el-col :span="16">
					<el-select v-model="axis.axisLabel.rotate" placeholder="请选择">
						<el-option v-for="item in axisAngles" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-col>
			</el-row>
			<!--目前未用到-->
			<el-row class="right-component-item" style="padding: 8px 28px 4px;" type="flex" align='middle' v-show="isShowScale">
				<el-col :span="8">
					&nbsp;&nbsp;&nbsp;&nbsp;脱离0值
				</el-col>
				<el-col :span="16">
					<el-checkbox v-model="axis.scale"></el-checkbox>
				</el-col>
			</el-row>
			<!--轴标记-->
			<el-row class="right-component-item" style="padding: 8px 28px 4px;" type="flex" align='middle'>
				<el-col :span="8">
					轴标记
				</el-col>
				<el-col :span="16">
					<el-checkbox v-model="axis.axisTick.show">显示</el-checkbox>
				</el-col>
			</el-row>
			<el-row class="right-component-item" style="padding: 8px 28px 4px;" type="flex" align='middle'>
				<el-col :span="8">
					&nbsp;&nbsp;&nbsp;&nbsp;颜色
				</el-col>
				<el-col :span="16">
					<ColorPicker v-model="axis.axisTick.lineStyle.color"></ColorPicker>
				</el-col>
			</el-row>
			<el-row class="right-component-item" style="padding: 8px 28px 4px;" type="flex" align='middle'>
				<el-col :span="8">
					&nbsp;&nbsp;&nbsp;&nbsp;对齐标签
				</el-col>
				<el-col :span="16">
					<el-checkbox v-model="axis.axisTick.alignWithLabel"></el-checkbox>
				</el-col>
			</el-row>
			<!--轴线-->
			<el-row class="right-component-item" style="padding: 8px 28px 4px;" type="flex" align='middle'>
				<el-col :span="8">
					轴线
				</el-col>
				<el-col :span="16">
					<el-checkbox v-model="axis.axisLine.show">显示</el-checkbox>
				</el-col>
			</el-row>
			<el-row class="right-component-item" style="padding: 8px 28px 4px;" type="flex" align='middle'>
				<el-col :span="8">
					&nbsp;&nbsp;&nbsp;&nbsp;颜色
				</el-col>
				<el-col :span="16">
					<ColorPicker v-model="axis.axisLine.lineStyle.color"></ColorPicker>
				</el-col>
			</el-row>
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="8">
					&nbsp;&nbsp;&nbsp;&nbsp;线宽
				</el-col>
				<el-col :span="16">
					<el-input-number v-model="axis.axisLine.lineStyle.width" controls-position="right"></el-input-number>
				</el-col>
			</el-row>
			<!--分隔线-->
			<el-row class="right-component-item" style="padding: 8px 28px 4px;" type="flex" align='middle'>
				<el-col :span="8">
					分隔线
				</el-col>
				<el-col :span="16">
					<el-checkbox v-model="axis.splitLine.show">显示</el-checkbox>
				</el-col>
			</el-row>
			<el-row class="right-component-item" style="padding: 8px 28px 4px;" type="flex" align='middle'>
				<el-col :span="8">
					&nbsp;&nbsp;&nbsp;&nbsp;颜色
				</el-col>
				<el-col :span="16">
					<ColorPicker v-model="axis.splitLine.lineStyle.color"></ColorPicker>
				</el-col>
			</el-row>
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="8">
					&nbsp;&nbsp;&nbsp;&nbsp;线型
				</el-col>
				<el-col :span="16">
					<el-select v-model="axis.splitLine.lineStyle.type" placeholder="请选择">
						<el-option v-for="item in lineTypes" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-col>
			</el-row>
			<!--分隔区域splitArea-->
			<el-row class="right-component-item" style="padding: 8px 28px 4px;" type="flex" align='middle'>
				<el-col :span="8">
					分隔区域
				</el-col>
				<el-col :span="16">
					<el-checkbox v-model="axis.splitArea.show">显示</el-checkbox>
				</el-col>
			</el-row>
			<el-row class="right-component-item" style="padding: 8px 28px 4px;" type="flex" align='middle'>
				<el-col :span="8">
					&nbsp;&nbsp;&nbsp;&nbsp;颜色1
				</el-col>
				<el-col :span="16">
					<ColorPicker v-model="axis.splitArea.areaStyle.color[0]"></ColorPicker>
				</el-col>
			</el-row>
			<el-row class="right-component-item" style="padding: 8px 28px 4px;" type="flex" align='middle'>
				<el-col :span="8">
					&nbsp;&nbsp;&nbsp;&nbsp;颜色2
				</el-col>
				<el-col :span="16">
					<ColorPicker v-model="axis.splitArea.areaStyle.color[1]"></ColorPicker>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
	import ColorPicker from './ColorPicker.vue'
	import { isArray } from '../../utils/util.js'

	//字体粗细
	const fontWeights = [{
		value: "normal",
		label: "正常"
	}, {
		value: "bold",
		label: "粗体"
	}]
	//日期时间时，服务器数据返回的格式
	const dataFormats = [{
			"value": "YYYY-MM-DD HH:mm:ss",
			"label": "2018-06-19 09:40:27"
		},
		{
			"value": "YYYY/MM/DD HH:mm:ss",
			"label": "2018/06/19 09:40:27"
		}
	]
	//显示格式
	const showDataFormats = [{
			"value": "HH:mm:ss",
			"label": "09:40:27(时:分:秒)"
		},
		{
			"value": "HH:mm",
			"label": "09:40(时:分)"
		},
		{
			"value": "MM/DD",
			"label": "06/19(月/日)"
		},
		{
			"value": "MM-DD",
			"label": "06-19(月-日)"
		}
	]
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
	//轴标签角度
	const axisAngles = [{
			"value": 0,
			"label": "水平"
		},
		{
			"value": -45,
			"label": "倾斜"
		},
		{
			"value": 90,
			"label": "垂直"
		}
	]
	const props = {
		axisType: {
			type: String,
			default: "X" //'X|Y'
		},
		axisLabel: {
			type: String,
			default: "X轴"
		},
		dataFormat: {
			type: Object,
			default: () => {
				return {
					responseFormat: 'YYYY/MM/DD HH:mm:ss', //主要针对时间类型数据，服务器返回的格式
					showFormat: 'HH:mm:ss' //主要针对时间，数据显示格式
				}
			}
		},
		axis: {
			type: Object,
			default: () => {
				return {
					"name": "X轴", //一般用于坐标轴单位设置
					"nameTextStyle": { //与轴标签表示一致
						"color": "#FF0000",
						"fontSize": 12,
						"fontWeight": "normal"
					},
					"boundaryGap": true,
					"splitNumber": 5,
					"show": true,
					"type": "category",
					"axisLine": {
						"show": true,
						"lineStyle": {
							"color": "#1E1D1D",
							"width": 1
						}
					},
					"splitLine": {
						"show": false,
						"lineStyle": {
							"color": "#1E1D1D",
							"type": "solid" //'solid' | 'dotted' | 'dashed'
						}
					},
					"splitArea": {
						"show": false,
						"areaStyle": {
							"color": [
								'rgba(250,250,250,0.3)',
								'rgba(200,200,200,0.3)'
							]
						}
					},
					"axisLabel": {
						"show": true,
						"rotate": 0,
						"textStyle": {
							"color": "#FF0000",
							"fontSize": 12,
							"fontWeight": "normal"
						}
					},
					"axisTick": {
						"show": true,
						"alignWithLabel": true,
						"lineStyle": {
							"color": "#ccc"
						}
					},
					"data": [
						"类别1",
						"类别2",
						"类别3",
						"类别4"
					],
					"scale": false
				}
			}
		}
	}
	export default {
		message: "X轴或Y轴，图表",
		name: "ChartAxis",
		props: props,
		data() {
			var options = [];
			if(this.axisType == "X") {
				options = [{
					value: 'category',
					label: '类目型'
				}, {
					value: 'time',
					label: '时间型'
				}, {
					value: 'value',
					label: '数值型'
				}]
			} else {
				//				options = [{
				//					value: 'category',
				//					label: '类目型'
				//				}, {
				//					value: 'value',
				//					label: '数值型'
				//				}]
				options = [{
					value: 'category',
					label: '类目型'
				}, {
					value: 'time',
					label: '时间型'
				}, {
					value: 'value',
					label: '数值型'
				}]
			}
			return {
				isRight: true,
				options,
				color: '',
				selfType: this.axis.type,
				fontWeights,
				dataFormats,
				showDataFormats,
				//				dataFormat: "YYYY/MM/DD HH:MM:SS",
				//				showDataFormat: "HH:MM:SS",
				lineTypes,
				axisAngles,
				textStyle: {
					"color": "#FF0000",
					"fontSize": 12,
					"fontWeight": "normal"
				}
			}
		},
		mounted() {
			this.textStyle = this.getAxisTextStyle();

		},
		computed: {
			//是否显示轴标签类型
			isShowType() {
				if(this.axisType == 'X') {
					return true;
				} else {
					return false;
				}
			},

			//是否显示脱离0值设置，只有当type=='value'类型时
			isShowScale() {
				return false; //this.selfType == "value"?true:false ;
			},
			//当类型为时间型
			isShowDataFormat() {
				return this.selfType == "time" ? true : false;
			}
		},
		components: {
			ColorPicker
		},
		methods: {
			getAxisTextStyle() {
				var color = "#FF0000",
					fontSize = 12,
					fontWeight = "normal";
				if(this.axis) {
					color = this.axis.axisLabel.textStyle.color;
					fontSize = this.axis.axisLabel.textStyle.fontSize;
					fontWeight = this.axis.axisLabel.textStyle.fontWeight;
				}
				return {
					color,
					fontSize,
					fontWeight
				}
			}
		},
		watch: {
			selfType(newval, oldval) {
				//console.log(newval + '|' + oldval);　
				this.axis.type = newval;
				this.$emit('changeaxistype', {
					"axisType": this.axisType,
					"value": newval
				}); //
				//				if(this.axisType == 'X') {
				//					if(newval == "category" || newval == "time")　 {
				//						this.$emit('changeaxistype', {}"value") //
				//					} else {
				//						this.$emit('changeaxistype', oldval) //
				//					}
				//				}
			},
			textStyle: {
				handler(newval) {
					if(this.axis) {
						this.axis.nameTextStyle.color = newval.color;
						this.axis.nameTextStyle.fontSize = newval.fontSize;
						this.axis.nameTextStyle.color = newval.color;
						this.axis.axisLabel.textStyle.color = newval.color;
						this.axis.axisLabel.textStyle.fontSize = newval.fontSize;
						this.axis.axisLabel.textStyle.color = newval.color;
					}
				},
				deep: true
			},
			axis: {
				handler(newval, oldval) {
					this.textStyle = this.getAxisTextStyle();
					this.selfType = newval.type;
				},
				deep: true
			}
		}
	}
</script>

<style>

</style>