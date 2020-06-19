import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '../store/index'
import userApi from '../api/users'

Vue.use(VueRouter)

const
  Home = () => _lazyLoading(import( /* webpackChunkName: "Home" */ '../views/Home.vue')),
  Message = () => _lazyLoading(import( /* webpackChunkName: "Message" */ '../views/HomeChilds/Message.vue')),
  AddressBook = () => _lazyLoading(import( /* webpackChunkName: "AddressBook" */ '../views/HomeChilds/AddressBook.vue')),
  My = () => _lazyLoading(import( /* webpackChunkName: "My" */ '../views/HomeChilds/My.vue')),
  NewFriend = () => _lazyLoading(import( /* webpackChunkName: "AddressBook" */ '../views/NewFriend.vue')),
  MyInfo = () => _lazyLoading(import( /* webpackChunkName: "MyInfo" */ '../views/MyInfo.vue')),
  UserInfo = () => _lazyLoading(import( /* webpackChunkName: "UserInfo" */ '../views/UserInfo.vue')),
  ModifyInfo = () => _lazyLoading(import( /* webpackChunkName: "MyInfo" */ '../views/ModifyInfo.vue')),
  SelectUser = () => _lazyLoading(import( /* webpackChunkName: "SelectUser" */ '../views/SelectUser.vue')),
  ChatRoom = () => _lazyLoading(import( /* webpackChunkName: "ChatRoom" */ '../views/ChatRoom.vue')),
  Login = () => _lazyLoading(import( /* webpackChunkName: "login" */ '../views/Login.vue')),
  Register = () => _lazyLoading(import( /* webpackChunkName: "login" */ '../views/Register.vue')),
  Notfound = () => _lazyLoading(import('../views/Not found.vue'))


const routes = [{
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      loginRequired: true
    },
    children: [{
        path: 'message',
        name: 'Message',
        meta: {
          loginRequired: true
        },
        component: Message
      },
      {
        path: 'addressBook',
        name: 'AddressBook',
        meta: {
          loginRequired: true
        },
        component: AddressBook
      },
      {
        path: 'my',
        name: 'My',
        meta: {
          loginRequired: true
        },
        component: My
      }
    ]
  },
  {
    path: '/myInfo',
    name: 'MyInfo',
    meta: {
      loginRequired: true
    },
    component: MyInfo,
  },
  {
    path: '/userInfo',
    name: 'UserInfo',
    meta: {
      loginRequired: true
    },
    component: UserInfo,
    props: true,
    beforeEnter: (to, from, next) => {
      let localUserInfo

      try {
        localUserInfo = JSON.parse(localStorage.getItem('router_userInfo'))
      } catch (error) {
        localUserInfo = ''
      }
      // 如果to.params.userInfo不存在就拿localstorage里的
      to.params.userInfo = to.params.userInfo || localUserInfo

      
      if (to.params.userInfo) {
        // 存到localStorage
        localStorage.setItem('router_userInfo', JSON.stringify(to.params.userInfo))
        next()
        return
      }

      let name = from.name || 'Home'
      next({
        name
      })
      return
    }
  },
  {
    path: '/newFriend',
    name: 'NewFriend',
    meta: {
      loginRequired: true
    },
    component: NewFriend,
    props: true,
    beforeEnter: (to, from, next) => {
      next()
      return
    }
  },
  {
    path: '/modifyInfo',
    name: 'ModifyInfo',
    meta: {
      loginRequired: true
    },
    component: ModifyInfo,
    props: true,
    beforeEnter: (to, from, next) => {

      if (to.params.modifyItem) {
        next()
        return
      }

      // 隐藏加载页面
      store.commit('hiddenLoading')
      next({
        name: 'MyInfo'
      })
      return
    }
  },
  {
    path: '/selectUser',
    name: 'SelectUser',
    meta: {
      loginRequired: true
    },
    component: SelectUser
  },
  {
    path: '/chatRoom/:roomId',
    name: 'ChatRoom',
    meta: {
      loginRequired: true
    },
    component: ChatRoom,
    props: true
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      loginRequired: false
    },
    component: Login,
    props: true
  },
  {
    path: '/register',
    name: 'Register',
    meta: {
      loginRequired: false
    },
    component: Register,
    props: true
  },
  {
    path: '*',
    component: Notfound
  }
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  // scrollBehavior(to, from, savedPosition) {
  //   console.log(to, from, savedPosition);
  //   if (savedPosition) return savedPosition
  // }
})

/**
 * 全局前置守卫用于判断登录状态
 */
router.beforeEach((to, from, next) => {

  // vuex中如果没存储用户信息就重新通过isLogin API获取
  if (!store.getters.userInfo) {
    // isLogin API
    Vue.axios(userApi.isLogin()).then(res => {
      let userInfo = res.data

      // 若需要登录同时未登录 则跳到登录路由
      // loginRequired为真 就是需要登录 为假则相反   userInfo.errno不为0则表示未登录
      if (to.meta.loginRequired && userInfo.errno !== 0) {
        // toPath是原本要前往的路由 将toPath传给登录路由 登录完成后重新跳转到toPath所指向的路由
        let toPath = {
          name: to.name
        }

        // 如果有params、query就添加到toPath
        if (JSON.stringify(to.params) !== '{}') {
          Object.assign(toPath, {
            params: to.params
          })
        }
        if (JSON.stringify(to.query) !== '{}') {
          Object.assign(toPath, {
            query: to.query
          })
        }

        // 跳转到登录路由
        next({
          name: 'Login',
          params: {
            toPath
          }
        }, () => {})

        return
      }
      // 若是已登录同时要前往登录路由或注册路由  则跳到主页
      if (userInfo.errno === 0 && (to.name === 'Login' || to.name === 'Register')) {
        next({
          name: 'Home'
        })
        return
      }

      // 将已登录用户信息存到vuex
      userInfo && store.commit('login', userInfo.data)

      next()
    })
  } else {
    // 如果vuex中已有用户信息则放行
    next()
  }

})

/**
 * 全局后置守卫用于关闭加载提示
 */
router.afterEach((to, from) => {
  // 隐藏加载提示
  store.commit('hiddenLoading')

})

export default router

/**
 * 懒加载时显示加载中提示
 * @param {Object} zj 懒加载的组件
 */
function _lazyLoading(zj) {
  // 显示加载中页面
  store.commit('showLoading')
  return zj
}