<template>
	<div class="right-component-header">
		<div :class="{'right-component-header-tab-selected':isActiveStyle}" @click="changeTab(ty.TAB_STYLE)">
			样式
		</div>
		<div :class="{'right-component-header-tab-selected':isActiveData}" @click="changeTab(ty.TAB_DATA)" v-show="isShowData">
			数据
		</div>
	</div>
</template>

<script>
	import TabType from '../../constants/TabType.js'
	export default {
		name: 'Tabs',
		props:{
			tab:{
				type:String,
				default:TabType.TAB_STYLE
			},
			isShowData:{
				type:Boolean,
				default:true
			}
		},
		message: 'Tab容器',
		data() {
			return {
				ty:TabType,
				selfTab: this.tab
			}
		},
		mounted() {

		},
		methods:{
			changeTab(val)
			{
				this.selfTab=val;
				this.$emit("tabchange",this.selfTab);
			}
		},
		computed: {
			isActiveData() {
				return this.selfTab === TabType.TAB_DATA ? true : false;
			},
			isActiveStyle() {
				return this.selfTab === TabType.TAB_STYLE ? true : false;
			}
		},
		watch:{
			tab(newval){
				this.selfTab=newval;
			}
		}
	}
</script>

<style>

</style>