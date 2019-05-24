<template>
	<div class="aside-container">
		<div class="aside-header">
			图层
		</div>
		<div class="aside-header aside-layer-cz">
			<i class="custom-iconfont icon-shangyiyiceng" title="上移一层" @click="moveUp"></i>
			<i class="custom-iconfont icon-xiayiyiceng" title="下移一层" @click="moveDown"></i>
			<i class="custom-iconfont icon-shangyi" title="置顶" @click="moveTop"></i>
			<i class="custom-iconfont icon-xiayi" title="置底" @click="moveBottom"></i>
		</div>
		<div class="aside-content">
			<div v-for="(item , index) in reverseComps" class="aside-content-item" style="display: flex;justify-content: space-around;align-items:center;" :class="{'aside-content-item-selected':item.selected}">
				<i class="custom-iconfont icon-choosehandle" style="font-size: 20px;" v-show="item.selected" @click="unSelect(item)"></i>
				<!--@click="item.selected=false"-  @click="unSelect(item)" -->
				<i class="custom-iconfont icon-xuanze" style="font-size: 20px;" v-show="!item.selected" @click="select(item)"></i>
				<!--@click="item.selected=true"- @click="select(item)"-->
				<img :src="item.url" @mouseenter="handleOver(index)" @mouseleave="handleOut(index)"></img>
			</div>
		</div>
		<div class="aside-footer">
			<span @click="deleteSelectedComps"><i class="el-icon-delete" >删除</i></span>
		</div>
	</div>
</template>

<script>
	const props = {
		comps: {
			type: Array,
			default: function() {
				var selected = false;
				var list = [];
				for(var i = 0; i < 8; i++) {
					list.push({
						id: i,
						url: './static/img/se-video.png',
						selected
					});
					if(i % 2 == 0) {
						selected = true;
					} else {
						selected = false;
					}
				}
				return list;
			}
		}
	}
	export default {
		name: 'AsideLayer',
		props: props,
		data() {
			return {};
		},
		computed: {
			reverseComps() {
				let copyArr2 = [...this.comps];
				return copyArr2.reverse();
			}
		},
		methods: {
			//移入组件
			handleOver(index) {
				if(this.comps && this.comps.length > 0) {
					this.$emit("mousechange", {
						"key": this.comps.length - 1 - index,
						"value": true
					});
				}
			},
			//移出组件
			handleOut(index) {
				if(this.comps && this.comps.length > 0) {
					this.$emit("mousechange", {
						"key": this.comps.length - 1 - index,
						"value": false
					});
				}
			},
			select(item) {
				item.selected = true;
				this.$emit("selectchange", item);
			},
			unSelect(item) {
				item.selected = false;
				this.$emit("selectchange", item);
			},
			swapItems(arr, index1, index2) {
				arr[index1] = arr.splice(index2, 1, arr[index1])[0];
				return arr;
			},
			//上移一层
			moveUp() {
				let list = this.getSelected();
				if(!list || list.length == 0) return;
				let len1 = list.length;
				let len2 = this.comps ? this.comps.length : 0;
				if(list[len1 - 1] == len2 - 1 || len1 == len2) return; //已经在底部,无法下移
				for(let i = len1 - 1; i >= 0; i--) {
					this.swapItems(this.comps, list[i], list[i] + 1);
					this.$emit("orderchange", {
						"key": list[i],
						"value": list[i] + 1
					});
				}
			},
			//下移一个
			moveDown() {
				let list = this.getSelected();
				if(!list || list.length == 0) return;
				let len1 = list.length;
				let len2 = this.comps ? this.comps.length : 0;
				if(list[0] == 0 || len1 == len2) return; //已经在顶部,无法上移
				list.forEach((value) => {
					this.swapItems(this.comps, value, value - 1);
					this.$emit("orderchange", {
						"key": value,
						"value": value - 1
					});
				});
			},
			//置顶
			moveTop() {
				let list = this.getSelected();
				if(!list || list.length == 0) return;
				let len1 = list.length;
				let len2 = this.comps ? this.comps.length : 0;
				if(list[len1 - 1] == len2 - 1 || len1 == len2) return; //已经在底部,无法下移
				let split = 0;
				split = len2 - list[len1 - 1] - 1;
				for(let i = len1 - 1; i >= 0; i--) {
					this.swapItems(this.comps, list[i], list[i] + split);
					this.$emit("orderchange", {
						"key": list[i],
						"value": list[i] + split
					});
				}
			},
			//置低
			moveBottom() {
				let list = this.getSelected();
				if(!list || list.length == 0) return;
				let len1 = list.length;
				let len2 = this.comps ? this.comps.length : 0;
				if(list[0] == 0 || len1 == len2) return; //已经在顶部,无法上移
				var split = list[0];
				list.forEach((value, index) => {
					this.swapItems(this.comps, value, value - split);
					this.$emit("orderchange", {
						"key": value,
						"value": value - split
					});
				});
			},
			//获取被选中的组件
			getSelected() {
				var list = [];
				this.comps && this.comps.forEach((item, index) => {
					if(item.selected) {
						list.push(index);
					}
				});
				return list;
			},
			//删除被选中的组件
			deleteSelectedComps() {
				var len = this.getSelected() ? this.getSelected().length : 0;
				if(len > 0) {
					this.$confirm('确定要删除已选中的组件?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						let nlen = this.comps ? this.comps.length : 0;
						for(var i = nlen - 1; i >= 0; i--) {
							if(this.comps[i].selected) {
								this.comps.splice(i, 1);
							}
						}
						this.$emit("deleteselectedcomponents");
					}).catch(() => {});
				}
			}
		}
	}
