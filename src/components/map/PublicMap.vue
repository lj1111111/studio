<template>
	<div class="right-component-sub-title">
		<div class="right-component-item-header">
			<span @click="isRight=!isRight">
			<i class="el-icon-caret-right" v-show="isRight" ></i>
			<i class="el-icon-caret-bottom" v-show="!isRight" ></i>
			公共底图</span>
		</div>
		<div v-show="!isRight" class="right-component-item-content">
			<div v-for="(item,index) in mapList" :key="index">
				<el-row class="right-component-item" style="padding: 8px 28px 4px;" type="flex" align='middle' justify="center" offset="6">
					<el-col :span="6">
						<el-radio :label="item.id" v-model="publicMap.id">{{item.name}}</el-radio>
					</el-col>
				</el-row>
			</div>
		</div>
	</div>
</template>

<script>
	import  PublicMapConstant from './PublicMapConstant.js'
	const props = {
		publicMap: {
			type:Object,
			default:()=>{
				return{
					id:'0'
				}
			}
		}
	}
	export default {
		message: "公共地图",
		name: "PublicMap",
		props: props,
		data() {
			return {
				isRight: true,
				mapList:PublicMapConstant.mapList
			}
		}
	}
</script>

<style>

</style>