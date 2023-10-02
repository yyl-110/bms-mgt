<template>
    <div class="project">
        <OverviewCard :list='list' />
        <div class="tableWrap w-full bg-[#fff] rounded-[10px] mt-5 px-5">
            <div class="header flex items-center h-[60px]">
                <span class="text-t3 font-[500] text-[20px] flex-shrink-0">项目列表</span>
                <div class="input w-[60%]">
                    <el-input v-model="searchVal" placeholder="输入关键字搜索" size="large" class="ml-[10px]">
                        <template #append>
                            <el-button :icon="Search" />
                        </template>
                    </el-input>
                </div>
                <el-button class="text-[#999] absolute right-1 sm:right-5">
                    <img src="../../assets/img/export.png" class="w-5 h-5 hidden sm:block" alt="">
                    导出
                </el-button>
            </div>
            <ProjectTable :device_list="device_list" />
        </div>
        <div class="mapWrap mt-5">
            <CardContainer title="地图统计">
                <template #header>
                    <div class="flex items-center pr-5">
                        <el-checkbox v-model="showMap" label="显示在线" size="large" />
                        <svg-icon class-name='cursor-pointer' icon-class='svg-fullscreen' class="ml-10" />
                    </div>
                </template>
                <template #content>
                    <div class="map w-full px-2 h-[758px] pb-2">
                        <Map :pos_info="pos_info" />
                    </div>
                </template>
            </CardContainer>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { projectData } from '/@/api/project/index'
import { Search } from '@element-plus/icons-vue';
import ProjectTable from './components/ProjectTable.vue'
import OverviewCard from './components/OverviewCard.vue'
import CardContainer from '/@/components/common/CardContainer.vue';
import Map from '/@/components/common/Map.vue';

const list = ref([{ title: '项目数', num: 0 }, { title: '设备数', num: 0 }, { title: '在线数', num: 0 }, { title: '故障数', num: 0 }])
const pos_info = ref({})
const device_list = ref({})
const searchVal = ref('')

const getProjectData = async () => {
    const res = await projectData({})
    console.log('res:', res)
    if (res.code === 1) {
        list.value[0].num = res.data?.project_num
        list.value[1].num = res.data?.device_num
        list.value[2].num = res.data?.online_num
        pos_info.value = res.data?.pos_info
        device_list.value = res.data?.data
    }
}

onMounted(() => {
    getProjectData()
})

</script>

<style lang="scss" scoped>
:deep(.el-input__wrapper) {
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
}

:deep(.el-input-group__append) {
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
}

.el-button {
    border-radius: 10px;
    border-color: #E5E5E5;
    color: #999;

}
</style>