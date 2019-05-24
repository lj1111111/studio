<template>
	<div style="position: absolute; box-sizing: border-box;" :id="ukey" :style="locationObject">
		<div style="position: absolute;width:100%; height: 100%;" :style="styleObject">

		</div>

		<slot>
		</slot>
	</div>
</template>
<script>
	import common from '../../mixins/common.js'
	export default {
		message: '边框组件',
		name: 'SeBorder',
		mixins: [common]
	}
</script>

<style>

</style>