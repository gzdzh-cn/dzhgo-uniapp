<template>
	<view class="sms-btn">
		<slot :disabled="isDisabled" :countdown="countdown" :btnText="btnText">
			<cl-button :type="type" :height="height" :font-size="fontSize" fill :disabled="isDisabled" :size="size"
				:border="border" :plain="plain" @tap="open">
				{{ btnText }}
			</cl-button>
		</slot>

		<!-- <cl-popup v-model="captcha.visible" :padding="30" border-radius="16rpx" show-close-btn>
			<cl-loading-mask>
				<view class="sms-popup">
					<view class="row">
						<cl-input type="number" v-model="form.code" placeholder="验证码" maxlength="4" :clearable="false"
							:focus="captcha.focus" @confirm="send" />

						<image :src="captcha.img" mode="aspectFit" @tap="getCaptcha" />
					</view>

					<cl-button type="success" fill :disabled="!form.code" :loading="captcha.sending" @tap="send">
						发送短信
					</cl-button>
				</view>
			</cl-loading-mask>
		</cl-popup> -->

		<cl-popup v-model="captcha.visible" :padding="30" border-radius="16rpx" show-close-btn>
			<cl-loading-mask>
				<view class="sms-popup">
					<view class="row">
						<cl-input type="number" v-model="form.code" placeholder="验证码" maxlength="4" :clearable="false"
							:focus="captcha.focus">

							<template #append>
								<text @tap="send">{{ count }}</text>
							</template>
						</cl-input>
					</view>

					<cl-button type="success" fill :disabled="!form.code" :loading="captcha.sending" @tap="submit">
						验证码登录
					</cl-button>
				</view>
			</cl-loading-mask>
		</cl-popup>
	</view>
</template>

<script lang="ts" setup>
import { computed,   PropType, reactive, ref } from "vue";
import { useCool,useStore } from "../cool";
import { useUi } from "../ui";
const { user } = useStore();
const props = defineProps({
	phone: String,
	type: String,
	height: Number,
	fontSize: Number,
	size: String as PropType<"large" | "default" | "small">,
	border: {
		type: Boolean,
		default: true,
	},
	plain: Boolean,
	countdown: {
		type: Boolean,
		default: true,
	},
});

const emit = defineEmits(["success"]);

const { service } = useCool();
const ui = useUi();

// 验证码
const captcha = reactive({
	visible: false,
	loading: false,
	sending: false,
	focus: false,
	img: "",
});

const show = ref(false)

// 倒计时
const countdown = ref(0);

// 是否禁用
const isDisabled: any = computed(() => countdown.value > 0 || !props.phone);

// 按钮文案
const btnText = ref("获取验证码")
const count = computed(() =>
	countdown.value > 0 ? `${countdown.value}s后重新获取` : "获取验证码"
);

// 表单
const form = reactive({
	code: "",
	phone: "",
});

// 开始倒计时
function startCountdown() {
	countdown.value = 90;

	function fn() {
		countdown.value--;

		if (countdown.value < 1) {
			clearInterval(timer);
		}
	}

	const timer = setInterval(fn, 1000);
	fn();
}

// 发送短信
async function send() {
	await service.base.open
		.sendSms({
			phone: props.phone,
		})
		.then(() => {
			uni.showToast({
				title: "短信已发送，请查收",
				icon: 'none'
			});
			if (props.countdown) {
				startCountdown();
			}
		})
		.catch((err) => {
			// ui.showToast(err.message);
			uni.showToast({
				title: err.message,
				icon: 'none'
			})
		});
}



 

// 打开
function open() {
	if (props.phone) {
		if (/^(?:(?:\+|00)86)?1[3-9]\d{9}$/.test(props.phone)) {
			captcha.visible = true;
			send()
		} else {
			uni.showToast({
				title: "请输入正确的手机号格式",
				icon: 'none'
			})
			return
		}
	}
}

const submit = () => {
	form.phone = props.phone
	service.request({
		url: "/admin/base/open/smsLogin",
		method: "POST",
		data: { ...form }
	}).then(async (res) => {
		// 设置token
		user.setToken(res);

		// 获取用户信息
		await user.get();
		close()
		emit('success', true)

	}).catch(e => {
		uni.showToast({
			title: "验证码错误",
			icon: 'none',
			success(result) {
				// close()
			},
		})
	})

}

// 关闭
function close() {
	captcha.visible = false;
	clear();
}

// 清空
function clear() {
	form.code = "";
	form.phone = "";
	captcha.focus = false;
}

defineExpose({
	open,
	send,
	startCountdown,
});
</script>

<style lang="scss" scoped>
.sms-popup {
	width: 400rpx;

	.row {
		display: flex;
		margin-bottom: 30rpx;

		image {
			height: 62rpx;
			width: 200rpx;
			border-radius: 3rpx;
			flex-shrink: 0;
		}
	}
}
</style>
