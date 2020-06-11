<template>
	<div
		:class='{"my-item-big":big,"my-itemCheck": check}'
		@touchstart='check = true'
		@touchend='check = false'
		class='my-item flex'
		v-on='$listeners'
		@click='click'
	>
		<div class='left flex padding-07-rem'>
			<my-image :class='{"img-big":big}' class='avatar' :src='avatar' alt='头像' />
		</div>

		<div class='center flex flex-direction-column'>
			<div class='title flex flex-align-items-center' v-html='zTitle'></div>
			<div class='msg' v-html='fTitle'></div>
		</div>

		<div class='right flex flex-align-items-center flex-justify-content-center'>
			<i class='icon-keyboard_arrow_right'></i>
		</div>
	</div>
</template>

<script>
export default {
	name: 'my-item',
	data() {
		return {
			check: false
		}
	},
	methods: {
		click: function(e) {
			if (this.to && this.to.name !== this.$route.name) {
				this.$router.push(this.to, () => {})
			}
		}
	},
	mounted() {},
	props: {
		to: Object,
		fTitle: {
			type: String,
			default: '副标题'
		},
		zTitle: {
			type: String,
			default: '主标题'
		},
		avatar: {
			type: String
			// default: process.env.BASE_URL + 'images/logo.png'
		},
		big: {
			type: Boolean,
			default: false
		}
	}
}
</script>

<style scoped lang='less'>
.my-item-big {
	height: 6rem !important;
	.left {
		.img-big {
			width: 4.6rem !important;
		}
	}
}
.my-item {
	height: 3rem;
	background: #fff;
	border-bottom: solid 1px #e4e4e4;

	.left {
		.avatar {
			width: 1.6rem;
			height: 100%;
		}
	}
	.center {
		width: 90%;

		.title {
			flex: 1;
		}
		.msg {
			flex: 1;
			width: 15rem;
			color: #b4b4b4;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}
	.right {
		width: 10%;
	}
}
.my-itemCheck {
	background: #e4e4e4;
}
</style>