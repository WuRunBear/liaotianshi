<template>
	<div class='my'>
		<navbar NotRightDDM />

		<main>
			<my-item
				big
				:zTitle='this.userInfo.nickName || this.userInfo.userName'
				:fTitle='`账号：${this.userInfo.userName}`'
				:avatar='this.userInfo.avatar || `/images/logo.png`'
				:to='{name:"MyInfo"}'
			/>
			<my-item @click='zx' />
		</main>
	</div>
</template>

<script>
export default {
	name: 'My',
	data() {
		return {
			userInfo: this.$store.getters.userInfo
		}
	},
	methods: {
		zx: function() {
			this.axios(this.$api.users.logout())
				.then(res => {
					if (res.data.errno === 0) {
						alert('退出成功')
						this.$store.commit('logout')
						this.$router.push({ name: 'Login' })
					}
				})
				.catch(err => {
					alert('失败')
					console.log(err)
				})
		}
	},
	mounted() {}
}
</script>

<style scoped lang='less'>
</style>