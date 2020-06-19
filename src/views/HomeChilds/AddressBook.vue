<template>
	<div class='addressBook'>
		<navbar leftText='通讯录' :dropDownMenu='DDM' />

		<main>
			<div class='newFriend'>
				<addressBook-item :avatarPath='"/images/add_user.png"' :to='{name: "NewFriend"}' :msg='"新的好友"' />
			</div>

			<!-- 好友及群组 -->
			<van-index-bar :index-list='indexList' :sticky='false'>
				<div v-for='item in indexBarData' :key='item.key'>
					<van-index-anchor :index='item.key' />

					<addressBook-item
						v-for='nextItem in item.friends'
						:key='nextItem.id'
						:to='{name:"UserInfo",params:{userInfo:nextItem.userInfo}}'
						:msg='nextItem.name'
					/>
				</div>
			</van-index-bar>
		</main>
	</div>
</template>

<script>
export default {
	name: 'AddressBook',
	data() {
		return {
			indexBarData: [
				{
					id: 11,
					friends: [
						{
							name: '张三李四群',
							avatarPath: '/images/1.png',
							id: 1
						},
						{ name: '张三李四群', avatarPath: '/images/1.png', id: 2 }
					],
					key: 'Group'
				},
				{
					id: 1,
					friends: [
						{ name: '阿一', id: 1 },
						{ name: '阿二', id: 2 }
					],
					key: 'A'
				},
				{
					id: 2,
					friends: [
						{ name: '毕三', id: 3 },
						{ name: '毕四', id: 4 }
					],
					key: 'B'
				},
				{
					id: 3,
					friends: [
						{ name: '陈五', id: 5 },
						{ name: '陈六', id: 6 }
					],
					key: 'C'
				},
				{
					id: 4,
					friends: [
						{ name: '段七', id: 7 },
						{ name: '段八', id: 8 }
					],
					key: 'D'
				},
				{
					id: 5,
					friends: [
						{ name: '俄九', id: 7 },
						{ name: '俄十', id: 8 }
					],
					key: 'E'
				},
				{
					id: 6,
					friends: [
						{ name: '俄九', id: 7 },
						{ name: '俄十', id: 8 }
					],
					key: 'F'
				},
				{
					id: 7,
					friends: [
						{ name: '俄九', id: 7 },
						{ name: '俄十', id: 8 }
					],
					key: 'G'
				},
				{
					id: 8,
					friends: [
						{ name: '俄九', id: 7 },
						{ name: '俄十', id: 8 }
					],
					key: 'H'
				},
				{
					id: 5,
					friends: [
						{ name: '俄九', id: 7 },
						{ name: '俄十', id: 8 }
					],
					key: 'I'
				},
				{
					id: 9,
					friends: [
						{ name: '俄九', id: 7 },
						{ name: '俄十', id: 8 }
					],
					key: 'J'
				},
				{
					id: 10,
					friends: [
						{ name: '~九', id: 7 },
						{ name: '^十', id: 8 }
					],
					key: '#'
				}
			],
			indexList: [],
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
		// 初始化索引列表
		this.indexBarData.forEach(element => {
			this.indexList.push(element.key)
		})
	}
}
</script>

<style scoped lang='less'>
.addressBook {
}
</style>
