import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 信息
    userInfo: '',
    // 好友列表
    friendsList: [],
    // 是否加载状态
    loading: false,
    // 加载状态延迟（定时器setTimeout）
    loadingTimer: null,
    // selectUser的用户数据
    selectUserData: {},
    // chatRoom中的聊天记录
    chatRecord: [],
    // 当前聊天页面内的好友id
    chatFriendIds: [],
    // 新消息提示
    notify: {},
    // 收到的实时消息ID
    socketDataId: null
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
     * 添加聊天记录
     * @param {Object} data 数据
     */
    setChatRecord(state, data) {
      try {
        state.chatRecord = JSON.parse(localStorage.getItem(`chatRecord_${data.roomId}`)) || []
      } catch (error) {
        state.chatRecord = []
      }

      if (data.msg && data.userId) {

        // 设置聊天记录的id
        let id =
          state.chatRecord.length > 0 ?
            state.chatRecord.slice(-1)[0].id + 1 :
            1

        // 将聊天记录加到chatRecord中  用房间Id做下标
        state.chatRecord.push({
          id,
          roomId: data.roomId,
          userId: data.userId,
          msg: data.msg,
          filt: data.filt,
          success: data.success,
          loading: data.loading,
          type: data.type || 1,
          isMe: state.userInfo.id == data.userId
        })

        // 将数据存到localstorage中  用chatRecord_+房间Id做为key
        try {
          localStorage.setItem(`chatRecord_${data.roomId}`, JSON.stringify(state.chatRecord))
        } catch (error) {
          localStorage.setItem(`chatRecord_${data.roomId}`, '[]')
        }
      }
    },
    /**
     * 设置消息通知的数据
     * @param {*} notify 
     */
    setNotify(state, notify = {}) {
      // 先清除定时器
      window.clearTimeout(state.notify.time)

      // 2000毫秒后关闭通知
      state.notify.time = window.setTimeout(() => {
        state.notify.show = false
      }, 2000);


      Object.assign(notify, {
        to: {
          name: 'NewFriend'
        },
        show: true
      })

      state.notify = notify
    },
    /**
     * 设置收到的实时消息ID
     * @param {Number} socketDataId ID
     */
    setSocketDataId(state, socketDataId) {
      if (socketDataId) {
        console.log('senmsg1111111111');
        state.socketDataId = socketDataId
        // if (typeof state.socketDataId === 'array') {
        //   state.socketDataId.push(socketDataId)
        // } else {
        //   state.socketDataId = [socketDataId]
        // }
      }
    },
    /**
     * 登录用户信息存储
     * @param {String} userInfo 用户数据 Json格式
     */
    login(state, userInfo) {
      state.userInfo = userInfo
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
      // 300毫秒后显示加载中提示
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
    /**
     * 设置好有列表数据
     */
    setFriendsList(state, data) {
      state.friendsList = data
    },
    /**
     * 当前聊天页面内的好友Id
     */
    setChatFriendIds(state, data) {
      if (typeof data === 'array') {
        state.chatFriendIds = data
      }

      if (typeof data === 'number') {
        if (!state.chatFriendIds.includes(data)) {
          state.chatFriendIds.push(data)
        }
      }

      if (typeof data === 'string') {
        let d = Number.parseInt(data)
        if (!Number.isNaN(d)) {
          if (!state.chatFriendIds.includes(data)) {
            state.chatFriendIds.push(data)
          }
        }
      }
    }
  },
  getters: {
    /**
     * 获取好友列表数据
     */
    friendsList: state => {
      return state.friendsList
    },
    /**
     * 获取selectUser的用户数据
     */
    selectUserData: state => {
      return state.selectUserData
    },
    /**
     * 获取用户信息 
     */
    userInfo: state => {
      return state.userInfo
    },
    /**
     * 获取加载中状态
     */
    loading: state => {
      return state.loading
    },
    /**
     * 获取聊天记录
     */
    chatRecord: state => {
      return state.chatRecord
    },
    /**
     * 获取消息通知的数据
     */
    notify: state => {
      return state.notify
    },
    /**
     * 获取收到的实时消息ID
     */
    socketDataId: state => {
      return state.socketDataId
    },
    chatFriendIds: state => {
      return state.chatFriendIds
    }
  },
  actions: {
    SOCKET_connect() { },
    SOCKET_disconnect(e) { },
    SOCKET_reconnect(e) { },

    // 接收聊天消息
    async SOCKET_getChatMsg(context, data) {
      context.commit('setChatRecord', data.data)
console.log('senmsg');
      context.commit('setSocketDataId', data.data.socketDataId)
    },

    // 接收添加好友的申请
    async SOCKET_getAddFriend(context, data) {
      data.data.apply = false

      // 存入localstorage
      let friends
      try {
        friends = JSON.parse(localStorage.getItem('friendApplys')) || []
      } catch (error) {
        friends = []
      }

      if (friends.length <= 0 || friends.every(item => {

        if (item) {
          if ('id' in item.friendInfo) {

            return data.data.friendInfo.id !== item.friendInfo.id
          }
        }
      })) {
        if (data.data.friendInfo) {

          friends.push(data.data)
        }
      }

      localStorage.setItem('friendApplys', JSON.stringify(friends))

      context.commit('setNotify', data.data)

      context.commit('setSocketDataId', data.data.socketDataId)
    }
  },
  modules: {}
})