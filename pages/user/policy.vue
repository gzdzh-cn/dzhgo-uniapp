<template>
	<cl-page>

		<view class="u-content">
			<u-parse :html="content"></u-parse>
		</view>



	</cl-page>
</template>

<script setup lang="ts">
import { computed, ref, reactive, onMounted } from "vue";
import { service } from "/@/cool";

const content = ref()

const getInfo = async () => {
	const res = await service.cms.setting.info({ id: 1 })
	content.value = res.policy
}

onMounted(() => {
	getInfo()
})
</script>

<style lang="less">
.u-content {
	margin-top: 10rpx;
	padding: 30rpx;
}
</style>
