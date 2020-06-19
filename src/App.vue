<template>
	<div id='app' class='min-height-100-vh'>
		<router-view />

		<!-- 消息提示 -->
		<van-notify
			v-model='$store.getters.notify.show'
			@click='function(e){
				$router.push($store.getters.notify.to || "",()=>{}); 
				$store.getters.notify.show = false
			}'
			type='success'
		>
			<van-icon name='friends' />
			<span v-text='$store.getters.notify.msg'></span>
		</van-notify>

		<!-- 加载中提示 -->
		<van-overlay class='flex loading' :show='$store.getters.loading'>
			<van-loading size='50' class='margin-auto' vertical>加载中...</van-loading>
		</van-overlay>
	</div>
</template>

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