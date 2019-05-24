<template>
	<el-dialog title="提示" :visible="selfVisible" width="30%" :before-close="handleClose">
		<pre v-html="htmlText">
		</pre>
	</el-dialog>
</template>

<script>
	const props = {
		jsonData: {
			type: [Array, Object]
		},
		show: {
			type: Boolean,
			default: false
		}
	}
	export default {
		name: "DataDialog",
		message: "数据对话框",
		props,
		data() {
			return {
				selfVisible:false
			};
		},
		mounted() {
			this.selfVisible = this.show;
		},
		computed: {
			htmlText() {
				return this.syntaxHighlight(this.jsonData);
			}
		},
		methods: {
			handleClose() {
				this.selfVisible = false;
				this.$emit("dialog-close",false);
			},
			syntaxHighlight(json) {
				if(typeof json != 'string') {
					json = JSON.stringify(json, undefined, 2);
				}
				json = json.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>');
				return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function(match) {
					var cls = 'number';
					var cs="color: darkorange;";
					if(/^"/.test(match)) {
						if(/:$/.test(match)) {
							cls = 'key';
							cs="color: red;";
						} else {
							cls = 'string';
							cs="color: green;";
						}
					} else if(/true|false/.test(match)) {
						cls = 'boolean';
						cs="color: blue;";
					} else if(/null/.test(match)) {
						cls = 'null';
						cs="color: magenta;";
					}
					return '<span style="' + cs + '">' + match + '</span>';
				});
			}
		},
		watch: {
			show(newVal) {
				this.selfVisible = newVal;
			}
		}
	};
</script>

<style scoped>
	pre {
		outline: 1px solid #ccc;
		padding: 5px;
		margin: 5px;
		height: 400px;
		overflow: auto;
	}
	
	.string {
		color: green;
	}
	
	.number {
		color: darkorange;
	}
	
	.boolean {
		color: blue;
	}
	
	.null {
		color: magenta;
	}
	
	.key {
		color: red;
	}
</style>