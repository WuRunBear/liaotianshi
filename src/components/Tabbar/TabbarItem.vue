<template>
	<div class='tabbar-item flex' :data-name='to.name' @click='click'>
		<span class='flex flex-direction-column flex-margin-auto'>
			<i class='font-big' :class='icon'></i>
			<span class='font-little'>
				<slot></slot>
			</span>
		</span>
	</div>
</template>	

<script>
export default {
	name: 'tabbar-item',
	data() {
		return {}
	},
	methods: {
		click: function(e) {
			if (this.to.name !== this.$route.name) {
				this.$router.push(this.to, () => {})
			}
		}
	},
	props: {
		icon: String,
		to: Object
	}
}
</script>

<style scoped lang="less">
.tabbar-item {
	flex: 1;
}
</style>