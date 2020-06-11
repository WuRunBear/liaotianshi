<template>
	<div class='login flex flex-direction-column height-100-vh'>
		<navbar rightText='登录' NotRightDDM />

		<div class='loginBox flex flex-direction-column margin-auto'>
			账号：
			<input type='text' id='userName' v-model='userInfo.userName' placeholder='账号' />密码：
			<input type='password' id='password' v-model='userInfo.password' placeholder='密码' />
			<input-button value='登录' class='loginBtn' @click='login' />
			<input-button value='注册' @click='register' />
			<!-- <input-button value='cookie' @click='ce'></input-button> -->
		</div>
	</div>
</template>

<script>
export default {
	name: 'Login',
	data() {
		return {
			userInfo: {
				userName: '',
				password: ''
			}
		}
	},
	methods: {
		login: function(e) {

			this.axios(this.$api.users.login(this.userInfo))
				.then(res => {
					if (res.data.errno === 0) {
						this.$store.commit('login', res.data.data)

						this.$router.push(this.toPath, () => {})
					} else {
						alert(res.data.message)
					}
				})
				.catch(err => {
					alert('登录失败')
					console.log(err)
				})
		},
		register: function(e) {
			this.$router.push({ name: 'Register' })
		}
	},
	created() {
		if (this.$store.getters.userInfo) {
			this.$router.push(this.toPath)
		}
	},
	props: {
		toPath: {
			type: Object,
			default: () => {
				return {
					name: 'Home'
				}
			}
		}
	}
}
</script>

<style scoped lang='less'>
.login {
	.loginBox {
		> * {
			margin: 1rem;
			width: 15rem;
			height: 2rem;
			border-radius: 10px;
		}

		.loginBtn {
			color: #fff;
			background: #00cc22;
		}
	}
}
</style>