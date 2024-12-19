<template>
 
 <cl-page>

	 
	 

	 <tabbar />
 </cl-page>

</template>
<script setup lang="ts">
import { router, useCool, useStore } from "/@/cool";
import Tabbar from "/@/components/tabbar.vue";
import { onBeforeMount, onMounted, ref } from "vue";
import { onShareAppMessage, onShow } from "@dcloudio/uni-app";
import { dzhStore } from '/@/dzh'

 
const { user } = useStore();
const { service } = useCool();
const { setting } = dzhStore() 
 



onShow(() => {
	 
});

</script>
<style lang="less">
 
.scroll-view_H {
	white-space: nowrap;
	box-sizing: border-box;
	flex: 1;

	.uni-scroll-view::-webkit-scrollbar {
		display: none;
		width: 0 !important;
		height: 0 !important;
		-webkit-appearance: none;
		background: transparent;
	}
}

.scroll-view-item_H {
	display: inline-block;
	width: 100%;
	height: 300rpx;
	line-height: 300rpx;
	text-align: center;
	font-size: 36rpx;
}

.swiper-item {
	height: 1200px; 
}
</style>
