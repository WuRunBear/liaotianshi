<template>
	<div
		class='message-item flex'
		:class='{"message-itemCheck":check}'
		@touchstart='check = true'
		@touchend='check = false'
		@click='click'
	>
		<div class='left flex padding-07-rem'>
			<my-image class='avatar' :src='avatarPath' alt='头像' />
		</div>

		<div class='center flex flex-direction-column'>
			<div class='title flex flex-align-items-center'>测试数据</div>
			<div class='lastMsg font-little' v-text='lastMsg'></div>
		</div>

		<div class='right flex flex-direction-column'>
			<div
				class='lastTime font-little flex flex-align-items-center flex-justify-content-center'
				v-text='lastTime'
			></div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'message-item',
	data() {
		return {
			check: false,
			to: { name: 'ChatRoom', params: { roomId: this.roomId } }
		}
	},
	methods: {
		click: function(e) {
			if (this.$route.name !== this.to.name) {
				this.$router.push(this.to)
			}
		}
	},
	mounted() {},
	props: {
		avatarPath: {
			type: String,
			default: function() {
				return process.env.BASE_URL + 'images/logo.png'
			}
		},
		roomId: String,
		lastMsg: String,
		lastTime: String
	}
}
</script>

<style scoped lang='less'>
.message-item {
	height: 4rem;
	background: #fff;

	.left {
		width: 4rem;
		.avatar {
			height: 100%;
			border-radius: 5px;
			background: #e4e4e4;
		}
	}
	.center {
		flex: 1;
		border-bottom: solid 1px #e4e4e4;
		// width: 68%;

		.title {
			flex: 1;
		}
		.lastMsg {
			flex: 1;
			width: 15rem;
			color: #b4b4b4;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}
	.right {
		border-bottom: solid 1px #e4e4e4;
		// width: 18%;
		.lastTime {
			flex: 1;
			font-size: 0.5rem;
			text-align: center;
			padding-right: 0.7rem;
			color: #b4b4b4;
		}
	}
}
.message-itemCheck {
	background: #e9e9e9;
}
</style>