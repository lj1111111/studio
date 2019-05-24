<template>
	<div style="position: absolute; " :id="ukey" :style="locationObject">
		<div style="position: absolute;width:100%; height: 100%;" :style="styleObject">
			<img src="../../assets/img/spaceAnalysis.png" style="flex:1;" />
			<span  v-show="params.global.showTitle">{{params.global.content}}</span>
		</div>
		<slot>
		</slot>
	</div>
</template>
<script>
	import common from '../../mixins/common.js'

	export default {
		message: '时空分析组件',
		name: 'SeTsAnalysis',
		mixins: [common]
	}
</script>

<style>

</style>