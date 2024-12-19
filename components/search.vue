<template>
    <view class="search">
        <cl-search placeholder="搜索关键词" v-model:modelValue="keyWord" @search="toSearch"></cl-search>
    </view>
</template>
    
<script setup lang='ts'>
import { ref } from 'vue';

const keyWord = ref()

const emit = defineEmits(["toSearch"])

const toSearch = (v:any) => {
    emit("toSearch", keyWord.value)
}



</script>
    
<style lang="less">
.item {
    text-align: center;
}
</style>