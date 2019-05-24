<template>
	<div class="right-component-sub-title">
		<div class="right-component-item-header">
			<span @click="isRight=!isRight">
			<i class="el-icon-caret-right" v-show="isRight" ></i>
			<i class="el-icon-caret-bottom" v-show="!isRight" ></i>
			全局</span>
		</div>
		<div v-show="!isRight" class="right-component-item-content">
			<el-row class="right-component-item" type="flex" align='middle'>
				<el-col :span="8">
					背景色
				</el-col>
				<el-col :span="16">
					<ColorPicker v-model="background.bgColor"></ColorPicker>
				</el-col>
			</el-row>
			<el-row class="right-component-item" style="padding: 8px 28px 4px; " type="flex" align='middle'>
				<el-col :span="8" >
					自定义背景
				</el-col>
				<el-col :span="16">
					<el-checkbox v-model="background.showImage"></el-checkbox>
				</el-col>
			</el-row>
			<el-row class="right-component-item" type="flex" align='middle' v-show="background.showImage">
				<el-col :span="8">
					背景图
				</el-col>
				<el-col :span="16">
					<div class="split-item-bg-img-container">
						<div :style="backgroundStyle">
						</div>
						<div @click.prevent="chooseFile">
							<span class="dragTemp-upload"><i class="el-icon-upload"></i>&nbsp;选择图片</span>
						</div>
					</div>
				</el-col>
			</el-row>

		</div>
	</div>
</template>

<script>
	const props = {
		background: {
			type: Object,
			default: () => {
				return {
					showImage:false,
					bgColor: "#0E2A42",
					bgImage: ''
				}
			}
		}
	}
	import ColorPicker from '../base/ColorPicker.vue'
	export default {
		message: "背景全局组件",
		name: "BgGlobal",
		props: props,
		data() {
			return {
				isRight: true
			}
		},
		methods: {
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
				if(testResult != ".png" && testResult != ".jpg" && testResult != ".gif" && testResult != ".jpeg") {
					this.$message.error('文件类型不合法！');
					this.background.bgImage = '';
					return;
				}
				let reader = new FileReader();
				reader.onload = function() {
					_this.background.bgImage = this.result;
				}
				reader.readAsDataURL(e.target.files[0]);
			}
		},
		computed: {
			backgroundStyle() {
				return {
					"background-image": this.background.showImage && this.background.bgImage ? "url(" + this.background.bgImage + ")" : "",
					"background-repeat": "no-repeat",
					"background-position": "center",
					"background-size": "100% 100%",
					"background-color": this.background.bgColor
				}
			}
		},
		components: {
			ColorPicker
		},
		watch: {
		}
	}
</script>

<style scoped>
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