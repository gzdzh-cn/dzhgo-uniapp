<template>

    <view class="top">
        <view class="s-item-l">
            <cl-image :size="60" mode="aspectFill" :src="navImg" @click="open"></cl-image>
        </view>
        <view class="s-item-r">
            <search />
        </view>
    </view>
    <slibe v-model:visible="visible" />
</template>
    
<script setup lang='ts'>
import { ref } from 'vue';
import Slibe from "/@/components/slibe.vue";
import Search from "/@/components/search.vue";
const navImg = ref("/static/icon/nav.png")
const visible = ref(false)
const open = () => {
    visible.value = true
}
</script>
    
<style lang="less">
 

.top {
    width: 100%;
    padding: 0 10px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    /* #ifdef MP-WEIXIN */
    padding-right: 100px;
    padding-top: 0;

    // justify-content: flex-start;
    /* #endif */


    .s-item-r {
        width: 85%;
    }
}

.item {
    text-align: center;
}
</style>