<template>
	<div class='home min-height-100-vh'>
		<router-view></router-view>

		<tabbar :change='change'>
			<tabbar-item icon='icon-bubble' :to='{name:"Message"}'>消息</tabbar-item>
			<tabbar-item icon='icon-address-book' :to='{name:"AddressBook"}'>通讯录</tabbar-item>
			<tabbar-item icon='icon-user' :to='{name:"My"}'>我</tabbar-item>
		</tabbar>
	</div>
</template>

<script>
export default {
	name: 'Home',
	data() {
		return {}
	},
	created() {},
	methods: {
		change: function(name) {
			// if (this.$route.name !== name) {
			// 	this.$router.push({ name })
			// }
		}
	}
}
</script>

<style scoped lang="less">
.home {
}
</style>