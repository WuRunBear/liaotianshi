import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueSocketIO from 'vue-socket.io'

import urlConf from './conf/url'
Vue.use(new VueSocketIO({
  debug: true,
  connection: urlConf.url, //
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  },
}))

// vant按需引入
import {
  Overlay,
  Loading,
  Toast,
  Circle,
  Icon,
  List,
  Field,
  Button,
  Notify,
  IndexBar,
  IndexAnchor,
  ActionSheet
} from 'vant'
// 注册vant组件
Vue.use(Overlay)
Vue.use(Loading)
Vue.use(Toast)
Vue.use(Circle)
Vue.use(Icon)
Vue.use(List)
Vue.use(Field)
Vue.use(Button)
Vue.use(Notify)
Vue.use(IndexBar)
Vue.use(IndexAnchor)
Vue.use(ActionSheet)

import userApi from './api/users'
import friendApi from './api/friends'
import utilsApi from './api/utils'
import chatRooms from './api/chatRooms'

// 导入自定义组件
import components from "@/components/components.js"

// 注册全局自定义组件
Vue.use(components)

// 引入基础样式
import '@/assets/css/base.css'
// 引入矢量图标样式
import '@/assets/css/icon/style.css'

Vue.config.productionTip = false

axios.defaults.withCredentials = true

Vue.use(VueAxios, axios)

Vue.prototype.$api = {
  users: userApi,
  utils: utilsApi,
  friends: friendApi,
  chatRooms: chatRooms
}

var V = new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

// 全局监听器
// 监听收到的新消息ID 并通过getSuccess发送到服务端
// V.$watch(function () {
//   return V.$store.getters.socketDataId
// }, function (newV, oldV) {
//   console.log(1);
//   V.$socket.emit('getSuccess', newV,()=>{
//   })
// });
