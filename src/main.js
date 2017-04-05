// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
// import EpubReader from './epubReader';
import App from './App';

import router from './router/router.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import store from './store/index.js';

Vue.use(ElementUI);
Vue.config.productionTip = false;

Vue.use(Vuex)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
