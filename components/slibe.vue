<template>
	<!-- 导航弹窗 -->
	<cl-popup v-model="show" direction="left" size="50%" class="slibe" :zIndex="zIndex" padding="0">
		<uni-collapse accordion>
			<template v-for="(item, index) in nav" :key="index" >

				<uni-collapse-item  :show-animation="true" title-border="none" :border="false" :title="item.title"
					:thumb="item.thumb" v-if="user.info?.username !== 'admin' && item.perm !== 'admin' || user.info?.username == 'admin'">
					<view class="content">
						<uni-list >
							<uni-list-item style="padding-left: 18%;" clickable :title="childItem.title" v-for="(childItem, childIndex) in item.child"
								:key="childIndex" @tap="path(childItem.href)" ></uni-list-item>
						</uni-list>
					</view>
				</uni-collapse-item>

			</template>
		</uni-collapse>
	</cl-popup>
</template>

<script setup lang='ts'>
import {
	computed,
	ref
} from 'vue';
import {
	toLink
} from "/@/dzh/utils";
import { useStore } from "/@/cool";
const { user } = useStore();

const zIndex = 100000

interface Props {
	visible: boolean
}
const props = defineProps<Props>()
interface Emit {
	(e: 'update:visible', visible: boolean): void
}
const emit = defineEmits<Emit>()
const show = computed({
	get() {
		return props.visible
	},
	set(visible: boolean) {
		emit('update:visible', visible)
	},
})

const path = (link: string) => {
	show.value = false
	toLink(link)
}


const nav = ref([
	{
		title: "设置管理",
		perm:'admin',
		thumb: "/static/icon/setting.png",
		child: [{
			title: "配置",
			href: "/pages/setting/config"

		},
		{
			title: "公告",
			href: "/pages/setting/tip"
		}
		]
	},
	{
		title: "会员管理",
		perm:'',
		thumb: "/static/icon/user.png",
		child: [{
			title: "会员列表",
			href: "/pages/account/list"
		},

		]
	},
	{
		title: "订单管理",
		perm:'',
		thumb: "/static/icon/order.png",
		child: [{
			title: "订单列表",
			href: "/pages/order/list"
		},
		]
	},
	{
		title: "日志管理",
		perm:'',
		thumb: "/static/icon/record.png",
		child: [{
			title: "积分明细",
			href: "/pages/score/list"
		},

		]
	}
])
</script>

<style scoped lang="scss">


</style>../util/common../util_/common