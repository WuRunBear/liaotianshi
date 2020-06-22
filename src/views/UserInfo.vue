<template>
	<div class='userInfo'>
		<navbar leftText='用户信息' ArrowLeft NotIconRight @click-left='clickLeft' />

		<div class='userInfoBox flex'>
			<div class='left'>
				<my-image class='avatar' :src='userInfo.avatar' />
			</div>

			<div class='right' ref='info'>
				<!-- 备注 -->
				<div v-if='userInfo.alias'>
					<span class='key'>备注：</span>
					<span v-html='userInfo.alias '></span>
				</div>

				<!-- 昵称 -->
				<div v-if='userInfo.nickName'>
					<span class='key'>昵称：</span>
					<span v-html='userInfo.nickName'></span>
				</div>

				<!-- 账号 -->
				<div v-if='userInfo.userName'>
					<span class='key'>账号：</span>
					<span v-html='userInfo.userName'></span>
				</div>

				<!-- 性别 -->
				<div v-if='userInfo.gender'>
					<span class='key'>性别：</span>
					<span>{{ userInfo.gender | userInfoValueFilt }}</span>
				</div>

				<!-- 地址 -->
				<div v-if='userInfo.city'>
					<span class='key'>地址：</span>
					<span v-html='userInfo.city'></span>
				</div>
			</div>
		</div>

		<!-- 设置权限、备注等 -->
		<div class='control' v-if='isFriend && !isMe'>
			<item notLeft centerUpText='设置备注' />
		</div>

		<!-- 发送消息按钮 -->
		<div class='btn' v-if='isFriend || isMe'>
			<input-button value='发消息' @click='chat' />
		</div>

		<!-- 发送添加好友请求 -->
		<div class='btn' v-if='!isFriend && !isMe'>
			<input-button value='加为好友' @click='addShow = true' :icon='"add-o"' />
		</div>

		<!-- 添加好友时展示面板 -->
		<van-action-sheet v-if='!isFriend && !isMe' v-model='addShow' close-on-popstate title='添加好友'>
			<van-field
				v-model='message'
				rows='3'
				:autosize='{ maxHeight: 16*5}'
				label='留言'
				maxlength='30'
				type='textarea'
				show-word-limit
				placeholder='请输入留言'
			/>

			<van-field v-model='alias' label='备注' />

			<div class='margin-07-rem'>
				<van-button type='primary' @click='addFriend' block>添加</van-button>
			</div>
		</van-action-sheet>
	</div>
</template>

<script>
export default {
	name: 'UserInfo',
	data() {
		return {
			userInfo: {},
			isFriend: false,
			isMe: false,
			addShow: false,
			alias: '',
			message: ''
		}
	},
	methods: {
		clickLeft: function(e) {
			this.$router.go(-1)
		},
		addFriend: function(e) {
			// 显示加载中提示
			this.$store.commit('showLoading')

			this.axios(
				this.$api.friends.addFriend({
					friendId: this.userInfo.id,
					alias: this.alias
				})
			)
				.then(res => {
					if (res.data.errno === 0) {
						// 发送添加好友请求
						this.$socket.emit(
							'addFriend',
							{ friendId: this.userInfo.id, message: this.message },
							() => {
								// 隐藏加载中提示
								this.$store.commit('hiddenLoading')

								// 显示请求完成提示
								this.$toast.success('请求完成')

								// 关闭展示面板
								this.addShow = false
							}
						)
					} else {
						this.$toast.fail(res.data.message)
					}
				})
				.catch(err => {
					this.$toast.fail('错误')
				})
		},
		chat: function(e) {
			this.$router.push(
				{
					name: 'ChatRoom',
					params: {
						roomId: this.userInfo.id.toString()
					}
				},
				() => {}
			)
		}
	},
	mounted() {
		// 获取用户数据
		// 是否为自己
		this.isMe = this.userName === this.$store.getters.userInfo.userName

		if (!this.isMe) {
			this.axios(this.$api.users.selectUser({ selectText: this.userName }))
				.then(res => {
					if (res.data.errno === 0) {
						// 将好友信息加到userInfo内
						this.userInfo = res.data.data
					} else {
						this.$toast.fail(res.data.message)
					}

					// 如果是好友
					if (this.userInfo.friend) {
						this.isFriend = true
					}
					// 初始化备注
					this.alias = this.userInfo.nickName || this.userInfo.userName
				})
				.catch(err => {
					this.$toast.fail('错误')
				})
		} else {
			// 如果是自己就从vuex中获取
			this.userInfo = this.$store.getters.userInfo
		}
	},
	filters: {
		userInfoValueFilt: function(value) {
			if (value === 0) {
				return '保密'
			} else if (value === 1) {
				return '男'
			} else if (value === 2) {
				return '女'
			}
			return value
		}
	},
	props: {
		userName: {
			type: String
		}
	},
	beforeRouteLeave(to, from, next) {
		localStorage.removeItem('router_userInfo')

		next()
	}
}
</script>

<style lang="less" scoped>
.userInfo {
	> div:first-child {
		margin: 0;
		padding: 0;
	}
	> * {
		margin-bottom: 0.5rem;
		background: #fff;
	}
	> div:last-child {
		margin: 0;
	}
	.userInfoBox {
		padding-top: 0.5rem;
		padding-left: 0.7rem;

		.left {
			padding-right: 0.7rem;

			.avatar {
				margin: 0 auto;
				max-width: 3rem;
				max-height: 3rem;
			}
		}
		.right {
			flex: 1;

			> * {
				font-size: 0.7rem;
				margin-bottom: 0.5rem;
			}

			> div:first-child {
				margin-top: 0.5rem;
				font-size: 1rem;
				font-weight: bold;

				.key {
					display: none;
				}
			}
		}
	}

	.control {
		> * {
			padding-left: 0.7rem;
		}
	}

	.btn {
		font-weight: bold;
		color: #6c7da2;
		border: none;
		height: 3rem;
	}
}
</style>