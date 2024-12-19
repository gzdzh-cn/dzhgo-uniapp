<template>
	<view>
		<uni-popup ref="loginRef" @close="onClose" background-color="#fff">
			<view class="popupBox">
				<view class="h2 bold">获取您的昵称、头像</view>
				<view class="h3">获取用户头像、昵称，主要用于向用户提供具有辨识度的用户中心界面</view>
				<view class="form">
					<view class="input u-flex">
						<view class="h2">头像</view>
						<view class="info">
							<button class="avatar-wrapper" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
								<image class="avatar" :src="avatarUrl_"></image>
							</button>
						</view>
						<u-icon name="arrow-right" size="32rpx" color="#999"></u-icon>
					</view>
					<view class="input u-flex">
						<view class="h2">昵称</view>
						<view class="info">
							<input type="nickname" v-model="nickName" placeholder="请输入昵称" @blur="onBlur" />
						</view>
					</view>
				</view>
				<view class="submit" :style="{background:PrimaryColor}" @click="submit">确定</view>
			</view>
		</uni-popup>
	</view>
</template>


<script setup lang="ts">
	import { ref } from "vue";

	const PrimaryColor = ref('#1fba1a') //主题色
	const avatarUrl_ = ref('https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0')
	const avatarUrl = ref()
	const nickName = ref()
	const loginRef = ref()
	const $emit = defineEmits(['onSub'])
	const isUpload = ref(false)
	import {  config } from "/@/cool/config";
	

	const onOpen = () => {
		loginRef.value.open('center')
	}
	const onClose = () => {
		// setShowWxLogin(false);
		loginRef.value.close()
	}

	const onChooseAvatar = (e) => {
		console.log("onChooseAvatar");
		//该图片需要上传到自己服务器--此处没做处理
		avatarUrl_.value = e.detail.avatarUrl
		avatarUrl.value = e.detail.avatarUrl
		uni.uploadFile({
			url: `${config.baseUrl}/app/common/open/upload`,
			filePath: avatarUrl.value,
			name: 'file',
			success: async (upRes) => {
				isUpload.value = true
				var res = JSON.parse(upRes.data)
				avatarUrl.value = res.data
				
			},
			fail(e) {
				uni.showToast({
					title:e.errMsg
				})
			}
		});
	}
	const onBlur = (e) => {
		nickName.value = e.detail.value
	}

	const submit = () => {
		console.log("isUpload",isUpload.value);
		if (!avatarUrl.value && !isUpload.value) {
			uni.showToast({
				title: '请上传头像~',
				icon: 'none'
			});
			return
		}
		if (!nickName.value) {
			uni.showToast({
				title: '请输入昵称~',
				icon: 'none'
			});
			return
		}
		$emit('onSub', { nickName: nickName.value, avatarUrl: avatarUrl.value })
		onClose()
	}


	defineExpose({
		onOpen
	})
</script>



<style lang="scss" scoped>
	.popupBox {
		width: 100%;
		padding: 50rpx 40rpx 30rpx;
		box-sizing: border-box;

		.h2 {
			color: #333;
			font-size: 32rpx;
		}

		.h3 {
			font-size: 26rpx;
			color: #999;
			line-height: 1.4;
			padding-top: 14rpx;
		}

		.bold {
			font-weight: bold;
		}

		.form {
			margin-top: 30rpx;
			border-top: 1px solid #EFEFEF;

			.input {
				padding: 24rpx 0;
				border-bottom: 1px solid #EFEFEF;
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
				align-items: center;

				.h2 {
					line-height: 70rpx;
				}

				.info {
					width: 80%;
					margin-left: 30rpx;
					display: flex;
					flex-direction: row;
					justify-content: flex-start;
					align-items: center;

					.avatar-wrapper {
						width: 70rpx;
						height: 70rpx;
						border-radius: 10rpx;
						padding-left: 0;
						padding-right: 0;

						.avatar {
							width: 70rpx;
							height: 70rpx;
							// border-radius: 10rpx;

						}
					}

					input {
						background: transparent;
						width: 100%;
						height: 70rpx;
						color: #333;
						font-size: 30rpx;
					}
				}
			}
		}
	}

	.submit {
		margin-top: 30rpx;
		width: 100%;
		height: 92rpx;
		border-radius: 10rpx;
		text-align: center;
		line-height: 92rpx;
		color: #fff;
		font-size: 32rpx;
		background: #E83F3C;
	}
</style>