<template>
  <div class='newFriend height-100-vh'>
    <navbar @click-left='clickLeft' ArrowLeft leftText='新的朋友' NotIconRight />

    <main>
      <!-- 添加好友申请 -->
      <item
        :centerUpText='value.userName'
        :key='key'
        :leftSrc='value.friendInfo.avatar'
        class='apply'
        v-for='(value,key) in friendApplys'
      >
        <template #center>
          <div
            @click='function(e){
							userInfo(e,{name:"UserInfo", params:{userInfo: value.friendInfo}})
						}'
            class='center flex flex-direction-column'
          >
            <span
              class='title flex flex-align-items-center'
              v-html=' value.friendInfo.nickName || value.friendInfo.userName'
            ></span>

            <span class='msg flex flex-align-items-center' v-html='value.message'></span>
          </div>
        </template>

        <!-- 添加按钮 -->
        <template #right>
          <div
            class='right padding-right-07-rem flex flex-align-items-center flex-justify-content-center'
          >
            <van-button
              :disabled='value.apply'
              @click='function(e){
								// 初始化备注为昵称或账号名
								alias = value.friendInfo.nickName || value.friendInfo.userName
								// 设置选择的好友对象的下标
								checkApply = key
								// 显示展示板
								addShow = true
							}'
              class='btn'
              type='primary'
            >添加</van-button>
          </div>
        </template>
      </item>
    </main>

    <!-- 添加好友时的展示面板 -->
    <van-action-sheet close-on-popstate title='添加好友' v-model='addShow'>
      <van-field label='备注' v-model='alias' />

      <!-- 添加按钮 -->
      <div class='margin-07-rem'>
        <van-button @click='agree' block type='primary'>添加</van-button>
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
export default {
  name: 'newFriend',
  data() {
    return {
      friendApplys: [],
      checkApply: {},
      addShow: false,
      alias: ''
    }
  },
  methods: {
    clickLeft: function(e) {
      // 返回
      this.$router.go(-1)
    },
    userInfo: function(e, to) {
      // 跳转路由
      if (to && to.name !== this.$route.name) {
        this.$router.push(to, () => {})
      }
    },
    agree: function(e) {
      // 添加好友请求
      this.axios(
        this.$api.friends.addFriend({
          friendId: this.friendApplys[this.checkApply].friendInfo.id,
          alias: this.alias
        })
      )
        .then(res => {
          if (res.data.errno === 0) {
            // 添加成功将请求状态设置为true
            this.friendApplys[this.checkApply].apply = true

            // 隐藏添加好友的展示面板
            this.addShow = false

            // 将新的数据覆盖localstorage中的数据
            localStorage.setItem('friendApplys',JSON.stringify(this.friendApplys))

            // 显示添加成功提示
            this.$toast.success('添加成功')
          } else {
            // 显示添加失败提示
            this.$toast.fail(res.data.message)
          }
        })
        .catch(err => {
          console.log(err)
          // 显示请求错误提示
          this.$toast.fail('错误')
        })
    }
  },
  mounted() {
    // 初始化请求列表
    try {
      this.friendApplys = JSON.parse(localStorage.getItem('friendApplys')) || []
    } catch (error) {
      this.friendApplys = []
    }
  }
}
</script>

<style lang="less" scoped>
.newFriend {
  main {
    .apply {
      .center {
      }

      .right {
        .btn {
          height: 1.5rem;
          width: 100%;
        }
      }
    }
  }
}
</style>