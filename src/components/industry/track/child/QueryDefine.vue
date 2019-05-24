<template>
	<div>
		<div class="right-component-item-header">
			<span @click="isRight=!isRight">
			<i class="el-icon-caret-right" v-show="isRight" ></i>
			<i class="el-icon-caret-bottom" v-show="!isRight" ></i>
			查询控制</span>
		</div>
		<div v-show="!isRight" class="right-component-item-content">
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="8">
					设备编号
				</el-col>
				<el-col :span="16">
					<el-input placeholder="请输入内容" v-model="code" @keyup.enter.native="searchPositon">
						 <i slot="suffix"  @click="searchPositon" style="color:#409EFF;cursor: pointer;" class="el-input__icon el-icon-location"></i>
                        <!-- <i slot="suffix" v-else style="color:#909399" class="el-input__icon el-icon-location"></i>-->
					</el-input>
				</el-col>
			</el-row>
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="8">
					自定义
				</el-col>
				<el-col :span="16">
					<el-checkbox v-model="isCustom">显示</el-checkbox>
				</el-col>
			</el-row>
			<!--已定义时间-->
			<el-row class="right-component-item" type="flex" align='middle' v-if="isCustom">
				<el-col :span="8">
					选择时间
				</el-col>
				<el-col :span="16">
					<el-select v-model="curTime" placeholder="请选择" style="width: 100% !important;">
						<el-option v-for="item in times" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-col>
			</el-row>
			<!--选择时间-->
			<el-row class="right-component-item" type="flex" align='middle' v-if="!isCustom">
				<el-col :span="8">
					开始时间
				</el-col>
				<el-col :span="16">
					<el-date-picker v-model="startTime" type="datetime" placeholder="选择日期时间" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" style="width: 100% !important;">
					</el-date-picker>
				</el-col>
			</el-row>
			<el-row class="right-component-item" type="flex" align='middle' v-if="!isCustom">
				<el-col :span="8">
					结束时间
				</el-col>
				<el-col :span="16">
					<el-date-picker v-model="endTime" type="datetime" placeholder="选择日期时间" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" style="width: 100% !important;">
					</el-date-picker>
				</el-col>
			</el-row>
			<el-row class="right-component-item" type="flex" align='middle' justify="center">
				<el-col :span="8" :offset="8"  style="text-align: center;">
					<el-button type="primary" plain size="small" @click="resetQueryDefine">重置</el-button>
				</el-col>
				<el-col :span="8"  style="text-align: center;">
					<el-button type="primary" plain size="small" @click="query">查询</el-button>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
	import moment from "moment"
	import { mapState } from 'vuex'
	import { LocationEvent } from '../js/constants.js'
	export default {
		message: "设备编号查询设置组件",
		name: "QueryDefine",
		data() {
			return {
				isRight: true,
				code: '', //设备编号
				isCustom: false, //true表示自定义
				startTime: '',
				endTime: '',
				curTime: 1,
				times: [{
						label: "一天",
						value: 1
					},
					{
						label: "三天",
						value: 3
					}, {
						label: "七天",
						value: 7
					}
				]
			}
		},
		mounted() {
           
		},
		methods: {
			//查询
            query(){
            	if(!this.code)
           	    {
           	    	this.$message.warning('设备号不能为空！');
           	    	return false;
           	    }
           	    if(this.isCustom)//自定义时间
           	    {
           	    	var dtime=moment();
           	    	this.startTime=dtime.subtract(this.curTime,'days').format("YYYY-MM-DD HH:mm:ss");
           	    	this.endTime=moment().format("YYYY-MM-DD HH:mm:ss");
           	    }
           	    if(!this.startTime || !this.endTime)
           	    {
           	    	this.$message.warning('请设置查询时间！');
           	    	return false;
           	    }  
           	    var data={
           	    	codes:[this.code],
           	    	startTime:this.startTime,
           	    	endTime:this.endTime
           	    }
           	    this.bus.$emit("queryTrackByCode",data)
           },
           searchPositon(){
            	if(!this.code)
           	    {
           	    	this.$message.warning('设备号不能为空！');
           	    	return false;
           	    }
           	    this.bus.$emit(LocationEvent,this.code);
           },
           resetQueryDefine(){
           	    this.code=''; //设备编号
				this.isCustom=false; //true表示自定义
				this.startTime='';
				this.endTime='';
           	    this.bus.$emit("resetQueryDefine");
           }
		},
		computed:{
			...mapState([
				'bus'
			])
		},
		watch: {

		}
	}
</script>

<style>

</style>