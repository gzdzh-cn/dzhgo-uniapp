<template>
	<cl-page background-color="#000">

		<view class="px-[30rpx] py-[30rpx]">

			<view style="width: 300rpx;margin: 0 auto;">
				<u-tabs :list="tabList" :is-scroll="false" v-model="current" bg-color="#000" inactive-color="#9e9e9e"
					active-color="#fff" @change="tabChange"></u-tabs>
			</view>

			<u-line color="#535c68" margin="10rpx" />

			<view class="py-[20rpx]">
				<u-collapse ref="uCollapseRef" :head-style="headStyle" hover-class="hoverClass">
					<u-collapse-item :title="item.name" v-for="(item, index) in itemList" :key="index" 
						@longpress="longpress(index)" @change="collapseChange" :index="index" :open="item.open">
						<view class="collapse-item">
							{{ item.remark }}
						</view>
					</u-collapse-item>
				</u-collapse>

			</view>
		</view>


		<!-- 弹窗操作 -->
		<u-action-sheet :list="sheetList" @click="actionSheetClick" v-model="actionSheetShow"></u-action-sheet>
		<u-toast ref="uToastRef" />

		<view class="z-50 fixed bottom-0">
			<tabbar />
		</view>

	</cl-page>
</template>
<script setup lang="ts">
import Tabbar from "/@/components/tabbar.vue";
import { ref, onMounted} from "vue";
import { service } from "/@/cool";

interface Notice {
	id: number
	name:string
	remark:string
	open:boolean
}

const uCollapseRef = ref()
const currentIndex = ref(1)
const uToastRef = ref()
const tabList = ref([
	{
		name: '未读',
		count: 0
	},
	{
		name: '已读'
	},
])
const current = ref(0)
const unreadCount = ref(0)
const tabChange = (v: any) => {
	current.value = v
	itemList.value = []
	getItemList()
 
}

// 底部操作栏
const deleIndex = ref()
const actionSheetShow = ref(false)
const longpress = (index: number) => {
	actionSheetShow.value = true
	deleIndex.value = index
}
// 操作栏点击
const actionSheetClick = () => {
 
	const id = itemList.value[deleIndex.value].id
	service.lease.publish.noticeUpdate({id,action:"del"})
	itemList.value.splice(deleIndex.value, 1)

}
const sheetList = ref([{
	text: '删除',
	color: 'red',
	fontSize: 28
}])

// 通知列表
const headStyle = ref({
	color: "#f1f2f6" //#b4b5b7 #f1f2f6
})
 
const itemList = ref<Notice[]>([])
const getItemList  = async ()=>{
	const res = await service.lease.publish.noticeList({typeId:current.value})
	itemList.value = res
	if(current.value == 0){
		unreadCount.value=itemList.value?.length
		tabList.value[0].count = unreadCount.value
	}
	itemList.value.forEach(item=>item.open = false)
}

// 展开关闭
const collapseChange = (params:any) => {
	currentIndex.value = params.index
	
	if(current.value == 0 && params.show){
		unreadCount.value--
		tabList.value[0].count = unreadCount.value
		const id = itemList.value[params.index].id
		service.lease.publish.noticeUpdate({id,action:"update"})
	}
 
}



 

onMounted(()=>{
	getItemList()
})


</script>

<style lang="less" scoped>

.collapse-item {
	color: #b4b5b7;
	padding-bottom: 10px;
}

.item {
	display: flex;
	padding: 20rpx;
}

image {
	width: 120rpx;
	flex: 0 0 120rpx;
	height: 120rpx;
	margin-right: 20rpx;
	border-radius: 12rpx;
}

.title {
	text-align: left;
	font-size: 28rpx;
	margin-top: 20rpx;
	color: #fff;
}
</style>
