<template>
	<div class='input-button width-100 height-100 flex'>
		<label
			class='height-100 width-100'
			:class='{"input-buttonBoxCheck":check}'
			@touchstart='check = true'
			@touchend='check = false'
			:for='btnId'
		>
			<div class='height-100 flex flex-align-items-center flex-justify-content-center'>
				<van-icon v-if='icon' class="margin-right-07-rem" size='20' :name="icon" />

				<span v-html='value'></span>
			</div>
		</label>

		<input :id='btnId' type='button' v-bind='$attrs' v-on='$listeners' hidden />
	</div>
</template>

<script>
export default {
	name: 'input-button',
	data() {
		return {
			// 是否被选中
			check: false,
			// 因为要跟label绑定 不能没有id 所以如果没有用随机数代替
			btnId: this.id || this.getId()
		}
	},
	methods: {
		getId: function(e) {
			return Math.random()
				.toString()
				.split('.')[1]
		}
	},
	mounted() {},
	props: {
		icon: {
			type: String,
			default: ''
		},
		value: {
			type: String,
			default: ''
		},
		id: {
			type: String,
			default: ''
		}
	}
}
</script>

<style scoped lang='less'>
.input-button {
	overflow: hidden;
	user-select: none;
	background: #fff;

	.input-buttonBoxCheck {
		background: #e4e4e4;
	}
	// overflow: hidden;
	// background: #00cc22;
	// border: solid 1px #c4c4c4;

	// input[type='button'] {
	// 	color: #fff;
	// 	background: none;
	// 	flex: 1;
	// 	border: none;
	// 	outline: none;
	// }
	// input[type='button']:active {
	// 	background: #00aa22;
	// }
}
</style>