</script>

<style scoped>
	.aside-container {
		width: 160px;
		height: calc(100% - 70px);
		background-color: #F7F8FA;
		border-right: solid 1px #DCDEE3;
	}
	
	.aside-header {
		text-align: center;
		padding: 8px;
		background-color: #FBFDFF;
		border-bottom: solid 1px #DCDEE3;
		font-size: 18px;
	}
	
	.aside-content {
		height: calc(100% - 110px);
		overflow: auto;
	}
	
	.aside-content-item {
		text-align: center;
		padding: 12px 24px;
		background-color: #FBFDFF;
		border-bottom: solid 1px #DCDEE3;
		font-size: 20px;
	}
	
	.aside-layercontent-cz {
		padding: 8px 16px;
		display: flex;
		justify-content: space-between;
		/*color: #42B983;*/
		font-size: 20px;
	}
	
	.aside-layer-cz {
		padding: 8px 16px;
		display: flex;
		justify-content: space-between;
		/*color: #42B983;*/
		font-size: 20px;
	}
	
	.aside-layer-cz>i {
		cursor: pointer;
	}
	
	.aside-footer {
		position: absolute;
		bottom: 0px;
		width: 160px;
		text-align: center;
		padding: 8px;
		/*background-color: red;*/
		border-top: solid 1px #DCDEE3;
		font-size: 18px;
		cursor: pointer;
	}
	
	.aside-footer i {
		color: darkred;
	}
	
	i {
		color: #0d9dff;
	}
	
	::-webkit-scrollbar {
		/*滚动条整体样式*/
		width: 4px;
		/*高宽分别对应横竖滚动条的尺寸*/
		height: 1px;
	}
	
	::-webkit-scrollbar-thumb {
		/*滚动条里面小方块*/
		border-radius: 4px;
		-webkit-box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.2);
		background: #868282c4;
	}
	
	::-webkit-scrollbar-track {
		/*滚动条里面轨道*/
		-webkit-box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.2);
		border-radius: 4px;
		background: #EDEDED;
	}
	
	.aside-content-item>i {
		cursor: pointer;
	}
	
	.aside-content-item-selected {
		background-color: #E2F0F7;
	}
	
	.aside-content-item>img {
		width: 36px;
		height: 36px;
		display: inline-block;
	}
</style>