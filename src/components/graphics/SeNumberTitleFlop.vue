<template>
	<div style="position: absolute; " :id="ukey" :style="locationObject">
		<div style="position: absolute;width:100%; height: 100%;" >
			<div :style="titleStyle"> 
				{{ title }}
			</div>
			<div style="margin-top:16px;">
			    <span :style="prefixStyle" style="vertical-align: bottom;" > 
			          {{params.option.prefix.content}}
                </span>
			    <span :style="numbersStyle" style="vertical-align: bottom;"> 
	                  {{num}}
                </span>
                <span :style="suffixStyle" style="vertical-align: bottom;">
	                  {{params.option.suffix.content}}
                </span>
			</div>
		</div>
		<slot></slot>
	</div>
</template>
<script>
	import ComMixinBase from '../base/ComMixinBase.js'
	import {
		getField,numberFormat
	} from '../../utils/util.js'
	const FNAME = "name";
	const FVALUE = "value";
	export default {
		message: '数字翻牌器组件',
		name: 'SeNumberTitleFlop',
		mixins: [ComMixinBase],
		data() {
			return {
				title: "",
				num: 0
			}
		},
		computed: {
			//标题样式
			titleStyle() {
				var textStyle = this.params.option.title.textStyle;
				return this.createTextStyle(textStyle);
			}, //前缀样式
			prefixStyle() {
				var textStyle = this.params.option.prefix.textStyle;
				return this.createTextStyle(textStyle);
			}, //数字器样式
			numbersStyle() {
				var textStyle = this.params.option.numbers.textStyle;
				return this.createTextStyle(textStyle);
			}, //后缀样式
			suffixStyle() {
				var textStyle = this.params.option.suffix.textStyle;
				return this.createTextStyle(textStyle);
			}, //前缀
			showSuffix() {
				if(this.params.option.suffix.content) {
					return true;
				} else {
					return false;
				}
			}, //后缀显示
			showSuffix() {
				if(this.params.option.suffix.content) {
					return true;
				} else {
					return false;
				}
			}
		},
		methods: {
			formatMessage(name, value) {
				this.title = name;
				var decimals=this.params.option.numbers.decimal;
				var dec_point=this.params.option.numbers.decimalSymbol;
				var thousands_sep=this.params.option.numbers.separatingSymbol;
				this.num=numberFormat(value, decimals, dec_point, thousands_sep, "round");
			},
			createTextStyle(textStyle) {
				var obj = {
					"font-family": textStyle.fontFamily,
					"color": textStyle.color,
					"font-size": textStyle.fontSize + "px",
					"font-weight": textStyle.fontWeight
				};
				return obj;
			}, //实现此方法
			createComponent(params) {
				if(params && params.dataConfig) {
					var data = params.dataConfig.data;
					var fields = params.dataConfig.fields;
					if(data && data.length > 0 && fields) {
						var fieldName = "";
						var fieldValue = "";
						fieldName = getField(FNAME, fields);
						fieldValue = getField(FVALUE, fields);
						var count = data ? data.length : 0;
						for(var i = 0; i < count; i++) {
							if(data[i].hasOwnProperty(fieldName) && data[i].hasOwnProperty(fieldValue)) {
								var name = data[i][fieldName];
								var value = data[i][fieldValue];
								this.formatMessage(name, value);
								break;
							}
						}
					}
				}
			}
		}
	}
</script>
<style>
	.ellipsis {
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}
< /style>