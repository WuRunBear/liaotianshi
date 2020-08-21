<template>
  <div class='min-height-100-vh' id='app'>
    <router-view />

    <!-- 消息提示 -->
    <van-notify
      @click='function(e){
				$router.push($store.getters.notify.to || "",()=>{}); 
				$store.getters.notify.show = false
			}'
      type='success'
      v-model='$store.getters.notify.show'
    >
      <van-icon name='friends' />
      <span v-text='$store.getters.notify.msg'></span>
    </van-notify>

    <!-- 加载中提示 -->
    <van-overlay :show='$store.getters.loading' class='flex loading'>
      <van-loading class='margin-auto' size='50' vertical>加载中...</van-loading>
    </van-overlay>
  </div>
</template>

<script>
export default {
  computed: {
    socketDataId: function() {
      return this.$store.getters.socketDataId
    }
  },
  watch: {
    socketDataId: function(newV, oldV) {
      console.log(3, '153135')
      this.$socket.emit('getSuccess', newV, () => {
        console.log(1)
      })
    }
  },
  created(){
    this.$socket.emit('init',null,(res)=>{
      // if(res)
      console.log(res);
    })
  }
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #f0f0f0;
  > .loading {
    z-index: 12;
  }
}
</style>