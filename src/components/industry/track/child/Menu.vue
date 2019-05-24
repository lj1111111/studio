<template>
	<el-menu :default-active="activeIndex" class="el-menu-vertical-demo" @select="handleSelect"  :background-color="navMenuStyle.backgroundColor" :text-color="navMenuStyle.textColor" :active-text-color="navMenuStyle.activeTextColor">
		<el-menu-item index="1">
			<i class="el-icon-menu" :style="iconColor1"></i>
			<span slot="title">轨迹查询</span>
		</el-menu-item>
		<!--<el-menu-item index="2" >
			<i class="el-icon-setting" :style="iconColor2"></i>
			<span slot="title">实时位置</span>
		</el-menu-item>-->
	</el-menu>
</template>
<script>
	const props = {
		navMenuStyle: {
			type: Object,
			default: () => {
				return {
					backgroundColor: "#545c64",
					textColor: "#fff",
					activeTextColor: "#ffd04b"
				}
			}
		}
	}
	export default {
		name: "Menu",
		message: "导航菜单",
		props,
		data() {
			return {
				activeIndex: "1"
			}
		},
		methods: {
			handleSelect(index,indexPath){
				this.activeIndex=index;
			}
		},
		computed: {
			iconColor1() {
				if(this.activeIndex == "1") {
					return {
						color: this.navMenuStyle.activeTextColor
					}
				} else {
					return {
						color: this.navMenuStyle.textColor
					}
				}
			},
			iconColor2() {
				if(this.activeIndex == "2") {
					return {
						color: this.navMenuStyle.activeTextColor
					}
				} else {
					return {
						color: this.navMenuStyle.textColor
					}
				}
			}
		}
	}
</script>

<style>

</style>