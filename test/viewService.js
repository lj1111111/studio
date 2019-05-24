import Vue from 'vue'
import i18n from './i18n/i18n'
import ViewService from './ViewService.vue'


//import '@/assets/css/app.css'/*引入公共样式*/
import '@/assets/css/iconfont.css'/*引入公共样式*/
import '@/assets/css/rightcomp.css'/*引入右边组件样式*/

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import store from './store'
import echarts from 'echarts'
import 'echarts-gl';
import china from './data/china.js';

import {
	fetch,
	all,
	post
} from './api/http.js';

Vue.use(ElementUI)
Vue.config.productionTip = false;

//Vue.use(MessageBox);
//Vue.use(Message);
//Vue.use(Notification);
//Vue.prototype.$message = Message;
//定义全局变量
Vue.prototype.$fetch = fetch;
Vue.prototype.$post = post;
Vue.prototype.$all = all;
Vue.prototype.$echarts = echarts;
//非父子组件之间分发事件
//Vue.prototype.bus = new Vue();
echarts.registerMap('china', china);

new Vue({
	el: '#view2',
	store,
	i18n,
	render: h => h(ViewService)
})

//components: { App },
//template: '<App/>'