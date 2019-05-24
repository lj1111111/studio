<template>
	<div class="right-component-containter">
		<Tabs @tabchange="handleTabChange" :tab="tab">
		</Tabs>
		<div class="right-component-labelInfo ">
			<span>&nbsp;{{label}}</span> <span style="font-size: 14px;">{{version}}</span>
		</div>
		<div v-if="isActiveStyle">
			<!--标题-->
			<TitleText :text="params.option.title" label="标题"></TitleText>
			<!--前缀-->
			<TitleText :text="params.option.prefix" label="前缀"></TitleText>
			<!--后缀-->
			<Numbers :num="params.option.numbers"></Numbers>
			<!--后缀-->
			<TitleText :text="params.option.suffix" label="后缀"></TitleText>
			<!--尺寸和位置-->
			<Location :location="location"></Location>
			<!--组件对齐-->
			<Align @opaction="handleOpAction"></Align>
		</div>
		<Datasource v-if="isActiveData" :label="label" :data-config="params.dataConfig"></Datasource>
	</div>

</template>

<script>
	import ComSettingMixinBase from '../base/ComSettingMixinBase.js'
	import TitleText from '../compart/TitleText.vue'
	import Numbers from '../compart/Numbers.vue'
	import Datasource from '../data/Datasource.vue'
	import { getField } from '../../utils/util.js'
	const FNAME = "name";
	const FVALUE = "value";
	export default {
		name: 'SeNumberTitleFlopSetting',
		message: '数字翻牌器组件设置',
		mixins: [ComSettingMixinBase],
		data() {
			return {}
		},
		mounted() {
			this.createStyle();
		},
		components: {

		},
		computed: {

		},
		components: {
			TitleText,
			Numbers,
			Datasource
		},
		methods: {
			init() {

			},
			createStyle() {
				var obj = {
					"position": "absolute"
				};
				//				if(this.params.global.showBg) {
				//					obj["background-color"] = this.params.global.bgColor;
				//				}
				//				if(this.params.global.showBorder) {
				//					obj["border"] = this.params.global.borderWidth + "px solid " + this.params.global.borderColor;
				//				}
				this.$emit("createstyle", obj);
			}
		},
		watch: {
			"params.option.title.content": {
				handler(newVal, oldVal) {
					var data = this.params.dataConfig.data;
					var fieldName = "";
					var fields=this.params.dataConfig.fields;
					fieldName = getField(FNAME, fields);
					data[0][fieldName] = newVal;
					this.params.dataConfig.data = data;
				},
				deep: true
			},
			"params.option.numbers.digit": {
				handler(newVal, oldVal) {
					var data = this.params.dataConfig.data;
					var fieldValue = "";
					var fields=this.params.dataConfig.fields;
					fieldValue = getField(FVALUE, fields);
					data[0][fieldValue] = newVal;
					this.params.dataConfig.data = data;
				},
				deep: true
			}
			,
			"params.dataConfig.data": {
				handler(newVal, oldVal) {
					var fieldName = "";
					var fieldValue = "";
					var fields=this.params.dataConfig.fields;
					fieldName = getField(FNAME, fields);
					fieldValue = getField(FVALUE, fields);
					this.params.option.title.content = newVal[0][fieldName];
					this.params.option.numbers.digit = newVal[0][fieldValue];
				},
				deep: true
			}
		}
	}
</script>

<style>

</style>