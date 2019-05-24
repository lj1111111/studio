<template>
	<div class="right-component-sub-title">
		<div class="right-component-item-header">
			<span @click="isRight=!isRight">
			<i class="el-icon-caret-right" v-show="isRight" ></i>
			<i class="el-icon-caret-bottom" v-show="!isRight" ></i>
			数据源配置</span>
		</div>
		<div v-show="!isRight" class="right-component-item-content">
			<el-row class="right-component-item" :gutter="4" type="flex" align='middle' style="border-top: solid 1px #DCDEE3;">
				<el-col :span="8">
					选择数据源：
				</el-col>
				<el-col :span="16">
					<el-select v-model="dataConfig.dsId" placeholder="请选择" size="small" style="width: 100%;">
						<el-option v-for="item in dataList" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
	import { TRACK_INDEX } from '../js/serviceapi.js'
	import { mapState } from 'vuex'
	const props = {
		label: {
			type: String,
			default: ""
		},
		dataConfig: {
			type: Object,
			default: () => {
				return {}
			}
		}
	}
	export default {
		name: "TrackData",
		props: props,
		message: "数据源设置组件",
		data() {
			return {
				isRight: false,
				dataList: [] //数据源列表
			}
		},
		mounted() {
              this.queryIndexs();
		},
		methods: {
			queryIndexs() {
				var url = this.spaceRestUrl + TRACK_INDEX;
				this.dataList=[];
				this.$fetch(url).then(response => {
					var indexs=response.index;
					indexs && indexs.forEach(item=>{
						this.dataList.push({label:item,value:item});
					})
				});
			}
		},
		computed: {
			...mapState([
				'spaceRestUrl',
				'maps'
			])
		},
		components: {

		},
		watch: {

		}
	}
</script>

<style>

</style>