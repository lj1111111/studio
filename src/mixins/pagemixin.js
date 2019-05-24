//全局页面参数
const pageConfig = {
	screenSize: '1920,1080',
	backgroundImage: '', //
	backgroundColor: '#FFF', //"#0e2a42", //'rgba(14, 42, 66, 1)',
	thumbnail: "http://www.superenginecloud.com/thumbnail/3181b1a37d82411192bb4e5388401af1.png",
	backgroundType: '1', //背景类型
	showGrid: true,
	showBg: false,
	gridSize: 20 //网格大小
}
export default {
	data() {
		return {
			pageConfig,
			aligned:true, //true表示组件自动对齐
			showReferLine:false, //参考线
		}
	},
	computed: {
		
		//标尺容器style
		ruleContainerStyle() {
			let size = this.pageConfig.screenSize.split(",");
			let width = Math.round(parseFloat(size[0]) * this.scale);
			let height = Math.round(parseFloat(size[1]) * this.scale);
			var d = 0;
			if(this.showRule) {
				d = 42;
			} else {
				d = 0;
			}
			var obj = {
				"width": width + d + "px",
				"height": height + d + "px"
			}
			obj["border"] = "1px solid #CCC";
			return obj;
		},
		//设置画布区样式
		appContentStyle() {
			let size = this.pageConfig.screenSize.split(",");
			let width = Math.round(parseFloat(size[0]) * this.scale);
			let height = Math.round(parseFloat(size[1]) * this.scale);
			var d = 0;
			if(this.showRule) {
				d = 42;
			} else {
				d = 0;
			}
			var obj = {
				"position": "absolute",
				"left": d + "px",
				"top": d + "px",
				"width": width + "px",
				"height": height + "px"
			}
			if(this.pageConfig.backgroundImage && this.pageConfig.showBg) {
				switch(+this.pageConfig.backgroundType) {
					case 1:
						size = "100% 100%"; //全部铺满
						break;
					case 2:
						size = "auto 100%"; //等比缩放宽度铺满
						break;
					case 3:
						size = "100% auto"; //等比缩放高度铺满
						break;
					default:
						size = "100% 100%";
						break;
				}
				obj["background-image"] = "url(" + this.pageConfig.backgroundImage + ")";
				obj["background-repeat"] = "no-repeat";
				obj["background-position"] = "center";
				obj["background-size"] = size;
			}
			if(this.pageConfig.backgroundColor) {
				obj["background-color"] = this.pageConfig.backgroundColor;
			}
			if(this.pageConfig.showGrid) {
				if(!this.pageConfig.showBg) {
					var td = this.pageConfig.gridSize;
					obj["background-image"] = "linear-gradient(transparent " + (td - 1) + "px, #CCC " + td + "px), linear-gradient(to right, transparent " + (td - 1) + "px, #CCC " + td + "px)";
					obj["background-size"] = td + "px " + td + "px";
					obj["background-repeat"] = "repeat";
				}
			}
			//			obj["border"] = "1px solid #CCC";
			return obj;
		},
		//获取当前画布区大小
		currentScreenSize() {
			let size = this.pageConfig.screenSize.split(",");
			let width = Math.round(parseFloat(size[0]) * this.scale);
			let height = Math.round(parseFloat(size[1]) * this.scale);
			return width.toString() + " * " + height.toString();
		}

	},
	methods: {
		/***
		 * 获取应用模板当前大小
		 */
		getCurSize(){
			let size = this.pageConfig.screenSize.split(",");
			let width = Math.round(parseFloat(size[0]) * this.scale);
			let height = Math.round(parseFloat(size[1]) * this.scale);
			return {
				width:width,
				height:height
			}
		},
		//调整组件字体大小
		adjustFontSize(obj, scale) {
			for(var a in obj) {
				if(typeof(a) == "string" && a == "fontSize") {
					//obj[a] = Math.round(obj[a] * scale);
					obj[a] = Math.round(obj[a] * scale);
				}
				//显示URL的值
				if(typeof(obj[a]) == "object") {
					this.adjustFontSize(obj[a], scale); //递归遍历
				}
			}
		},
		//生成页面配置参数
		getPageStyle() {
			var style = {};
			var size;
			if(this.pageConfig.backgroundImage) {
				switch(+this.pageConfig.backgroundType) {
					case 1:
						size = "100% 100%"; //全部铺满
						break;
					case 2:
						size = "auto 100%"; //等比缩放宽度铺满
						break;
					case 3:
						size = "100% auto"; //等比缩放高度铺满
						break;
					default:
						size = "100% 100%";
						break;
				}
				style["background-image"] = "url(" + this.pageConfig.backgroundImage + ")";
				style["background-repeat"] = "no-repeat";
				style["background-position"] = "center";
				style["background-size"] = size;
			}
			if(this.pageConfig.backgroundColor) {
				style["background-color"] = this.pageConfig.backgroundColor;
			}
			return {
				"size": this.pageConfig.screenSize,
				"style": style
			}
		}
	},
	watch: {
		appContentStyle(newVal, oldVal) {
			//调整组件大小
			var oldWidth = parseInt(oldVal.width);
			var oldHeight = parseInt(oldVal.height);
			var newWidth = parseInt(newVal.width);
			var newHeight = parseInt(newVal.height);
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
				this.adjustFontSize(item, s2);
			})
			//调整分隔线
			this.adjustGuideLine(newVal, oldVal);
		}
	}
}