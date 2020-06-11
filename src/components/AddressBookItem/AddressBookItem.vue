<template>
	<div
		class='addressBook-item flex'
		:class='{"addressBook-itemCheck":check}'
		@touchstart='check = true'
		@touchend='check = false'
	>
		<div class='left padding-07-rem'>
			<my-image class='avatar height-100' :src='avatarPath' alt='头像' />
		</div>
		<div class='right flex flex-direction-column'>
			<span v-html='msg'></span>
		</div>
	</div>
</template>

<script>
export default {
	name: 'addressBook-item',
	data() {
		return {
			check: false
		}
	},
	props: {
		avatarPath: {
			type: String,
			default: function() {
				return process.env.BASE_URL + 'images/logo.png'
			}
		},
		msg: {
			type: String,
			default: ''
		}
	}
}
</script>

<style scoped lang='less'>
.addressBook-item {
	height: 3rem;
	background: #fff;
	border-bottom: solid 1px #e4e4e4;

	.left {
		width: 3rem;
		.avatar {
			background: #e4e4e4;
			border-radius: 5px;
		}
	}
	.right {
		flex: 1;
		span {
			line-height: 3rem;
		}
	}
}
.addressBook-itemCheck {
	background: #e4e4e4;
}
</style>