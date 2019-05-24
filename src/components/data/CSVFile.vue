<template>
	<div style="display: flex;flex-direction: column;">
		<LocalFile @data-change="handleDataChange"></LocalFile>
		<StaticJSON :json-data="jsonData" @data-change="handleJSONDataChange" style="padding-top: 8px;flex:1;"></StaticJSON>
	</div>
</template>

<script>
	import LocalFile from "../base/LocalFile.vue"
	import StaticJSON from "../base/StaticJSON.vue"
	const props = {
		jsonData: {
			type: [Array, Object]
		}
	}
	export default {
		name: "CSVFile",
		message: "CSV数据源",
		props: props,
		data() {
			return {

			}
		},
		mounted() {

		},
		methods: {
			handleDataChange(data) {
				this.$emit("filechange",data);
//				this.jsonData = data;
			},
			handleJSONDataChange(data) {
				this.$emit("data-change", data);
			
			}
		},
		components: {
			LocalFile,
			StaticJSON
		},
		watch: {
//			jsonData() {
//
//			}
		}

	}
</script>

<style>

</style>