<template>
  <div class='userInfo'>
    <navbar @click-left='clickLeft' ArrowLeft leftText='用户信息' NotIconRight />

    <div class='userInfoBox flex'>
      <div class='left'>
        <my-image :src='userInfo.avatar' class='avatar' />
      </div>

      <div class='right' ref='info'>
        <!-- 备注 -->
        <div v-if='userInfo.friend'>
          <span class='key'>备注：</span>
          <span v-text='userInfo.friend.alias'></span>
        </div>

        <!-- 昵称 -->
        <div v-if='userInfo.nickName'>
          <span class='key'>昵称：</span>
          <span v-html='userInfo.nickName'></span>
        </div>

        <!-- 账号 -->
        <div v-if='userInfo.userName'>
          <span class='key'>账号：</span>
          <span v-html='userInfo.userName'></span>
        </div>

        <!-- 性别 -->
        <div v-if='userInfo.gender'>
          <span class='key'>性别：</span>
          <span>{{ userInfo.gender | userInfoValueFilt }}</span>
        </div>

        <!-- 地址 -->
        <div v-if='userInfo.city'>
          <span class='key'>地址：</span>
          <span v-html='userInfo.city'></span>
        </div>
      </div>
    </div>

    <!-- 设置权限、备注等 -->
    <div class='control' v-if='isFriend && !isMe'>
      <item @click='function(e){
          update = true
        }' centerUpText='设置备注' notLeft />
    </div>

    <!-- 发送消息按钮 -->
    <div class='btn' v-if='isFriend || isMe'>
      <input-button @click='chat' value='发消息' />
    </div>

    <!-- 发送添加好友请求 -->
    <div class='btn' v-if='!isFriend && !isMe'>
      <input-button :icon='"add-o"' @click='addShow = true' value='加为好友' />
    </div>

    <!-- 添加好友时展示面板 -->
    <van-action-sheet close-on-popstate title='添加好友' v-if='!isFriend && !isMe' v-model='addShow'>
      <van-field
        :autosize='{ maxHeight: 16 * 5 }'
        label='留言'
        maxlength='30'
        placeholder='请输入留言'
        rows='3'
        show-word-limit
        type='textarea'
        v-model='message'
      />

      <van-field label='备注' v-model='alias' />

      <div class='margin-07-rem'>
        <van-button @click='addFriend' block type='primary'>添加</van-button>
      </div>
    </van-action-sheet>

    <!-- 修改备注 -->
    <van-action-sheet close-on-popstate title='修改备注' v-if='isFriend && !isMe' v-model='update'>
      <van-field label='备注' v-model='alias' />

      <div class='margin-07-rem'>
        <van-button @click='setAlias' block type='primary'>修改</van-button>
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
export default {
  name: 'UserInfo',
  data() {
    return {
      userInfo: {},
      isFriend: false,
      isMe: false,
      addShow: false,
      update: false,
      alias: '',
      message: ''
    }
  },
  methods: {
    clickLeft: function(e) {
      this.$router.go(-1)
    },
    addFriend: function(e) {
      // 显示加载中提示
      this.$store.commit('showLoading')

      this.axios(
        this.$api.friends.addFriend({
          friendId: this.userInfo.id,
          alias: this.alias
        })
      )
        .then(res => {
          if (res.data.errno === 0) {
            // 发送添加好友请求
            this.$socket.emit(
              'addFriend',
              { friendId: this.userInfo.id, message: this.message },
              () => {
                // 隐藏加载中提示
                this.$store.commit('hiddenLoading')

                // 显示请求完成提示
                this.$toast.success('请求完成')

                // 关闭展示面板
                this.addShow = false
              }
            )
          } else {
            this.$toast.fail(res.data.message)
          }
        })
        .catch(err => {
          this.$toast.fail('错误')
        })
    },
    setAlias: function(e) {
      // 设置备注
      this.axios(
        this.$api.friends.changeFriendInfo({
          friendId: this.userInfo.id,
          alias: this.alias
        })
      )
        .then(res => {
          if (res.data.errno === 0) {
            this.$toast.success('设置备注成功')

            this.$store.commit('setFriendsList', [])

            // 关闭展示面板
            this.update = false
          } else {
            this.$toast.fail(res.data.message)
          }
        })
        .catch(err => {
          console.err(err)
          this.$toast.fail('错误')
        })
    },
    chat: function(e) {
      // 获取私聊
      this.axios(this.$api.chatRooms.getOneToOneChat(this.userInfo.id))
        .then(res => {
          if (res.data.errno === 0) {
            // 将要私聊的好友id存入vuex
            this.$store.commit('setChatFriendIds', this.userInfo.id)

            this.$router.push(
              {
                name: 'ChatRoom',
                params: {
                  roomId: res.data.data.roomId.toString(),
                  friendInfo: this.userInfo
                }
              },
              () => {}
            )
          } else {
            this.axios(this.$api.chatRooms.newOneToOneChat(this.userInfo.id))
              .then(res => {
                // 将要私聊的好友id存入vuex
                this.$store.commit('setChatFriendIds', this.userInfo.id)

                this.$router.push(
                  {
                    name: 'ChatRoom',
                    params: {
                      roomId: res.data.data.roomId.toString(),
                      friendInfo: this.userInfo
                    }
                  },
                  () => {}
                )
              })
              .catch(err => {
                console.log(err)

                this.$toast.fail('错误')
              })
          }
        })
        .catch(err => {
          console.err(err)
          this.$toast.fail('错误')
        })
    }
  },
  mounted() {
    // 获取用户数据
    // 是否为自己
    this.isMe = this.userName === this.$store.getters.userInfo.userName

    if (!this.isMe) {
      this.axios(this.$api.users.selectUser({ selectText: this.userName }))
        .then(res => {
          if (res.data.errno === 0) {
            // 将好友信息加到userInfo内
            this.userInfo = res.data.data
          } else {
            this.$toast.fail(res.data.message)
          }

          // 如果是好友
          if (this.userInfo.friend) {
            this.isFriend = true
          }

          // 初始化备注
          this.alias =
            (this.userInfo.friend && this.userInfo.friend.alias) ||
            this.userInfo.nickName ||
            this.userInfo.userName
        })
        .catch(err => {
          console.log(err)

          this.$toast.fail('错误')
        })
    } else {
      // 如果是自己就从vuex中获取
      this.userInfo = this.$store.getters.userInfo
    }
  },
  filters: {
    userInfoValueFilt: function(value) {
      if (value === 0) {
        return '保密'
      } else if (value === 1) {
        return '男'
      } else if (value === 2) {
        return '女'
      }
      return value
    }
  },
  props: {
    userName: {
      type: String
    }
  },
  beforeRouteLeave(to, from, next) {
    localStorage.removeItem('router_userInfo')

    next()
  }
}
</script>

<style lang='less' scoped>
.userInfo {
  > div:first-child {
    margin: 0;
    padding: 0;
  }

  > * {
    margin-bottom: 0.5rem;
    background: #fff;
  }

  > div:last-child {
    margin: 0;
  }

  .userInfoBox {
    padding-top: 0.5rem;
    padding-left: 0.7rem;

    .left {
      padding-right: 0.7rem;

      .avatar {
        margin: 0 auto;
        max-width: 3rem;
        max-height: 3rem;
      }
    }
    .right {
      flex: 1;

      > * {
        font-size: 0.7rem;
        margin-bottom: 0.5rem;
      }

      > div:first-child {
        margin-top: 0.5rem;
        font-size: 1rem;
        font-weight: bold;

        .key {
          display: none;
        }
      }
    }
  }

  .control {
    > * {
      padding-left: 0.7rem;
    }
  }

  .btn {
    font-weight: bold;
    color: #6c7da2;
    border: none;
    height: 3rem;
  }
}
</style>