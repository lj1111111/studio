<template>
	<div id="app" style="background-color: #FFF;" class="app-bg-grid ">
		<!--header-->
		<Header v-show="!isPreview" @addcomponent="handleAddComponent" @publish="handlePublish" @preview="handlePreview" @save="handleSave" :edit="isEdit"></Header>
		<!--left-->
		<AsideLayer v-show="showLeft" v-bind:comps="compItems" @selectchange="handleSelectChange" @orderchange="handleOrderChange" @deleteselectedcomponents="handleDeleteSelectedComponents" @mousechange="handleMouseChange"></AsideLayer>

		<div v-show="!isPreview" class="app-left-control" @click="controlLeftComponent" :class="{'app-left-location':showLeft}">
			<i v-show="showLeft" class="el-icon-d-arrow-left" title="收起"></i>
			<i v-show="!showLeft" class="el-icon-d-arrow-right" title="展开"></i>
		</div>

		<div v-show="!isPreview" class="app-right-control" @click="controlRightComponent" :class="{'app-right-location':showRight}">
			<i v-show="showRight" class="el-icon-d-arrow-right" title="收起"></i>
			<i v-show="!showRight" class="el-icon-d-arrow-left" title="展开"></i>
		</div>

		<div :style="privewAppContentStyle" class="app-content" :class="[layoutState==1 ? 'app-content-only-left' : '',layoutState==2 ? 'app-content-only-right' : '',layoutState==3 ? 'app-content-no-left-right' : '']">
			<div class="app-content-c1" id="rule-container" :style="[ruleContainerStyle,contentMargin]">
				<div :style="[appContentStyle]" id="container" @mousedown="handleContainerMouseDown" style="z-index: 50;">
					<!--@mousewheel="handleMouseWheel"-->
					<component v-for="(item,index) in compItems" :key="item.id" :is="item.name" :ukey="item.id" :name='item.name' :location="item.location" :params='item.params' :class="[item.selected?'component-selected':'component-unselected',item.mouseState?'com-mouse-state':'']" :cstyle='item.style' :editmode="!isPreview">
						<div v-show="isShowAction">
							<Action v-show='item.selected' :index="index" :name="item.name" @deletecomponent="handleDeleteComponent" @copycomponent="handleCopyComponent" :location="item.location">
							</Action>
						</div>
					</component>
					<!--多选状态下，第一个被选中的状态-->
					<div v-show="isShowMulComponentState" :style="firstComponentStyle" id="first001">

					</div>
					<!--多选状态下，计算最大bound-->
					<div v-show="isShowMulComponentState" id="total001" :style="multyComponentStyle">

					</div>
					<div v-show="!isPreview">
						<!--水平线1-->
						<div style="z-index:10000;height: 1px;width: 100%; border: dashed #FF0000 0.5px ;position: absolute;" :style="hLineStyle"></div>
						<!--水平线2-->
						<div style="z-index:10000;height: 1px;width: 100%; border: dashed #FF0000 0.5px ;position: absolute;" :style="hLineStyle2"></div>

						<!--垂直线1-->
						<div style="z-index:10000;height: 100%;width: 1px; border: dashed #FF0000 0.5px ;position: absolute;" :style="vLineStyle"></div>
						<!--垂直线2-->
						<div style="z-index:10000;height: 100%;width: 1px; border: dashed #FF0000 0.5px ;position: absolute;" :style="vLineStyle2"></div>
						<!--水平参考线-->
						<div :style="hGuideStyle" id="guide-h" v-show="showReferLine">
							<div class="guide-info" :style="hGuideInfoStyle">
								{{hGuideTop}}px
							</div>
						</div>
						<!--垂直参考线-->
						<div :style="vGuideStyle" id="guide-v" v-show="showReferLine">
							<div class="guide-info" :style="vGuideInfoStyle">
								{{vGuideLeft}}px
							</div>
						</div>
					</div>

				</div>
			</div>
		</div>
		<!--right-->
		<div class='right-container' v-show="showRight">
			<!--<keep-alive>
				<component :is="currentView" :page-config="pageConfig" :location="currentCompItem.location" :ukey="currentCompItem.id" :label="currentCompItem.label" :params='currentCompItem.params' :version="currentCompItem.version" @createstyle="handleCreateStyle" @opaction="handleOpAction">
				</component>
			</keep-alive>-->
			<component :is="currentView" :page-config="pageConfig" :scale="scale" :show-refer-line="showReferLine" :align="aligned" :location="currentCompItem.location" :ukey="currentCompItem.id" :label="currentCompItem.label" :params='currentCompItem.params' :version="currentCompItem.version" :show-rule="showRule" @createstyle="handleCreateStyle" @opaction="handleOpAction" @screenshot="handleScreenshot" @rulestate="handleRuleState" @alignstate="handleAlignState" @referlinestate="handleReferlineState">
			</component>
		</div>

		<!--footer-->
		<div class="app-footer" :class="[layoutState==1 ? 'app-footer-only-left' : '',layoutState==2 ? 'app-footer-only-right' : '',layoutState==3 ? 'app-footer-no-left-right' : '']">
			<div class="app-footer-c1">
				<span class="app-footer-padding">{{currentScreenSize}}</span>
				<i class="custom-iconfont icon-xianshiyanshi app-footer-padding" :title="isPreview?'预览模式':'编辑模式'" @click="viewMode"></i>
				<i class="el-icon-minus app-footer-padding" title="缩小" @click="zoomOut"></i>
				<span class="app-footer-padding">{{scalePercent}}</span>
				<i class="el-icon-plus app-footer-padding" title="放大" @click="zoomIn"></i>
				<i class="el-icon-rank app-footer-padding" :title="isFullScreen?'退出全屏':'进入全屏'" @click="switchFullScreen"></i>
			</div>
		</div>
		<DataDialog :show="bVisible" :json-data="jsonData" @dialog-close="bVisible=false"></DataDialog>
	</div>
