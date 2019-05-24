<template>
	<div>
		<el-row type="flex" align='middle' class="row-item">
			<el-col :span="8">
				API接口
			</el-col>
		</el-row>
		<div style="height: calc(100% - 32px);">
			<textarea style="height:100%;width: 100%;font-size: 16px;line-height:1.5;" v-model="api.rest"></textarea>
		</div>
	</div>
</template>

<script>
	const props = {
		api: {
			type: Object,
			default: ()=>{
				return {
					rest: "http://", //目前仅支持http协议Get请求
					condition:'',//条件
				    method: "get"
				}
			}
		}
	}
	export default {
		message: 'API数据组件',
		name: "APIData",
		props: props,
		data() {
			return {
				localRest: this.rest
			}
		},
		components: {

		}
	}
</script>

<style>
.row-item {
	font-size: 14px;
	padding: 4px 0px;
}
</style>