<template>
	<div class="right-component-sub-title">
		<div class="right-component-item-header">
			<span @click="isRight=!isRight">
			<i class="el-icon-caret-right" v-show="isRight" ></i>
			<i class="el-icon-caret-bottom" v-show="!isRight" ></i>
			矢量地图</span>
		</div>
		<div v-show="!isRight" class="right-component-item-content">
			<el-row class="right-component-item" style="padding: 8px 28px 4px;" type="flex" align='middle' justify="center" offset="6">
				<el-col :span="24">
					<el-radio :label="emptyID" v-model="data.id">空</el-radio>
				</el-col>
			</el-row>
			<div v-for="(item,index) in mapList" :key="index">
				<el-row class="right-component-item" style="padding: 8px 28px 4px;" type="flex" align='middle' justify="center" offset="6">
					<el-col :span="24">
						<el-radio :label="item.data_id" v-model="data.id">{{item.name}}</el-radio>
					</el-col>
				</el-row>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState } from 'vuex'
	import { queryMapByUser } from '../../api/seapi'
	const props = {
		data: {
			type: Object
		}
	}
	export default {
		message: "矢量地图",
		name: "VectorMap",
		props: props,
		data() {
			return {
				isRight: true,
				emptyID:'0',
				mapList: []
			}
		},
		mounted () {
			this.queryMapList();
		},
		computed: {
			...mapState([
				'token', 'url'
			])
		},
		methods: {
			/****
			 * 获取地图列表
			 */
			queryMapList() {
				var url=this.url;
				var token=this.token;
				queryMapByUser(url,token).then(data=>{
					if(!data || !data.result ||
						!data.result.item || data.result.item.length == 0) {
						this.$message({
							message: '没有矢量地图',
							type: 'warning'
						});
						return;
					}
					this.mapList = data.result.item;
				});	
			}
		}
	}
</script>

<style>

</style>