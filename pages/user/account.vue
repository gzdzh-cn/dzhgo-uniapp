<script lang="ts" setup>
import { reactive, ref } from "vue";
import { useCool, useStore } from "/@/cool";

const props = defineProps({
	name: String,
});
const Form = ref<ClForm.Ref>();
const { router } = useCool();
const { user } = useStore();


const editShow = ref(false)
const editContent = ref()
const editTitle = ref()
const editField = ref("mobile")
const edit = (v: any) => {
	editShow.value = true
	editField.value = v
	switch (v) {

		case "mobile":

			editTitle.value = "修改手机号码"
			break;
		case "password":

			editTitle.value = "修改密码"
			break;

		default:

			editTitle.value = "修改手机号码"
			break;

	}
}


const form = ref<any>(user.info);
const loading = ref(false);
const submit = () => {

	if (editField.value == "password") {
		if (form.value.password != form.value.newpd) {
			uni.showToast({
				title: "两次密码不一致",
				icon: "error",
			});
			return
		}
	} else {
		if (!editContent.value) {
			uni.showToast({
				title: "不能为空",
				icon: "error",
			});
			return;
		}
		form.value[editField.value] = editContent.value;
	}

	

	loading.value = true;
	user
		.update(form.value)
		.then((r) => {
			loading.value = false;
			uni.showToast({
				title: "保存成功",
				icon: "success",
				success(result) {
					router.back;
				},
			});
			close()
		})
		.catch((err) => {
			loading.value = false;
			uni.showToast({
				title: err.message,
				icon: "error",
			});
			 
			return;
		});
}
const close = () => {
	editShow.value = false
	editContent.value = ""
	form.value.password = ""
	form.value.newpd = ""
}
</script>

<template>
	<cl-page>
		<view class="page-user-edit">
			<view class="form">

				<cl-list :radius="16">

					<cl-list-item label="手机号码" @tap="edit('mobile')" />
					<cl-list-item label="密码" @tap="edit('password')" />

				</cl-list>

			</view>


			<cl-dialog :title="editTitle" v-model="editShow">

				<cl-input v-model="editContent" type="text" v-if="editField !== 'password'" />

				<view class="flex flex-col gap-3" v-if="editField == 'password'">
					<cl-input v-model="form.password" password placeholder="请输入原始密码" />
					<cl-input v-model="form.newpd" password placeholder="请输入新密码" />
				</view>



				<view class=" my-[30rpx] w-full flex flex-row justify-between">
					<cl-button :width="220" @tap="close">
						取消
					</cl-button>
					<cl-button :width="220" type="primary" :loading="loading" @tap="submit">
						保存
					</cl-button>
				</view>
			</cl-dialog>


		</view>
	</cl-page>
</template>

<style lang="scss" scoped>
.page-user-edit {
	.form {
		padding: 20rpx 24rpx;
	}

	.save-btn {
		padding: 20rpx 24rpx;
		display: flex;
		justify-content: center;
	}
}
</style>
