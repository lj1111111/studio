<template>
	<div class="monitor-containter">
		<ul class="tr-center">
			<li v-for="(item,index) in monitors" :key="index">
				{{getMonitorMsg(item)}}
			</li>
		</ul>
	</div>
</template>

<script>
	const props = {
		monitors: {
			type: Array,
			default: () => {
				return [];
			}
		}
	}
	export default {
		name: "FenceMonitorResult",
		message: "围栏监测结果组件",
		props,
		data() {
			return {

			}
		},
		methods: {
			getMonitorMsg(item) {
				var s1 = this.$t('vehicle');
				var s2 = this.$t('enter_fence');
				var s3 = this.$t('location');
				var s = item.time + "  "+s1 + "【" + item.code + "】 " + s2 + "  (" + s3 + "：" + item.lng + " , " + item.lat + ")";
				return s;
			}
		}
	}
</script>

<style scoped>
	.monitor-containter {
		width: 100%;
		position: absolute;
		background-color: rgba(77, 77, 84, 0.75);
		/*rgba(255, 255, 255, 0.8);*/
		bottom: 0px;
		z-index: 5000;
		overflow: hidden;
	}
	
	ul {
		list-style: none;
		overflow: auto;
		max-height: 200px;
		margin: 0;
		padding: 0;
		color: #FFF;
	}
	
	ul li {
		font-size: 16px;
		padding: 6px 20px;
	}
	
	.tr-center {
		overflow: auto;
	}
	
	.tr-center::-webkit-scrollbar {
		width: 8px;
		height: 8px;
	}
	
	.tr-center::-webkit-scrollbar-thumb {
		border-radius: 4px;
		-webkit-box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.2);
		background: #c0c4cc;
	}
</style>