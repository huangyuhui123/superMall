import Vue from 'vue'
import App from './App.vue'
import router from './router/index'; 
import store from './store/index';

import toast from 'components/common/toast'
import FastClick from 'fastclick';

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()

Vue.use(toast);
//解决移动端300毫秒的延迟
FastClick.attach(document.body)
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')


// const num = 10;
// console.log(!num)