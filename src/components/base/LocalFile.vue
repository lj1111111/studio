<template>
	<el-row type="flex" >
		<el-col :span="8">
			选择文件：
		</el-col>
		<el-col :span="16">
			<div class="split-item-bg-img-container" @click.prevent="chooseFile">
				<i class="el-icon-upload"></i>
				<span>选择文件</span>
			</div>
		</el-col>
	</el-row>
</template>

<script>
	import Papa from 'papaparse'
	const props = {
		filter: {
			type: String,
			default: "csv"
		}
	}
	export default {
		message: "本地文件组件",
		name: "LocalFile",
		props: props,
		data() {
			return {

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
				//				let reader = new FileReader();
				//				reader.onload = function() {
				//					alert(this.result);
				//					//					_this.bgBase64 = this.result;
				//				}
				//				reader.readAsText(e.target.files[0]);
				let e = arguments[0];
				let file = e.target.files[0];
				let name = file.name;
				let result = /\.[^\.]+/.exec(name);

				let testResult = result[0].toLowerCase();

				let _this = this;
				if(testResult != '.' + this.filter) {
					this.$message.error('文件类型不合法！');
					return;
				}
				Papa.parse(file, {
					header: true,
					complete: function(results) {
						if(results.errors && results.errors.length>0)
						{
							_this.$emit("data-change", null);
						}
						else
						{
							_this.$emit("data-change", results.data);
						}
					}
				});
			}
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
		cursor: pointer;
	}
	
	.split-item-bg-img-container:hover {
		border-color: #66B1FF;
	}
	
	.split-item-bg-img-container>i {
		font-size: 32px;
		padding: 10px;
		color: #C0C4CC;
	}
</style>