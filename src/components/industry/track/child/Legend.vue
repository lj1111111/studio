<template>
	<div>
		<div class="right-component-item-header">
			<span @click="isRight=!isRight">
			<i class="el-icon-caret-right" v-show="isRight" ></i>
			<i class="el-icon-caret-bottom" v-show="!isRight" ></i>
		   图例说明</span>
		</div>
		<div v-show="!isRight" class="right-component-item-content">
			<el-row class="right-component-item" type="flex" align='middle' justify="center">
				<el-col :span="6" style="text-align: center;">
					<img src="../images/track_start.png" />
				</el-col>
				<el-col :span="6" style=" text-align: center;">
					<img src="../images/track_end.png" />
				</el-col>
				<el-col :span="6" style=" text-align: center;">
					<img src="../images/track_stop.png" />
				</el-col>
				<el-col :span="6" style=" text-align: center;">
					<img src="../images/track_jingguo.png" />
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
	export default {
		message: "图例说明组件",
		name: "Legend",
		data() {
			return {
				isRight: true
			}
		},
		mounted() {

		},
		methods: {

		},
		watch: {

		}
	}
</script>

<style>

</style>