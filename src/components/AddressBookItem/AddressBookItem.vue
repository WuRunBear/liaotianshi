<template>
  <div
    :class='{"addressBook-itemCheck":check}'
    @click='click'
    @touchend='check = false'
    @touchstart='check = true'
    class='addressBook-item flex'
  >
    <div class='left padding-07-rem'>
      <my-image :src='avatarPath' alt='头像' class='avatar height-100' />
    </div>

    <div class='right flex flex-direction-column'>
      <span v-html='msg.toString()'></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'addressBook-item',
  data() {
    return {
      check: false
    }
  },
  mounted() {},
  methods: {
    click: function(e) {
      // 跳转路由
      if (this.to) {
        this.$router.push(this.to, () => {})
      }
    }
  },
  props: {
    avatarPath: {
      type: String,
      default: function() {
        return process.env.BASE_URL + 'images/logo.png'
      }
    },
    msg: {
      type: String,
      default: ''
    },
    to: {
      type: Object
    }
  }
}
</script>

<style scoped lang='less'>
.addressBook-item {
  height: 3rem;
  background: #fff;
  border-bottom: solid 1px #e4e4e4;

  .left {
    width: 3rem;
    .avatar {
      background: #e4e4e4;
      border-radius: 5px;
    }
  }
  .right {
    flex: 1;
    span {
      line-height: 3rem;
    }
  }
}
.addressBook-itemCheck {
  background: #e4e4e4;
}
</style>