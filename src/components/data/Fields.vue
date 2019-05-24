<template>
	<div>
		<el-row class="right-component-item" :gutter="4" type="flex" align='middle' style="background-color: #e3eae9;padding: 8px 30px;">
			<el-col :span="4">
				字段
			</el-col>
			<el-col :span="8">
				映射
			</el-col>
			<el-col :span="8">
				说明
			</el-col>
			<el-col :span="4">
				状态
			</el-col>
		</el-row>

		<el-row v-for="item  in fields" :key="item.source" class="right-component-item" :gutter="4" type="flex" align='middle'>
			<el-col :span="4">
				{{item.source}}
			</el-col>
			<el-col :span="8">
				<el-input v-model="item.target" placeholder="可自定义" size="small"></el-input>
			</el-col>
			<el-col :span="8">
				{{item.memo}}
			</el-col>
			<el-col :span="4">
				<span style="cursor:default;" v-show="state"><i class="custom-iconfont icon-yuan" style="font-size:12px;color:#08C9C9"></i><span style="font-size:14px;color:#2c3e50">&nbsp;成功</span></span>
				<span style="cursor:default;" v-show="!state"><i class="custom-iconfont icon-yuan" style="font-size:12px;color:#FF7218"></i><span style="font-size:14px;color:#2c3e50">&nbsp;失败</span></span>
			</el-col>
		</el-row>
	</div>
</template>
<script>
	const props = {
		fields: {
			type: Array,
			default: () => {
				return []
			}
		},
		state: {
			type: Boolean,
			default: false
		}
	}
	export default {
		name: "Fields",
		message: "字段设置组件",
		props: props,
		data() {
			return {

			}
		}
	}
</script>

<style>

</style>