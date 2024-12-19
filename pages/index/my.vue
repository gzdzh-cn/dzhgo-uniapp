<template>
	<cl-page background-color="#f7f7f7">
		<view class="w-full px-[40rpx] pt-[30rpx] pb-4 bg-gradient-to-r from-blue-500 to-indigo-400">
			<!-- 设置 -->
			<view class="flex-1 h-[30rpx] flex flex-row-reverse" @tap="router.push('/pages/user/set')">
				<uni-icons
					class="relative"
					custom-prefix="iconfont"
					type="icon-shezhi"
					size="20"
					color="#ccc"
				></uni-icons>
			</view>

			<view class="w-10/12 mx-auto flex flex-col justify-center items-center gap-1">
				<!-- 头像 -->
				<view
					class="border-solid border-slate-300 border-[8rpx] rounded-full w-[160rpx] h-[160rpx] flex flex-col justify-center items-center border-opacity-20"
				>
					<cl-avatar :size="160" :src="avatarUrl" class="flex-shrink-0" />
				</view>

				<span class="text-white text-base font-bold mr-1 block overflow-hidden">
					{{ user.info?.nickname }}
				</span>

				<span
					class="text-xs leading-2 text-slate-300"
					@tap="router.push({ path: '/pages/user/userDescribe' })"
					>会员等级: {{ user.info?.levelName }}</span
				>

				<!-- <span class="text-slate-300 text-xs leading-2">积分： 100 </span> -->
			</view>
		</view>

		<view
			class="bg-white w-full flex flex-row justify-around items-center py-2 border-solid border border-slate-200"
		>
			<view class="h-20 flex flex-col justify-center items-center gap-2">
				<uni-icons
					class="relative top-1"
					custom-prefix="iconfont"
					type="icon-gongneng_jifen"
					size="30"
					color="#3b82f6"
				></uni-icons>
				<span class="text-xs text-slate-600">我的积分</span>
			</view>

			<!-- <view
				class="w-1/3 flex flex-col justify-center items-center gap-1 border-solid border-0 border-r border-slate-200"
			>
				<uni-icons
					class="relative top-1"
					custom-prefix="iconfont"
					type="icon-dingdanC"
					size="30"
					color="#3b82f6"
				></uni-icons>
				<span class="text-xs text-slate-600">续费历史</span>
			</view> -->

			<view class="h-20 flex flex-col justify-center items-center gap-2">
				<uni-icons
					class="relative top-1"
					custom-prefix="iconfont"
					type="icon-xiaoxi"
					size="30"
					color="#3b82f6"
				></uni-icons>
				<span class="text-xs text-slate-600">我的消息</span>
			</view>
		</view>

		<u-gap height="20" bg-color="#f3f3f3"></u-gap>

		<view>
			<cl-list-item justify="start" border>
				<cl-row type="flex">
					<uni-icons
						custom-prefix="iconfont"
						type="icon-houtaiguanli-huiyuanweihu"
						size="20"
						color="#e18a3b"
					></uni-icons>
					<span class="text-slate-600 text-sm ml-2">会员中心</span>
				</cl-row>
			</cl-list-item>

			<cl-list-item justify="start" border>
				<cl-row type="flex">
					<uni-icons
						custom-prefix="iconfont"
						type="icon-coupon"
						size="20"
						color="#6f89f7"
					></uni-icons>
					<span class="text-slate-600 text-sm ml-2">优惠兑换</span>
				</cl-row>
			</cl-list-item>

			<u-gap height="20" bg-color="#f3f3f3"></u-gap>

			<cl-list-item justify="start" border>
				<cl-row type="flex">
					<uni-icons
						custom-prefix="iconfont"
						type="icon-kefuzhongxin"
						size="20"
						color="#5da39d"
					></uni-icons>
					<span class="text-slate-600 text-sm ml-2">专属客服</span>
				</cl-row>
			</cl-list-item>

			<cl-list-item justify="start" border>
				<cl-row type="flex">
					<uni-icons
						custom-prefix="iconfont"
						type="icon-wenti3"
						size="20"
						color="#ea5514"
					></uni-icons>
					<span class="text-slate-600 text-sm ml-2">常见问题</span>
				</cl-row>
			</cl-list-item>

			<cl-list-item justify="start" border>
				<cl-row type="flex">
					<uni-icons
						custom-prefix="iconfont"
						type="icon-hezuoqiye"
						size="20"
						color="#6f94cd"
					></uni-icons>
					<span class="text-slate-600 text-sm ml-2">商务合作</span>
				</cl-row>
			</cl-list-item>
		</view>

		<tabbar />
	</cl-page>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { onPullDownRefresh, onShow } from "@dcloudio/uni-app";
import { service, useCool, useStore } from "/@/cool";
import Tabbar from "/@/components/tabbar.vue";
import { filterPic } from "/@/dzh/utils";

const { router } = useCool();
const { user } = useStore();

// 会员数据
// const userData = ref()
const avatarUrl = ref("/static/avatar.png");

const refresh = async () => {
 
	if (user.token) {
		// console.log("user.token",user.token);
		if (user.info?.headImg) avatarUrl.value = filterPic(user.info?.headImg);
	}
};

onPullDownRefresh(() => {
	refresh();
	uni.stopPullDownRefresh();
});

onShow(() => {
	refresh();
});
onMounted(() => {});
</script>

<style lang="scss">
// .avatar {
// 	border: 6rpx solid #f7f7f7;
// 	border-radius: 100%;
// 	height: 130rpx;
// 	width: 130rpx;
// }

.container {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	width: 100%;

	.item {
		width: 33%;
		border: 1px solid #3c3c3c;
		position: relative;

		img {
			width: 80%;
			margin-bottom: 10px;
		}

		.item-img {
			width: 100%;
			background-color: #eeeeee;
		}
	}
}
</style>
../../util_/common
