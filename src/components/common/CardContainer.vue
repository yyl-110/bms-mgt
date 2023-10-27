<template>
    <div class='w-full bg-white rounded-[10px]'>
        <div class='header h-[52px] w-full text-t3 font-[500] text-xl flex items-center pl-5 justify-between'
            v-if="!collapseHeader">
            <div class="flex items-center">
                <span>{{ title }}</span>
                <div class="input w-[70%]" v-if="hasSearch">
                    <el-input v-model="searchVal" placeholder="输入关键字搜索" size="large" class="ml-[10px] rounded-[10px]"
                        @keyup.enter.native="search">
                        <template #append>
                            <el-button :icon="Search" @click="search" />
                        </template>
                    </el-input>
                </div>
            </div>

            <div class="option">
                <slot name="header" />
            </div>
        </div>
        <div class="header" v-else>
            <slot name="header" />
        </div>
        <div class="w-full">
            <slot name="content" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { Search } from '@element-plus/icons-vue';
import { ref } from 'vue';

const emits = defineEmits(['handleSearch'])
const props = defineProps({
    title: {
        type: String,
        default: ''
    },
    collapseHeader: {
        type: Boolean,
        default: false
    },
    hasSearch: {
        type: Boolean,
        dafault: false
    }
})
const searchVal = ref('')

const search = () => {
    emits('handleSearch', searchVal.value)
}

</script>

<style lang="scss" scoped></style>