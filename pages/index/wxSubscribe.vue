<template>
	<cl-page>
		<!-- 微信登录 -->

		<view class="w-full h-80 flex flex-row justify-center items-center">
			<cl-button type="primary" :height="90" :font-size="30" @tap="authorize" v-if="user.info?.notify != 1">
				授权订阅通知
			</cl-button>

			<u-alert-tips type="warning" title="绑定成功" description="取消关注公众号后无法再接收到微信通知" v-if="user.info?.notify == 1"></u-alert-tips>

		</view>
	</cl-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { onShow, onReady } from "@dcloudio/uni-app";
import { service,  useStore, router, storage, useWx, getUrlParam, config } from "/@/cool";

const { user } = useStore();
const wxHook = useWx();

const refresh = async () => {
	await user.get();
	if (user.token) {
		console.log("有token");
		console.log("user.token", user.token);
	} else {
		console.log("没有token");
		router.login();
	}
};

// 微信公众号授权
const mpAuth = async () => {
	const redirect_uri = encodeURIComponent(
		`${location.origin}${location.pathname}#/pages/index/wxSubscribe`
	);
	const response_type = "code";
	const scope = "snsapi_userinfo";
	const state = "STATE";

	const url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${config.app.wx.mp.appid}&redirect_uri=${redirect_uri}&response_type=${response_type}&scope=${scope}&state=${state}#wechat_redirect`;
	location.href = url;
 
	
};

// 公众号授权
const authorize = () => {
	// #ifdef H5
	mpAuth();
	// #endif
};
// 公众号登录
const mpLogin = () => {
	// 获取id参数
	const userId = user.info?.id;
	console.log("userId", userId);

	// #ifdef H5
	wxHook.mpLogin().then(async (code) => {
		if (code) {
			uni.showLoading({
				title: "正在绑定",
			});
			console.log("code", code);
			await nextLogin("mp", { code,userId,notify:1 });
			uni.hideLoading();
		 
		}
	});
	// #endif
};

// 登录请求 分别是小程序，公众号，账号方式，手机号码方式，手机号码微信授权
async function nextLogin(key: "mini" | "mp" | "account" | "phone" | "autoPhone", data: any) {
	return service
		.request({
			url: `/app/customer_pro/open/${key}`,
			method: "POST",
			data,
		})
		.then(async (res: any) => {
			// 设置token
			// user.setToken(res);
			// 获取用户信息
			await user.get();

			
		})
		.catch((err: { message: string }) => {
			// ui.showTips(err.message);
			uni.showToast({
				title: err.message,
				icon: "none",
			});
		});
}

onReady(() => {
	mpLogin();
});

onShow(() => {
	refresh();
});
</script>

<style lang="less"></style>
