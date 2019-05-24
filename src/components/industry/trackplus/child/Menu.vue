<template>
	<ul>
		<li @click="itemClick(MENU.TRACK_MENU_MONITOR)" :class="[activeIndex== MENU.TRACK_MENU_MONITOR? 'active-item' : 'not-active-item']">
			<div>
				<i class="icon iconfont icon-jiance"></i>
				<span>
				{{ $t("SeTrackPlus.menu_monitor") }}
			</span>
			</div>
		</li>
		<li @click="itemClick(MENU.TRACK_MENU_QUERY)" :class="[activeIndex== MENU.TRACK_MENU_QUERY? 'active-item' : 'not-active-item']">
			<div>
				<i class="icon iconfont icon-chaxun"></i>
				<span>
				{{ $t("SeTrackPlus.menu_query") }}
			</span>
			</div>
		</li>
		<li @click="itemClick(MENU.TRACK_MENU_ANALYSIS)" :class="[activeIndex== MENU.TRACK_MENU_ANALYSIS? 'active-item' : 'not-active-item']">
			<div>
				<i class="icon iconfont icon-chaxun"></i>
				<span>
				{{ $t("SeTrackPlus.menu_analysis") }}
			</span>
			</div>
		</li>
	</ul>
</template>
<script>
	import '../css/iconfont.css'
	import MENU from '../js/menu.js'
	const MENU_CHANGE = "menu-change";
	const props = {
		//			navMenuStyle: {
		//				type: Object,
		//				default: () => {
		//					return {
		//						backgroundColor: "#545c64",
		//						textColor: "#fff",
		//						activeTextColor: "#ffd04b"
		//					}
		//				}
		//			}
		//		activeIndex: {
		//			type: String,
		//			default: MENU.TRACK_MENU_MONITOR
		//		}
	}
	export default {
		name: "Menu",
		message: "导航菜单",
		props,
		data() {
			return {
				MENU,
				activeIndex: MENU.TRACK_MENU_MONITOR
			}
		},
		methods: {
			itemClick(val) {
				this.activeIndex = val;
				this.$emit(MENU_CHANGE, val);
			}
		},
	}
</script>

<style scoped>
	ul {
		list-style: none;
		background-color: #3095E0;
		margin: 0;
		padding: 0;
		box-shadow: 0px 0px 0px #105F99;
		color: rgba(255, 255, 255, 0.75);
	}
	
	ul li {
		font-size: 18px;
		height: 52px;
		line-height: 52px;
		/*vertical-align: middle;*/
		cursor: pointer;
	}
	
	ul li>div {
		width: 100px;
		margin: auto;
	}
	
	ul li:hover {
		/*background-color: #1877BD;*/
		color: rgba(255, 255, 255, 1);
	}
	
	ul li i {
		font-size: 20px !important;
	}
	
	ul li span {
		padding-left: 8px !important;
	}
	
	.active-item {
		background-color: #1877BD;
		color: rgba(255, 255, 255, 1);
	}
	
	.not-active-item {
		background-color: #3095E0;
		color: rgba(255, 255, 255, 0.75);
	}
</style>