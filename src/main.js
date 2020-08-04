import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import Rem from './components/common/Rem'
Rem()
import lazyload from 'vue-lazyload'
Vue.use(lazyload,{
  loading: require('./assets/loading.jpg')
})
// import { Icon } from 'element-ui'
// Vue.use(Icon)
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
// Vue.use(ElementUI)

import './assets/iconfont/iconfont.css'

import './style.scss'
import message from '@/components/common/utils/index.js'

Vue.use(message)
// const http=axios.create({
//   baseURL:'/api/'
// })
Vue.prototype.$http=axios
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
