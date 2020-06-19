<template>
	<div class='newFriend'>
		<navbar leftText='新的朋友' ArrowLeft NotIconRight @click-left='clickLeft' />

		<main>
			<!-- 添加好友申请 -->
			<div class='apply'>
				<item
					class='myInfoBox'
					v-for='(value,key) in friendApplys'
					:key='key'
					:leftSrc='value.avatar'
					:centerUpText='value.userName'
					@click='modifyInfo'
				/>
			</div>
		</main>
	</div>
</template>

<script>
export default {
	name: 'newFriend',
	data() {
		return {
			friendApplys: [
				{
					id: 1,
					userName: 'admin',
					nickName: 'Admin',
					avatar:
						'http://192.168.3.18:8081/upload/20200614/image/2020061400446017804797052.jpeg',
					gender: 2,
					friend: {}
				}
			]
		}
	},
	methods: {
		clickLeft: function(e) {
			this.$router.go(-1)
		},
		modifyInfo: function(e) {}
	}
}
</script>

<style lang="less" scoped>
.newFriend {
	main {
	}
}
</style>