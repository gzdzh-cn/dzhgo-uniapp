<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useCool, useStore } from "/@/cool";
import { filterPic } from "/@/dzh/utils";
import { cloneDeep } from "lodash";

const props = defineProps({
	name: String,
});
const Form = ref<ClForm.Ref>();
const { router } = useCool();
const { user } = useStore();

const avatarUrl = ref("/static/avatar.png");

const editShow = ref(false);
const editContent = ref();
const editTitle = ref("修改昵称");
const editField = ref("nickName");
const edit = (v: any) => {
	editShow.value = true;
	editField.value = v;
	switch (v) {
		case "avatarUrl":
			editTitle.value = "修改头像";
			break;
		case "nickName":
			editTitle.value = "修改昵称";
			break;
		case "sex":
			editContent.value = 1;
			editTitle.value = "修改性别";
			break;
		case "description":
			editTitle.value = "修改个性签名";
			break;
		default:
			editTitle.value = "修改昵称";
			break;
	}
};

// 头像
const avatarUrlSuccess = (url: string) => {
	form.value.avatarUrl = url;
	editContent.value = filterPic(url);
};

// 性别
const sexOption = ref([
	{
		label: "男",
		value: 1,
	},
	{
		label: "女",
		value: 0,
	},
]);

const form = ref<any>(user.info);
const loading = ref(false);
const submit = () => {
	console.log("edi",editContent.value);
	
	if ( editField.value != 'sex' &&  !editContent.value) {
		uni.showToast({
			title: "不能为空",
			icon: "error",
		});
		return;
	}

	if (editField.value != "avatarUrl") {
		form.value[editField.value] = editContent.value;
	}

	loading.value = true;
	user
		.update(form.value)
		.then((r) => {
			loading.value = false;
			uni.showToast({
				title: "保存成功",
				success(result) {
					router.back;
				},
			});
			user.get();
			if (user.info?.avatarUrl) {
				avatarUrl.value = filterPic(user.info?.avatarUrl);
			}
			close();
		})
		.catch((err) => {
			loading.value = false;
			uni.showToast({
				title: err.message,
				icon: "error",
			});

			return;
		});
};
const close = () => {
	editShow.value = false;
	editContent.value = "";
};

onMounted(() => {
	if (user.info?.avatarUrl) {
		avatarUrl.value = filterPic(user.info?.avatarUrl);
	}
});
</script>

<template>
	<cl-page>
		<view class="page-user-edit">
			<view class="form">
				<cl-list :radius="16">
					<cl-list-item label="头像" justify="start" @tap="edit('avatarUrl')">
						<template #append>
							<cl-avatar :size="80" :src="avatarUrl" />
						</template>
					</cl-list-item>
					<cl-list-item label="昵称" @tap="edit('nickName')">
						<template #append>
							<view class="flex flex-row justify-center items-center gap-2">
								<cl-text :value="user.info?.nickName"></cl-text>
								<cl-button type="error" size="mini" :border="false" round plain @tap="edit('nickName')"
									>编辑</cl-button
								>
							</view>
						</template>
					</cl-list-item>
					<cl-list-item label="性别" @tap="edit('sex')">
						<template #append>
							
							<view class="flex flex-row justify-center items-center gap-2">
								<cl-text :value="user.info?.sex == 1 ? '男' : '女'"></cl-text>
								<cl-button type="error" size="mini" :border="false" round plain @tap="edit('sex')"
									>编辑</cl-button
								>
							</view>
						</template>
					</cl-list-item>
					<cl-list-item label="个性签名" @tap="edit('description')">
						<template #append>
							
							<view class="flex flex-row justify-center items-center gap-2">
								<cl-text :value="user.info?.description"></cl-text>
								<cl-button type="error" size="mini" :border="false" round plain @tap="edit('description')"
									>编辑</cl-button
								>
							</view>
						</template>
					</cl-list-item>
				</cl-list>
			</view>

			<cl-dialog :title="editTitle" v-model="editShow">
				<cl-input
					v-model="editContent"
					type="text"
					v-if="editField != 'description' && editField != 'avatarUrl' && editField != 'sex'"
				/>
				<cl-textarea v-model="editContent" v-if="editField == 'description'" />
				<cl-select v-model="editContent" :options="sexOption" v-if="editField == 'sex'"></cl-select>

				<view class="flex flex-row justify-center" v-if="editField == 'avatarUrl'">
					<cl-upload v-model="editContent" @success="avatarUrlSuccess" />
				</view>

				<view class="my-[30rpx] w-full flex flex-row justify-between">
					<cl-button :width="220" @tap="close"> 取消 </cl-button>
					<cl-button :width="220" type="primary" :loading="loading" @tap="submit"> 保存 </cl-button>
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
../../util_/common