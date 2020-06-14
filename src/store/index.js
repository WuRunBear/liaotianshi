import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 信息
    userInfo: '',
    // 是否加载状态
    loading: false,
    // 加载状态延迟（定时器setTimeout）
    loadingTimer: null,
    // selectUser的用户数据
    selectUserData: {},
    chatRoom: []
  },
  mutations: {
    /**
     * 设置selectUser的用户数据
     * @param {Object} data 数据
     */
    setSelectUserData(state, data) {
      state.selectUserData = data
    },
    /**
     * 删除selectUser的用户数据
     */
    remSelectUserData(state, data) {
      state.selectUserData = {}
    },
    /**
     * 登录用户信息存储
     * @param {String} userInfo 用户数据 Json格式
     */
    login(state, userInfo) {
      state.userInfo = JSON.stringify(userInfo)
    },
    /**
     * 退出登录 清除vuex中的用户信息
     */
    logout(state) {
      state.userInfo = ''
    },
    /**
     * 显示加载中提示 
     */
    showLoading(state) {
      // 先清除定时器
      window.clearTimeout(state.loadingTimer)
      //三秒后显示加载中提示
      state.loadingTimer = setTimeout(() => {
        state.loading = true
      }, 300)
    },
    /**
     * 隐藏加载中提示 
     */
    hiddenLoading(state) {
      // 清除定时器 
      window.clearTimeout(state.loadingTimer)
      state.loading = false
    },
    chatRoom(state, data) {
      state.chatRoom[data.roomId] = data.data
    }
  },
  getters: {
    // selectUser的用户数据
    selectUserData: state => {
      return state.selectUserData
    },
    /**
     * 获取用户信息 
     */
    userInfo: state => {
      try {
        return JSON.parse(state.userInfo)
      } catch (error) {
        return state.userInfo
      }
    },
    /**
     * 获取加载中状态
     */
    loading: state => {
      return state.loading
    },
    chatRoom: state => {
      return state.chatRoom
    }
  },
  actions: {
    async SOCKET_msg(context, data) {
      
      context.commit('chatRoom', data)
    }
  },
  modules: {}
})