<template>
	<div class='selectUser height-100 flex flex-direction-column'>
		<navbar ArrowLeft @click-left='clickLeft' leftText='添加朋友' NotIconRight NotRightDDM />
		<div class='selectBox flex'>
			<input
				type='text'
				class='selectText height-100'
				placeholder='输入账号／昵称搜索'
				v-model.trim='selectUserComputed.selectInfo.selectText'
				@keydown.enter='function(e){ selectUser(e);  selectUserComputed.userList.rows=[];selectUserComputed.userList.count=0}'
			/>
			<input-button
				class='selectBtn'
				value='搜索'
				@click='function(e){ selectUser(e);  selectUserComputed.userList.rows=[];selectUserComputed.userList.count=0}'
			/>
		</div>

		<div class='selectListMsg'>找到的用户：</div>

		<div class='selectListBox height-100 width-100'>
			<van-list
				v-model='loading'
				class='selectList'
				:finished='selectUserComputed.userList.rows.length >= selectUserComputed.userList.count'
				finished-text='什么也没有'
				@load='selectUser'
			>
				<item
					v-for='(item,index) in selectUserComputed.userList.rows'
					:key='index'
					:leftSrc='item.avatar'
					@click='function(e){
						toUserInfo(e,item)
					}'
					notRight
				>
					<template v-slot:center>
						<div class='selectMsg flex flex-direction-column'>
							<span class='margin-top-auto margin-bottom-auto' v-html='item.nickName'></span>
						</div>
					</template>
				</item>
			</van-list>
			<!-- <div class='selectList'>
				<div
					v-for='(item,index) in userList.rows'
					:key='index'
					@click='function(e){
						toUserInfo(e,item)
					}'
					class='selectItem flex'
					:class='{"selectItemCheck":check}'
				>
					<div class='selectImg'>
						<my-image class='avatar' :src='item.avatar || "/images/logo.png"' alt='头像' />
					</div>

					<div class='selectMsg flex flex-direction-column'>
						<span class='margin-top-auto margin-bottom-auto' v-html='item.nickName'></span>
					</div>
				</div>

				<div class='selectItem flex' v-show='userList.errno === 10008'>
					<div class='margin-auto' v-html='userList.message'></div>
				</div>
			</div>-->
		</div>
	</div>
</template>

<script>
export default {
	name: 'SelectUser',
	data() {
		return {
			check: false,
			selectInfo: {
				selectText: '',
				page: 1,
				pageSize: 10
			},
			userList: {
				count: 0,
				rows: []
			},
			loading: false
		}
	},
	methods: {
		// 选择用户后跳转到userInfo路由
		toUserInfo: function(e, userInfo) {
			// 验证是否为好友
			this.axios(this.$api.friends.isFriend(userInfo.id))
				.then(res => {
					// 为0则是好友
					if (res.data.errno === 0) {
						// 将好友信息加到userInfo内
						userInfo.friend = res.data.data
					} else {
						userInfo.friend = {}
					}
					// 存到localStorage
					localStorage.setItem('router_userInfo', JSON.stringify(userInfo))
					// sessionStorage.setItem('router_userInfo', JSON.stringify(userInfo))

					// 跳转路由
					this.$router.push(
						{ name: 'UserInfo', params: { userInfo } },
						() => {}
					)
				})
				.catch(err => {
					this.$toast('错误')
				})
		},
		// 搜索用户
		selectUser: function(e) {
			this.axios(this.$api.users.selectUser(this.selectInfo))
				.then(res => {
					if (res.data.errno === 0) {
						// 如果count存在就在selectUser上显示

						if (res.data.data.count) {
							this.userList.count = res.data.data.count
							this.userList.rows = this.userList.rows.concat(res.data.data.rows)

							this.selectInfo.page++
						} else {
							this.userList.count = 1
							this.userList.rows.push(res.data.data)
						}
					} else {
						// this.userList = res.data
						if (res.data.errno !== 10010) this.$toast.fail(res.data.message)
						else {
							this.userList.count = 1
							this.userList.rows.push(this.$store.getters.userInfo)
						}
					}

					this.loading = false
				})
				.catch(err => {
					this.$toast.fail('错误')
				})
		},
		clickLeft: function(e) {
			this.$router.go(-1)
		},
		setSelectUser: function() {}
	},
	computed: {
		selectUserComputed: function() {
			// 将userList和selectInfo存到vuex中

			this.$store.commit('setSelectUserData', {
				userList: this.userList,
				selectInfo: this.selectInfo
			})

			return {
				userList: this.userList,
				selectInfo: this.selectInfo
			}
		}
	},
	created() {
		// 从vuex中取出userList和selectInfo的数据
		// console.log(this.$store.getters.selectUserData);
		this.userList = this.$store.getters.selectUserData.userList || this.userList
		this.selectInfo =
			this.$store.getters.selectUserData.selectInfo || this.selectInfo
	},
	beforeRouteLeave(to, from, next) {
		if (to.name !== 'UserInfo') {
			this.$store.commit('remSelectUserData', {})
		}
		next()
	}
}
</script>

<style scoped lang='less'>
.selectUser {
	.selectBox {
		width: 100%;
		height: 2.5rem;
		padding: 0.3rem;
		background: white;
	}
	.selectText {
		flex: 1;
		padding: 0.3rem;
	}
	.selectBtn {
		width: 3rem;
		margin: 0 0 0 0.3rem;
	}

	.selectListMsg {
		font-size: 0.9rem;
		padding: 0.5rem;
		border-bottom: solid 1px #e4e4e4;
	}

	.selectListBox {
		flex: 1;
		overflow: scroll;
		.selectList {
			height: 3.5rem;
			background: white;

			.selectImg {
				width: 3.5rem;
				padding: 0.5rem;
			}

			.selectMsg {
				flex: 1;
			}
			// .selectItemCheck {
			// 	background: #e4e4e4;
			// }
		}
	}
}
</style>