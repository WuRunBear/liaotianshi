<template>
	<div class='addressBook'>
		<navbar leftText='通讯录' :dropDownMenu='DDM' />
		<main>
			<div class='group'>
				<div class='calssify padding-left-07-rem' @click='isShowGroup=!isShowGroup'>加入的群</div>
				<div :class='{"height-0":isShowGroup}' class='list'>
					<addressBook-item v-for='item in GroupData' :key='item.key' :msg='item.name' />
				</div>
			</div>

			<div class='friend'>
				<div class='calssify padding-left-07-rem' @click='isShowFriend=!isShowFriend'>我的好友</div>
				<div :class='{"height-0":isShowFriend}' class='list'>
					<addressBook-item v-for='item in FriendData' :key='item.key' :msg='item.name' />
				</div>
			</div>
		</main>
	</div>
</template>

<script>
export default {
	name: 'AddressBook',
	data() {
		return {
			isShowGroup: false,
			isShowFriend: false,
			GroupData: [
				{
					name: '张三李四群',
					avatarPath: '/images/1.png',
					key: 1
				},
				{
					name: '王五刘六群',
					avatarPath: '/images/2.png',
					key: 2
				}
			],
			FriendData: [
				{ name: '张三', key: 1 },
				{ name: '李四', key: 2 },
				{ name: '王五', key: 3 },
				{ name: '刘六', key: 4 }
			],
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
	mounted() {
		// 初始化分组的高度 用于transition过度
		let Group = document.querySelector('.group .list'),
			Friend = document.querySelector('.friend .list')

		Group.style.height = `${Group.scrollHeight}px`
		Friend.style.height = `${Friend.scrollHeight}px`
	}
}
</script>

<style scoped lang='less'>
.addressBook {
	.calssify {
		height: 2rem;
		line-height: 2rem;
		font-size: 0.9rem;
		background: #dfdfdf;
		border: solid 1px #c9c9c9;
	}
	.calssify:active {
		background: #d0d0d0;
	}
	.list {
		overflow: hidden;
		transition: height 0.2s;
	}
}
</style>
