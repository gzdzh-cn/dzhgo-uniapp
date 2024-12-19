<template>
	<cl-page>
		<cl-topbar :border="false" background-color="transparent" />

		<view class="page-login">
			<!-- Logo -->
			<view class="logo">
				<!-- <image src="/static/logo.jpeg" alt="" /> -->
				<text>{{ app.info.name }}</text>
			</view>

			<div class="container">
				<!-- 登录方式 -->
				<view class="mode" :class="[`is-${mode}`]">
					<!-- 账号密码登录 -->
					<template v-if="mode == 'account'">
						<text class="label">账号登录</text>

						<view class="input">
							<input v-model="loginForm.username" type="text" placeholder="请输入账号" />
						</view>

						<view class="input">
							<input v-model="loginForm.password" type="password" placeholder="请输入密码" />
						</view>

						<view class="next-btn">
							<cl-button
								type="primary"
								fill
								:disabled="!loginForm.username || !loginForm.password"
								:height="90"
								:loading="loading"
								@click="account"
								>马上登录</cl-button
							>
						</view>
					</template>

					<!-- 手机号 -->
					<template v-if="mode == 'phone'">
						<text class="label">手机号登录</text>

						<view class="phone">
							<text>+86</text>
							<cl-input
								v-model="phone"
								type="number"
								placeholder="请输入手机号码"
								:border="false"
								:maxlength="11"
								:font-size="30"
								background-color="transparent"
							/>
						</view>

						<view class="next-btn">
							<sms-btn :ref="setRefs('smsBtn')" :phone="phone" @success="phoneLogin(false)">
								<template #default="{ disabled, btnText, countdown }">
									<cl-button
										fill
										type="primary"
										:height="90"
										:font-size="30"
										:disabled="disabled"
										@tap="phoneLogin"
									>
										{{ btnText }}
									</cl-button>
								</template>
							</sms-btn>
						</view>
					</template>

					<!-- 微信登录 -->
					<template v-else-if="mode == 'wx'">
						<cl-button
							type="primary"
							fill
							:height="90"
							:font-size="30"
							:loading="loading"
							@tap="miniLogin"
						>
							微信公众号登录
						</cl-button>
					</template>

					<!-- 获取手机号码授权登录 -->
					<template v-else-if="mode == 'autoPhone'">
						<button
							open-type="getRealtimePhoneNumber"
							@getrealtimephonenumber="getrealtimephonenumber"
							class="autoPhone"
						>
							手机号码授权登录
						</button>
					</template>

					<!-- 协议 -->
					<view class="agree">
						<cl-checkbox :size="34" v-model="agree" round></cl-checkbox>
						<view class="text">
							已阅读并同意
							<view @tap="toText('用户协议')">《用户协议》</view>
							及
							<view @tap="toText('隐私政策')">《隐私政策》</view>
						</view>
					</view>
				</view>
			</div>

			<!-- 其他登录方式 -->
			<view class="other" v-if="platforms.length > 0">
				<cl-divider width="400rpx" background-color="#f7f7f7">
					<cl-text color="#ccc" value="其他登录方式"></cl-text>
				</cl-divider>

				<view class="platform">
					<view
						class="platform__item"
						v-for="(item, index) in platforms"
						:key="index"
						@tap="changeMode(item.value)"
					>
						<image :src="item.icon" mode="aspectFit" />
						<text>{{ item.label }}</text>
					</view>
				</view>
			</view>
		</view>

		<!-- <DzhWxlogin @onSub="wxLogin" :ref="setRefs('loginRef')" /> -->
	</cl-page>
</template>

<script lang="ts" setup>
import { computed, ref, reactive } from "vue";
import { onReady, onShow } from "@dcloudio/uni-app";
import { useApp, useCool, useStore, useWx } from "/@/cool";
import { useUi } from "/@/ui";
import SmsBtn from "/@/components/sms-btn.vue";
import { onLoad } from "@dcloudio/uni-app";
// import DzhWxlogin from "/uni_modules/dzh-wxlogin/components/dzh-wxlogin/dzh-wxlogin.vue"

