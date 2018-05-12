import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Es6Promise from 'es6-promise'
require('es6-promise').polyfill()
Es6Promise.polyfill()
Vue.config.debug = true;

Vue.use(ElementUI);
Vue.prototype.$ELEMENT = { size: 'small' };
Vue.config.productionTip = false

var abc = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})