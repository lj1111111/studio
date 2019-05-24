<template>
	<div class="action-font" :style="styleObject">
		<i class="custom-iconfont icon-icon-copy " title="复制" @click="sendCopyComponent"></i>
		<i class="custom-iconfont icon-shanchu" style="font-size: 18px;" title="删除" @click="sendDeleteComponent"></i>
	</div>

</template>

<script>
	const SE_TITLE = 'se-title';
	const SE_TIME = 'se-time';
	const SE_VIDEO = 'se-video';
	//删除事件名称
	const DELETECOMPONENT = 'deletecomponent';
	//复制事件名称
	const COPYCOMPONENT = 'copycomponent';
	const props = {
		//组件索引
		index: {
			type: Number,
			default: undefined
		},
		name: {
			type: String,
			default: ""
		}
	}
	export default {
		message: '单个组件操作',
		name: 'Action',
		props,
		computed: {
			styleObject() {
				if(this.name == SE_TITLE || this.name == SE_TIME || this.name ==SE_VIDEO) {
					return {
						right: 0
					}
				} else {
					return {
						right: 0
					}
				}
			}
		},
		methods: {
			//分发删除组件事件
			sendDeleteComponent() {
				this.$emit(DELETECOMPONENT, this.index);
			},
			//分发复制组件事件
			sendCopyComponent() {
				this.$emit(COPYCOMPONENT, this.index);
			}
		}
	}
</script>

<style scoped>
	.action-font {
		font-size: 12px;
		color: #FFF;
		position: absolute;
		/*width: 100px;*/
		/*display: inline-block;*/
		text-align: center;
		background-color: #31606e;
		padding: 4px;
		z-index: 9999;
	}
	
	.action-font>i {
		cursor: pointer;
	}
	
	.action-font>i:last-child {
		/*margin-left: 4px;*/
	}
	
	.action-font>i:hover {
		color: #13CE66;
	}
</style>