<template>
	<div class='modifyInfo flex flex-direction-column height-100-vh'>
		<navbar ArrowLeft :leftText='key | userInfoKeyFilt' NotIconRight @click-left='clickLeft'>
			<template v-slot:right>
				<input-button value='完成' @click='clickRight' />
			</template>
		</navbar>

		<!-- 修改昵称 -->
		<div class='modifyMsgBox' v-if='key === "nickName"'>
			<input type='text' v-model.lazy='msg' class='modifyMsg' />
		</div>

		<!-- 修改图片 -->
		<uploadImg
			class='modifyImgBox margin-auto width-100'
			:src='msg'
			@after-upload='files'
			v-if='key === "avatar"'
		/>

		<!-- 修改性别 -->
		<div class='modifyMsgBox' v-if='key === "gender"'>
			<select class='width-100 height-100' v-model.number='msg'>
				<option value='0'>保密</option>
				<option value='1'>男</option>
				<option value='2'>女</option>
			</select>
		</div>

		<!-- 修改备注 -->
		<div class='modifyMsgBox' v-if='key == "alias"'>
			<input type='text' v-model.lazy='msg' class='modifyMsg' />
		</div>
	</div>
</template>

<script>
import userInfoKeyFilt from '../utils/userInfoKeyFilt'
import valifyFilesType from '../utils/verifyFilesType'
import getLocalFile from '../utils/getLocalFile'

export default {
	name: 'ModifyItem',
	data() {
		return {
			msg: this.modifyItem.value,
			key: this.modifyItem.key,
			progress: 0,
			isProgress: false
		}
	},
	methods: {
		clickLeft: function(e) {
			this.$router.go(-1)
		},
		clickRight: function(e) {
			if (true) {
				this.axios(
					this.$api.users.changeUserInfo({
						[this.key]: this.msg
					})
				)
					.then(res => {
						if (res.data.errno === 0) {
							this.$toast.success('修改成功')
							this.$store.commit('logout')
						} else {
							this.$toast.fail(res.data.message)
						}
					})
					.catch(err => {
						this.$toast.fail('错误')
					})
			}
		},
		// 上传文件
		files: function(e) {
			if (e) {
				this.msg = e.name
			}
		}
	},
	filters: {
		userInfoKeyFilt
	},
	created() {},
	props: {
		modifyItem: Object
	}
}
</script>

<style lang="less" scoped>
.modifyInfo {
	.modifyMsgBox {
		height: 2rem;
		padding: 0.2rem;
		.modifyMsg {
			width: 100%;
			height: 2rem;
		}
	}
}
</style>