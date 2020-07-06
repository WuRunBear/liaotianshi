<template>
  <div class='addressBook'>
    <navbar :dropDownMenu='DDM' leftText='通讯录' />

    <main>
      <div class='newFriend'>
        <addressBook-item :avatar='"/images/add_user.png"' :msg='"新的好友"' :to='{name: "NewFriend"}' />
      </div>

      <!-- 好友及群组 -->
      <van-index-bar :index-list='indexList' :sticky='false'>
        <div :key='index' v-for='(item,index) in indexBarData'>
          <van-index-anchor :index='item.key' />

          <addressBook-item
            :key='nextIndex'
            :msg='nextItem.alias || nextItem.user.nickName || nextItem.user.userName'
            :to='{name:"UserInfo",params:{userName:nextItem.user.userName}}'
            v-for='(nextItem, nextIndex) in item.friends'
          />
        </div>
      </van-index-bar>
    </main>
  </div>
</template>

<script>
import pinyin from 'js-pinyin'
pinyin.setOptions({ checkPolyphone: false, charCase: 0 })

export default {
  name: 'AddressBook',
  data() {
    return {
      indexBarData: [],
      indexList: [],
      DDM: [
        {
          msg: '添加好友',
          to: { name: 'SelectUser' },
          icon: 'icon-home'
        },
        {
          msg: '删除好友',
          to: { name: 'Message' },
          icon: 'icon-home'
        },
        {
          msg: '发起群聊',
          to: { name: 'Message' },
          icon: 'icon-home'
        }
      ]
    }
  },
  watch: {
    indexBarData: {
      handler: function(newV) {
        // 初始化索引列表
        newV.forEach(element => {
          this.indexList.push(element.key)
        })
      },
      immediate: true
    }
  },
  mounted() {
    // 获取好友列表
    let friendsList = this.$store.getters.friendsList
    if (friendsList.length > 0) {
      // 如果vuex有从中获取
      this.indexBarData = friendsList
    } else {
      // 如果Vuex中没有 从后端获取
      this.axios(this.$api.friends.getFriendList())
        .then(res => {
          if (res.data.errno === 0) {
            res.data.data.rows.map(item => {
              let str = item.alias || item.user.nickName || item.user.userName

              // 获取拼音首字母（大写）
              let key = pinyin.getCamelChars(str)[0].toUpperCase()

              // 匹配A-Z 如果不匹配则是特殊字符 key设置为#
              let re = /^[A-Z]$/
              if (!re.test(key)) {
                key = '#'
              }

              // 将好友分类并添加到 indexBarData中
              if (
                this.indexBarData.length <= 0 ||
                this.indexBarData.every(item => {
                  return item.key !== key
                })
              ) {
                this.indexBarData.push({
                  friends: [item],
                  key
                })
              } else {
                this.indexBarData.map(indexBaritem => {
                  if (indexBaritem.key === key) {
                    indexBaritem.friends.push(item)
                  }
                })
              }

              // 将数据存到vuex中
              this.$store.commit('setFriendsList', this.indexBarData)
            })
          } else {
            this.$toast.fail(res.data.message)
          }
        })
        .catch(err => {
          console.log(err)
          this.$toast.fail('错误')
        })
    }
  }
}
</script>

<style scoped lang='less'>
.addressBook {
}
</style>
