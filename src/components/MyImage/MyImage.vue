<template>
	<div class='my-image'>
		<img :src='src' :alt='alt' />
	</div>
</template>

<script>
export default {
	name: 'my-image',
	props: {
		src: {
			type: String,
			default: process.env.BASE_URL + 'images/logo.png'
		},

		alt: {
			type: String,
			default: '图片'
		}
	}
}
</script>

<style scoped lang='less'>
.my-image {
	width: 100%;
	height: 100%;
	img {
		width: 100%;
		height: 100%;
		// background: #e4e4e4;
		border-radius: 5px;
	}
}
</style>