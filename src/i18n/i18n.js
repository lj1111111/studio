import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from './langs'
import locale from 'element-ui/lib/locale'

Vue.use(VueI18n);
var lang=Config.locale||'cn';//目前先这样处理，后期再也页面语言切换功能
const i18n = new VueI18n({
  locale: lang,
  messages
})
locale.i18n((key, value) => i18n.t(key, value)) //重点：为了实现element插件的多语言切换

export default i18n