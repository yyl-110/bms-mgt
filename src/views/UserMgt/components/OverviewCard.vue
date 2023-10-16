<template>
    <el-row :gutter='20' class='mb-5'>
        <el-col v-for='(item, index) in list' :key='index' :xs='24' :sm='12' :md='12' :lg='6' :xl='6' class='mb-2'>
            <div class='flex items-center h-[120px] bg-white rounded-[10px] justify-between pl-5 pr-[24px]'>
                <div>
                    <p class='text-[#333] text-[18px]'>{{ item.title }}</p>
                    <h2 class='text-blue mt-1 text-[30px] font-[600]'>
                        {{ item.num }}</h2>
                </div>
                <img :src='getImg(IconList[index])' alt='' class='w-10 h-10'>
            </div>
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
interface IProps {
    list: { title: string, num: number }[]
}
const props: IProps = defineProps({
    list: {
        type: Array,
        default: () => []
    }
})
const IconList = [
    '/@/assets/img/userIcon.png',
    '/@/assets/img/icon1@2x.png',
    '/@/assets/img/icon2@2x.png',
    '/@/assets/img/icon3@2x.png',
]

const getImg = (url) => {
    return new URL(url, import.meta.url).href
}


</script>

<style lang="scss" scoped></style>