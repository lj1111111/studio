import ComponentType from '../constants/ComponentType'
import ComponentDefaultUtils from '../utils/ComponentDefaultUtils'
import { interactDrag, interactResize } from '../utils/InteractUtils.js'
import { tranformStr, getOffsetNew, getOffsetNew2 } from '../utils/util.js';
import DomEvent from '../utils/DomEvent.js';
import interact from 'interactjs'

//对象深度拷贝
//	const deepClone = (obj) => {
//		var proto = Object.getPrototypeOf(obj);
//		return Object.assign({}, Object.create(proto), obj);
//	}
const deepClone = (obj) => {
	return JSON.parse(JSON.stringify(obj));
}
export default {
	data() {
		return {
			compItems: [], //当前已添加到画布里的组件
			currentCompItem: {}, //当前被选中的一个组件，用于传输给组件设置界面
			prefix: "ms_v_", //动态组件ID前缀
			currentKey: 0, //生成组件ID号
			currentView: 'PageSetting',
			selectedComponent: [], //已选择组件的索引号
			hLineStyle: { //水平分隔线
				display: 'none',
				top: '0px'
			},
			hLineStyle2: { //水平分隔线
				display: 'none',
				top: '0px'
			},
			vLineStyle: { //垂直分隔线
				display: 'none',
				left: '0px'
			},
			vLineStyle2: { //垂直分隔线
				display: 'none',
				left: '0px'
			},
			bStart: false, //
			startX: 0, //开始左侧位置
			startY: 0, //开始顶部位置
			endX: 0, //开始左侧位置
			endY: 0, //开始顶部位置
			hGuideTop: 0, //水平参考线top位置
			vGuideLeft: 0, //垂直参考线left位置
			hGuideInfo: {
				show: false, //true表示显示
				left: 0
			}, //水平参考线提示信息
			vGuideInfo: {
				show: false,
				top: 0
			}, //垂直参考线提示信息
			domEvent: new DomEvent(),
		}
	},
	methods: {
		//组件画布区的父容器事件
		handleContainerMouseDown(event) {
			if(this.isPreview) {
				return false;
			}
//			console.log("parent");
//			console.log(event);
			var _self = this;
			var pID = "container";
			if(_self.isPreview) return;
			if(event.ctrlKey || event.shiftKey) //按住ctrl键或shift键
			{
				//_self.changeSelected(item, false);
			} else {
				this.clearSelected();
//				var x = 0;
//				var y = 0;
//				var obj = undefined;
//				if(event.target && event.target.id == pID) {
//					x = event.offsetX;
//					y = event.offsetY;
//				} else {
//					obj = getOffsetNew2(event.target, pID);
//					x = obj ? obj.left + event.offsetX : event.offsetX;
//					y = obj ? obj.top + event.offsetY : event.offsetY;
//				}
//				this.clearSelected();
//				var index = this.findComponentByXY(x, y);
//				if(index >= 0) {
//					var item = this.compItems[index];
//					item.selected = true;
//					//					this.dragAndResize("#"+item.id, '#'+pID);
//					this.$set(this.compItems, index, item);
//					this.selectedComponent.push(index);
//				}
			}
			event.preventDefault();
			event.stopPropagation();

		},
		//调整参考线
		adjustGuideLine(newVal, oldVal) {
			var oldWidth = parseInt(oldVal.width);
			var oldHeight = parseInt(oldVal.height);
			var newWidth = parseInt(newVal.width);
			var newHeight = parseInt(newVal.height);
			this.vGuideLeft = Math.round(newWidth / oldWidth * this.vGuideLeft);
			this.hGuideTop = Math.round(newHeight / oldHeight * this.hGuideTop);
		},
		guideMouseOver1() {
			this.hGuideInfo.show = true;
		},
		guideMouseOver2() {
			this.vGuideInfo.show = true;
		},
		guideMouseOut1() {
			this.hGuideInfo.show = false;
		},
		guideMouseOut2() {
			this.vGuideInfo.show = false;
		},
		addGuideMouseOverAndOut() {
			this.hGuide = !this.hGuide || document.querySelector("#guide-h");
			this.vGuide = !this.vGuide || document.querySelector("#guide-v");
			var self = this;
			if(this.hGuide && this.vGuide) {
				this.hGuide.over = this.domEvent.attach("mouseover", self.hGuide, self.guideMouseOver1);
				this.hGuide.out = this.domEvent.attach("mouseout", self.hGuide, self.guideMouseOut1);
				this.vGuide.over = this.domEvent.attach("mouseover", self.vGuide, self.guideMouseOver2);
				this.vGuide.out = this.domEvent.attach("mouseout", self.vGuide, self.guideMouseOut2);
			}

		},
		removeGuideMouseOverAndOut() {
			this.hGuide = !this.hGuide || document.querySelector("#guide-h");
			this.vGuide = !this.vGuide || document.querySelector("#guide-v");
			var self = this;
			if(this.hGuide && this.vGuide) {
				if(this.hGuide.over) {
					this.domEvent.detach("mouseover", self.hGuide, self.hGuide.over);
					this.domEvent.detach("mouseout", self.hGuide, self.hGuide.out);
				}
				if(this.vGuide.over) {
					this.domEvent.detach("mouseover", self.vGuide, self.vGuide.over);
					this.domEvent.detach("mouseout", self.vGuide, self.vGuide.out);
				}
			}
		},

		/****
		 * 参考线拖拽
		 */
		dragGuide(el, restrictel, mode) {

			if(mode != 1 && mode != 2) return false;
			var _self = this;
			interact(el).on('down', function(event) {
					_self.removeGuideMouseOverAndOut();
					//					console.log("down");
					//					console.log(event);
					var d = 4;
					//					var containerOffset = getOffsetNew(document.querySelector("#container"));
					//					var ele = document.querySelector("#container");
					//					var left = containerOffset && event.pageX - containerOffset.left;
					//					var top = containerOffset && event.pageY - containerOffset.top;
					if(mode == 1) //水平
					{
						_self.hGuideInfo.left = event.layerX + d * 2;
						_self.hGuideInfo.show = true;
						_self.vGuideInfo.show = false;
					} else if(mode == 2) //垂直
					{
						_self.vGuideInfo.top = event.layerY - d * 2 - 25; //top - d * 2 - 25;
						_self.hGuideInfo.show = false;
						_self.vGuideInfo.show = true;
					} else {
						_self.hGuideInfo.show = false;
						_self.vGuideInfo.show = false;
						_self.vGuideInfo.top = 0;
						_self.hGuideInfo.left = 0;
					}
					event.preventDefault();
					event.stopPropagation();
				}).on("move", function(event) {
					// _self.removeGuideMouseOverAndOut();
					var d = 4;
					//					var containerOffset = getOffsetNew(document.querySelector("#container"));
					//					var left = containerOffset && event.pageX - containerOffset.left;
					//					var top = containerOffset && event.pageY - containerOffset.top;
					if(mode == 1) //水平
					{
						_self.hGuideInfo.left = event.layerX + d * 2;
						_self.hGuideInfo.show = true;
						_self.vGuideInfo.show = false;
					} else if(mode == 2) //垂直
					{
						_self.vGuideInfo.top = event.layerY - d * 2 - 25;
						_self.hGuideInfo.show = false;
						_self.vGuideInfo.show = true;
					} else {
						_self.hGuideInfo.show = false;
						_self.vGuideInfo.show = false;
						_self.vGuideInfo.top = 0;
						_self.hGuideInfo.left = 0;
					}
				})
				.on("up", function(event) {
					//_self.removeGuideMouseOverAndOut();
				});
			interactDrag(el, {
				restrict: {
					restriction: restrictel,
					elementRect: {
						top: 0,
						left: 0,
						bottom: 1,
						right: 1
					}
				}
			}, _self.moveGuide, _self.endGuide, _self.startGuide);

		},
		//参考线拖拽过程中处理
		moveGuide(obj) {
			//console.log(obj);
			if(obj && obj.id == "#guide-v") {
				this.vGuideLeft += obj.left;
			} else if(obj && obj.id == "#guide-h") {
				this.hGuideTop += obj.top;
			}
		},
		startGuide() {
			this.removeGuideMouseOverAndOut();
		},
		endGuide() {
			this.addGuideMouseOverAndOut();
		},
		//切换状态
		changeSelected(item, bClearSelected) {
			let index1 = this.compItems.indexOf(item); //索引号
			if(index1 >= 0) {
				let index2 = this.selectedComponent.indexOf(index1);
				if(bClearSelected) {
					if(index2 < 0) {
						this.clearSelected();
					}
				}
				item.selected = true;
				this.$set(this.compItems, index1, item);
				if(bClearSelected) {
					if(index2 < 0) {
						this.selectedComponent.push(index1);
					}
				} else {
					if(index2 < 0) {
						this.selectedComponent.push(index1);
					}
				}
			}
		},
		//清除所有组件选中状态
		clearSelected() {
			//let _self = this;
			let list = this.selectedComponent;
			var len = list ? list.length : 0;
			for(var i = 0; i < len; i++) {
				let item = this.compItems[list[i]];
				//console.log(list[i]);
				item.selected = false;
				this.$set(this.compItems, list[i], item);
			}
			this.selectedComponent = [];
		},
		//调整被选中的组件大小和位置
		adjustSelectCompotentsLocation(deltaRect) {
			if(deltaRect && this.selectedComponent && this.selectedComponent.length > 0) {
				//调整自动对齐,目前只处理在一个组件被选中的情况
				var id = deltaRect.id; //组件元素的ID
				var tolerance = 2; //容差
				var bExist = false;
				var tempObj = {};
				//获取元素本身大小，不支持多选情况
				this.selectedComponent.forEach((item) => {
					if(this.compItems[item] && "#" + this.compItems[item].id == id) {
						tempObj.left = this.compItems[item].location.left + deltaRect.left;
						tempObj.top = this.compItems[item].location.top + deltaRect.top;
						tempObj.width = this.compItems[item].location.width + deltaRect.width;
						tempObj.height = this.compItems[item].location.height + deltaRect.height;
						bExist = true;
					}
				})
				//容器
				var panel = {
					leftSeparate: { //左边分隔线
						show: false,
						left: 0,
						top: 0,
						width: 0,
						height: 0
					},
					topSeparate: { //顶部分隔线
						show: false,
						left: 0,
						top: 0,
						width: 0,
						height: 0
					},
					rightSeparate: { //右侧分隔线
						show: false,
						left: 0,
						top: 0,
						width: 0,
						height: 0
					},
					bottomSeparate: { //底部分隔线
						show: false,
						left: 0,
						top: 0,
						width: 0,
						height: 0
					}
					//					leftSeparate: { //左边分隔线
					//						show: false,
					//						left: 0,
					//						top: 0,
					//						width: 1,
					//						height: 0
					//					},
					//					topSeparate: { //顶部分隔线
					//						show: false,
					//						left: 0,
					//						top: 0,
					//						width: 0,
					//						height: 1
					//					},
					//					rightSeparate: { //右侧分隔线
					//						show: false,
					//						left: 0,
					//						top: 0,
					//						width: 1,
					//						height: 0
					//					},
					//					bottomSeparate: { //底部分隔线
					//						show: false,
					//						left: 0,
					//						top: 0,
					//						width: 0,
					//						height: 1
					//					}
				};
				//参考线
				var guide = {
					hLine: {
						show: false,
						top: 0,
						dH: 0
					},
					vLine: {
						show: false,
						left: 0,
						dW: 0
					}
				}
				if(bExist && this.aligned) {
					var count = this.compItems ? this.compItems.length : 0;
					for(var i = count - 1; i >= 0; i--) {
						if("#" + this.compItems[i].id == id) continue; //排除自己
						var item = this.compItems[i].location;
						//左分隔线，比较left
						if(Math.abs(item.left - tempObj.left) <= tolerance) {
							if(panel.leftSeparate.show) {
								if(item.top < panel.leftSeparate.top) {
									panel.leftSeparate.top = item.top;
								}
								//取大
								var tHeight = item.top + item.height > panel.leftSeparate.top + panel.leftSeparate.height ? item.top + item.height - panel.leftSeparate.top : panel.leftSeparate.top + panel.leftSeparate.height - panel.leftSeparate.top;
								panel.leftSeparate.height = tHeight;
							} else {
								panel.leftSeparate.show = true;
								panel.leftSeparate.left = item.left;
								//取小
								panel.leftSeparate.top = item.top < tempObj.top ? item.top : tempObj.top;
								//取大
								var tHeight = item.top + item.height > tempObj.top + tempObj.height ? item.top + item.height - panel.leftSeparate.top : tempObj.top + tempObj.height - panel.leftSeparate.top;
								panel.leftSeparate.height = tHeight;
							}
						}
						//左分隔线，比较left+width
						if(Math.abs(item.left + item.width - tempObj.left) <= tolerance) {
							if(panel.leftSeparate.show) {
								if(item.top < panel.leftSeparate.top) {
									panel.leftSeparate.top = item.top;
								}
								//取大
								var tHeight = item.top + item.height > panel.leftSeparate.top + panel.leftSeparate.height ? item.top + item.height - panel.leftSeparate.top : panel.leftSeparate.top + panel.leftSeparate.height - panel.leftSeparate.top;
								panel.leftSeparate.height = tHeight;
							} else {
								panel.leftSeparate.show = true;
								panel.leftSeparate.left = item.left + item.width;
								//取小
								panel.leftSeparate.top = item.top < tempObj.top ? item.top : tempObj.top;
								//取大
								var tHeight = item.top + item.height > tempObj.top + tempObj.height ? item.top + item.height - panel.leftSeparate.top : tempObj.top + tempObj.height - panel.leftSeparate.top;
								panel.leftSeparate.height = tHeight;
							}
						}
						//顶分隔线，比较top
						if(Math.abs(item.top - tempObj.top) <= tolerance) {
							if(panel.topSeparate.show) {
								if(item.left < panel.topSeparate.left) {
									panel.topSeparate.left = item.left;
								}
								//取大
								var tWidth = item.left + item.width > panel.topSeparate.left + panel.topSeparate.width ? item.left + item.width - panel.topSeparate.left : panel.topSeparate.left + panel.topSeparate.width - panel.topSeparate.left;
								panel.topSeparate.width = tWidth;
							} else {
								panel.topSeparate.show = true;
								panel.topSeparate.top = item.top;
								//取小
								panel.topSeparate.left = item.left < tempObj.left ? item.left : tempObj.left;
								//取大
								var tWidth = item.left + item.width > tempObj.left + tempObj.width ? item.left + item.width - panel.topSeparate.left : tempObj.left + tempObj.width - panel.topSeparate.left;
								panel.topSeparate.width = tWidth;
							}
						}
						//顶分隔线，比较top+height
						if(Math.abs(item.top + item.height - tempObj.top) <= tolerance) {
							if(panel.topSeparate.show) {
								if(item.left < panel.topSeparate.left) {
									panel.topSeparate.left = item.left;
								}
								//取大
								var tWidth = item.left + item.width > panel.topSeparate.left + panel.topSeparate.width ? item.left + item.width - panel.topSeparate.left : panel.topSeparate.left + panel.topSeparate.width - panel.topSeparate.left;
								panel.topSeparate.width = tWidth;
							} else {
								panel.topSeparate.show = true;
								panel.topSeparate.top = item.top + item.height;
								//取小
								panel.topSeparate.left = item.left < tempObj.left ? item.left : tempObj.left;
								//取大
								var tWidth = item.left + item.width > tempObj.left + tempObj.width ? item.left + item.width - panel.topSeparate.left : tempObj.left + tempObj.width - panel.topSeparate.left;
								panel.topSeparate.width = tWidth;
							}
						}
						//右分隔线，比较right
						if(Math.abs(item.left - tempObj.left - tempObj.width) <= tolerance) {
							if(panel.rightSeparate.show) {
								if(item.top < panel.rightSeparate.top) {
									panel.rightSeparate.top = item.top;
								}
								//取大
								var tHeight = item.top + item.height > panel.rightSeparate.top + panel.rightSeparate.height ? item.top + item.height - panel.rightSeparate.top : panel.rightSeparate.top + panel.rightSeparate.height - panel.rightSeparate.top;
								panel.rightSeparate.height = tHeight;
							} else {
								panel.rightSeparate.show = true;
								panel.rightSeparate.left = item.left - tempObj.width;
								//取小
								panel.rightSeparate.top = item.top < tempObj.top ? item.top : tempObj.top;
								//取大
								var tHeight = item.top + item.height > tempObj.top + tempObj.height ? item.top + item.height - panel.rightSeparate.top : tempObj.top + tempObj.height - panel.rightSeparate.top;
								panel.rightSeparate.height = tHeight;
							}
						}
						//右分隔线，比较right+width
						if(Math.abs(item.left + item.width - tempObj.left - tempObj.width) <= tolerance) {
							if(panel.rightSeparate.show) {
								if(item.top < panel.rightSeparate.top) {
									panel.rightSeparate.top = item.top;
								}
								//取大
								var tHeight = item.top + item.height > panel.rightSeparate.top + panel.rightSeparate.height ? item.top + item.height - panel.rightSeparate.top : panel.rightSeparate.top + panel.rightSeparate.height - panel.rightSeparate.top;
								panel.rightSeparate.height = tHeight;
							} else {
								panel.rightSeparate.show = true;
								panel.rightSeparate.left = item.left + item.width - tempObj.width;
								//取小
								panel.rightSeparate.top = item.top < tempObj.top ? item.top : tempObj.top;
								//取大
								var tHeight = item.top + item.height > tempObj.top + tempObj.height ? item.top + item.height - panel.rightSeparate.top : tempObj.top + tempObj.height - panel.rightSeparate.top;
								panel.rightSeparate.height = tHeight;
							}
						}
						//底分隔线，比较bottom
						if(Math.abs(item.top - tempObj.top - tempObj.height) <= tolerance) {
							if(panel.bottomSeparate.show) {
								if(item.left < panel.bottomSeparate.left) {
									panel.bottomSeparate.left = item.left;
								}
								//取大
								var tWidth = item.left + item.width > panel.bottomSeparate.left + panel.bottomSeparate.width ? item.left + item.width - panel.bottomSeparate.left : panel.bottomSeparate.left + panel.bottomSeparate.width - panel.bottomSeparate.left;
								panel.bottomSeparate.width = tWidth;
							} else {
								panel.bottomSeparate.show = true;
								panel.bottomSeparate.top = item.top - tempObj.height;
								//取小
								panel.bottomSeparate.left = item.left < tempObj.left ? item.left : tempObj.left;
								//取大
								var tWidth = item.left + item.width > tempObj.left + tempObj.width ? item.left + item.width - panel.bottomSeparate.left : tempObj.left + tempObj.width - panel.bottomSeparate.left;
								panel.bottomSeparate.width = tWidth;
							}
						}
						//底分隔线，比较top+height
						if(Math.abs(item.top + item.height - tempObj.top - tempObj.height) <= tolerance) {
							if(panel.bottomSeparate.show) {
								//								if(item.left < panel.topSeparate.left) {
								//									panel.topSeparate.left = item.left;
								//								}
								//								//取大
								//								var tWidth = item.left + item.width > panel.topSeparate.left + panel.topSeparate.width ? item.left + item.width - panel.topSeparate.left : panel.topSeparate.left + panel.topSeparate.width - panel.topSeparate.left;
								//								panel.topSeparate.width = tWidth;
								panel.bottomSeparate.top = item.top + item.height - tempObj.height;
							} else {
								panel.bottomSeparate.show = true;
								panel.bottomSeparate.top = item.top + item.height - tempObj.height;
								//取小
								//panel.bottomSeparate.left = tempObj.left;//item.left < tempObj.left ? item.left : tempObj.left;
								//取大
								//var tWidth = item.left + item.width > tempObj.left + tempObj.width ? item.left + item.width - panel.topSeparate.left : tempObj.left + tempObj.width - panel.topSeparate.left;
								//panel.topSeparate.width = tWidth;
							}
						}
						//						if(Math.abs(item.top + item.height - tempObj.top - tempObj.height) <= tolerance) {
						//							if(panel.topSeparate.show) {
						//								if(item.left < panel.topSeparate.left) {
						//									panel.topSeparate.left = item.left;
						//								}
						//								//取大
						//								var tWidth = item.left + item.width > panel.topSeparate.left + panel.topSeparate.width ? item.left + item.width - panel.topSeparate.left : panel.topSeparate.left + panel.topSeparate.width - panel.topSeparate.left;
						//								panel.topSeparate.width = tWidth;
						//							} else {
						//								panel.topSeparate.show = true;
						//								panel.topSeparate.top = item.top + item.height - tempObj.height;
						//								//取小
						//								panel.topSeparate.left = item.left < tempObj.left ? item.left : tempObj.left;
						//								//取大
						//								var tWidth = item.left + item.width > tempObj.left + tempObj.width ? item.left + item.width - panel.topSeparate.left : tempObj.left + tempObj.width - panel.topSeparate.left;
						//								panel.topSeparate.width = tWidth;
						//							}
						//						}
					}
					//捕捉参考线
					if(this.showReferLine) //启用参考线
					{
						//处理水平参考线
						//比较TOP
						if(Math.abs(this.hGuideTop - tempObj.top) <= tolerance) {
							guide.hLine.show = true;
							guide.hLine.top = this.hGuideTop;
							guide.hLine.dH = 0;
						}
						//比较TOP+Height
						if(Math.abs(this.hGuideTop - tempObj.top - tempObj.height) <= tolerance) {
							guide.hLine.show = true;
							guide.hLine.top = this.hGuideTop;
							guide.hLine.dH = -tempObj.height;
						}
						//处理垂直参考线
						//比较LEFT
						if(Math.abs(this.vGuideLeft - tempObj.left) <= tolerance) {
							guide.vLine.show = true;
							guide.vLine.left = this.vGuideLeft;
							guide.vLine.dW = 0;
						}
						//比较LEFT+WIDTH
						if(Math.abs(this.vGuideLeft - tempObj.left - tempObj.width) <= tolerance) {
							guide.vLine.show = true;
							guide.vLine.left = this.vGuideLeft;
							guide.vLine.dW = -tempObj.width;
						}
					}
				}
				this.selectedComponent.forEach((item) => {
					if(this.compItems[item] && this.compItems[item].location) {
						//左右
						var left = 0;
						var width = 0;
						if(panel.leftSeparate.show && panel.rightSeparate.show) {
							this.compItems[item].location.left = panel.leftSeparate.show ? panel.leftSeparate.left : this.compItems[item].location.left + deltaRect.left;
							left = this.compItems[item].location.left;
							width = this.compItems[item].location.width;
							this.vLineStyle.display = "block";
							this.vLineStyle.left = left + "px";
							this.vLineStyle2.display = "block";
							this.vLineStyle2.left = left + width + "px";
						} else if(panel.leftSeparate.show && !panel.rightSeparate.show) {
							this.compItems[item].location.left = panel.leftSeparate.show ? panel.leftSeparate.left : this.compItems[item].location.left + deltaRect.left;
							left = this.compItems[item].location.left;
							this.vLineStyle.display = "block";
							this.vLineStyle.left = left + "px";
							this.vLineStyle2.display = "none";
							this.vLineStyle2.left = "0px";
						} else if(!panel.leftSeparate.show && panel.rightSeparate.show) {
							this.compItems[item].location.left = panel.rightSeparate.show ? panel.rightSeparate.left : this.compItems[item].location.left + deltaRect.left;
							left = this.compItems[item].location.left + this.compItems[item].location.width;
							this.vLineStyle.display = "block";
							this.vLineStyle.left = left + "px";
							this.vLineStyle2.display = "none";
							this.vLineStyle2.left = "0px";
						} else {
							if(guide.vLine.show) { //垂直参考线
								left = guide.vLine.left;
								this.compItems[item].location.left = left + guide.vLine.dW;
								this.vLineStyle.display = "block";
								this.vLineStyle.left = left + "px";
								this.vLineStyle2.display = "none";
								this.vLineStyle2.left = "0px";
							} else {
								this.compItems[item].location.left += deltaRect.left;
								this.vLineStyle.display = "none";
								this.vLineStyle.left = "0px";
								this.vLineStyle2.display = "none";
								this.vLineStyle2.left = "0px";
							}
						}
						//上下
						var top = 0;
						var height = 0;
						if(panel.topSeparate.show && panel.bottomSeparate.show) {
							this.compItems[item].location.top = panel.topSeparate.show ? panel.topSeparate.top : this.compItems[item].location.top + deltaRect.top;
							top = this.compItems[item].location.top;
							height = this.compItems[item].location.height;
							this.hLineStyle.display = "block";
							this.hLineStyle.top = top + "px";
							this.hLineStyle2.display = "block";
							this.hLineStyle2.top = top + height + "px";
						} else if(panel.topSeparate.show && !panel.bottomSeparate.show) {
							this.compItems[item].location.top = panel.topSeparate.show ? panel.topSeparate.top : this.compItems[item].location.top + deltaRect.top;
							top = this.compItems[item].location.top;
							this.hLineStyle.display = "block";
							this.hLineStyle.top = top + "px";
							this.hLineStyle2.display = "none";
							this.hLineStyle2.top = "0px";
						} else if(!panel.topSeparate.show && panel.bottomSeparate.show) {
							this.compItems[item].location.top = panel.bottomSeparate.show ? panel.bottomSeparate.top : this.compItems[item].location.top + deltaRect.top;
							top = this.compItems[item].location.top + this.compItems[item].location.height;
							this.hLineStyle.display = "block";
							this.hLineStyle.top = top + "px";
							this.hLineStyle2.display = "none";
							this.hLineStyle2.top = "0px";
						} else {
							if(guide.hLine.show) { //水平参考线
								top = guide.hLine.top;
								this.compItems[item].location.top = top + guide.hLine.dH;
								this.hLineStyle.display = "block";
								this.hLineStyle.top = top + "px";
								this.hLineStyle2.display = "none";
								this.hLineStyle2.top = "0px";
							} else {
								this.compItems[item].location.top += deltaRect.top;
								this.hLineStyle.display = "none";
								this.hLineStyle.top = top + "px";
								this.hLineStyle2.display = "none";
								this.hLineStyle2.top = "0px";
							}
						}
						this.compItems[item].location.width += deltaRect.width;
						this.compItems[item].location.height += deltaRect.height;
					}
				})
			}
		},
		//组件操作结束
		endFunc() {
			this.hLineStyle.display = "none";
			this.hLineStyle.top = "0px";
			this.hLineStyle2.display = "none";
			this.hLineStyle2.top = "0px";
			this.vLineStyle.display = "none";
			this.vLineStyle.left = "0px";
			this.vLineStyle2.display = "none";
			this.vLineStyle2.left = "0px";
		},
		dragAndResize(el, restrictel) {
			var _self = this;
			interactDrag(el, {
				restrict: {
					restriction: restrictel,
					elementRect: {
						top: 0,
						left: 0,
						bottom: 1,
						right: 1
					}
				}
			}, _self.adjustSelectCompotentsLocation, _self.endFunc);
			interactResize(el, {
				edges: {
					left: true,
					right: true,
					top: true,
					bottom: true
				},
				restrictEdges: {
					outer: restrictel,
					endOnly: true
				},
				inertia: true,
				restrictSize: {
					min: {
						width: 80,
						height: 40
					}
				}
			}, _self.adjustSelectCompotentsLocation, _self.endFunc)

		},
		//组件MOUSE事件处理
		interactDown(el, item) {
			var _self = this;
			interact(el).on('down', function(event) {
				if(_self.isPreview) return;
				if(event.ctrlKey || event.shiftKey) //未按住ctrl键
				{
					_self.changeSelected(item, false);
				} else {
					_self.changeSelected(item, true);
					_self.dragAndResize(el, '#container');
				}
				event.preventDefault();
				event.stopPropagation();
			}, false)
		},
		/****
		 * 弃用
		 */
		interactDown2(el) {
			var _self = this;
			interact(el).on('down', function(event) {
				if(_self.isPreview) return;
				if(event.ctrlKey || event.shiftKey) //未按住ctrl键
				{
					//					_self.changeSelected(item, false);
				} else {
					var offsetX = event.target.offsetLeft + event.target.offsetX;
					var offsetY = event.target.offsetTop + event.target.offsetY;
					_self.clearSelected();
					var index = this.findComponentByXY(offsetX, offsetY);
					if(index >= 0) {
						var item = this.compItems[index];
						item.selected = true;
						_self.$set(this.compItems, index, item);
						_self.selectedComponent.push(index);
					}
				}
			})
		},
		/***
		 * 根据x,y位置查找对应的组件
		 * return {Number}返回组件的索引号
		 */
		findComponentByXY(x, y) {
			if(x == undefined || y == undefined) return -1;
			var len = this.compItems ? this.compItems.length : 0;
			for(var i = len - 1; i >= 0; i--) {
				var item = this.compItems[i];
				var location = item && item.location ? item.location : null;
				if(!location) continue;
				if(x >= location.left && x <= location.left + location.width && y >= location.top && y <= location.top + location.height) {
					return i;
				}
			}
			return -1;
		},
		//添加组件
		handleAddComponent(pv) {
			if(!pv) {
				this.$message.error('组件添加失败！');
				return false;
			}
			var pConf = undefined;
			pConf = ComponentDefaultUtils.findDefaultOptionByName(pv.name, this.getCurSize());
			if(!pConf) {
				this.$message.error('组件初始化失败！');
				return false;
			}
			this.clearSelected();
			let index = this.compItems ? this.compItems.length : 0;
			var sid = this.getCustomComponentID();
			var temp = {
				id: sid
			};
			var obj = {};
			Object.assign(obj, pConf, temp, pv);
			obj.selected = true;
			var newObj = deepClone(obj);

			this.$set(this.compItems, index, newObj);
			this.selectedComponent.push(index);
			let eleId = '#' + sid;
			this.interactDown(eleId, newObj);
			//this.dragAndResize(eleId, '#container');
			//this.currentKey++;
			//			switch(pv.name) {
			//				case ComponentType.SE_BACKGROUND: //自定义背景
			//				case ComponentType.SE_IMAGE:
			//				case ComponentType.SE_VIDEO:
			//				case ComponentType.SE_TITLE:
			//				case ComponentType.SE_TABLE:
			//				case ComponentType.SE_PANEL:
			//				case ComponentType.SE_HLINE:
			//
			//				case ComponentType.SE_BAR:
			//				case ComponentType.SE_PIE:
			//				case ComponentType.SE_LINE:
			//				case ComponentType.SE_GAUGE:
			//				case ComponentType.SE_MAP:
			//				case ComponentType.SE_TS_HEATMAP:
			//				case ComponentType.SE_TS_ANALYSIS:
			//				case ComponentType.SE_QUICKLOCATION:
			//				case ComponentType.SE_ADDROUTE:
			//				case ComponentType.SE_CHARTTHEME:
			//				case ComponentType.SE_GRADESIZETHEME:
			//				case ComponentType.SE_GRADECOLORTHEME:
			//					{
			//
			//						this.$set(this.compItems, index, newObj);
			//						this.selectedComponent.push(index);
			//						let eleId = '#' + sid;
			//						this.interactDown(eleId, newObj);
			//						this.currentKey++;
			//						break;
			//					}
			//			}
		},
		getCustomComponentID() {
			var key = this.prefix + this.currentKey;
			this.currentKey++;
			return key;
		},
		//更新组件选中数组
		handleSelectChange(item) {
			if(this.compItems && this.compItems.indexOf(item) >= 0) {
				var compIndex = this.compItems.indexOf(item);
				if(this.selectedComponent) {
					if(this.selectedComponent.indexOf(compIndex) >= 0) {
						if(!item.selected) {
							var index2 = this.selectedComponent.indexOf(compIndex);
							this.selectedComponent.splice(index2, 1);
						}
					} else {
						if(item.selected) {
							this.selectedComponent.push(compIndex);
						}
					}
				}
			}
		},
		//调整选中组件的索引号
		handleOrderChange(data) {
			if(data && this.selectedComponent) {
				var index = this.selectedComponent.indexOf(data["key"]);
				if(index >= 0) {
					this.selectedComponent[index] = data["value"];
				}
			}
		},
		//删除选中组件
		handleDeleteSelectedComponents() {
			this.selectedComponent = [];
		},
		handleMouseChange(data) {
			if(data && this.compItems) {
				if(this.compItems[data["key"]] && data["value"]) {
					var item = this.compItems[data["key"]];
					item.mouseState = true;
					this.$set(this.compItems, data["key"], item);
				} else {
					var item = this.compItems[data["key"]];
					delete item.mouseState;
					this.$set(this.compItems, data["key"], item);
				}
			}
		}
	},
	computed: {
		hGuideStyle() {
			return {
				top: this.hGuideTop + "px"
			}
		},
		vGuideStyle() {
			return {
				left: this.vGuideLeft + "px"
			}
		},
		//水平参考线提示信息
		hGuideInfoStyle() {
			return {
				"display": this.hGuideInfo.show ? "block" : "none",
				"left": this.hGuideInfo.left + "px"
			}

		},
		//垂直参考线提示信息
		vGuideInfoStyle() {
			return {
				"display": this.vGuideInfo.show ? "block" : "none",
				"top": this.vGuideInfo.top + "px"
			}
		},
		//控制复制和删除是否显示,多选状态时不显示
		isShowAction() {
			return this.selectedComponent && this.selectedComponent.length == 1 ? true : false;
		},
		//控制第一个被选中的组件
		isShowMulComponentState() {
			return this.selectedComponent && this.selectedComponent.length > 1 ? true : false;
		},
		//控制第一个被选中的组件样式
		firstComponentStyle() {
			if(this.isShowMulComponentState) {
				let eleId = '#first001';
				//				this.dragAndResize(eleId, '.app-content-c1');
				//this.dragAndResize(eleId, '#container');
				var temp = this.compItems[this.selectedComponent[0]].location;
				return {
					"box-sizing": "border-box",
					"border": "2px solid #13CE66",
					//"background-color": "rgba(19, 206, 102, 0.34)",
					"position": "absolute",
					"left": temp.left + "px",
					"top": temp.top + "px",
					"width": temp.width + "px",
					"height": temp.height + "px",
					"z-index": 2000
				}
			} else {
				return {};
			}
		},
		//控制多个组件选中时，最大Bounds样式
		multyComponentStyle() {

			if(this.isShowMulComponentState) {
				let eleId = '#total001';
				var self=this;
				//this.interactDown2(eleId);
				//this.dragAndResize(eleId, '.app-content-c1');
				interact(eleId).on('down', function(event) {
				self.dragAndResize(eleId, '#container');
				event.preventDefault();
				event.stopPropagation();
			}, false)
				
				var minX = 0;
				var minY = 0;
				var maxX = 0;
				var maxY = 0;
				this.selectedComponent.forEach((item, index) => {
					var temp = this.compItems[item].location;
					if(index == 0) {
						minX = temp.left;
						minY = temp.top;
						maxX = temp.left + temp.width;
						maxY = temp.top + temp.height;
					} else {
						minX = minX > temp.left ? temp.left : minX;
						minY = minY > temp.top ? temp.top : minY;
						maxX = maxX < temp.left + temp.width ? temp.left + temp.width : maxX;
						maxY = maxY < temp.top + temp.height ? temp.top + temp.height : maxY;
					}
				})
				var d = 0;
				return {
					"box-sizing": "border-box",
					"border": "2px dashed #13CE66",
					"position": "absolute",
					"left": (minX - d) + "px",
					"top": (minY - d) + "px",
					"width": (maxX - minX + d * 2) + "px",
					"height": (maxY - minY + d * 2) + "px",
					"z-index": 2000
				}
			} else {
				return {};
			}
		}
	},
	watch: {
		selectedComponent(curVal, oldVal) {
			//关闭
			if(this.compItems && this.compItems.length > 0) {
				var len = this.compItems.length;
				oldVal && oldVal.forEach((val) => {
					if(val >= 0 && val < len) {
						let eleId = '#' + this.compItems[val].id;
						interact(eleId).draggable(false).resizable(false);
					}
				})
				curVal && curVal.forEach((val) => {
					let eleId = '#' + this.compItems[val].id;
					this.dragAndResize(eleId, '#container');
				})
			}
			let nlen = curVal ? curVal.length : 0;
			this.currentCompItem = {};
			if(nlen == 0) {
				this.currentView = 'PageSetting'; //默认页面设置
			} else if(nlen == 1) {
				//this.currentView = this.compItems[curVal[0]].name; //对应的组件属性设置
				let name = this.compItems[curVal[0]].name;
				this.currentView = tranformStr(name) + 'Setting';
				this.currentCompItem = this.compItems[curVal[0]];
				//				switch(name) {
				//					case ComponentType.SE_BACKGROUND: //自定义背景
				//						{
				//							this.currentView = 'SeBackgroundSetting';
				//							this.currentCompItem = this.compItems[curVal[0]];
				//							break;
				//						}
				//					case ComponentType.SE_BORDER: //边框
				//						{
				//							this.currentView = 'SeBorderSetting';
				//							this.currentCompItem = this.compItems[curVal[0]];
				//							break;
				//						}
				//					case ComponentType.SE_IMAGE:
				//						{
				//							this.currentView = 'SeImageSetting';
				//							this.currentCompItem = this.compItems[curVal[0]];
				//							break;
				//						}
				//					case ComponentType.SE_VIDEO:
				//						{
				//							this.currentView = 'SeVideoSetting';
				//							this.currentCompItem = this.compItems[curVal[0]];
				//							break;
				//						}
				//					case ComponentType.SE_TIME:
				//						{
				//							this.currentView = 'SeTimeSetting';
				//							this.currentCompItem = this.compItems[curVal[0]];
				//							break;
				//						}
				//					case ComponentType.SE_TITLE:
				//						{
				//							this.currentView = 'SeTitleSetting';
				//							this.currentCompItem = this.compItems[curVal[0]];
				//							break;
				//						}
				//					case ComponentType.SE_WEATHER: //天气
				//						{
				//							this.currentView = 'SeWeatherSetting';
				//							this.currentCompItem = this.compItems[curVal[0]];
				//							break;
				//						}
				//					case ComponentType.SE_NUMBERTITLEFLOP:
				//						{
				//							this.currentView = 'SeNumberTitleFlopSetting';
				//							this.currentCompItem = this.compItems[curVal[0]];
				//							break;
				//						}
				//					case ComponentType.SE_TABLE:
				//					case ComponentType.SE_PANEL:
				//					case ComponentType.SE_HLINE:
				//					case ComponentType.SE_BAR:
				//						{
				//							this.currentView = 'SeBarSetting';
				//							this.currentCompItem = this.compItems[curVal[0]];
				//							break;
				//						}
				//					case ComponentType.SE_LINE:
				//						{
				//							this.currentView = 'SeLineSetting';
				//							this.currentCompItem = this.compItems[curVal[0]];
				//							break;
				//						}
				//					case ComponentType.SE_PIE:
				//						{
				//							this.currentView = 'SePieSetting';
				//							this.currentCompItem = this.compItems[curVal[0]];
				//							break;
				//						}
				//					case ComponentType.SE_GAUGE:
				//						{
				//							this.currentView = 'SeGaugeSetting';
				//							this.currentCompItem = this.compItems[curVal[0]];
				//							break;
				//						}
				//					case ComponentType.SE_SCATTER: //散点图
				//						{
				//							this.currentView = 'SeScatterSetting';
				//							this.currentCompItem = this.compItems[curVal[0]];
				//							break;
				//						}
				//					case ComponentType.SE_RADAR: //雷达图
				//						{
				//							this.currentView = 'SeRadarSetting';
				//							this.currentCompItem = this.compItems[curVal[0]];
				//							break;
				//						}
				//					case ComponentType.SE_MAP:
				//						{
				//							this.currentView = 'SeMapSetting';
				//							this.currentCompItem = this.compItems[curVal[0]];
				//							break;
				//						}
				//					case ComponentType.SE_MAP_D3:
				//						{
				//							this.currentView = 'SeMapD3Setting';
				//							this.currentCompItem = this.compItems[curVal[0]];
				//							break;
				//						}
				//					case ComponentType.SE_TS_HEATMAP:
				//						{
				//							this.currentView = 'SeTsHeatmapSetting';
				//							this.currentCompItem = this.compItems[curVal[0]];
				//							break;
				//						}
				//					case ComponentType.SE_TS_ANALYSIS:
				//						{
				//							this.currentView = 'SeTsAnalysisSetting';
				//							this.currentCompItem = this.compItems[curVal[0]];
				//							break;
				//						}
				//					case ComponentType.SE_QUICKLOCATION:
				//					case ComponentType.SE_ADDROUTE:
				//					case ComponentType.SE_CHARTTHEME:
				//					case ComponentType.SE_GRADESIZETHEME:
				//					case ComponentType.SE_GRADECOLORTHEME:
				//						{
				//							break;
				//						}
				//				}
			} else if(nlen > 1) {
				this.currentView = "AlignSetting"; //排列布局
			}
		},
		//		compItems: {
		//			handler(curVal, oldVal) {　　　　　　　　　　　　
		//				this.selectedComponent = [];
		//				curVal && curVal.forEach((item, index) => {
		//					if(item.selected) {
		//						this.selectedComponent.push(index);
		//					}
		//				})　　
		//			},
		//			deep: true
		//		},
		'pageConfig.screenSize' (newval, oldval) {
			this.updateContentMargin();

		},
		scale(newval) {
			this.updateContentMargin();
		}
	}
}