<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { onLoad, onPullDownRefresh, onShow } from "@dcloudio/uni-app";
import { service, useCool, useStore } from "/@/cool";
import { filterPic } from "/@/dzh/utils";


 
const { router } = useCool();
const { user } = useStore();
 
 
const avatarUrl = ref()

const refresh = async () => {
	if (user.token) {
		 
	} else {
		user.logout();
	}
}

  
 
 

onPullDownRefresh(() => {
	refresh();
	uni.stopPullDownRefresh();
});

onShow(() => {
	refresh();
 
});
onMounted(() => {

});
onLoad((option: any) => {
 
	 
})


</script>
<template>
	<cl-page  >
	 
 


	</cl-page>
</template>



<style lang="scss">
 
</style>
 ../../util_/common