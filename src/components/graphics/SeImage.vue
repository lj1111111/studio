<template>
	<div style="position: absolute;box-sizing: border-box; " :id="ukey" :style="locationObject">
		<div style="position: absolute;width:100%; height: 100%;" :style="styleObject">
			
		</div>
		<!--<img style="position: absolute;width:100%; height: 100%;" :style="styleObject" :src="imgSrc">

		</img>-->

		<slot>
		</slot>
	</div>
</template>
<script>
	import common from '../../mixins/common.js'
	export default {
		message: '单张图片组件',
		name: 'SeImage',
		mixins: [common],
		computed:{
			imgSrc(){
				return this.params.source.isLocal?this.params.source.localSrc:this.params.source.remoteSrc;
			}
		}
	}
</script>

<style>

</style>