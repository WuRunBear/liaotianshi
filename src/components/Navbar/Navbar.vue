<template>
	<div>
		<div class='navbar flex position-fixed top-0'>
			<div class='left margin-left-07-rem flex flex-align-items-center'>
				<slot name='left'>
					<i v-if='isArrowLeft' @click='leftClick' class='icon-keyboard_arrow_left'></i>
					<div v-html='leftText'></div>
				</slot>
			</div>

			<div class='right margin-left-auto margin-right-07-rem flex flex-align-items-center'>
				<slot name='right'>
					<i
						v-if='!NotIconRight && rightText === ""'
						class='icon-add_circle_outline'
						@click='rightClick'
					></i>
					<span v-if='rightText !== ""' v-html='rightText'></span>

					<div
						v-if='isRightDDM'
						:style='{"height":DDMHeight}'
						class='drop-down-menu position-absolute'
						ref='DDM'
					>
						<div
							v-for='item in dropDownMenu'
							:key='item.msg'
							:data-to='item.to.name'
							@click='DDMClick'
							class='drop-down-menu-item padding-07-rem'
						>
							<i :class='`${item.icon} font-big`'></i>

							<span class='margin-left-07-rem' v-html='item.msg'></span>
						</div>
					</div>

					<van-overlay
						v-if='isRightDDM'
						v-show='!isDDM'
						@click='isDDM=!isDDM'
						z-index='10'
						:custom-style='{"background":"rgba(255, 255, 255, 0)"}'
					></van-overlay>
				</slot>
			</div>
		</div>
		<div class='box'></div>
	</div>
</template>

<script>
export default {
	name: 'navbar',
	data() {
		return {
			isArrowLeft: this.ArrowLeft,
			isRightDDM: !this.NotRightDDM,
			isDDM: true
		}
	},
	methods: {
		leftClick: function(e) {
			this.$emit('click-left', e)
			if (window.history.length <= 1) {
				this.$router.push({ name: 'Home' })
			}
		},
		rightClick: function(e) {
			if (this.isRightDDM) this.isDDM = !this.isDDM

			this.$emit('click-right', e)
		},
		DDMClick: function(e) {
			let DOM = e.currentTarget
			let to = DOM.getAttribute('data-to')

			if (this.$route.name !== to) {
				this.$router.push({ name: to })
			}
		}
	},
	computed: {
		/**
		 * 下拉框的高度
		 */
		DDMHeight: function() {
			return !this.isDDM ? `${this.dropDownMenu.length * 3.4}rem` : '0'
		}
	},
	props: {
		/**
		 * 是否显示左侧箭头
		 */
		ArrowLeft: {
			type: Boolean,
			default: false
		},
		/**
		 * 是否显示右侧图标
		 */
		NotIconRight: {
			type: Boolean,
			default: false
		},
		/**
		 * 左侧文本
		 */
		leftText: {
			type: String,
			default: ''
		},
		/**
		 * 右侧文本
		 */
		rightText: {
			type: String,
			default: ''
		},
		/**
		 * 是否要下拉框
		 */
		NotRightDDM: {
			type: Boolean,
			default: false
		},
		/**
		 * 右侧下拉框数据
		 */
		dropDownMenu: {
			type: Array,
			default() {
				return [{ msg: '无', to: {}, icon: 'icon-home' }]
			}
		}
	}
}
</script>

<style scoped lang="less">
.navbar {
	width: 100%;
	height: 2.5rem;
	background: #fefefe;
	border-bottom: solid 1px #ededed;

	.drop-down-menu {
		width: 8rem;
		overflow: hidden;
		background: #5a5a5a;
		border-radius: 5px;
		color: #fff;
		top: 2rem;
		right: 0.7rem;
		transition: height 0.5s;
		z-index: 11;

		.drop-down-menu-item {
			line-height: 2rem;
			border-bottom: solid 1px #e0e0e0;
			text-align: center;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		.drop-down-menu-item:active {
			background: #333;
		}
		.drop-down-menu-item:last-child {
			border-bottom: none;
		}
	}
}
.box {
	width: 100%;
	height: 2.5rem;
}
</style>