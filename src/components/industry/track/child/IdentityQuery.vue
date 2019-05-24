<template>
	<div>
		<QueryDefine></QueryDefine>
		<TrackPlaySet></TrackPlaySet>
		<Legend></Legend>
	</div>
</template>

<script>
	import QueryDefine from './QueryDefine.vue'
	import TrackPlaySet from './TrackPlaySet.vue'
	import Legend from './Legend.vue'
	export default {
		message: "设备查询组件",
		name: "IdentityQuery",
		data() {
			return {
			
			}
		},
		mounted() {

		},
		components:{
			QueryDefine,
			TrackPlaySet,
			Legend
		},
		methods: {

		},
		watch: {

			
		}
	}
</script>

<style>

</style>