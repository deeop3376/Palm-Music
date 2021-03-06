import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import Rem from './components/common/Rem'
Rem()
// let clientWidth=document.documentElement.clientWidth
let mobile=navigator.userAgent.toLowerCase().includes('mobile')
if(!mobile){
  alert('按F12切换到移动端会有更好的使用体验哦')
}
window.addEventListener('resize',()=>{
  let nowType=navigator.userAgent.toLowerCase().includes('mobile')
  if(!mobile && nowType ){
    history.go(0)
  }
})
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
