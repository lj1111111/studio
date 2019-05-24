<template>
	<div class="right-component-sub-title">
		<div class="right-component-item-header">
			<span @click="isRight=!isRight">
			<i class="el-icon-caret-right" v-show="isRight" ></i>
			<i class="el-icon-caret-bottom" v-show="!isRight" ></i>
			时空数据</span>
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
						<el-radio :label="item.service_id" v-model="data.id">{{item.name}}</el-radio>
					</el-col>
				</el-row>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState } from 'vuex'
	const props = {
		data: {
			type: Object
		}
	}
	export default {
		message: "时空数据",
		name: "TsData",
		props: props,
		data() {
			return {
				isRight: true,
				emptyID: -1,
				mapList: []
			}
		},
		mounted() {
			this.getData();
		},
		computed: {
			...mapState([
				'token', 'url'
			])
		},
		methods: {
			getData() {
				//目前只获取公共数据
				var _self = this;
				var success = function(data) {
					console.log(data);
					if(!data || data.status != 0 || !data.result || data.result.length == 0) {
						_self.$message({
							message: '没有数据！',
							type: 'warning'
						});
						return;
					}
					_self.mapList = data.result;
				};
				var skey = "1127f22eebdd3e284da7725e3063e7cd";
				L.SpatioTemporalData.getServiceList("http://vector.superenginecloud.com:8080", {
					"ak": skey
				}, true, success);
			}
		}
	}
</script>

<style>

</style>