<template>
  <div class='selectUser height-100-vh flex flex-direction-column'>
    <navbar @click-left='clickLeft' ArrowLeft leftText='添加朋友' NotIconRight NotRightDDM />
    <div class='selectBox flex'>
      <input
        @keydown.enter='function(e){ 
					selectUserComputed.userList.rows=[];
					selectUserComputed.userList.count=0;
					selectInfo.page = 1
					selectUser(e);  
				}'
        class='selectText height-100'
        placeholder='输入账号／昵称搜索'
        type='text'
        v-model.trim='selectUserComputed.selectInfo.selectText'
      />
      <input-button
        @click='function(e){ 
					selectUserComputed.userList.rows=[];
					selectUserComputed.userList.count=0;
					selectInfo.page = 1
					selectUser(e);  
				}'
        class='selectBtn'
        value='搜索'
      />
    </div>

    <div class='selectListMsg'>找到的用户：</div>

    <div class='selectListBox height-100 width-100'>
      <van-list
        :finished='selectUserComputed.userList.rows.length >= selectUserComputed.userList.count'
        @load='selectUser'
        class='selectList'
        finished-text='什么也没有'
        v-model='loading'
      >
        <item
          :key='index'
          :leftSrc='item.avatar'
          @click='function(e){
						toUserInfo(e,item)
					}'
          notRight
          v-for='(item,index) in selectUserComputed.userList.rows'
        >
          <template v-slot:center>
            <div class='selectMsg flex flex-direction-column'>
              <span class='margin-top-auto margin-bottom-auto' v-html='item.nickName'></span>
            </div>
          </template>
        </item>
      </van-list>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SelectUser',
  data() {
    return {
      check: false,
      selectInfo: {
        selectText: '',
        page: 1,
        pageSize: 10
      },
      userList: {
        count: 0,
        rows: []
      },
      loading: false
    }
  },
  methods: {
    // 选择用户后跳转到userInfo路由
    toUserInfo: function(e, userInfo) {
      // 跳转路由
      this.$router.push(
        { name: 'UserInfo', params: { userName: userInfo.userName } },
        () => {}
      )
    },
    // 搜索用户
    selectUser: function(e) {
      // 搜索字段不能为空
      if (this.selectInfo.selectText === '') {
        this.$toast.fail('搜索字段不能为空')
        return
      }

      if (
        this.selectInfo.selectText === this.$store.getters.userInfo.userName
      ) {
        this.userList.count = 1
        this.userList.rows.push(this.$store.getters.userInfo)
        this.loading = false
        return
      }

      // 搜索用户
      this.axios(this.$api.users.selectUser(this.selectInfo))
        .then(res => {
          if (res.data.errno === 0) {
            // 如果count存在就在selectUser上显示
            if (res.data.data.count) {
              this.userList.count = res.data.data.count
              this.userList.rows = this.userList.rows.concat(res.data.data.rows)

              // 如果列表大于0 则页数加一
              if (this.userList.rows.length > 0) {
                this.selectInfo.page++
              }
            } else {
              // 如果count不存在就是用户名搜索  设置count为1 用户数据添加到用户列表
              this.userList.count = 1
              this.userList.rows.push(res.data.data)
            }
          } else {
            this.$toast.fail(res.data.message)
          }

          this.loading = false
        })
        .catch(err => {
          this.$toast.fail('错误')
        })
    },
    clickLeft: function(e) {
      this.$router.go(-1)
    }
  },
  computed: {
    selectUserComputed: function() {
      // 将userList和selectInfo存到vuex中
      this.$store.commit('setSelectUserData', {
        userList: this.userList,
        selectInfo: this.selectInfo
      })

      return {
        userList: this.userList,
        selectInfo: this.selectInfo
      }
    }
  },
  created() {
    // 从vuex中取出userList和selectInfo的数据
    // console.log(this.$store.getters.selectUserData);
    this.userList = this.$store.getters.selectUserData.userList || this.userList
    this.selectInfo =
      this.$store.getters.selectUserData.selectInfo || this.selectInfo
  },
  beforeRouteLeave(to, from, next) {
    if (to.name !== 'UserInfo') {
      this.$store.commit('remSelectUserData', {})
    }
    next()
  }
}
</script>

<style scoped lang='less'>
.selectUser {
  .selectBox {
    width: 100%;
    height: 2.5rem;
    padding: 0.3rem;
    background: white;
  }
  .selectText {
    flex: 1;
    padding: 0.3rem;
  }
  .selectBtn {
    width: 3rem;
    margin: 0 0 0 0.3rem;
  }

  .selectListMsg {
    font-size: 0.9rem;
    padding: 0.5rem;
    border-bottom: solid 1px #e4e4e4;
  }

  .selectListBox {
    flex: 1;
    overflow: scroll;
  }
}
</style>