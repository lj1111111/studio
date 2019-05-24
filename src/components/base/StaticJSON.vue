<template>
	<div id="json-container" >
          
	</div>
</template>

<script>
	import JSONEditor from 'jsoneditor'
	const props = {
		jsonData: {
			type: [Array, Object]
		}
	}
	export default {
		message: "静态数据组件",
		name: "StaticJSON",
		props: props,
		data() {
			return {
				editor: null
			}
		},
		mounted() {
			this.showData();
		},
		methods: {
			showData() {
				this.$nextTick(() => {
					var _self = this;
					if(this.editor) {
						//this.editor.destroy();
					}
					var options = {
						onChange: function() {
							var json = _self.editor.get();
							_self.$emit("data-change", json);
						},
						isUseStudio: true
					};
					options.mode = 'code';
					options.modes = ['code', 'tree',"text"];
					var container = document.getElementById('json-container');
					if(container  ) {

						if(this.editor)
						{
							//this.editor.setText(  JSON.stringify(this.jsonData,null,"  "));
							this.editor.set( this.jsonData);
						}
						else
						{
							this.editor = new JSONEditor(container, options, this.jsonData);
						}
//						this.editor = new JSONEditor(container, options, this.jsonData);
					} else {
						console.log("staticjson-error");
					}
				})
			}
		},
		watch: {
			jsonData(newval, oldVal) {
				this.showData();
			}
		}
	}
</script>

<style>
	#json-container {
		font-size: 16px;
	}
</style>