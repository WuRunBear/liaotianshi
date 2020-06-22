<template>
	<div class='newFriend height-100-vh'>
		<navbar leftText='新的朋友' ArrowLeft NotIconRight @click-left='clickLeft' />

		<main>
			<!-- 添加好友申请 -->
			<item
				class='apply'
				v-for='(value,key) in friendApplys'
				:key='key'
				:leftSrc='value.avatar'
				:centerUpText='value.userName'
			>
				<template #center>
					<div
						class='center flex flex-direction-column'
						@click='function(e){
							userInfo(e,{name:"UserInfo", params:{userInfo: value}})
						}'
					>
						<span class='title flex flex-align-items-center' v-html=' value.nickName || value.userName'></span>
						<span class='msg flex flex-align-items-center' v-html='value.message'></span>
					</div>
				</template>

				<!-- 添加按钮 -->
				<template #right>
					<div
						class='right padding-right-07-rem flex flex-align-items-center flex-justify-content-center'
					>
						<van-button
							class='btn'
							type='primary'
							:loading='value.apply'
							@click='function(e){
								// 初始化备注为昵称或账号名
								alias = value.nickName || value.userName
								// 设置选择的好友对象
								checkApply = value
								// 显示展示板
								addShow = true
							}'
						>添加</van-button>
					</div>
				</template>
			</item>
		</main>

		<!-- 添加好友时展示面板 -->
		<van-action-sheet v-model='addShow' close-on-popstate title='添加好友'>
			<van-field v-model='alias' label='备注' />

			<!-- 添加按钮 -->
			<div class='margin-07-rem'>
				<van-button type='primary' @click='agree' block>添加</van-button>
			</div>
		</van-action-sheet>
	</div>
</template>

<script>
export default {
	name: 'newFriend',
	data() {
		return {
			friendApplys: [],
			checkApply: {},
			addShow: false,
			alias: ''
		}
	},
	methods: {
		clickLeft: function(e) {
			// 返回
			this.$router.go(-1)
		},
		userInfo: function(e, to) {
			// 跳转路由
			if (to && to.name !== this.$route.name) {
				this.$router.push(to, () => {})
			}
		},
		agree: function(e) {
			let friend = {
				friendId: this.checkApply.id,
				alias: this.alias
			}
			this.axios(this.$api.friends.addFriend(friend)).then(data=>{
				console.log(data);
				
			})
		}
	},
	mounted() {
		// 初始化请求列表
		try {
			this.friendApplys = JSON.parse(localStorage.getItem('friendApplys')) || []
		} catch (error) {
			this.friendApplys = []
		}
	}
}
</script>

<style lang="less" scoped>
.newFriend {
	main {
		.apply {
			.center {
			}

			.right {
				.btn {
					height: 1.5rem;
					width: 100%;
				}
			}
		}
	}
}
</style>