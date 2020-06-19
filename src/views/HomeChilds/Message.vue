<template>
	<div class='message'>
		<navbar leftText='消息' :dropDownMenu='DDM' />

		<main>
			<message-item :roomId='"2"' lastMsg lastTime='2020年9月9日' />
		</main>
	</div>
</template>

<script>
export default {
	name: 'Message',
	data() {
		return {
			DDM: [
				{
					msg: '添加好友',
					to: { name: 'SelectUser' },
					icon: 'icon-home'
				},
				{
					msg: '删除好友',
					to: { name: 'Message' },
					icon: 'icon-home'
				},
				{
					msg: '发起群聊',
					to: { name: 'Message' },
					icon: 'icon-home'
				}
			]
		}
	},
	methods: {}
}
</script>

<style scoped lang='less'>
// .message {
// 	main {
// 	}
// }
</style>	