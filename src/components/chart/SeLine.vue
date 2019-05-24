<template>
	<div style="position: absolute; box-sizing: border-box;" :id="ukey" :style="locationObject">
		<div style="position: absolute;width:100%; height: 100%;" :id="chartid">
		</div>
		<div style="position: absolute;width:100%; height: 100%;z-index: 2000;" v-show="editmode">

		</div>
		<slot>
		</slot>
	</div>
</template>

<script>
	import ChartBarOrLineMixin from './ChartBarOrLineMixin.js'
	export default {
		message: '折线图组件',
		name: 'SeLine',
		mixins: [ChartBarOrLineMixin]
	}
</script>

<style>

</style>