<script lang="ts" setup>
import { onReady, onShow } from "@dcloudio/uni-app";
import { useApp, useCool, useStore } from "/@/cool";
 

const { router } = useCool();
const { user } = useStore();
const app = useApp();
 

const logout =()=>{
	user.logout()
}

onShow(() => {
	user.get();
})

onReady(() => {
	app.version.check();

});
</script>
<template>
	<view class="page-set ">

		<view label="会员信息">
			<cl-list :radius="16" v-if="user.info">
				<cl-list-item label="个人信息"  
					@tap="router.push({ path: '/pages/user/personEdit'})" />
				<cl-list-item label="账号管理"
					@tap="router.push({ path: '/pages/user/account'})" />

			</cl-list>

		</view>

		<cl-divider></cl-divider>

		<view label="系统">
			<!-- <cl-list-item label="消息通知" justify="start">
				<template #append>
					<cl-switch></cl-switch>
				</template>
			</cl-list-item> -->
			<cl-list-item label="当前版本" >
				<template #append>
					<cl-text :size="30" value="V1.0"></cl-text>
				</template>
			</cl-list-item>
			<cl-list-item label="隐私政策"  @tap="router.push({path:'/pages/user/policy'})"/>
			<cl-list-item label="会员权益" @tap="router.push({path:'/pages/user/userDescribe'})"/>
			<!-- <cl-list-item label="意见反馈" /> -->

		</view>

		<view class="mt-[60rpx]" @tap="">
			<cl-button type="info" size="default" fill round @tap="logout">退出登录</cl-button>
		</view>

		
	</view>
</template>



<style lang="scss" scoped>
// page {
// 	background-color: #000;
// }
.page-set {
	padding: 20rpx 24rpx;

	.avatar {
		padding: 10rpx 0;

		button {
			padding: 0;
			margin: 0;
			line-height: normal;
			background-color: transparent;

			&::after {
				border: 0;
			}
		}
	}
}
</style>
