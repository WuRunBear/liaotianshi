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
		<div class='control'>
			<item notLeft centerUpText='设置备注' />
		</div>

		<div class='btn' v-if='userInfo.friend.id'>
			<input-button class='Chat' value='发消息' />
		</div>

		<div class='btn' v-if='!userInfo.friend.id'>
			<input-button value='加为好友' class='addFriend' :icon='"add-o"' />
		</div>
	</div>
</template>

<script>
export default {
	name: 'UserInfo',
	data() {
		return {}
	},
	methods: {
		clickLeft: function(e) {
			this.$router.go(-1)
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
		userInfo: {
			type: Object
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