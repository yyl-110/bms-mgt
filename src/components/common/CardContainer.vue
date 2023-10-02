<template>
    <div class='w-full bg-white rounded-[10px] mb-5'>
        <div class='header h-[52px] w-full text-t3 font-[500] text-xl flex items-center pl-5 justify-between'>
            <span>{{ title }}</span>
            <div class="option">
                <slot name="header" />
            </div>
        </div>
        <div class="w-full">
            <slot name="content" />
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    title: {
        type: String,
        default: ''
    }
})

</script>

<style lang="scss" scoped></style>