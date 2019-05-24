<template>
	<div class="right-component-sub-title">
		<div class="right-component-item-header">
			<span @click="isRight=!isRight">
			<i class="el-icon-caret-right" v-show="isRight" ></i>
			<i class="el-icon-caret-bottom" v-show="!isRight" ></i>
			瓦片地图</span>
		</div>
		<div v-show="!isRight" class="right-component-item-content">
			<el-row class="right-component-item" style="padding: 8px 28px 4px;" type="flex" align='middle'>
				<el-col :span="8">
					自定义服务
				</el-col>
				<el-col :span="16">
					<el-checkbox v-model="publicMap.isCustomService">显示</el-checkbox>
				</el-col>
			</el-row>
			<!--自定义瓦片服务地址，目前只支持WMTS(EPSG:4326) -->
			<div v-if="publicMap.isCustomService">
				<el-row class="right-component-item" type="flex" align='middle'>
					<el-col :span="8">
						服务地址
					</el-col>
					<el-col :span="16">
						<el-input type="textarea" v-model="publicMap.titleUrl"  rows="10" ></el-input>
					</el-col>
				</el-row>
				<!--<el-row class="right-component-item" type="flex" align='middle'>
					<el-col :span="8">
						坐标系
					</el-col>
					<el-col :span="16">
						<el-select v-model="publicMap.epsg" placeholder="请选择" size="small">
							<el-option v-for="item in projects" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-col>
				</el-row>-->
			</div>
			<el-row class="right-component-item" type="flex" align='middle' v-if="!publicMap.isCustomService">
				<el-col :span="8">
					地图列表
				</el-col>
				<el-col :span="16">
					<div v-for="(item,index) in mapLists" :key="index">
						<el-row type="flex" align='middle'  style="padding: 4px 0px 4px;" justify="center">
							<el-col :span="24">
								<el-radio :label="item.id" v-model="publicMap.id">{{item.name}}</el-radio>
							</el-col>
						</el-row>
					</div>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
	import publicTileMap from '../../constants/PublicTileMap.js'
	const projects = [{
			label: "EPSG:4326",
			value: "EPSG:4326"
		},
		{
			label: "EPSG:3857",
			value: "EPSG:3857"
		}
	]
	const props = {
		publicMap: {
			type: Object,
			default: () => {
				return {
					isCustomService: true, //表示自定义地图,true表示自定义WMTS服务，4326坐标系
					id: 1, //内置底图编号
					titleUrl: 'http://www.njmap.gov.cn:8280/ResourcesProxy/Gateway/jcvxwrbcer/NJDLG_DT_NJ/wmts?layer=NJDLG_DT_10_20&tilematrixSet=Matrix_0&format=image/png', //当isCustomService为true需求设置此值
					epsg: "EPSG:4326" //预留字段
				}
			}
		}
	}
	export default {
		message: "瓦片地图",
		name: "TileMap",
		props: props,
		data() {
			return {
				isRight: true,
				mapLists: publicTileMap.mapLists,
				projects
			}
		}
	}
</script>

<style>

</style>