<template>
	<div v-clickoutside="close" class="color-picker-contain" @click.stop="showColorPicker" :class="{'color-show-down':showInTopOrBottom==='down','color-show-up':showInTopOrBottom==='up'}">
		<span :style="styleObject" >
			<div class="dragtemp-color-picker"  @click.stop  @dblclick="close">
				<chrome-picker v-model="colors"></chrome-picker> 
			</div>
		</span>

		<span>{{color}}</span>
	</div>
</template>
<script type="text/javascript">
	import { Chrome } from 'vue-color'
	import tinycolor from 'tinycolor2'
	import { Clickoutside } from '../../utils/directive.js'
	//elementUi内部的一个指令，复制粘贴到我的directive中。。。

	export default {
		name: 'ColorPicker',
		props: {
			value: {
				type: String,
				default: '#F00'
			}
		},
		directives: {
			Clickoutside
		},
		data() {
			let color2 = tinycolor(this.value);
			return {
				showInTopOrBottom: undefined,
				colors: {
					hex: color2.toHexString(),
					hsl: color2.toHsl(),
					hsv: color2.toHsv(),
					rgba: color2.toRgb(),
					a: color2._a
				},
				color: "rgba(" + [color2.toRgb().r, color2.toRgb().g, color2.toRgb().b, color2.toRgb().a].join(',') + ")"
			}
		},
		components: {
			'chrome-picker': Chrome
		},
		computed: {
			styleObject() {
				let color2 = null;
				if(this.color) {
					color2 = tinycolor(this.color);
				} else {
					color2 = tinycolor('#000');
				}
				if(color2._a == 0) {
					return {
						"background-image": "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAAGUlEQVQYV2M4gwH+YwCGIasIUwhT25BVBADtzYNYrHvv4gAAAABJRU5ErkJggg==)"
					};
				}
				else
				{
					return {
						"background-color": this.color
					};
				}
			}
		},
		watch: {
			colors: {
				immediate: true,
				handler(newVal) {
					let rgba = newVal.rgba;
					this.color = "rgba(" + [rgba.r, rgba.g, rgba.b, newVal.a].join(',') + ")";
				}
			},
			value(val) {
				let color2 = tinycolor(val);
				this.colors={
					hex: color2.toHexString(),
					hsl: color2.toHsl(),
					hsv: color2.toHsv(),
					rgba: color2.toRgb(),
					a: color2._a
				};
               // console.log(val);
			},
			color(newVal) {
				this.$emit('input', newVal);
			}
		},
		methods: {
			close() {
				this.showInTopOrBottom = undefined;
			},
			showColorPicker(e) {
				if(!e || e.clientY === undefined) {
					return;
				}
				if(e.clientY < document.body.offsetHeight / 2) {
					this.showInTopOrBottom = "down" === this.showInTopOrBottom ? undefined : "down";
				} else {
					this.showInTopOrBottom = "up" === this.showInTopOrBottom ? undefined : "up";
				}
			}
		},
		mounted() {
			//			document.body.addEventListener('mouseup', this.close, true)
		}
	}
</script>
<style scoped="scoped">
	.color-picker-contain {
		background-color: #FFF;
		display: flex;
		align-items: center;
		width: 100%;
		height: 40px;
		line-height: 40px;
		border: 1px solid #dcdfe6;
		font-size: 14px;
		cursor: pointer;
		border-radius: 4px;
	}
	
	.color-picker-contain>span:nth-child(1) {
		position: relative;
		display: inline-block;
		height: 24px;
		width: 24px;
		margin: 8px;
	}
	
	.dragtemp-color-picker {
		display: none;
		position: absolute;
		z-index: 2000;
		left: -50%;
		/*margin-left: -112px;*/
	}
	
	.color-show-down .dragtemp-color-picker {
		display: block;
		top: 100%;
		bottom: auto;
		margin-top: 10px;
	}
	
	.color-show-down .dragtemp-color-picker::after {
		content: "";
		position: absolute;
		bottom: 100%;
		left: 24px;
		margin-left: -8px;
		border-width: 8px;
		border-style: solid;
		z-index: 2;
		border-color: transparent transparent #000000 transparent;
	}
	
	.color-show-up .dragtemp-color-picker {
		display: block;
		bottom: 100%;
		top: auto;
		margin-bottom: 10px;
	}
	
	.color-show-up .dragtemp-color-picker::after {
		content: "";
		position: absolute;
		top: 100%;
		left: 24px;
		margin-left: -8px;
		border-width: 8px;
		border-style: solid;
		z-index: 2;
		border-color: #000000 transparent transparent transparent;
	}
</style>