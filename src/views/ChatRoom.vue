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
							<div class='msg' v-html='item.msg'></div>
						</div>
					</div>
				</div>
			</div>
		</main>

		<footer>
			<div class='flex position-fixed bottom-0'>
				<!-- <div class='left'></div> -->
				<div class='center flex'>
					<input-text id='msgText' class='input-text' @keydown.enter='send' />
				</div>
				<div class='right'>
					<input-button class='input-button' value='发送' @click='send' />
				</div>
			</div>
		</footer>
	</div>
</template>

<script>
export default {
	name: 'Chat-Room',
	data() {
		return {
			msgListData: [{ id: 1, msg: 'fdsa', isMe: false }]
		}
	},
	methods: {
		clickLeft: function(e) {
			this.$router.go(-1)
			// alert('后退')
		},
		send: function(e) {
			let msgTextE = document.querySelector('#msgText'),
				msgText = msgTextE.value

			// if (msgText !== '') {
			this.msgListData.push({
				id: this.msgListData[this.msgListData.length - 1].id + 1,
				msg: msgText,
				isMe: true
			})
			msgTextE.value = ''
			// } else {
			// 	alert('内容不能为空')
			// }

			msgTextE.focus()
		},
		initMsgList: function() {
			// 初始化消息列表的滚动位置到最底部
			let msgList = document.querySelector('.msg-list'),
				toY = msgList.scrollHeight - msgList.parentElement.scrollHeight
			msgList.scrollTo(0, toY)
		}
	},
	mounted() {
		this.initMsgList()
	},
	watch: {
		msgListData: function(newData, oldData) {
			this.initMsgList()
		}
	},
	props: {
		RoomId: {
			default: '0'
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
		height: 3rem;

		> div:first-child {
			width: 100%;
			height: 3rem;
			border-top: solid 1px #e4e4e4;
			background: #f4f4f4;

			// .left {
			// 	flex: 1;
			// }
			.center {
				flex: 7;

				.input-text {
					padding: 0.3rem;
					border: none;
					flex: 1;
				}
			}
			.right {
				flex: 2;
				box-sizing: border-box;
				padding: 0.5rem 0;

				.input-button {
					margin: 0 0.5rem;
					height: 100%;
				}
			}
		}
	}
}
</style>