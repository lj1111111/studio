<template>
	<div>
		<div class="aside-header">
			页面设置
		</div>
		<el-row class="split-item" type="flex" align='middle' >
			<el-col :span="8">
				屏幕大小
			</el-col>
			<el-col :span="16">
				<el-select v-model="bgScreenSize" placeholder="请选择" >
					<el-option v-for="item in screens" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-col>
		</el-row>
		<el-row class="split-item" type="flex" align='middle'>
			<el-col :span="8">
				背景
			</el-col>
			<el-col :span="16">
				<div class="split-item-bg-img-container">
					<div :style="background">
					</div>
					<div @click.prevent="chooseFile">
						<span class="dragTemp-upload"><i class="el-icon-upload"></i>&nbsp;选择图片</span>
					</div>
				</div>
			</el-col>
		</el-row>
		<el-row class="split-item" type="flex" align='middle' justify="center">
			<el-col :span="8">
				背景色
			</el-col>
			<el-col :span="16">
				<ColorPicker v-model="bgColor"></ColorPicker>
			</el-col>
		</el-row>
		<el-row class="split-item" type="flex" align='middle'>
			<el-col :span="8">
				背景图
			</el-col>
			<el-col :span="16">
				<el-checkbox v-model="showBg">显示</el-checkbox>
			</el-col>
		</el-row>
		<el-row class="split-item" type="flex">
			<el-col :span="8">
				缩放方式
			</el-col>
			<el-col :span="16">
				<el-row type="flex" align='middle'>
					<el-col :span="24">
						<el-radio v-model="bgType" label="1">全屏铺满</el-radio>
					</el-col>
				</el-row>
				<el-row type="flex" align='middle' class='split-item-radio-top'>
					<el-col :span="24">
						<el-radio v-model="bgType" label="2">等比缩放宽度铺满</el-radio>
					</el-col>
				</el-row>
				<el-row type="flex" align='middle' class='split-item-radio-top'>
					<el-col :span="24">
						<el-radio v-model="bgType" label="3">等比缩放高度铺满</el-radio>
					</el-col>
				</el-row>
			</el-col>
		</el-row>
		<el-row class="split-item" type="flex" align='middle'>
			<el-col :span="8">
				标尺
			</el-col>
			<el-col :span="16">
				<el-checkbox v-model="selfShowRule">显示</el-checkbox>
			</el-col>
		</el-row>
		<el-row class="split-item" type="flex" align='middle'>
			<el-col :span="8">
				网格线
			</el-col>
			<el-col :span="16">
				<el-checkbox v-model="showGrid">显示</el-checkbox>
			</el-col>
		</el-row>
		<el-row class="split-item" type="flex" align='middle'>
			<el-col :span="8">
				网格间距
			</el-col>
			<el-col :span="16">
				<el-input-number v-model='gridSize' :min="4"  ></el-input-number>
			</el-col>
		</el-row>
		<el-row class="split-item" type="flex" align='middle'>
			<el-col :span="8">
				参考线
			</el-col>
			<el-col :span="16">
				<el-checkbox v-model="selfShowReferLine">显示</el-checkbox>
			</el-col>
		</el-row>
		
		<el-row class="split-item" type="flex" align='middle'>
			<el-col :span="8">
				组件捕捉
			</el-col>
			<el-col :span="16">
				<el-checkbox v-model="selfAlign">显示</el-checkbox>
			</el-col>
		</el-row>
		<el-row class="split-item-last" type="flex">
			<el-col :span="8">
				模板封面
			</el-col>
			<el-col :span="16">
				<el-row>
					<el-col>
						<el-button size="medium" @click="createSreen">截取封面</el-button>
						<el-button size="medium" @click.native="chooseTitlePageFile">上传图片</el-button>
					</el-col>
				</el-row>
				<el-row type="flex" align='middle'>
					<el-col>
						<div style="background-color: #0E2A42; height: 100px;margin-top: 10px;" :style="pjUrl">

						</div>
					</el-col>
				</el-row>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import ColorPicker from './base/ColorPicker.vue'
    import { mapState } from 'vuex'
	//支持的屏幕分辨率
	const screenArray = [{
		value: '1920,1200',
		label: '1920*1200 (16:10)'
	}, {
		value: '1920,1080',
		label: '1920*1080 (16:9)'
	}, {
		value: '1680,1050',
		label: '1680*1050 (16:10)'
	}, {
		value: '1440,900',
		label: '1440*900 (16:10)'
	}, {
		value: '1366,768',
		label: '1366*768 (16:9)'
	}, {
		value: '1024,768',
		label: '1024*768 (4:3)'
	}, {
		value: '1242,2208,phone',
		label: '1242*2208 (手机竖屏)'
	}, {
		value: '1080,1920,phone',
		label: '1080*1920 (手机竖屏)'
	}, {
		value: '720,1200,phone',
		label: '720*1200 (手机竖屏)'
	}, {
		value: '750,1334,phone',
		label: '750*1334 (手机竖屏)'
	}, {
		value: '2208,1242,phone',
		label: '2208*1242 (手机横屏)'
	}, {
		value: '1920,1080,phone',
		label: '1920*1080 (手机横屏)'
	}, {
		value: '1200,720,phone',
		label: '1200*720 (手机横屏)'
	}, {
		value: '1334,750,phone',
		label: '1334*750 (手机横屏)'
	}];
	const props = {
		pageConfig:{
			type:Object,
			default:()=>{
				return {
					screenSize:'1920,1080',
					backgroundImage:'',
					backgroundColor:'#0E2A42',
					thumbnail:'',
					backgroundType:'1',
					showGrid:true,
					gridSize:20,
					showBg:true
				}
			}
		},
		showRule:{
			type:Boolean,
			default:false
		},
		align:{
			//组件对齐
			type:Boolean,
			default:false
		},
		showReferLine:{
			type:Boolean, //参考线
			default:false
		}
	};
	export default {
		name: 'PageSetting',
		message: '页面设置',
		props: props,
		data() {
			return {
				screenArray,
				bgScreenSize: this.pageConfig.screenSize,
				bgBase64: this.pageConfig.backgroundImage,
				bgType: this.pageConfig.backgroundType,
				bgColor: this.pageConfig.backgroundColor,
				gridSize: this.pageConfig.gridSize,
				showGrid:this.pageConfig.showGrid,
				url:this.pageConfig.thumbnail,
				showBg:this.pageConfig.showBg,
				colors:'#FF0000',
				bTitlePage:false, //true表示封面图片,false表示背景图片
				selfShowRule:this.showRule,
				selfAlign:false,//组件对齐,true表示组件之间自动对齐
				selfShowReferLine:false//参考线,true表示显示参考线
			}
		},
		mounted(){
			this.selfAlign=this.align;
			this.selfShowReferLine=this.showReferLine;
		},
		computed: {
			background() {
				let size;
				switch(+this.bgType) {
					case 1:
						size = "100% 100%";
						break;
					case 2:
						size = "auto 100%";
						break;
					case 3:
						size = "100% auto";
						break;
					default:
						size = "100% 100%";
						break;
				}
				return {
					"background-image": this.bgBase64 ? "url(" + this.bgBase64 + ")" : "",
					"background-repeat": "no-repeat",
					"background-position": "center",
					"background-size": size,
					"background-color": this.bgColor
				}
			},
		    pjUrl(){
		    	return {
		    		"background-image": this.url ? "url(" + this.url + ")" : "",
					"background-repeat": "no-repeat",
					"background-size":'100% 100%',
					"background-position": "center"
		    	}
		    },
		    ...mapState([
				'screens'
			])
		},
		methods: {
			init(){
				this.bgScreenSize=this.pageConfig.screenSize;
				this.bgBase64=this.pageConfig.backgroundImage;
				this.bgType= this.pageConfig.backgroundType;
				this.bgColor= this.pageConfig.backgroundColor;
				this.gridSize= this.pageConfig.gridSize;
				this.showGrid=this.pageConfig.showGrid;
				this.url=this.pageConfig.thumbnail;
				this.showBg=this.pageConfig.showBg;
			},
			//分发截图事件
			createSreen(){
				this.$emit("screenshot");
			},
			trigger(ele, evname) {
				//IE
				if(document.all) {
					ele.evname();
				}
				// 其它浏览器
				else {
					var e = document.createEvent("MouseEvents");
					e.initEvent(evname, true, true);　　　　　　　　　　　　　　 //这里的click可以换成你想触发的行为
					ele.dispatchEvent(e);　　　 //这里的clickME可以换成你想触发行为的DOM结点
				}
			},
			chooseFile() {
				this.bTitlePage=false;
				let fileInput = document.createElement("input");
				fileInput.type = "file";
				this.trigger(fileInput, "click");
				fileInput.onchange = this.checkAndReadFile;
			},
			checkAndReadFile() {
				let e = arguments[0];
				let file = e.target.files[0];
				let name = file.name;
				let result = /\.[^\.]+/.exec(name);

				let testResult = result[0].toLowerCase();

				let _this = this;
				if(testResult != ".png" && testResult != ".jpg" && /*testResult != ".gif" &&*/ testResult != ".jpeg") {
					this.$message.error('文件类型不合法！');
					if(this.bTitlePage)
					{
						
					}
					else
					{
						this.bgBase64='';
					}
					return;
				}
				let reader = new FileReader();
				reader.onload = function() {
					if(_this.bTitlePage)
					{
						_this.url = this.result;
					}
					else
					{
						_this.bgBase64 = this.result;
					}
				}
				reader.readAsDataURL(e.target.files[0]);
			},
			//上传封面
			chooseTitlePageFile() {
				this.bTitlePage=true;
				let fileInput = document.createElement("input");
				fileInput.type = "file";
				this.trigger(fileInput, "click");
				fileInput.onchange = this.checkAndReadFile;
			}
		},
		watch:{
			bgScreenSize(newVal){
				this.pageConfig.screenSize=newVal;
			},
			bgColor(newVal){
				 this.pageConfig.backgroundColor=newVal;
			},
			bgBase64(newVal){
				this.pageConfig.backgroundImage=newVal;
			},
			url(newVal){
				 this.pageConfig.thumbnail=newVal;
			},
			bgType(newVal){
				 this.pageConfig.backgroundType=newVal;
			},
			gridSize(newVal){
				 this.pageConfig.gridSize=newVal;
			},
			showGrid(newVal){
				 this.pageConfig.showGrid=newVal;
			},
			showBg(newVal){
				 this.pageConfig.showBg=newVal;
			},
			pageConfig:{
				handler(newVal,oldVal){
					this.init();
				},
				deep:true	
			},
			selfShowRule(newVal){
				 this.$emit("rulestate",newVal);
			},
			selfAlign(newVal){
				 this.$emit("alignstate",newVal);
			},
			selfShowReferLine(newVal){
				 this.$emit("referlinestate",newVal);
			}
		},
		components:{
			ColorPicker
		}
		
	}
</script>

<style scoped>
	.aside-header {
		text-align: center;
		padding: 8px;
		background-color: #FBFDFF;
		border-bottom: solid 1px #DCDEE3;
		font-size: 18px;
	}
	
	.split-item {
		margin-left: 10px;
		padding: 10px;
		border-bottom: solid 1px #DCDEE3;
	}
	
	.split-item-last {
		margin-left: 10px;
		padding: 10px;
	}
	
	.split-item-radio-top {
		/*margin-left: 10px;*/
		padding-top: 10px;
	}
	
	.split-item-bg-img-container {
		display: flex;
		border: 1px dashed #BBBBBB;
		border-radius: 4px;
		flex-direction: column;
		align-items: center;
		padding: 10px;
	}
	
	.split-item-bg-img-container:hover {
		border-color: #66B1FF;
	}
	
	.split-item-bg-img-container>div:first-child {
		width: 60%;
		height: 80px;
		background-color: #0E2A42;
	}
	
	.split-item-bg-img-container>div:last-child {
		text-align: center;
		padding-top: 5px;
		cursor: pointer;
		color: #606266;
		font-size: 14px;
	}
</style>