<template>
	<div class="right-component-containter">
		<Tabs @tabchange="handleTabChange" :tab="tab">
		</Tabs>
		<div class="right-component-labelInfo">
			<i class="el-icon-arrow-left sub-icon" title="返回" @click="sendBack"></i>
			<span>&nbsp;{{config.label}}</span> <span style="font-size: 14px;">{{config.version}}</span>
		</div>
		<div v-show="isActiveStyle">

		</div>
		<div v-show="isActiveData">

		</div>
	</div>
</template>

<script>
	import SubComSettingMixinBase from '../base/SubComSettingMixinBase.js'

	export default {
		name: 'ScatterD3Setting',
		message: '3D气泡图组件设置',
		mixins: [SubComSettingMixinBase],
		data() {
			return {

			}
		},
		mounted() {

		},
		methods: {

		},
		components: {

		},
		watch: {

		}
	}
</script>

<style scoped>
	.sub-icon {
		color: #21aed7;
		font-weight: bold;
		cursor: pointer;
	}
</style>