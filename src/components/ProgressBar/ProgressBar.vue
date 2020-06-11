<template>
	<div class='progressBar flex height-100 width-100' v-show='hidden'>
		<div class='progressBarBox margin-auto width-100'>
			<div class='progressBarCover height-100 width-100' :style='{left:`-${percent}%`}'></div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ProgressBar',
	data() {
		return {
			percent: 100
		}
	},
	watch: {
		progress: function(newValue, oldValue) {
			this.percent = 100 - newValue
		}
	},
	props: {
		hidden: {
			type: Boolean,
			default: false
		},
		progress: {
			type: Number,
			default: 0
		}
	}
}
</script>

<style lang="less" scoped>
.progressBar {
	background:#00000033;
	position: relative;
	top: -100%;

	.progressBarBox {
		height: 0.5rem;
		background: #f4f4f4;
		border-radius: 0.5rem;

		.progressBarCover {
			left: -100%;
			position: relative;
			background: #00ee00;
			transition: left 0.5s;
		}
	}
}
</style>