const { service, router, refs, setRefs, storage } = useCool();
const { user } = useStore();
const app = useApp();
const ui = useUi();
const wxHook = useWx();

// 是否同意
const agree = ref(false);

const countdown = ref(true);
// 加载状态
const loading = ref(false);

// 手机号
const phone = ref(storage.get("phone") || "");

const loginForm = reactive({
	username: "",
	password: "",
});

// 登录方式
const mode = ref();

// 登录平台
const platforms = getPlatforms();

// 获取登录平台
function getPlatforms() {
	let arr = [
		{
			label: "通过手机授权登录",
			value: "autoPhone",
			icon: "/pages/user/static/icon/phone.png",
			hidden: true,
		},
		{
			label: "通过账号登录",
			value: "account",
			icon: "/static/icon/account.png",
			hidden: false,
		},
		{
			label: "通过手机登录",
			value: "phone",
			icon: "/pages/user/static/icon/phone.png",
			hidden: true,
		},
		{
			label: "通过微信登录",
			value: "wx",
			icon: "/pages/user/static/icon/wx.png",
			hidden: true,
		},
	];

	// #ifdef H5
	if (wxHook.isWxBrowser()) {
		// 微信登录
		// arr[3].hidden = false;
	}
	// #endif

	// #ifdef MP-WEIXIN
	// 开启手机登录
	// arr[1].hidden = false;
	// #endif

	// 过滤
	arr = arr.filter((e) => !e.hidden);

	// 默认第一个登录方式
	mode.value = arr[0]?.value;

	return computed(() => arr.filter((e) => e.value != mode.value));
}

// 登录请求 分别是小程序，公众号，账号方式，手机号码方式，手机号码微信授权
async function nextLogin(key: "mini" | "mp" | "account" | "phone" | "autoPhone", data: any) {
	return service
		.request({
			// url: `/app/member/open/${key}`,
			url: `/app/customer_pro/open/${key}`,
			method: "POST",
			data,
		})
		.then(async (res: any) => {
			// 设置token
			user.setToken(res);

			// 获取用户信息
			await user.get();

			// 登录跳转
			router.nextLogin();
		})
		.catch((err: { message: string }) => {
			// ui.showTips(err.message);
			uni.showToast({
				title: err.message,
				icon: "none",
			});
		});
}

// 账号密码登录
const account = () => {
	check(async () => {
		nextLogin("account", loginForm);
	});
};

// 手机号登录
function phoneLogin(sms?: boolean) {
	if (sms) {
		check(() => {
			refs.smsBtn.open();
		});
	} else {
		storage.set("phone", phone.value);
		// 登录跳转
		router.nextLogin();
	}
}

// 微信登录
function miniLogin() {
	check(async () => {
		// #ifdef APP
		if (wxHook.hasApp()) {
			wxHook.appLogin().then((code) => {
				//
			});
		} else {
			ui.showConfirm({
				title: "温馨提示",
				message: "您还未安装微信~",
				showCancelButton: false,
				confirmButtonText: "去下载",
				callback(action) {
					if (action == "confirm") {
						wxHook.downloadApp();
					}
				},
			});
		}
		// #endif

		// #ifdef MP-WEIXIN
		loading.value = true;

		await wxHook.miniLogin().then(async (res) => {
				await nextLogin("mini", res);
			}).catch((err) => {
				ui.showToast(err.message);
			});

		loading.value = false;
		// #endif

		// #ifdef H5
		wxHook.mpAuth();
		// #endif
	});
}

// 公众号登录
function mpLogin() {
	// #ifdef H5
	wxHook.mpLogin().then(async (code) => {
	 
		if (code) {
			uni.showLoading({
				title: "登录中",
			});
			await nextLogin("mp", { code });
			uni.hideLoading();
		}
	});
	// #endif
}

