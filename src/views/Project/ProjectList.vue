<template>
    <div class="project">
        <OverviewCard :list='list' />
        <!-- 项目列表 -->
        <div class="tableWrap w-full bg-[#fff] rounded-[10px] mt-5 px-5" v-if="!projectName">
            <div class="header flex items-center h-[60px]">
                <span class="text-t3 font-[500] text-[20px] flex-shrink-0">{{ $t('project.projectList') }}</span>
                <div class="input w-[60%]">
                    <el-input v-model="searchVal" :placeholder="$t('table.searchText')" size="large" class="ml-[10px]"
                        @keyup.enter.native="search">
                        <template #append>
                            <el-button :icon="Search" @click="search" />
                        </template>
                    </el-input>
                </div>
                <el-button class="text-[#999] absolute right-1 sm:right-5">
                    <img src="../../assets/img/export.png" class="w-5 h-5 hidden sm:block" alt="">
                    {{ $t('table.export') }}
                </el-button>
            </div>
            <ProjectTable :device_list="device_list" @changePagination="changePagination" :search="searchVal"
                @handleSort="handleSort" @checked-project="checkedProject" @refresh="getProjectData" />
        </div>
        <DeviceTable :projectName="projectName" v-else />
        <div class="mapWrap mt-5">
            <CardContainer :title="$t('home.title4')" :class="isFullscreen ? 'fullScreen' : ''">
                <template #header>
                    <div class="flex items-center pr-5">
                        <el-checkbox v-model="showMap" :label="$t('home.onlineShow')" size="large" @change="changeOnline" />
                        <Screenfull />
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
import { computed, onMounted, reactive, ref } from 'vue';
import { projectData } from '/@/api/project/index'
import { Search } from '@element-plus/icons-vue';
import ProjectTable from './components/ProjectTable.vue'
import OverviewCard from './components/OverviewCard.vue'
import CardContainer from '/@/components/common/CardContainer.vue';
import Map from '/@/components/common/Map.vue';
import DeviceTable from './components/DeviceTable.vue';
import { useI18n } from 'vue-i18n'
import { useIndexStore } from '/@/store/modules';
import { storeToRefs } from 'pinia';
import Screenfull from '/@/layout/components/screenfull.vue';
const { t, locale } = useI18n()

const indexStore = useIndexStore()
const indexStoreState = storeToRefs(indexStore)
console.log('indexStoreState:', indexStoreState?.isFullscreenState.value)

const isFullscreen = computed(() => {
    return indexStoreState?.isFullscreenState.value
})


// const list = ref([{ title: '项目数', num: 0 }, { title: '设备数', num: 0 }, { title: '在线数', num: 0 }, { title: '故障数', num: 0 }])
const list = ref([{ title: t('home.projectNum'), num: 0 }, { title: t('home.deviceNum'), num: 0 }, { title: t('home.onlineNum'), num: 0 }, { title: t('home.faults'), num: 0 }])
const pos_info = ref({})
const device_list = ref({})
const searchVal = ref('')
const list_rows = ref(10)
const page = ref(1)
let order = reactive({ value: { filed: '', order: '' } })
const showMap = ref<boolean>(false)
const projectName = ref('')


const getProjectData = async (pages = page.value, size = list_rows.value) => {
    const _order = order.value.filed ? order.value : {}
    const res = await projectData({ page: pages, list_rows: size, ..._order, search: searchVal.value, status: showMap.value ? 'on' : '' })
    if (res.code === 1) {
        list.value[0].num = res.data?.project_num
        list.value[1].num = res.data?.device_num
        list.value[2].num = res.data?.online_num
        list.value[3].num = res.data?.flt_num
        pos_info.value = res.data?.pos_info
        device_list.value = res.data?.data
        page.value = res.data?.data?.current_page
        list_rows.value = res.data?.data?.per_page
    }
}
const handleSort = (val) => {
    order = { value: val }
    getProjectData()
}

const search = () => {
    getProjectData()
}

const changeOnline = () => {
    getProjectData()
}

const checkedProject = (name) => {
    projectName.value = name
}

/**
 * 修改分页
 * @param {*} value
 * @param {*} val
 * @return {*}
 */
const changePagination = (value: { type: string, val: number }) => {
    switch (value.type) {
        case 'size':
            getProjectData(page.value, value.val)
            break;
        case 'page':
            getProjectData(value.val, list_rows.value)
            break;

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

.fullScreen {
    // fixed left-0 top-0 w-[100%] h-[100%] z-[1000]
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 120%;
    z-index: 1000;
}
</style>