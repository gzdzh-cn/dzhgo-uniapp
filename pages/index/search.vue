<template>
	<cl-page background-color="#000">
		<view class="py-[20rpx]">
			<view class=" px-[40rpx] ">
				<u-search placeholder="搜索关键词" :clearabled="true" v-model="keyWord" @search="search" @custom="search" :action-style="actionStyle"></u-search>
			</view>
 
			<view class=" flex flex-col pt-[30rpx]">
				<view class=" mt-2 container">
					<view class="item" v-for="(item, index) in list" :key="index"
						@tap="router.push({ path: '/pages/user/publishList', query: { index, navActive: 'all', keyWord: keyWord, title: '视频列表' } })">
						<video class="item-img rounded-md" id="myVideo" :src="item.houseVideo" :controls="false"
							:show-center-play-btn="false" :show-fullscreen-btn="false" :show-play-btn="false" :object-fit="item.isCover ? 'cover' : 'contain'" @loadedmetadata="loadedmetadata($event, index)" ></video>

						<view class=" absolute bottom-5 left-3 flex flex-row gap-2 justify-center items-center">
							<uni-icons type="heart" size="20" color="#fff"></uni-icons>
							<span class=" text-xs text-white">{{ item.likeCount }}</span>
						</view>

					</view>
				</view>
			</view>
		</view>

	</cl-page>
</template>

<script setup lang="ts">
import { router, usePager, service } from "/@/cool";
import { onReady } from "@dcloudio/uni-app";
import { ref, onMounted, reactive } from "vue";

const actionStyle = {
	color:"#fff",
 
}
const keyWord = ref();
const search = () => {
	console.log("search");
	
	refresh()
}

const { list, onRefresh } = usePager();
const refresh = (params?: any) => {
	
	// 获取值
	const { data, next } = onRefresh({ ...params, navActive: "all",keyWord:keyWord.value });
	// 绑定对应的服务
	next(service.lease.publish.getVideoData(data));
}

// 加载完成触发
const loadedmetadata=(event:any, index:number)=> {
	if (event.target.height > event.target.width) {
		list.value[index].id == event.target.id
		list.value[index].isCover = true
	}
}

</script>

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


.select-item {
	border-bottom: 1px solid #999;
	border-right: 1px solid #999;
}
</style>