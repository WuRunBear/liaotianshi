<template>
	<div class='myInfo'>
		<navbar leftText='我的信息' ArrowLeft NotRightDDM NotIconRight @click-left='clickLeft' />

		<item
			class='myInfoBox'
			v-for='(value,key) in handleUserInfo'
			:key='key'
			:data-modifyKey='key'
			:data-modifyValue='value'
			@click='modifyInfo'
		>
			<template v-slot:left>
				<div class='left flex'>
					<div class='title flex margin-right-auto'>
						<span class='margin-auto'>{{key | userInfoKeyFilt}}</span>
					</div>
				</div>
			</template>

			<template v-slot:center>
				<div class='center flex margin-left-auto'>
					<span class='margin-auto' v-if='key !== "avatar"'>{{value | userInfoValueFilt(key)}}</span>
					<my-image class='avatar' v-if='key === "avatar"' :src='value' alt='头像' />
				</div>
			</template>
		</item>
	</div>
</template>

<script>
import userInfoKeyFilt from '../utils/userInfoKeyFilt'

export default {
	name: 'MyInfo',
	data() {
		return {
			check: false,
			userInfo: this.$store.getters.userInfo
		}
	},
	computed: {
		// 过滤userInfo里的属性
		handleUserInfo: function() {
			delete this.userInfo.id
			console.log(this.userInfo);
			

			return this.userInfo
		}
	},
	methods: {
		click: function(e) {
			// console.log(e)
		},
		clickLeft: function(e) {
			this.$router.push({ name: 'My' })
		},
		modifyInfo: function(e) {
			let modifyItem = {
				key: e.currentTarget.getAttribute('data-modifyKey'),
				value: e.currentTarget.getAttribute('data-modifyValue')
			}

			if (modifyItem.key !== 'userName') {
				this.$router.push(
					{ name: 'ModifyInfo', params: { modifyItem } },
					() => {}
				)
			}
		}
	},
	mounted() {},
	filters: {
		userInfoValueFilt: function(value, key) {
			if (!key) return ''

			switch (key) {
				case 'gender':
					let msg
					// msg = (value === 1 && value !== 0) ? '男' : '女'

					if (value === 0) {
						msg = '保密'
					} else if (value === 1) {
						msg = '男'
					} else if (value === 2) {
						msg = '女'
					}

					return msg
					break

				default:
					return value
					break
			}
		},
		//过滤userinfo的属性名
		userInfoKeyFilt
	}
}
</script>

<style lang="less" scoped>
.myInfo {
	height: 100vh;

	.myInfoBox {
		padding: 0 0.5rem;
		background: #fff;
		min-height: 2.5rem;
		max-height: 4rem;
		border-bottom: solid 1px #ededed;

		.left {
			flex: 9;
		}

		.center {
			width: auto;
			.avatar {
				width: 4rem;
				height: 4rem;
			}
		}

		.right {
			flex: 1;
			.icon-keyboard_arrow_right {
				margin: auto 0 auto auto;
			}
		}
	}

	.myInfoBoxCheck {
		background: #e9e9e9;
	}
}
</style>