<template>
	<div>
		<div class="right-component-item-header">
			<span @click="isRight=!isRight">
			<i class="el-icon-caret-right" v-show="isRight" ></i>
			<i class="el-icon-caret-bottom" v-show="!isRight" ></i>
			布局比例 </span>
			<!--<el-tooltip class="item" effect="dark" content="左、中、右总和等于24" placement="top">
				<i class="el-icon-info" style="cursor: pointer;"></i>
			</el-tooltip>-->
		</div>
		<div v-show="!isRight" class="right-component-item-content">
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="8">
					左侧
				</el-col>
				<el-col :span="16">
					<el-input-number size="large" v-model="layout.left" :min="0" :max="24" controls-position="right" @focus="changeleft"></el-input-number>
				</el-col>
			</el-row>
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="8">
					中间
				</el-col>
				<el-col :span="16">
					<el-input-number size="large" v-model="layout.center" :min="0" :max="24" controls-position="right" @focus="changecenter"></el-input-number>
				</el-col>
			</el-row>
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="8">
					右侧
				</el-col>
				<el-col :span="16">
					<el-input-number size="large" v-model="layout.right" :min="0" :max="24" controls-position="right" @focus="changeright"></el-input-number>
				</el-col>
			</el-row>
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="8">
				</el-col>
				<el-col :span="16" style="padding: 4px 0px;">
					提示：左、中、右总和等于24。
				</el-col>
			</el-row>
			
		</div>
	</div>
</template>

<script>
	const props = {
		layout: {
			type: Object,
			default: () => {
				return {
					left: 2,
					center: 5,
					right: 17
				}
			}
		}
	}
	export default {
		message: "布局比例设置",
		name: "LayoutScale",
		props: props,
		data() {
			return {
				isRight: true
			}
		},
		mounted() {

		},
		methods: {
               changeleft(){
               	  this.layout.left=24- this.layout.center-this.layout.right;
               },
               changecenter(){
               	  this.layout.center=24- this.layout.left-this.layout.right;
               },
               changeright(){
               	  this.layout.right=24- this.layout.left-this.layout.center;
               }
		},
		watch: {

		}
	}
</script>

<style>
	
</style>