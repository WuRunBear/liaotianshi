<template>
	<div id='app' class='height-100-vh'>
		<router-view />

		<van-overlay
			class='flex loading'
			:show='$store.getters.loading'
			@click='$store.commit("hiddenLoading")'
		>
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