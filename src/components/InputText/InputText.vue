<template>
	<div class='input-text flex'>
		<input
			v-bind="$attrs"
			:value='value'
			v-on='inputListeners'
		/>
	</div>
</template>

<script>
export default {
	inheritAttrs: false,
	name: 'input-text',
	methods: {},
	mounted() {},
	computed: {
		inputListeners: function() {
			let vm = this
			// 将原生事件绑定到组件
			return Object.assign({}, this.$listeners, {
				input: function(e) {
					vm.$emit('input', e.target.value)
				}
			})
		}
	},
	props: {
		value: String
	}
}
</script>

<style scoped lang='less'>
.input-text {
	overflow: hidden;
	border: solid 1px #c4c4c4;
	input {
		flex: 1;
		border: none;
		outline: none;
		padding-left: 0.5rem;
		padding-right: 0.5rem;
	}
}
</style>