// 切换模式
function changeMode(value: string) {
	mode.value = value;
}
// 检测协议勾选
function check(callback: () => void) {
	if (!agree.value) {
		// ui.showToast("请先勾选同意后再进行登录")
		uni.showToast({
			title: "请先勾选同意后再进行登录",
			icon: "none",
		});
		return;
	}

	callback();
}
// 文案
function toText(name: string) {
	router.push({
		path: "/pages/comm/text",
		query: {
			name,
		},
	});
}
// 打开微信登录弹出
const open = () => {
	check(() => {
		refs.loginRef.onOpen();
	});
};
// 手机授权登录
const getrealtimephonenumber = (e: { detail: { errMsg: string; code: any } }) => {
	check(() => {
		if (e.detail.errMsg !== "getPhoneNumber:ok") {
			uni.showToast({
				title: "异常，请联系管理员",
				icon: "none",
			});
			return;
		}
		nextLogin("autoPhone", { code: e.detail.code });
	});
};

onReady(() => {
	// 公众号登录
	mpLogin();
	 
});
onShow(() => {
	console.log("location.origin",location.origin);
	if (storage.get("agree")) {
		agree.value = true;
		storage.remove("agree");
	}
});

onLoad(() => {

});
</script>

<style lang="scss" scoped>
.page-login {
	.logo {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding-top: 20%;

		image {
			display: block;
			height: 140rpx;
			width: 140rpx;
			border-radius: 100%;
			margin-bottom: 22rpx;
			border: 8rpx solid #eee;
		}

		text {
			font-size: 40rpx;
			font-weight: bold;
			letter-spacing: 1rpx;
		}
	}

	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-top: 80rpx;

		.mode {
			width: 100%;
			padding: 0 80rpx;
			box-sizing: border-box;

			.label {
				display: block;
				font-size: 36rpx;
				font-weight: 500;
				margin-bottom: 48rpx;
			}

			&.is-account {
				.input {
					display: flex;
					align-items: center;
					background-color: #eeeeee;
					border-radius: 10rpx;
					height: 90rpx;
					margin-bottom: 26rpx;

					text {
						display: inline-block;
						padding: 0 24rpx 0 50rpx;
						border-right: 1rpx solid #d6d6d6;
						font-size: 28rpx;
						font-weight: bold;
						color: #404040;
					}

					input {
						height: 100%;
						flex: 1;
						padding: 0 30rpx;
						font-size: 28rpx;
					}
				}
			}

			&.is-phone {
				.phone {
					display: flex;
					align-items: center;
					background-color: #eeeeee;
					border-radius: 10rpx;
					height: 90rpx;
					margin-bottom: 26rpx;
					font-size: 30rpx;

					text {
						display: inline-block;
						padding: 0 24rpx 0 50rpx;
						border-right: 2rpx solid $cl-border-color;
						font-weight: bold;
						color: #404040;
					}

					input {
						height: 100%;
						flex: 1;
						padding: 0 30rpx;
					}
				}
			}
			.autoPhone {
				background-color: #6b69f8;
				color: #fff;
				font-size: 15px;
				height: 46px;
				line-height: 46px;
			}
			.agree {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
				color: #999999;
				font-size: 24rpx;
				margin-top: 38rpx;
				width: 100%;

				.cl-checkbox {
					margin-right: 0;
				}

				.text {
					color: #000;
					display: flex;
					flex-direction: row;
					justify-content: flex-start;
				}
			}
		}
	}

	.other {
		position: fixed;
		bottom: env(safe-area-inset-bottom);
		left: 0;
		width: 100%;

		.platform {
			display: flex;
			flex-direction: column;
			align-items: center;
			margin: 20rpx 0 60rpx 0;

			&__item {
				display: flex;
				align-items: center;
				justify-content: center;
				border: 1px solid #000000;
				height: 30px;
				width: 130px;
				margin-bottom: 28rpx;
				border-radius: 6px;

				image {
					height: 32rpx;
					width: 32rpx;
					margin-right: 10rpx;
				}

				text {
					font-size: 24rpx;
					color: #000000;
				}
			}
		}
	}
}
</style>
