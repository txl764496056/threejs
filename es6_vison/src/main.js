import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import *as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

Vue.prototype.$THREE = THREE;
Vue.prototype.$OrbitControls = OrbitControls;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
