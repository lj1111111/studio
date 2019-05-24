// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'babel-polyfill'
//import i18n from './lang'
import i18n from './i18n/i18n'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/app.css' /*引入公共样式*/
import '@/assets/css/iconfont.css' /*引入公共样式*/
import '@/assets/css/rightcomp.css' /*引入右边组件样式*/
import '@/assets/css/number.css' /*number样式*/

import App from './App'
import store from './store'
import echarts from 'echarts'
import 'echarts-gl';
import china from './data/china.js';

import 'jsoneditor/dist/jsoneditor.css'

import { fetch, all, post, put } from './api/http.js';
import './lib'

Vue.config.productionTip = false
//process.env.MOCK && require('./mock/trackplus.js')

/* eslint-disable no-new */
Vue.use(ElementUI);
Vue.prototype.$echarts = echarts;
//非父子组件之间分发事件
//Vue.prototype.bus = new Vue();
//定义全局变量
Vue.prototype.$fetch = fetch;
Vue.prototype.$post = post;
Vue.prototype.$all = all;
Vue.prototype.$put = put;
echarts.registerMap('china', china);

new Vue({
	el: '#app',
	store,
	i18n,
	render: h => h(App)
})