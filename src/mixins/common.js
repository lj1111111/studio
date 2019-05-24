import Align from '../components/base/Align.vue'
import ACTION from '../constants/OperateAction.js'
/***
 * 功能组件公共
 */
const props = {
	ukey: {
		//ID KEY
		type: String,
		default: ''
	},
	selected: {
		//选择状态[目前不需要]
		type: Boolean,
		default: false
	},
	name: {
		//组件名称KEY
		type: String
	},
	label: {
		//组件标签
		type: String
	},
	version: {
		//组件版本号
		type: String
	},
	location: {
		type: Object,
		default: () => {
			return {
				left: 0,
				top: 0,
				width: 400,
				height: 300
			}
		}
	},
	params: {
		type: Object
	},
	cstyle: {
		type: Object
	},
	editmode: {
		type: Boolean, //true表示编辑模式
		default: false
	},
	pageConfig: {
		type: Object,
		default: () => {
			return {

			}
		}
	},
	scale: {
		type: Number
	}

}
export default {
	props,
	data() {
		return {};
	},
	methods: {
		handleOpAction(optype) {
			var size = this.pageConfig && this.pageConfig.screenSize.split(",");
			var width = Math.round(parseFloat(size[0]) * this.scale);
			var height = Math.round(parseFloat(size[1]) * this.scale);
			switch(optype) {
				case ACTION.OP_HOR_LEFT: //水平左对齐
					{
						if(this.location){
							this.location.left = 0;
						}
						break;
					}
				case ACTION.OP_HOR_CENTER: //水平居中对齐
					{
						if(this.location){
							this.location.left = Math.round((width-this.location.width)*.5);
						}
						break;
					}
				case ACTION.OP_HOR_RIGHT: //水平右对齐
					{
						if(this.location){
							this.location.left = width-this.location.width;
						}
						break;
					}
				case ACTION.OP_VER_TOP: //垂直顶端对齐
					{
						if(this.location){
							this.location.top = 0;
						}
						break;
					}
				case ACTION.OP_VER_CENTER: //垂直居中对齐
					{
						if(this.location){
							this.location.top = Math.round((height-this.location.height)*.5);
						}
						break;
					}
				case ACTION.OP_VER_BOTTOM: //垂直底部对齐
					{
						if(this.location){
							this.location.top = height-this.location.height;
						}
						break;
					}
				case ACTION.OP_LOC_HOR: //水平分布
					{
						break;
					}
				case ACTION.OP_LOC_VER: //垂直分布
					{
						break;
					}
			}
		},
	},
	computed: {
		locationObject() {
			//			var zindex = 0;
			//			if(this.ukey && this.ukey.split("_").length == 3) {
			//				zindex = this.ukey.split("_")[2] + 0;
			//			}
			return {
				left: this.location.left + "px",
				top: this.location.top + "px",
				width: (this.location.width) + "px",
				height: (this.location.height) + "px",
				"z-index": 1500
			}
		},
		styleObject() {
			return this.cstyle;
		}
	},
	components: {
		Align
	}
}