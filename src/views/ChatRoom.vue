<template>
	<div class='chat-room flex flex-direction-column'>
		<navbar ArrowLeft leftText='聊天目标用户' @click-left='clickLeft'>
			<template v-slot:right>
				<div>...</div>
			</template>
		</navbar>

		<main>
			<div class='msg-list'>
				<div class='msgItem' v-for='item in msgListData' :key='item.id'>
					<div :class='{"my":item.isMe}' class='flex'>
						<div class='avatar'>
							<my-image />
						</div>

						<div class='msgBox flex'>
							<div class='msg' v-text='item.msg'></div>
						</div>
					</div>
				</div>
			</div>
		</main>

		<footer class='flex'>
			<van-field
				v-model='msgText'
				type='textarea'
				rows='1'
				:autosize='{maxHeight:16*4}'
				ref='msgTextE'
			>
				<template #button>
					<van-button size='small' type='primary' @click='send'>发送</van-button>
				</template>
			</van-field>
		</footer>
	</div>
</template>

<script>
export default {
	name: 'Chat-Room',
	data() {
		return {
			// msgListData: [],
			msgText: ''
		}
	},
	methods: {
		clickLeft: function(e) {
			// 聊天房间返回只返回聊天列表
			this.$router.push(
				{
					name: 'Message'
				},
				() => {}
			)
		},
		send: function(e) {
			if (this.msgText !== '') {
				this.$store.commit('setChatRecord', {
					roomId: this.roomId,
					filt: false,
					success: false,
					loading: true,
					type: this.type || 1,
					userId: this.$store.getters.userInfo.id,
					msg: this.msgText
				})

				this.$socket.emit(
					'sendChatMsg',
					{
						roomId: this.roomId,
						msg: this.msgText,
						mode: this.mode || 1
					},
					re => {
						// console.log(re)
					}
				)
			}

			this.$refs.msgTextE.focus()

			this.msgText = ''
		},
		initMsgList: function() {
			// 初始化消息列表的滚动位置到最底部
			let msgList = document.querySelector('.msg-list'),
				toY = msgList.scrollHeight - msgList.parentElement.scrollHeight
			msgList.scrollTo(0, toY)
		}
	},
	computed: {
		msgListData: function() {
			return this.$store.getters.chatRecord
		}
	},
	watch: {},
	updated() {
		// dom更新之后执行
		this.initMsgList()
	},
	mounted() {
		// 加入当前房间
		this.$socket.emit('addRoom', { roomId: this.roomId })

		// 初始化vuex中聊天记录
		this.$store.commit('setChatRecord', { roomId: this.roomId })
	},
	props: {
		roomId: {
			type: String,
			default: '1'
		}
	}
}
</script>

<style scoped lang='less'>
.chat-room {
	height: 100vh;

	main {
		flex: 1;
		background: #f9f9f9;
		overflow: hidden;

		.msg-list {
			overflow-y: auto;
			overflow-x: hidden;
			height: 100%;

			.msgItem {
				margin: 0.5rem 0.3rem;

				.avatar {
					width: 2rem;
					height: 2rem;
				}
				.msgBox {
					flex: 1;
					margin: 0 0.3rem;

					.msg {
						max-width: 18rem;
						height: 100%;
						padding: 0.3rem;
						background: #fff;
						border-radius: 5px;
						display: inline-block;
						word-wrap: break-word;
						word-break: normal;
						border: solid 1px #e4e4e4;
						white-space: pre-wrap;
					}
				}
				.my {
					flex-direction: row-reverse;
					.msg {
						margin-left: auto;
						background: #08e60f;
					}
				}
			}
		}
	}

	footer {
		padding: 0.5rem;
		background: #e9e9e9;
		box-shadow: #7f7f7f 0px 3px 13px 0px;

		> div:first-child {
			padding: 0 0 0 1rem;
			border-radius: 5px;
		}
	}
}
</style>