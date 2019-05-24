<template>
	<div style="position: absolute; box-sizing: border-box;" :id="ukey" :style="locationObject">
		<div style="position: absolute;width:100%; height: 100%;" :style="cstyle">
		</div>
		<slot>
		</slot>
	</div>
</template>
<script>
	import common from '../../mixins/common.js'
	export default {
		message: '自定义背景组件',
		name: 'SeBackground',
		mixins: [common]
	}
</script>

<style>

</style>