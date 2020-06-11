<template>
	<div>
		<div class='tabbar flex position-fixed bottom-0'>
			<slot></slot>
		</div>
		<div class='box'></div>
	</div>
</template>

<script>
export default {
	name: 'Tabbar',
	data() {
		return {
			tabbarItems: Object
		}
	},
	methods: {
		click: function(e) {
			let routerName = e.currentTarget.getAttribute('data-name')

			this.activeItem(e.currentTarget)

			// 如果有change就执行 并把选择的对象activeObj作为参数传给change
			this.change && this.change(routerName)
		},
		activeItem: function(params) {
			//去除选中的样式
			this.tabbarItems.forEach(element => {
				element.classList.remove('active')
			})
			params.classList.add('active')
		}
	},
	watch: {
		$route: function(to, from) {
			for (let i = 0; i < this.tabbarItems.length; i++) {
				const element = this.tabbarItems[i]

				let d = element.getAttribute('data-name')
				// 选中当前路由对应的item
				if (d === this.$route.name) {
					this.activeItem(element)
				}
			}
		}
	},
	mounted() {
		this.tabbarItems = document.querySelectorAll('.tabbar-item')
		let pathName = this.$route.name

		// 如果路由在Home 而没有进入Home其中一个子路由 就默认进入第一个item指向的路由
		if (this.$route.name === 'Home') {
			
			this.$router.push({
				name: this.tabbarItems[0].getAttribute('data-name')
			})

			this.activeItem(this.tabbarItems[0])
		}

		// 为每个tabbar-item绑定click事件
		for (let i = 0; i < this.tabbarItems.length; i++) {
			const element = this.tabbarItems[i]

			let d = element.getAttribute('data-name')
			// 选中当前路由对应的item
			if (d === this.$route.name) {
				this.activeItem(element)
			}

			// 绑定事件
			element.addEventListener('click', this.click)
		}
	},
	props: {
		change: Function
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.tabbar {
	width: 100%;
	height: 3rem;
	background: #fefefe;
	border-top: solid 1px #e4e4e4;
	text-align: center;
	z-index: 9;
	.active {
		color: #009900;
	}
}
.box {
	width: 100%;
	height: 3rem;
}
</style>