</template>
<script>
	import {
		loadEditAsyncComponents
	} from './utils/ManageComponents.js'
	//import templateconfig from './json/templateconfig.json';
	import { deepClone } from './utils/util.js';
	import app from './mixins/app.js';
	import uiaction from './mixins/uiaction.js';
	import pagemixin from './mixins/pagemixin.js';
	//
	import DataDialog from './components/data/DataDialog.vue'
	//page组件 
	import Header from './components/page/Header.vue'
	import AsideLayer from './components/page/AsideLayer.vue'
	import Action from './components/base/Action.vue'
	import html2canvas from 'html2canvas'
	import { mapState } from 'vuex'
	//	const hasTemplate = false; //编辑已有模板

	export default {
		mixins: [app, uiaction, pagemixin],
		name: 'App',
		data() {
			return {
				startTime: '',
				curIndex: -1,
				contentMargin: {
					margin: '50px auto'
				},
				bVisible: false,
				jsonData: {},
				showRule: false,
			}
		},
		mounted() {
			//全局参数
			this.$store.commit('setUid', Config.uid);
			this.$store.commit('setToken', Config.token);
			this.$store.commit('setServiceInfo', Config.serviceInfo);
			this.$store.commit('setScreens', Config.screens);
			var types = this.getLangDeviceTypes(Config.devicesTypes);
			this.$store.commit('setDevicesTypes', types);
			console.log(this.$store.state);
			this.$nextTick(() => {
				//1表示水平,2表示垂直
				this.dragGuide("#guide-h", '#container', 1); //注册水平参考线
				this.dragGuide("#guide-v", '#container', 2); //注册垂直参考线
				if(Config.testMode) //评测模式
				{
					var space = Config.spaceRestUrl;
					this.$store.commit('setUrl', Config.spurl);
					this.$store.commit('setSpaceRestUrl', space);
					this.updateContentMargin();
					this.requestTemplate();
					this.bus.$on("dialog-data", this.handleDialogData);
				} else {
					var url = "";
					if(Config.debug) {
						url = Config.spurl + "/wbs";
					} else {
						url = "/wbs";
					}
					this.$fetch(url).then(respone => {
						var space = respone.result.space;
						space = space.substring(0, space.length - 1);
						this.$store.commit('setUrl', space);
						this.$store.commit('setDbUrl', space);
						var sVer = this.$store.state.dbRestApiVer;
						this.$store.commit('setDbRestUrl', space + "/" + sVer);
						this.$store.commit('setSpaceRestUrl', space);
						this.updateContentMargin();
						this.requestTemplate();
						this.bus.$on("dialog-data", this.handleDialogData);
					})
				}

			})
		},
		computed: {
			//true:表示修改已有模板,false表示新建模板
			isEdit() {
				if(this.$store.state.serviceInfo) {
					if(this.$store.state.serviceInfo.isEdit != undefined) {
						return this.$store.state.serviceInfo.isEdit;
					} else {
						return false;
					}
				} else {
					return false;
				}
			},
			...mapState([
				'bus'
			])
		},
		components: {
			DataDialog,
			Header,
			AsideLayer,
			Action,
			...loadEditAsyncComponents() //加载异步组件
		},
		methods: {
			//语言转换
			getLangDeviceTypes(list) {
				var array = [];
				list.forEach(item => {
					var skey = this.$t(item.key);
					if(skey) {
						if(item.key == "A1" || item.key == "B1" || item.key == "C1" || item.key == "D1" || item.key == "E1") //默认KEY
						{
							array.push({
								key: item.key,
								label: skey
							});
						} else {
							array.push({
								key: item.key,
								label: item.label
							});
						}
					} else {
						array.push({
							key: item.key,
							label: item.label
						});
					}
				})
				return array;
			},
			//显示查询数据对话框
			handleDialogData(data) {
				this.bVisible = true;
				this.jsonData = data;
			},
			handleRuleState(pv) {
				this.showRule = pv;
				this.updateContentMargin();
			},
			handleAlignState(pv) {
				this.aligned = pv;
			},
			handleReferlineState(pv) {
				this.showReferLine = pv;
			},
			//截图，生成封面
			handleScreenshot() {
				var _self = this;
				html2canvas(document.getElementById('container'), {
					preferCanvas: true,
					allowTaint: true,
					logging: false
				}).then(canvas => {
					try {
						var dataImg = canvas.toDataURL();
					} catch(err) {
						this.$message({
							message: '地图里第三方地图服务，无法截图，请使用第三方截图工具！',
							type: 'warning'
						});
						return;
					}
					var image = new Image();
					image.onload = function() {
						var newW = 200,
							newH = 150;
						var canvas2 = document.createElement("canvas");
						canvas2.width = newW;
						canvas2.height = newH;
						canvas2.getContext("2d").drawImage(image, 0, 0, image.width, image.height, 0, 0, newW, newH);
						var imageData = canvas2.toDataURL();
						_self.pageConfig.thumbnail = imageData;
					}
					image.src = dataImg;
				});
				//			    var _self=this;
				//				html2canvas(document.getElementById('container'), {
				//					preferCanvas: true,
				//					allowTaint: true,
				//					logging: false,
				//					//					width: 1200,
				//					//					height: 900,
				//					onrendered: function(canvas) {
				//						try {
				//							var dataImg = canvas.toDataURL();
				//						} catch(err) {
				//							this.$message({
				//									message: '地图里第三方地图服务，无法截图，请使用第三方截图工具！',
				//									type: 'warning'
				//								});
				//							return;
				//						}
				//						var image = new Image();
				//						image.onload = function() {
				//							var newW = 200,
				//								newH = 150;
				//							var canvas2 = document.createElement("canvas");
				//							canvas2.width = newW;
				//							canvas2.height = newH;
				//							canvas2.getContext("2d").drawImage(image, 0, 0, image.width, image.height, 0, 0, newW, newH);
				//							var imageData = canvas2.toDataURL();
				//							_self.pageConfig.thumbnail= imageData;
				//						}
				//						image.src = dataImg;
				//					},
				//				});
			},
			//发布
			handlePublish() {
				if(this.compItems && this.compItems.length > 0) //
				{
					this.$confirm('确定要发布吗?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						var spurl = this.$store.state.url;
						var uid = this.$store.state.uid;
						var serviceInfo = this.$store.state.serviceInfo;
						var rect = this.getRect("#container");
						if(rect == null || !spurl || !uid || !serviceInfo) {
							this.$message({
								message: '数据有误，无法发布！',
								type: 'warning'
							});
							return;
						}
						//调整组件大小
						var oldWidth = rect.width;
						var oldHeight = rect.height;
						var size = this.pageConfig.screenSize.split(",");
						var newWidth = parseFloat(size[0]);
						var newHeight = parseFloat(size[1]);
						var s1 = newWidth / oldWidth;
						var s2 = newHeight / oldHeight;
						var tempCompItems = deepClone(this.compItems);
						tempCompItems && tempCompItems.forEach((item) => {
							if(item.location) //调整尺寸和位置
							{
								item.location.left = Math.round(newWidth / oldWidth * item.location.left);
								item.location.top = Math.round(newHeight / oldHeight * item.location.top);
								item.location.width = Math.round(newWidth / oldWidth * item.location.width);
								item.location.height = Math.round(newHeight / oldHeight * item.location.height);
							}
							this.adjustFontSize(item, s2);
						})
						//console.log(tempCompItems);
						var createServiceURL = spurl + "/service?uid=" + uid;
						var configData = JSON.stringify({
							"page": this.getPageStyle(),
							"content": tempCompItems
						});
						var obj = {
							"serviceName": serviceInfo.serviceName,
							//"applyArea": serviceInfo.applyArea,
							"beOpen": serviceInfo.beOpen,
							"beShow": serviceInfo.beOpen, //serviceInfo.beShow,
							//"locked": that.$store.state.server.locked,
							"summary": serviceInfo.summary,
							"thumbnail": this.pageConfig.thumbnail,
							"config": configData
						};
						if(this.pageConfig.screenSize.split(",")[2] === "phone") {
							obj.mobileTemplate = 1;
						} else {
							obj.mobileTemplate = 0;
						}
						if(Config.testMode) { //软件评测模式，发布模板
							var tempRoot = this.$store.state.spaceRestUrl;
							createServiceURL = tempRoot + "/service";
							var headers = {
								'Content-Type': 'text/plain;charset=utf-8'
							};
							this.$post(createServiceURL, obj, headers).then((data) => {
								if(data && data.state == 0 && data.id != undefined) {
									window.open("./viewService.html?id=" + data.id);
								} else {
									this.$message({
										message: '发布失败！',
										type: 'warning'
									});
								}
							}).catch((error) => {
								this.$message({
									message: '发布失败！',
									type: 'warning'
								});
							})
						} else {
							this.$post(createServiceURL, obj, {
								"token": uid
							}).then((data) => {
								if(data && data.code == "200" && data.result && data.result.id != undefined) {
									//window.open("./viewService.html?id=" + data.result.id);
									window.open(spurl + "/service/view/" + data.result.id);
								} else {
									this.$message({
										message: '发布失败！',
										type: 'warning'
									});
								}
							}).catch((error) => {
								this.$message({
									message: '发布失败！',
									type: 'warning'
								});
							})
						}
					}).catch(() => {});
				} else {
					this.$message({
						message: '没有组件，无法发布！',
						type: 'warning'
					});
				}
			},
			//预览
			handlePreview() {
				if(this.compItems && this.compItems.length >= 0) //
				{
					this.isPreview = true;
					this.clearSelected();
					if(this.isPreview) //
					{
						this.fullScreen();
						this.isFullScreen = true;
						this.showLeft = false;
						this.showRight = false;
					}
					this.updateContentMargin();
				} else {
					this.$message({
						message: '没有组件，无法预览！',
						type: 'warning'
					});
				}
			},
			//保存模板
			handleSave() {
				if(this.compItems && this.compItems.length > 0) //
				{
					this.$confirm('确定要发布吗?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						var spurl = this.$store.state.url;
						var uid = this.$store.state.uid;
						var serviceInfo = this.$store.state.serviceInfo;
						var rect = this.getRect("#container");
						if(rect == null || !spurl || !uid || !serviceInfo) {
							this.$message({
								message: '数据有误，无法保存！',
								type: 'warning'
							});
							return;
						}
						//调整组件大小
						var oldWidth = rect.width;
						var oldHeight = rect.height;
						var size = this.pageConfig.screenSize.split(",");
						var newWidth = parseFloat(size[0]);
						var newHeight = parseFloat(size[1]);
						var s1 = newWidth / oldWidth;
						var s2 = newHeight / oldHeight;
						var tempCompItems = deepClone(this.compItems);
						tempCompItems && tempCompItems.forEach((item) => {
							if(item.location) //调整尺寸和位置
							{
								item.location.left = Math.round(newWidth / oldWidth * item.location.left);
								item.location.top = Math.round(newHeight / oldHeight * item.location.top);
								item.location.width = Math.round(newWidth / oldWidth * item.location.width);
								item.location.height = Math.round(newHeight / oldHeight * item.location.height);
							}
							this.adjustFontSize(item, s2);
						})
						//console.log(tempCompItems);
						var ServiceURL = spurl + "/service/template";
						var configData = JSON.stringify({
							"page": this.getPageStyle(),
							"content": tempCompItems
						});
						var obj = {
							"id": serviceInfo.applyID,
							"thumbnail": this.pageConfig.thumbnail,
							"config": configData
						};
						if(this.pageConfig.screenSize.split(",")[2] === "phone") {
							obj.mobileTemplate = 1;
						} else {
							obj.mobileTemplate = 0;
						}
						this.$put(ServiceURL, obj).then((data) => {
							if(data && data.code == "200") {
								//window.open("./viewService.html?id=" + serviceInfo.applyID);
								window.open(spurl + "/service/view/" + serviceInfo.applyID);
							} else {
								this.$message({
									message: '保存失败！',
									type: 'warning'
								});
							}
						}).catch((error) => {
							this.$message({
								message: '保存失败！',
								type: 'warning'
							});
						})
					}).catch(() => {});
				} else {
					this.$message({
						message: '没有组件，无法保存！',
						type: 'warning'
					});
				}
			},
			//获取样式
			handleCreateStyle(val) {
				this.currentCompItem.style = val;
			},
			/****
			 * 恢复模板
			 */
			restoreTemplate(configData) {
				this.restorePage(configData.page);
				this.restoreContents(configData.content);
			},
			/***
			 * 恢复Page参数
			 */
			restorePage(page) {
				if(!page) {
					console.log("页面全局配置参数不全");
					return;
				}
				if(page.size) {
					this.pageConfig.screenSize = page.size;
				}
				if(page.style && page.style["background-color"]) {
					this.pageConfig.backgroundColor = page.style["background-color"];
				}
				if(page.style && page.style["background-image"]) {
					this.pageConfig.backgroundImage = page.style["background-image"].slice(4, -1);
					this.pageConfig.showBg = true;
				}
				let size;
				switch(page && page.style["background-size"]) {
					case "100% 100%":
						size = 1;
						break;
					case "auto 100%":
						size = 2;
						break;
					case "100% auto":
						size = 3;
						break;
					default:
						size = 1;
						break;
				}
				this.pageConfig.backgroundType = size;
			},
			/***
			 * 恢复所有组件配置参数
			 */
			restoreContents(list) {
				var rect = this.getRect("#container");
				//调整组件大小
				var newWidth = rect.width;
				var newHeight = rect.height;
				var size = this.pageConfig.screenSize.split(",");
				var oldWidth = parseFloat(size[0]);
				var oldHeight = parseFloat(size[1]);
				var s1 = newWidth / oldWidth;
				var s2 = newHeight / oldHeight;

				list && list.forEach((item) => {
					var sid = this.getCustomComponentID();
					item.selected = false;
					item.id = sid;
					if(item.location) //调整尺寸和位置
					{
						item.location.left = Math.round(newWidth / oldWidth * item.location.left);
						item.location.top = Math.round(newHeight / oldHeight * item.location.top);
						item.location.width = Math.round(newWidth / oldWidth * item.location.width);
						item.location.height = Math.round(newHeight / oldHeight * item.location.height);
					}
					this.adjustFontSize(item.params, s2);
					var eleId = '#' + sid;
					this.interactDown(eleId, item);
				})
				this.compItems = list;
			},
			getRect(el) {
				let ele = document.querySelector(el);
				return ele ? ele.getBoundingClientRect() : undefined;
			},
			//请求模板
			requestTemplate() {
				//模板
				var spurl = this.$store.state.url;
				var uid = this.$store.state.uid;
				var serviceInfo = this.$store.state.serviceInfo;
				var url = "";
				var serviceId = undefined;
				var tokenId = undefined;
				if(serviceInfo) {
					serviceId = serviceInfo.applyID;
					tokenId = serviceInfo.token;
				}
				if(serviceId != undefined && serviceId != -999) {
					if(!tokenId) {
						url = spurl + "/service/" + serviceId;
					} else {
						url = spurl + "/service/public/" + serviceId + "?token=" + tokenId;
					}
					this.$fetch(url, {}, {
						"token": uid
					}).then((data) => {
						if(data && data.code == 200 && data.result) {
							var result = data.result;
							var configData = JSON.parse(result.config);
							this.pageConfig.thumbnail = result.thumbnail; //封面图片
							this.restoreTemplate(configData);
						} else {
							this.$message({
								message: '数据返回失败！',
								type: 'warning'
							});
						}
					}).catch((error) => {
						this.$message({
							message: '服务器请求失败！',
							type: 'warning'
						});
					})
				}
			},
			updateContentMargin() {
				var rect = this.getRect("#container");
				var rectParent = this.getRect(".app-content");
				if(rect && rectParent) {
					if(rectParent.height > rect.height) {
						var dy = (rectParent.height - rect.height) / 2;
						if(dy < 50) {
							dy = 50;
						}
						this.contentMargin["margin"] = dy + "px auto";
					}
				}
				if(this.showRule) {
					var evt = new Event();
					var dragdrop = new Dragdrop(evt);
					var rg = new RulersGuides(evt, dragdrop, "#rule-container", ".app-content");
				} else {
					var ele2 = document.querySelector(".rg-overlay");
					var childEle = document.querySelector("#rule-container");
					if(ele2 && childEle) {
						ele2.innerHTML = "";
						childEle && childEle.removeChild(ele2);
					}
				}
			}
		}
	}
