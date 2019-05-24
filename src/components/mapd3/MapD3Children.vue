<template>
	<div class="right-component-sub-title">
		<div class="right-component-item-header">
			<span @click="isRight=!isRight">
			<i class="el-icon-caret-right" v-show="isRight" ></i>
			<i class="el-icon-caret-bottom" v-show="!isRight" ></i>
			子组件管理</span>
		</div>
		<div v-show="!isRight" class="right-component-item-content">
			<div v-for="(item,index) in children" :key="item.id">
				<el-row class="right-component-item" type="flex" align='middle' style="padding-top:8px; padding-bottom: 8px; ">
					<el-col :span="20">
						<span class="span-item" @click="sendChildConfig(index)"><i class="el-icon-edit child-icon"></i><span>&nbsp;{{item.label}}_{{item.id}}</span></span>
					</el-col>
					<el-col :span="4">
						<span @click="deleteSubComponent(index)" class="span-item">
							<i class="el-icon-delete child-icon" ></i>&nbsp;删除
						</span>
					</el-col>
				</el-row>
				<el-row type="flex" align='middle' class="right-component-item-splitline">
				</el-row>
			</div>
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="6">
					选择组件
				</el-col>
				<el-col :span="18">
					<el-select placeholder="请选择" size="small" v-model="subComponent" style="width: 100%;">
						<el-option v-for="item in subComponents3D" :key="item.name" :label="item.label+'@'+item.version" :value="item.name">
						</el-option>
					</el-select>
				</el-col>
			</el-row>
			<el-row class="right-component-item" type="flex" align='middle' justify="center">
				<el-col :span="8" :offset="6">
					<el-button size="medium" style="color:#FFF;background-color:#106ba9;" @click.native="addSubComponent">添加子组件</el-button>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
	import { subComponents3D, createSubComponentConfig } from "../../utils/SubComponentsUtil.js"
	import { makeCode } from '../../utils/util.js'
	import TabType from '../../constants/TabType.js'
	const props = {
		children: {
			type: Array,
			default: () => {
				return []
			}
		},
		tab:{
			type:String,
			default:''
		}
	}
	export default {
		message: "子组件管理",
		name: "Map3DChildren",
		props: props,
		data() {
			return {
				subComponent: "",
				isRight: true,
				subComponents3D
			}
		},
		computed: {

		},
		components: {

		},
		methods: {
			sendChildConfig(index){
				this.$emit("childconfig",{
					"index":index,
					"tab":this.tab
				})
			},
			//增加子组件
			addSubComponent() {
				if(this.subComponent) {
					this.$confirm('确定要添加子组件?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						var obj = null;
						var id = makeCode();
						obj = createSubComponentConfig(this.subComponent, id);
						if(obj) {
							if(!this.children) {
								this.children = [];
							}
							this.children.push(obj);
							this.subComponent = "";
						} else {
							this.$message({
								message: '增加子组件失败！',
								type: 'error'
							});
						}
					}).catch(() => {});
				} else {
					this.$message({
						message: '请先选择组件！',
						type: 'warning'
					});
				}
			},
			//删除子组件
			deleteSubComponent(index) {
				this.$confirm('确定要删除子组件?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.children.splice(index, 1);
				}).catch(() => {});
			}
		},
		watch: {}
	}
</script>
<style scoped>
	.child-icon {
		color: #21aed7;
		/*#31606e*/
		font-weight: bold;
	}
	
	.span-item {
		cursor: pointer;
	}
	
	.span-item:hover {
		color: #21aed7;
		/*#31606e*/
		font-weight: bold;
	}
	.right-component-item {
		font-size: 14px;
		padding: 4px 8px 4px 24px;
	}
</style>