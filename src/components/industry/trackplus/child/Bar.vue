<template>
	<div class="item-list" style="margin-top:10px;">
		<el-row class="right-component-item track-split-item" type="flex" align='middle'>
			<el-col :span="24">
				<span>{{$t('Common.vehicles_statistics')}}</span><span style="float: right;">{{$t('Common.unit_quantity')}}</span>
			</el-col>
		</el-row>
		<el-row class="right-component-item track-split-item" type="flex" align='middle'>
			<el-col :span="24" style="text-align: left;">
				<span>{{$t('Common.statistics_total')}}{{total}}</span>
			</el-col>
		</el-row>
		<el-row class="right-component-item track-split-item" type="flex" align='middle'>
			<el-col :span="24">
				<div :id="chartid" style="width: 100%;height: 350px;"></div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import { stamp } from '../js/utils.js'
	const props = {
		options: {
			type: Object,
			default: () => {
				return {

				}
			}
		},
		total:{
			type:Number,
			default:0
		}
	}
	export default {
		name: "Bar",
		message: "柱状图",
		props,
		data() {
			return {
				chartid: "chart_" + stamp(),
				mChart: undefined
			}
		},
		mounted() {
			this.$nextTick(() => {
				this.createBar();
			})
		},
		methods: {
			createBar() {
				//				if(this.mChart) {
				//					this.mChart.dispose();
				//				}
				if(!this.mChart) {
					var id = this.chartid;
					this.mChart = this.$echarts.init(document.getElementById(id));
				}
				this.mChart.setOption(this.options);
			},
			//重置Chart容器大小
			resize(newval) {
				if(this.mChart) {
					this.mChart.dispose();
					this.mChart=null;
				}
				this.createBar();
				this.mChart && this.mChart.resize();
			}
		},
		watch: {
			'options': {
				handler(curval, oldval) {
					this.createBar();
				},
				deep: true
			}
		}
	}
</script>

<style>

</style>