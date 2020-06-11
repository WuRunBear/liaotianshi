<template>
	<div class='register flex flex-direction-column height-100'>
		<navbar ArrowLeft @click-left='leftClick' rightText='注册' NotRightDDM />
		<div class='registerBox flex flex-direction-column margin-auto'>
			<uploadImg class='avatar' @after-upload='files'></uploadImg>

			<span>
				昵称：
				<div class='errMsg font-little' v-show='!msg.nickName.isSuccess' v-text='msg.nickName.msg'></div>
			</span>
			<input type='text' id='registNickName' v-model='userInfo.nickName' placeholder='昵称' />

			<span>
				用户名：
				<div class='errMsg font-little' v-show='!msg.userName.isSuccess' v-text='msg.userName.msg'></div>
			</span>
			<input
				type='text'
				id='registUserName'
				v-model='userInfo.userName'
				@change='_isExist'
				placeholder='用户名'
			/>

			<span>
				密码：
				<div class='errMsg font-little' v-show='!msg.password.isSuccess' v-text='msg.password.msg'></div>
			</span>
			<input type='password' id='registPassword' v-model='userInfo.password' placeholder='密码' />
			<span>
				确认密码：
				<div class='errMsg font-little' v-show='!msg.confirm.isSuccess' v-text='msg.confirm.msg'></div>
			</span>
			<input type='password' id='registConfirm' v-model='userInfo.confirm' placeholder='密码' />

			<span>
				性别：
				<div class='errMsg font-little' v-show='!msg.gender.isSuccess' v-text='msg.gender.msg'></div>
			</span>
			<div class='genderBox'>
				<input type='radio' v-model.number='userInfo.gender' value='0' />保密
				<input type='radio' v-model.number='userInfo.gender' value='1' />男
				<input type='radio' v-model.number='userInfo.gender' value='2' />女
			</div>

			<input-button value='注册' class='registBtn' @click='register'></input-button>
		</div>
	</div>
</template>

<script>
import validate from '../utils/validateUser'

export default {
	name: 'Login',
	data() {
		return {
			progress: 0,
			isProgress: false,
			userInfo: {
				userName: '',
				nickName: '',
				password: '',
				confirm: '',
				avatar: '',
				gender: 0
			},
			msg: {
				userName: { msg: '', isSuccess: false },
				nickName: { msg: '', isSuccess: false },
				password: { msg: '', isSuccess: false },
				confirm: { msg: '', isSuccess: false },
				gender: { msg: '', isSuccess: false }
			}
		}
	},
	methods: {
		leftClick: function(e) {
			this.$router.push({ name: 'Login' })
		},
		files: function(e) {
			if (e) {
				this.userInfo.avatar = e.name
			}
		},
		register: function() {
			this.$toast.loading({
				message: '加载中...',
				forbidClick: true,
				duration: 0
			})
			this.axios(this.$api.users.register(this.userInfo))
				.then(res => {
					if (res.data.errno === 0) {
						// this.userInfo.nickName = (++this.userInfo.nickName).toString()
						// this.userInfo.userName = Math.random()
						// 	.toString()
						// 	.split('.')[1]
						// 	.slice(0, 5)
						this.$toast.success('注册成功')
						this.$router.push({ name: 'Login' })
					} else {
						this.$toast.fail(res.data.message)
					}
				})
				.catch(err => this.$toast.fail('失败，请重试'))
		},
		_isExist: function(e) {
			if (this.msg.userName.isSuccess) {
				this.axios(this.$api.users.isExist(this.userInfo.userName))
					.then(res => {
						if (res.data.errno === 0) {
							this.msg.userName.isSuccess = true
						} else {
							this.msg.userName.isSuccess = false
							this.msg.userName.msg = res.data.message
						}
					})
					.catch(err => {
						this.$toast.fail(err)
					})
			}
		}
	},
	watch: {
		userInfo: {
			handler: function(val, oldval) {
				let msg = validate(val)

				for (const key in msg) {
					if (this.msg.hasOwnProperty(key) && this.msg[key] !== msg[key]) {
						if (typeof msg[key] === 'string') {
							this.msg[key].msg = msg[key]
						} else {
							this.msg[key].isSuccess = msg[key]
						}
					}
				}
			},
			deep: true
		}
	}
}
</script>

<style scoped lang='less'>
.register {
	.registerBox {
		> *:nth-child(odd),
		.registBtn {
			margin: 0.5rem 1rem;
			width: 15rem;
			height: 2rem;
			border-radius: 10px;
		}
		.avatar {
			width: 5rem;
			height: 5rem;
			margin: 1rem auto;
			overflow: hidden;
			border-radius: 50%;
		}
		.errMsg {
			width: 15rem;
			margin: 0 1rem;
			color: #f00;
		}
	}
}
</style>