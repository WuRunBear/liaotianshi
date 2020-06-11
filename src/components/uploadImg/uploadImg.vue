<template>
	<div class='avatar'>
		<label for='avatarPath'>
			<my-image :src='files.name || "/images/logo.png"' alt />
		</label>

		<van-overlay class='progress flex' :show='isUpload'>
			<van-loading class='margin-auto' vertical>上传中...</van-loading>
		</van-overlay>

		<van-overlay class='progress flex' :show='filt' @click='filt = false'>
			<div class='margin-auto' style='text-align:center;'>
				<van-icon name='warning-o' color='#969799' class='margin-auto' />
				<div style='color:#969799;font-size:0.9rem;'>上传失败</div>
			</div>
		</van-overlay>

		<input type='file' id='avatarPath' @change='upload' accept='image/*' hidden />
	</div>
</template>

<script>
import valifyFilesType from '@/utils/verifyFilesType'
import getLocalFile from '@/utils/getLocalFile'

export default {
	name: 'uploadImg',
	data() {
		return {
			isUpload: false,
			filt: false,
			files: { name: this.src }
		}
	},
	methods: {
		upload: function(e) {
			if (!this.isUpload) {
				let files = e.target.files

				getLocalFile(files[0], file => {
					this.files.name = file
				})

				// 验证文件类型后上传文件
				if (valifyFilesType(files, e.target.accept)) {
					this.isUpload = true

					this.axios(this.$api.utils.upload(files))
						.then(res => {
							this.isUpload = false

							if (res.data.errno === 0) {
								this.$emit('after-upload', res.data.data)
								return
							}

							this.filt = true
							delete this.files.name
							this.$toast(`${res.data.message}，错误码：${res.data.errno}`)
							this.$emit('after-upload', false)
						})
						.catch(err => {
							this.filt = true
							delete this.files.name
						})
				} else {
					this.$toast(`文件类型错误，只可上传${e.target.accept}文件`)
				}
			}
		}
	},
	props: {
		src: String
	}
}
</script>

<style lang="less" scoped>
.avatar {
	position: relative;
	.progress {
		width: 100%;
		height: 100%;
		position: absolute;
	}
}
</style>