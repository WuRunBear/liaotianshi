import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'

// vant按需引入
import {
  Overlay,
  Loading,
  Toast,
  Circle,
  Icon,
  List
} from 'vant'
// 注册vant组件
Vue.use(Overlay)
Vue.use(Loading)
Vue.use(Toast)
Vue.use(Circle)
Vue.use(Icon)
Vue.use(List)

import userApi from './api/users'
import friendApi from './api/friends'
import utilsApi from './api/utils'

// 导入自定义组件
import components from "@/components/components.js"

// 注册全局自定义组件
Vue.use(components)

// 引入基础样式
import '@/assets/css/base.css'
// 引入矢量图标样式
import '@/assets/css/icon/style.css'

Vue.config.productionTip = false

Vue.use(VueAxios, axios)

Vue.prototype.$api = {
  users: userApi,
  utils: utilsApi,
  friends: friendApi
}

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')