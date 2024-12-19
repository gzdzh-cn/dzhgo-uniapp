<script lang="ts" setup>
import { onReady } from "@dcloudio/uni-app";
import { service, usePager, useCool } from "/@/cool";
import { ref } from "vue";


const { router } = useCool();
const { list, onRefresh } = usePager();
const refresh = (params?: any) => {

	// 获取值
	const { data, next } = onRefresh({ ...params, attrType: "collect" });
	// 绑定对应的服务
	// next(getList(data));

}

const getList = (data: any) => {
	return  
}
 
 

// 首次刷新
onReady(() => {
	refresh();
});
// 暴露方法
defineExpose({
	refresh
});

</script>
<template>
	<cl-page >
		 
 
	</cl-page>
</template>



<style lang="less">
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
