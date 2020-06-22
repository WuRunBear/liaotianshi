<template>
	<div
		class='item flex'
		:class='{"itemCheck":check}'
		@touchstart='check = true'
		@touchend='check = false'
		v-on='$listeners'
		@click='click'
	>
		<slot name='left'>
			<div v-if='!notLeft' class='left flex padding-07-rem'>
				<my-image class='avatar' :src='leftSrc' alt='头像' />
			</div>
		</slot>

		<slot name='center'>
			<div v-if='!notCenter' class='center flex flex-direction-column'>
				<span class='title flex flex-align-items-center' v-if='centerUpText' v-html='centerUpText'></span>
				<span class='msg flex flex-align-items-center' v-if='centerDownText' v-html='centerDownText'></span>
			</div>
		</slot>

		<slot name='right'>
			<div v-if='!notRight' class='right flex flex-align-items-center flex-justify-content-center'>
				<i class='icon-keyboard_arrow_right'></i>
			</div>
		</slot>
	</div>
</template>

<script>
export default {
	name: 'item',
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
	props: {
		to: Object,
		leftSrc: {
			type: String
		},
		centerUpText: {
			type: String,
			default: ''
		},
		centerDownText: {
			type: String,
			default: ''
		},
		notLeft: {
			type: Boolean,
			default: false
		},
		notCenter: {
			type: Boolean,
			default: false
		},
		notRight: {
			type: Boolean,
			default: false
		}
	}
}
</script>

<style lang="less" scoped>
.itemCheck {
	background: #e9e9e9 !important;
}
.item {
	min-height: 3rem;
	max-height: 4rem;
	background: #fff;
	border-bottom: solid 1px #e4e4e4;

	.left {
		.avatar {
			width: 1.6rem;
			height: 100%;
		}
	}
	.center {
		// width: 90%;
		flex: 1;

		> * {
			flex: 1;
			overflow: auto;
			white-space: nowrap;
		}
		.title {
			font-size: 0.9rem;
		}
		.msg:nth-child(2) {
			font-size: 0.7rem;
			color: #b4b4b4;
		}
	}
	.right {
		// width: 10%;
	}
}
</style>