export default {
	mounted() {
		this.createStyle();
	},
	methods: {
		createStyle() {
			var obj = {
				"position": "absolute",
				"display": "flex"
			};
			if(this.params.global.showBg) {
				obj["background-color"] = this.params.global.bgColor;
			}
			if(this.params.global.showBorder) {
				obj["border"] = this.params.global.borderWidth + "px solid " + this.params.global.borderColor;
			}
			if(this.params.global.showTitle) {
				obj["font-size"] = this.params.global.titleSize  + "px";
				obj["text-align"] = "center";
				obj["color"] = this.params.global.titleColor;
				if(this.params.global.titleLocation == "bottom") {
					obj["flex-direction"] = 'column';
				} else {
					obj["flex-direction"] = 'column-reverse';
				}
			}
			this.$emit("createstyle", obj);
		}
	},
	watch: {
		'params.global': {
			handler(curVal, oldVal) {　　
				this.createStyle();
			},
			deep: true
		}
	}
}
