import ACTION from '../constants/OperateAction.js'

//所有选中组件的位置和大小
const selectBounds = {
	left: 0,
	top: 0,
	width: 0,
	height: 0
}
const Delta = 0.1; //每次放大或缩小的差值
export default {
	data() {
		return {
			msg: "",
			scale: 0.5,
			showLeft: true,
			showRight: true,
			isFullScreen: false,
			isPreview: false // true表示预览模式
		}
	},
	methods: {
		/****
		 * 左边组件显示控制
		 */
		controlLeftComponent() {
			this.showLeft = !this.showLeft;
		},
		/****
		 * 右边组件显示控制
		 */
		controlRightComponent() {
			this.showRight = !this.showRight;
		},
		switchFullScreen() {
			if(this.isFullScreen) {
				this.exitScreen();
			} else {
				this.fullScreen();
			}
			this.isFullScreen = !this.isFullScreen;
			this.updateContentMargin();
		},
		//进入全屏
		fullScreen() {
			var el = document.documentElement;
			var rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen;
			if(typeof rfs != "undefined" && rfs) {
				rfs.call(el);
			};
			return;
		},
		//退出全屏
		exitScreen() {
			if(document.exitFullscreen) {
				document.exitFullscreen();
			} else if(document.mozCancelFullScreen) {
				document.mozCancelFullScreen();
			} else if(document.webkitCancelFullScreen) {
				document.webkitCancelFullScreen();
			} else if(document.msExitFullscreen) {
				document.msExitFullscreen();
			}
			if(typeof cfs != "undefined" && cfs) {
				cfs.call(el);
			}
		},
		//放大
		zoomIn() {
			this.scale += Delta;
		},
		//缩小
		zoomOut() {
			if(this.scale.toFixed(10) >= 0.2.toFixed(10)) {
				this.scale -= Delta;
			}
		},
		//预览模式切换
		viewMode() {
			this.clearSelected();
			this.isPreview = !this.isPreview;
			if(this.isPreview) //
			{
				this.fullScreen();
				this.isFullScreen = true;
				this.showLeft = false;
				this.showRight = false;
			} else {
				this.exitScreen();
				this.isFullScreen = false;
				this.showLeft = true;
				this.showRight = true;
			}
			this.updateContentMargin();
		},
		//删除组件
		handleDeleteComponent(pv) {
			this.$confirm('确定要删除组件?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				if(pv != undefined) {
					this.compItems.splice(pv, 1);
					if(this.selectedComponent && this.selectedComponent.indexOf(pv) >= 0) {
						var index = this.selectedComponent.indexOf(pv);
						if(index >= 0) {
							this.selectedComponent.splice(index, 1);
						}
					}
				}
			}).catch(() => {});
		},
		//复制组件
		handleCopyComponent(pv) {
			this.$confirm('确定要复制组件?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				if(pv != undefined) {
					var temp = JSON.parse(JSON.stringify(this.compItems[pv])); //
					this.clearSelected();
					var sid = this.getCustomComponentID();
					temp.id = sid;
					temp.location.left = temp.location.left + 10;
					temp.location.top = temp.location.top + 10;
					let index = this.compItems ? this.compItems.length : 0;
					this.$set(this.compItems, index, temp);
					this.selectedComponent.push(index);
					let eleId = '#' + sid;
					this.interactDown(eleId, temp);
				}
			}).catch(() => {});
		},
		//  OP_HOR_LEFT: 1, //水平左对齐
		//	OP_HOR_CENTER: 2,
		//	OP_HOR_RIGHT: 3,
		//	OP_VER_TOP: 4, //垂直顶部对齐
		//	OP_VER_CENTER: 5,
		//	OP_VER_BOTTOM: 6,
		//	OP_LOC_HOR: 7, //水平分布
		//	OP_LOC_VER: 8, //垂直分布
		//	OP_LOC_AVG: 9 //平均分布
		//操作方式
		handleOpAction(optype) {
			var count = this.selectedComponent ? this.selectedComponent.length : 0;
			if(count > 1) {
				switch(optype) {
					case ACTION.OP_HOR_LEFT: //水平左对齐
						{
							var temp = this.compItems[this.selectedComponent[0]];
							var left = 0;
							if(temp && temp.location) {
								left = temp.location.left;
							}
							this.selectedComponent && this.selectedComponent.forEach((item, index) => {
								if(index > 0) {
									this.compItems[item].location.left = left;
								}
							})
							break;
						}
					case ACTION.OP_HOR_CENTER: //水平居中对齐
						{
							var temp = this.compItems[this.selectedComponent[0]];
							var center = 0;
							if(temp && temp.location) {
								center = Math.floor(temp.location.left + temp.location.width * 0.5);
							}
							this.selectedComponent && this.selectedComponent.forEach((item, index) => {
								if(index > 0) {
									var dx = center - Math.floor(this.compItems[item].location.left + this.compItems[item].location.width * 0.5);
									this.compItems[item].location.left += dx;
								}
							})
							break;
						}
					case ACTION.OP_HOR_RIGHT: //水平右对齐
						{
							var temp = this.compItems[this.selectedComponent[0]];
							var left = 0;
							if(temp && temp.location) {
								left = temp.location.left + temp.location.width;
							}
							this.selectedComponent && this.selectedComponent.forEach((item, index) => {
								if(index > 0) {
									var width = this.compItems[item].location.width;
									this.compItems[item].location.left = left - width;
								}
							})
							break;
						}
					case ACTION.OP_VER_TOP: //垂直顶端对齐
						{
							var temp = this.compItems[this.selectedComponent[0]];
							var top = 0;
							if(temp && temp.location) {
								top = temp.location.top;
							}
							this.selectedComponent && this.selectedComponent.forEach((item, index) => {
								if(index > 0) {
									this.compItems[item].location.top = top;
								}
							})
							break;
						}
					case ACTION.OP_VER_CENTER: //垂直居中对齐
						{
							var temp = this.compItems[this.selectedComponent[0]];
							var center = 0;
							if(temp && temp.location) {
								center = Math.floor(temp.location.top + temp.location.height * 0.5);
							}
							this.selectedComponent && this.selectedComponent.forEach((item, index) => {
								if(index > 0) {
									var dy = center - Math.floor(this.compItems[item].location.top + this.compItems[item].location.height * 0.5);
									this.compItems[item].location.top += dy;
								}
							})
							break;
						}
					case ACTION.OP_VER_BOTTOM: //垂直底部对齐
						{
							var temp = this.compItems[this.selectedComponent[0]];
							var top = 0;
							if(temp && temp.location) {
								top = temp.location.top + temp.location.height;
							}
							this.selectedComponent && this.selectedComponent.forEach((item, index) => {
								if(index > 0) {
									var height = this.compItems[item].location.height;
									this.compItems[item].location.top = top - height;
								}
							})
							break;
						}
					case ACTION.OP_LOC_HOR: //水平分布
						{
							if(count > 2) {
								var minIndex = 0;
								var maxIndex = 0;
								var minX = 0;
								var maxX = 0;
								var width1 = 0;
								var width2 = 0;
								var totalW = 0;
								this.selectedComponent && this.selectedComponent.forEach((item, index) => {
									totalW += this.compItems[item].location.width;
									if(index == 0) {
										minX = maxX = this.compItems[item].location.left;
										width1 = width2 = this.compItems[item].location.width;
										minIndex = maxIndex = 0;
									} else {
										if(minX > this.compItems[item].location.left) {
											minX = this.compItems[item].location.left;
											minIndex = index;
											width1 = this.compItems[item].location.width;
										}
										if(maxX < this.compItems[item].location.left) {
											maxX = this.compItems[item].location.left;
											maxIndex = index;
											width2 = this.compItems[item].location.width;
										}
									}
								})
								var dX = maxX - minX - width1;
								var totalW2 = totalW - width1 - width2;
								var splitLen = Math.floor((dX - totalW2) / (count - 2 + 1));
								var tempLeft = 0;
								this.selectedComponent && this.selectedComponent.forEach((item, index) => {
									if(index != minIndex && index != maxIndex) {
										tempLeft += splitLen;
										this.compItems[item].location.left = minX + width1 + tempLeft;
										tempLeft += this.compItems[item].location.width
									}
								})
							}
							break;
						}
					case ACTION.OP_LOC_VER: //垂直分布
						{
							if(count > 2) {
								var minIndex = 0;
								var maxIndex = 0;
								var minY = 0;
								var maxY = 0;
								var height1 = 0;
								var height2 = 0;
								var totalH = 0;
								this.selectedComponent && this.selectedComponent.forEach((item, index) => {
									totalH += this.compItems[item].location.height;
									if(index == 0) {
										minY = maxY = this.compItems[item].location.top;
										height1 = height2 = this.compItems[item].location.height;
										minIndex = maxIndex = 0;
									} else {
										if(minY > this.compItems[item].location.top) {
											minY = this.compItems[item].location.top;
											minIndex = index;
											height1 = this.compItems[item].location.height;
										}
										if(maxY < this.compItems[item].location.top) {
											maxY = this.compItems[item].location.top;
											maxIndex = index;
											height2 = this.compItems[item].location.height;
										}
									}
								})
								var dY = maxY - minY - height1;
								var totalH2 = totalH - height1 - height2;
								var splitLen = Math.floor((dY - totalH2) / (count - 2 + 1));
								var tempTop = 0;
								this.selectedComponent && this.selectedComponent.forEach((item, index) => {
									if(index != minIndex && index != maxIndex) {
										tempTop += splitLen;
										this.compItems[item].location.top = minY + height1 + tempTop;
										tempTop += this.compItems[item].location.height;
									}
								})
							}
							break;
						}
				}
			}
		},
		//画布区滚轮事件
		handleMouseWheel(event) {
			var getOffset = function(el) {
				if(!(el instanceof HTMLElement)) {
					console.log('getOffset发生错误，传进来的参数不是一个dom节点');
					return;
				}
				let left = 0,
					top = 0;
				while(el) {
					left += el.offsetLeft;
					top += el.offsetTop;
					if(el.getAttribute("id") == "container") {
						break;
					}
					el = el.offsetParent;
				}
				return {
					left: left,
					top: top
				}
			};
			if("wheelDelta" in event) {
				if(event.wheelDelta > 0) //放大
				{
					this.zoomIn();

				} else //缩小
				{
					this.zoomOut();
				}
			} else if("delta" in event) {
				if(event.wheelDelta > 0) //放大
				{
					this.zoomIn();
				} else //缩小
				{
					this.zoomOut();
				}
			}
			var ox = event.offsetX + getOffset(event.target).left;
			var oy = event.offsetY + getOffset(event.target).top;
			//console.log(ox + "|" + oy);
			var ele = document.querySelector(".app-content");
			ele.scrollLeft = ox;
			ele.scrollTop = oy;
		}
	},
	computed: {
		//当前比例转成百分数
		scalePercent() {
			var strData = parseInt(Math.round(this.scale * 100));
			var ret = strData.toString() + "%";
			return ret;
		},
		layoutState() {
			if(this.showLeft && !this.showRight) //仅左边可见
			{
				return 1;
			} else if(!this.showLeft && this.showRight) //仅右边可见
			{
				return 2;
			} else if(!this.showLeft && !this.showRight) //两边都不可见
			{
				return 3;
			} else { //两边都可见
				return 0;
			}
		},
		//预览模式下画布容器样式
		privewAppContentStyle() {
			if(this.isPreview) {
				return {
					"top": "0",
					"background-color": "#000000",
					"height": "calc(100% - 28px)"
				}
			}
			return "";
		}
	}
}