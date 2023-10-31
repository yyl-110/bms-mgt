<template>
    <div class="z-100 window pt-[6px]">
        <div class="header w-full flex items-center justify-between px-2">
            <span class="text-t3 text-[18px]">设备信息</span>
            <img src="/@/assets/img/close.png" alt="" class="w-[13px] h-[13px] close" id="close">
        </div>
        <div class="px-2 w-full" style="line-height: 24px;">
            <div class="row text-[16px] text-t3 ">
                <span class="text-[16px]">设备ID：</span>
                <span class="text-primary" id="id">{{ id }}</span>
            </div>
            <div class="row text-[16px] text-t3 ">
                <span class="text-[16px]">时间：</span>
                <span>{{ time }}</span>
            </div>
            <div class="row text-[16px] text-t3 ">
                <span class="text-[16px]">状态：</span>
                <span>{{ status }}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

const props = defineProps({
    id: { type: String, default: '' },
    time: { type: String, default: '' },
    status: { type: String, default: '' },
})

</script>

<style lang="scss" scoped>
.window {
    width: 225px;
    height: 110px;
    background: #FFFFFF;
    border-radius: 6px;
}
</style>