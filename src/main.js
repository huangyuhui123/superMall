import Vue from 'vue'
import App from './App.vue'
import router from './router/index'; 
import store from './store/index';

import toast from 'components/common/toast'
import FastClick from 'fastclick';

import VueLazyload from 'vue-lazyload'



Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()

Vue.use(toast);
Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading: require('./assets/img/common/placeholder.png'),
  attempt: 1
})
//解决移动端300毫秒的延迟
FastClick.attach(document.body)
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')


// const num = 10;
// console.log(!num)