</script>
<style>
	* {
		/*box-sizing: border-box;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;*/
	}
	
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: #2c3e50;
		background-color: #E8E7E8;
		width: 100%;
		height: 100%;
		position: relative;
	}
	
	.app-bg-grid {
		background-image: radial-gradient(tan 20%, transparent 0);
		background-size: 8px 8px;
	}
	
	.app-left-control {
		display: inline-block;
		position: absolute;
		top: 70px;
		text-align: center;
		padding: 6px 0;
		font-size: 16px;
		cursor: pointer;
		z-index: 10000;
	}
	
	.app-left-control>i {
		background-color: #EAF2F4;
		padding: 4px 2px;
	}
	
	.app-left-location {
		left: 160px;
	}
	
	.app-right-control {
		display: inline-block;
		position: absolute;
		top: 70px;
		text-align: center;
		padding: 6px 0;
		font-size: 16px;
		cursor: pointer;
		right: 0px;
		z-index: 10000;
	}
	
	.app-right-control>i {
		background-color: #EAF2F4;
		padding: 4px 2px;
	}
	
	.app-right-location {
		right: 360px;
	}
	
	.app-footer {
		display: inline-block;
		position: absolute;
		bottom: 0px;
		left: 160px;
		width: calc(100% - 160px - 360px);
		border-top: solid 1px #DCDEE3;
		background-color: #FFF;
		/*#F7F8FA;*/
	}
	
	.app-footer-only-left {
		left: 160px;
		width: calc(100% - 160px);
	}
	
	.app-footer-only-right {
		left: 0px;
		width: calc(100% - 360px);
	}
	
	.app-footer-no-left-right {
		width: 100%;
		left: 0px;
	}
	
	.app-footer-c1 {
		padding: 2px 20px;
		float: right;
		font-size: 18px;
		color: #13CE66;
	}
	
	.app-footer-c1>span {
		color: #666666;
		display: inline-block;
		font-size: 14px;
		padding: 4px 0px;
	}
	
	.app-footer-c1>i {
		cursor: pointer;
	}
	
	.app-footer-padding {
		padding-left: 4px;
	}
	
	.app-content {
		/*background-color: #2C3E50;*/
		/*display: flex;*/
		top: 70px;
		position: absolute;
		left: 160px;
		width: calc(100% - 160px - 360px);
		height: calc(100% - 70px - 28px);
		/*padding: 50px;*/
		overflow: auto;
	}
	
	.app-content-c1 {
		position: relative;
		margin: 50px auto;
		/*
		position: absolute;
	    left: 20%;
		top: 20%;
		transform: translate(-20%, -20%);*/
		color: #FFF;
		overflow: hidden;
	}
	
	.app-content-only-left {
		left: 160px;
		width: calc(100% - 160px);
	}
	
	.app-content-only-right {
		left: 0px;
		width: calc(100% - 360px);
	}
	
	.app-content-no-left-right {
		left: 0px;
		width: 100%;
	}
	
	#container {
		/*background-color: rgba(14, 42, 66, 1);*/
	}
	
	.grid-line {
		/*background-image: -webkit-linear-gradient(transparent 9px, #CCC 10px), -webkit-linear-gradient(left, transparent 9px, #CCC 10px);
		/* Safari 5.1 - 6.0 */
		/*background-image: -o-linear-gradient(transparent 9px, #CCC 10px), -o-linear-gradient(right, transparent 9px, #CCC 10px);
		/* Opera 11.1 - 12.0 */
		/*background-image: -moz-linear-gradient(transparent 9px, #CCC 10px), -moz-linear-gradient(right, transparent 9px, #CCC 10px);
		/* Firefox 3.6 - 15 */
		background-image: linear-gradient(transparent 19px, #CCC 20px), linear-gradient(to right, transparent 19px, #CCC 20px);
		border: 1px solid #CCC;
		/*box-shadow: 0px 0px 2px #888888;*/
		background-size: 20px 20px;
		background-repeat: repeat;
	}
	
	.app-content::-webkit-scrollbar {
		width: 8px;
		height: 8px;
	}
	
	.app-content::-webkit-scrollbar-thumb {
		border-radius: 4px;
		-webkit-box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.2);
		background: #868282c4;
	}
	
	.app-content::-webkit-scrollbar-track {
		-webkit-box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.2);
		border-radius: 8px;
		background: #EDEDED;
	}
	
	.app-content.aside-content-item>i {
		cursor: pointer;
	}
	
	.app-content.aside-content-item-selected {
		background-color: #9cd9dc;
	}
	
	.com-mouse-state {
		opacity: 0.6;
		border: 1px dashed #13CE66;
		/*box-shadow:inset 0 0 15px 15px red;*/
	}
	
	.el-input-number {
		width: 100%;
	}
	
	#guide-h {
		z-index: 9999;
		height: 4px;
		width: 100%;
		border-top: 1px dashed #0000FF;
		position: absolute;
		cursor: row-resize;
	}
	
	#guide-v {
		z-index: 9999;
		height: 100%;
		width: 4px;
		border-left: 1px dashed #0000FF;
		position: absolute;
		cursor: col-resize;
	}
	
	.guide-info {
		width: 50px;
		height: 25px;
		line-height: 25px;
		text-align: center;
		position: relative;
		font-size: 13px;
		background-color: #eee;
		border: solid 1px #ccc;
		color: #000;
	}
</style>