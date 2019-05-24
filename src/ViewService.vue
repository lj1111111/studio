<!--浏览应用模板-->
<template>
	<div id="view2" :style="contentStyle">
		<component v-for="(item,index) in compItems"  :key="index" :is="item.name" :ukey="item.id" :name='item.name' :location="item.location" :params='item.params' :cstyle='item.style' >

		</component>
	</div>
</template>

<script>
	//	import { loadViewAsyncComponents as loadAsyncComponents } from './utils/ManageComponents.js'
	import vsmixins from './mixins/vsmixins.js';
	export default {
		mixins: [vsmixins],
		name: 'ViewService',
		data() {
			return {
				isPreview: false, // true表示预览模式
				pageConfig: null,
				compItems: [],
				curSize: {}
			}
		},
		computed: {
			contentStyle() {
				if(this.pageConfig && this.pageConfig.style) {
					return this.pageConfig.style;
				} else {
					return {};
				}
			}
		},
		mounted() {
			var _self = this;
			var types = this.getLangDeviceTypes(Config.devicesTypes);
			this.$store.commit('setDevicesTypes', types);
			this.$store.commit('setToken', Config.token);//浏览时设置矢量平台万能TOKEN
			this.$nextTick(() => {
				if(Config.testMode) //评测模式
				{
					var space = Config.spaceRestUrl;
					this.$store.commit('setSpaceRestUrl', space);
					var serviceId = this.getUrlParam('id'); //模板ID
					var tokenId = this.getUrlParam("tokenId"); //
					var url = "";
					if(serviceId != undefined) {
						url = space + "/service?id=" + serviceId;
						this.$fetch(url).then((data) => {
							if(data && data.state == 0 && data.info && data.info.length > 0) {
								var result = data.info[0].item;
								result.serviceName = this.$t('track_big_analysis');
								document.title = result.serviceName ? this.$t('se_space') + "-" + result.serviceName : this.$t('se_space');
								var tempLateConfig = result.config;
								tempLateConfig = JSON.parse(tempLateConfig);
								this.pageConfig = tempLateConfig.page;
								var list = tempLateConfig.content;
								this.restoreCompontents(list);
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
					} else {
						this.$message({
							message: '必需参数不全！',
							type: 'warning'
						});
					};
					window.onresize = function resize() {
						var rect = _self.getRect("#view2");
						_self.curSize = {};
						_self.curSize.width = rect.width;
						_self.curSize.height = rect.height;
					};
				} else {
					var spurl = Config.spurl;
					var url2 = "";
					if(Config.debug) {
						url2 = Config.spurl + "/wbs";
					} else {
						url2 = "/wbs";
					}
					this.$fetch(url2).then(respone => {
						var space = respone.result.space;
						space = space.substring(0, space.length - 1);
						var sVer = this.$store.state.dbRestApiVer;
						this.$store.commit('setUrl', space);
						this.$store.commit('setDbUrl', space);
						this.$store.commit('setDbRestUrl', space + "/" + sVer);
						this.$store.commit('setSpaceRestUrl', space);
						//this.$store.commit('setAK', respone.result.ak);
						var serviceId = this.getUrlParam('id'); //模板ID
						var tokenId = this.getUrlParam("tokenId"); //
						var url = "";
						if(serviceId != undefined) {
							if(!tokenId) {
								url = space + "/service/" + serviceId;
							} else {
								url = space + "/service/public/" + serviceId + "?token=" + tokenId;
							}
							this.$fetch(url).then((data) => {
								if(data && data.code == 200 && data.result) {
									var result = data.result;
									document.title = result.serviceName ? this.$t('se_space') + "-" + result.serviceName : this.$t('se_space');
									var tempLateConfig = result.config;
									tempLateConfig = JSON.parse(tempLateConfig);
									this.pageConfig = tempLateConfig.page;
									var list = tempLateConfig.content;
									this.restoreCompontents(list);
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
						} else {
							this.$message({
								message: '必需参数不全！',
								type: 'warning'
							});
						};
						window.onresize = function resize() {
							var rect = _self.getRect("#view2");
							_self.curSize = {};
							_self.curSize.width = rect.width;
							_self.curSize.height = rect.height;
						};
					})
				}
			})
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
			/***
			 * 截取URL参数
			 * @param {Object} name
			 */
			getUrlParam(name) {
				//构造一个含有目标参数的正则表达式对象  
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
				//匹配目标参数  
				var r = window.location.search.substr(1).match(reg);
				//返回参数值  
				if(r != null) return unescape(r[2]);
				return null;
			},
			getRect(el) {
				//				var w=document.body.clientWidth;
				//				var h=document.body.clientHeight;
				//				w=window.innerWidth;
				//              h=window.innerHeight;
				//				return {
				//					width:w,
				//					height:h
				//				};
				var w = document.body.clientWidth;
				var h = document.body.clientHeight;
				return {
					width: w,
					height: h
				};
				//				let ele = document.querySelector(el);
				//				return ele ? ele.getBoundingClientRect() : undefined;
			},
			/***
			 * 恢复所有组件
			 */
			restoreCompontents(list) {
				var rect = this.getRect("#view2");
				//调整组件大小
				var newWidth = rect.width;
				var newHeight = rect.height;
				this.curSize.width = newWidth;
				this.curSize.height = newHeight;
				var size = this.pageConfig.size.split(",");
				var oldWidth = parseFloat(size[0]);
				var oldHeight = parseFloat(size[1]);
				var s1 = newWidth / oldWidth;
				var s2 = newHeight / oldHeight;

				list && list.forEach((item) => {
					if(item.location) //调整尺寸和位置
					{
						item.location.left = Math.round(newWidth / oldWidth * item.location.left);
						item.location.top = Math.round(newHeight / oldHeight * item.location.top);
						item.location.width = Math.round(newWidth / oldWidth * item.location.width);
						item.location.height = Math.round(newHeight / oldHeight * item.location.height);
					}
					this.adjustFontSize(item.params, s2);
				})
				this.compItems = list;
			},
			//调整组件字体大小
			adjustFontSize(obj, scale) {
				for(var a in obj) {
					if(typeof(a) == "string" && a == "fontSize") {
						obj[a] = Math.round(obj[a] * scale);
					}
					//显示URL的值
					if(typeof(obj[a]) == "object") {
						this.adjustFontSize(obj[a], scale); //递归遍历
					}
				}
			}
		},
		components: {
			//			SeMapD3:function (resolve) {
			//              //异步组件写法
			//              require(['./components/mapd3/SeMapD3.vue'], resolve)
			//          },
			//			SeTrackPlus: function (resolve) {
			//              //异步组件写法
			//              require(['./components/industry/trackplus/SeTrackPlus.vue'], resolve)
			//         },
			//			...loadAsyncComponents()
			//			//基本组件
			//			'SeBackground':()=>import('./components/graphics/SeBackground.vue'),
			//			'SeBorder':()=>import('./components/graphics/SeBorder.vue'),
			//			'SeTitle':()=>import('./components/text/SeTitle.vue'),
			//			'SeImage':()=>import('./components/graphics/SeImage.vue'),
			//			'SeVideo':()=>import('./components/graphics/SeVideo.vue'),
			//			'SeTime':()=>import('./components/graphics/SeTime.vue'),
			//			'SeNumberTitleFlop':()=>import('./components/graphics/SeNumberTitleFlop.vue'),
			//			//图表组件
			//			'SeBar':()=>import('./components/chart/SeBar.vue'),
			//			'SeLine':()=>import('./components/chart/SeLine.vue'),
			//			'SePie':()=>import('./components/chart/SePie.vue'),
			//			'SeGauge':()=>import('./components/chart/SeGauge.vue'),
			//			//时空组件
			//			'SeMap':()=>import('./components/map/SeMap.vue'),
			//	        'SeMapD3':()=>import('./components/mapd3/SeMapD3.vue'),
			//	        'SeTsHeatmap':()=>import('./components/space/SeTsHeatmap.vue'),
			//	        'SeTsAnalysis':()=>import('./components/space/SeTsAnalysis.vue')
		},
		watch: {
			"curSize": {
				handler(newVal, oldVal) {
					//调整组件大小
					var newWidth = newVal.width;
					var newHeight = newVal.height;
					var oldWidth = oldVal.width;
					var oldHeight = oldVal.height;
					var s1 = newWidth / oldWidth;
					var s2 = newHeight / oldHeight;

					this.compItems && this.compItems.forEach((item) => {
						if(item.location) //调整尺寸和位置
						{
							item.location.left = Math.round(newWidth / oldWidth * item.location.left);
							item.location.top = Math.round(newHeight / oldHeight * item.location.top);
							item.location.width = Math.round(newWidth / oldWidth * item.location.width);
							item.location.height = Math.round(newHeight / oldHeight * item.location.height);
						}
						this.adjustFontSize(item.params, s2);
					})
				},
				deep: true
			}
			//			,
			//			'compItems':{
			//				handler(){
			//					console.log("A");
			//				},
			//				deep:true
			//			}
		}

	}
</script>

<style>
	* {
		box-sizing: border-box;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
		/*margin: 0;
		padding: 0;
		font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;*/
	}
	
	html,
	body {
		margin: 0;
		padding: 0;
		height: 100%;
		width: 100%;
		min-width: 1024px;
		min-height: 768px;
		-moz-user-select: none;
		-khtml-user-select: none;
		user-select: none;
	}
	
	#view2 {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		width: 100%;
		height: 100%;
		position: relative;
		overflow: hidden;
	}
</style>