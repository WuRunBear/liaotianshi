<template>
  <div class='chat-room flex flex-direction-column'>
    <navbar :leftText='chatRoomInfo.roomName' @click-left='clickLeft' ArrowLeft>
      <template v-slot:right>
        <div>...</div>
      </template>
    </navbar>

    <main>
      <div class='msg-list'>
        <div :key='item.id' class='msgItem' v-for='item in msgListData'>
          <div :class='{"my":item.isMe}' class='flex'>
            <div class='avatar'>
              <my-image />
            </div>

            <div class='msgBox flex'>
              <div class='msg' v-text='item.msg'></div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <footer class='flex'>
      <van-field
        :autosize='{maxHeight:16*4}'
        ref='msgTextE'
        rows='1'
        type='textarea'
        v-model='msgText'
      >
        <template #button>
          <van-button @click='send' size='small' type='primary'>发送</van-button>
        </template>
      </van-field>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Chat-Room',
  data() {
    return {
      chatRoomInfo: null,
      // msgListData: [],
      msgText: '',
      userInfo: this.$store.getters.userInfo
    }
  },
  methods: {
    clickLeft: function(e) {
      // 聊天房间返回只返回聊天列表
      this.$router.push(
        {
          name: 'Message'
        },
        () => {}
      )
    },
    send: function(e) {
      if (this.msgText !== '') {
        this.$store.commit('setChatRecord', {
          roomId: this.roomId,
          filt: false,
          success: false,
          loading: true,
          type: this.type || 1,
          userId: this.$store.getters.userInfo.id,
          msg: this.msgText
        })

        // 发送消息
        this.$socket.emit(
          'sendChatMsg',
          {
            member: this.chatRoomInfo.member,
            roomId: this.roomId,
            msg: this.msgText,
            mode: this.mode || 1
          },
          re => {
          }
        )
      }

      // 输入框重新获得焦点
      this.$refs.msgTextE.focus()

      // 输入框内容置为空
      this.msgText = ''
    },
    initMsgList: function() {
      // 初始化消息列表的滚动位置到最底部
      let msgList = document.querySelector('.msg-list'),
        toY = msgList.scrollHeight - msgList.parentElement.scrollHeight

      // msgList.scrollTo && msgList.scrollTo(10, toY)
      msgList.scrollTop = toY
    }
  },
  computed: {
    msgListData: function() {
      return this.$store.getters.chatRecord
    }
  },
  watch: {},
  updated() {
    // dom更新之后执行
    this.initMsgList()
  },
  created() {
    if (this.friendInfo) {
      this.chatRoomInfo = {
        roomName:
          this.friendInfo.alias ||
          this.friendInfo.nickName ||
          this.friendInfo.userName,
        member: [this.friendInfo.id],
        members: [this.friendInfo]
      }
    }
  },
  mounted() {
    // // 如果不存在则是群聊
    // if (!this.friendInfo) {
    // 获取群聊信息
    let friendId = this.$store.getters.chatFriendIds
    this.axios(
      this.$api.chatRooms.getChatRoom({ roomId: this.roomId, friendId })
    )
      .then(res => {
        if (res.data.errno === 0) {
          // 判断是否是私聊 假为私聊 真为群聊
          if (res.data.data.member.toString().length > 1) {
            // this.chatRoomInfo = res.data.data
            let user = res.data.data.members[0]
            // 设置聊天室名称为私聊对象的备注或昵称或用户名
            this.chatRoomInfo.roomName =
              user.friend.alias || user.nickName || user.userName
            this.chatRoomInfo.avatar = user.avatar
          } else {
            this.chatRoomInfo = res.data.data
          }
        } else {
          this.$toast.fail(res.data.message)
        }
      })
      .catch(err => {
        console.log(err)
        this.$toast.fail('错误')
      })
    // } else {
    //   // 如果是私聊则chatRoomInfo赋值为好友信息
    //   this.chatRoomInfo = this.friendInfo
    // }

    this.$socket.emit('addRoom', { roomId: this.roomId }, res => {
      if (res.errno !== 0) {
        this.$toast.fail(res.message)
      } 
    })

    // 初始化vuex中聊天记录
    this.$store.commit('setChatRecord', { roomId: this.roomId })
  },
  props: {
    // 群号
    roomId: {
      type: String,
      default: '1'
    },
    // 好友信息 有则是私聊
    friendInfo: {
      type: Object,
      default: null
    }
  },
  beforeRouteLeave(to, from, next) {
    this.$store.commit('setChatFriendIds', [])

    next()
  }
}
</script>

<style scoped lang='less'>
.chat-room {
  height: 100vh;

  main {
    flex: 1;
    background: #f9f9f9;
    overflow: hidden;

    .msg-list {
      overflow-y: auto;
      overflow-x: hidden;
      height: 100%;

      .msgItem {
        margin: 0.5rem 0.3rem;

        .avatar {
          width: 2rem;
          height: 2rem;
        }
        .msgBox {
          flex: 1;
          margin: 0 0.3rem;

          .msg {
            max-width: 18rem;
            height: 100%;
            padding: 0.3rem;
            background: #fff;
            border-radius: 5px;
            display: inline-block;
            word-wrap: break-word;
            word-break: normal;
            border: solid 1px #e4e4e4;
            white-space: pre-wrap;
          }
        }
        .my {
          flex-direction: row-reverse;
          .msg {
            margin-left: auto;
            background: #08e60f;
          }
        }
      }
    }
  }

  footer {
    padding: 0.5rem;
    background: #e9e9e9;
    box-shadow: #7f7f7f 0px 3px 13px 0px;

    > div:first-child {
      padding: 0 0 0 1rem;
      border-radius: 5px;
    }
  }
}
</style>