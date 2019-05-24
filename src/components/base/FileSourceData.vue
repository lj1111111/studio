<template>
	<div>
		<el-row  type="flex" align='middle'>
			<el-col :span="4">
				文件源
			</el-col>
			<el-col :span="20">
				<LocalFile></LocalFile>
			</el-col>
		</el-row>
		<el-row  type="flex" align='middle'>
			<el-col :span="24">
				<StaticJSON :json-data="jsonData"></StaticJSON>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import StaticJSON from './StaticJSON.vue';
	import LocalFile from './LocalFile.vue';
	const props = {
		jsonData: {
			type: [Array, Object]
		}
	}
	export default {
		message: "文件数据组件，已弃用",
		name: "FileSourceData",
		props:props,
		components: {
			LocalFile,
			StaticJSON
		}
	}
</script>

<style>

</style>