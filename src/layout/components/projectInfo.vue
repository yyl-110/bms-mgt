<template>
    <div class="w-full h-full">
        <div class="flex w-full h-full items-center justify-between px-[20px] text-[#666] text-[12px] sm:text-[16px] flex-wrap"
            v-if="projectStatus === 1">
            <span>{{ $t('table.project_name') }}：{{ projectInfo?.project_name }}</span>
            <span>{{ $t('table.userProjectNumber') }}：{{ projectInfo?.user_project_name }}</span>
            <span>{{ $t('table.version') }}：{{ projectInfo?.version }}</span>
            <span>{{ $t('table.identify_code') }}：{{ code }}</span>
            <span>{{$t('table.status')}}：{{ projectInfo?.status }}</span>
            <el-button type="primary" size="small" @click="handleGetQrcode">{{ $t('device.qrCode') }}</el-button>
        </div>
        <div class="flex w-full h-full items-center justify-between px-[20px] text-[#666] text-[12px] sm:text-[16px] flex-wrap"
            v-if="projectStatus === 2">
            <span>{{ $t('table.project_name') }}：{{ mapInfo?.project_name }}</span>
            <span>{{ $t('table.userProjectNumber') }}：{{ mapInfo?.user_project_name }}</span>
            <span>{{ $t('table.version') }}：{{ mapInfo?.version }}</span>
            <span>{{ $t('table.identify_code') }}：{{ code }}</span>
            <span>{{ $t('device.time') }}：{{ mapInfo[2] }}</span>
        </div>
        <div class="flex w-full h-full items-center justify-between px-[20px] text-[#666] text-[12px] sm:text-[16px] flex-wrap gap-x-5 py-1 xl:py-0"
            v-if="projectStatus === 3">
            <div class="flex items-center justify-between">
                <span>{{ $t('table.project_name') }}：{{ projectInfo?.project_name }}</span>
                <span>{{ $t('table.userProjectNumber') }}：{{ projectInfo?.user_project_name }}</span>
                <span>{{ $t('table.version') }}：{{ projectInfo?.version }}</span>
                <span>{{ $t('table.identify_code') }}：{{ code }}</span>
            </div>
            <div class="filter flex items-center justify-end ml-auto">
                <el-select v-model="type" class="mr-2 w-[120px]" placeholder="" size="small">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
                <div class="flex items-center mr-5">
                    {{ $t('table.dataupdate_datetime') }}：
                    <el-date-picker v-model="start_time" type="datetime" placeholder="" size="small"
                        format="YYYY-MM-DD HH:mm:ss" :prefix-icon="Calendar" class="w-[150px] xl:w-[240px] " />
                </div>
                <div class="flex items-center mr-5">
                    {{ $t('table.EndTime') }}：
                    <el-date-picker v-model="end_time" type="datetime" placeholder="" size="small"
                        format="YYYY-MM-DD HH:mm:ss" :prefix-icon="Calendar" class="w-[150px] xl:w-[240px] " />
                </div>
                <el-button type="primary" class="rounded-[6px] text-[14px]" size="small"
                    @click="searchRunHistory">{{ $t('device.search') }}</el-button>
            </div>
        </div>
        <div class="flex w-full h-full items-center justify-between px-[20px] text-[#666] text-[12px] sm:text-[16px] flex-wrap"
            v-if="projectStatus === 4">
            <span>{{ $t('table.project_name') }}：{{ projectInfo?.project_name }}</span>
            <span>{{ $t('table.userProjectNumber') }}：{{ projectInfo?.user_project_name }}</span>
            <span>{{ $t('table.version') }}：{{ projectInfo?.version }}</span>
            <span>{{ $t('table.identify_code') }}：{{ code }}</span>
        </div>
        <div class="flex w-full h-full items-center justify-between px-[20px] text-[#666] text-[12px] sm:text-[16px] flex-wrap gap-x-10"
            v-if="projectStatus === 5">
            <div class="flex items-center justify-between flex-1 flex-nowrap">
                <span>{{ $t('table.project_name') }}：{{ projectInfo?.project_name }}</span>
                <span>{{ $t('table.userProjectNumber') }}：{{ projectInfo?.user_project_name }}</span>
                <span>{{ $t('table.version') }}：{{ projectInfo?.version }}</span>
                <span>{{ $t('table.identify_code') }}：{{ code }}</span>
            </div>
            <div class="filter flex items-center justify-end ml-auto">
                <el-date-picker v-model="timeArr" type="daterange" range-separator="-" :start-placeholder="$t('table.dataupdate_datetime')"
                    :end-placeholder="$t('table.EndTime')" size="small" class="w-[240px]" />
                <el-button type="primary" class="rounded-[6px] text-[14px] ml-[15px]" size="small"
                    @click="download">{{ $t('device.download') }}</el-button>
            </div>
        </div>
        <div class="flex w-full h-full items-center justify-between px-[20px] text-[#666] text-[12px] sm:text-[16px] flex-wrap gap-x-10"
            v-if="projectStatus === 6">
            <div class="flex items-center justify-between flex-1 flex-nowrap">
                <span>{{ $t('table.project_name') }}：{{ projectInfo?.project_name }}</span>
                <span>{{ $t('table.userProjectNumber') }}：{{ projectInfo?.user_project_name }}</span>
                <!-- <span>{{ $t('table.version') }}：{{ projectInfo?.version }}</span> -->
                <span>{{ $t('table.identify_code') }}：{{ code }}</span>
            </div>
            <div class="filter flex items-center justify-end ml-auto">
                <el-date-picker v-model="timeArr2" type="daterange" range-separator="-" :start-placeholder="$t('table.dataupdate_datetime')"
                    :end-placeholder="$t('table.EndTime')" size="small" />
                <el-button type="primary" class="rounded-[6px] text-[14px] ml-2" size="small"
                    @click="searchRunHistoryChart">{{ $t('device.search') }}</el-button>
            </div>
        </div>

        <el-dialog v-model="dialogVisible" :width='largerThanSm ? "500" : "80%"' :show-close="false">
            <template #header>
                <div
                    class="my-header w-full h-[50px] md:h-[60px] bg-[#F5F5FD] flex justify-center items-center text-[18px] xl:text-[22px] text-t3 relative">
                    {{ $t('device.qrCode') }}
                    <img src="/@/assets/img/close.png"
                        class="w-[14px] h-[14px] cursor-pointer absolute right-[25px] top-[23px]"
                        @click="dialogVisible = false" alt="">
                </div>
            </template>
            <div class="text-center text-t3 text-[16px] sm:text-[20px] h-[420px] flex flex-col items-center">
                <p class="text-t3 text-[16px]">{{ projectInfo?.project_name }}</p>
                <img :src="qrCode" alt="" class="mt-4 w-[280px] h-[280px]">
                <p class="mt-6 text-t3 text-[16px]">{{ code }}</p>
            </div>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">

import { computed, ref, watch } from 'vue';
import { useLayoutStore } from '/@/store/modules/layout';
import { storeToRefs } from 'pinia';
import dayjs from 'dayjs';
import { useIndexStore } from '/@/store/modules';
import { Calendar } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { downloadHistory } from '/@/utils/request';
import { getQrcode } from '/@/api';
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';
import _ from 'lodash'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()


const breakpoints = useBreakpoints(breakpointsTailwind)
const largerThanSm = breakpoints.greater('sm') // only larger than sm

const options = [
    {
        value: 1,
        label: t('device.cd'),
    },
    {
        value: 2,
        label: t('device.fd'),
    },
    {
        value: 0,
        label: t('device.nocnof'),
    },
]
const timeArr = ref([])
const timeArr2 = ref([dayjs().format('YYYY-MM-DD HH:mm:ss'), dayjs().format('YYYY-MM-DD HH:mm:ss')])
const type = ref('')
const start_time = ref('')
const end_time = ref('')
const dialogVisible = ref(false)
const qrCode = ref('')
const selectData = ref({
    type: 0,
    start_time: '',
    end_time: ''
})
const indexStore = useIndexStore()
const { handleRunHistorySearch, handleRunHistoryChartSearch } = useIndexStore()
const layoutStore = useLayoutStore()
const projectData = storeToRefs(indexStore)

const projectInfo = computed(() => {
    return projectData.projectInfo.value
})

const mapInfo = computed(() => {
    return projectData?.mapInfo.value
})

const runHistory = computed(() => {
    return projectData?.runHistory.value
})
const refLayoutState = storeToRefs(layoutStore)

const projectStatus = computed(() => {
    return refLayoutState.getProjectBarStatus.value
})

const time = computed(() => {
    return dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')
})

const searchRunHistory = () => {
    handleRunHistorySearch({
        type: type.value, start_time: start_time.value ? dayjs(start_time.value).format('YYYY-MM-DD HH:mm:ss') : '',
        end_time: end_time.value ? dayjs(end_time.value).format('YYYY-MM-DD HH:mm:ss') : ''
    })
}
const searchRunHistoryChart = () => {
    handleRunHistoryChartSearch({ start_time: dayjs(timeArr2.value[0]).format('YYYY-MM-DD HH:mm:ss'), end_time: dayjs(timeArr2.value[1]).format('YYYY-MM-DD HH:mm:ss') })
}

const props = defineProps({
    data: {
        type: Object,
        default: () => { }
    }
})

const code = computed(() => {
    return sessionStorage.getItem('device_code')
})

const fileDownload = (res, filename) => {
    const blob = res.data
    if ('msSaveOrOpenBlob' in navigator) {
        window.navigator.msSaveOrOpenBlob(blob, filename); // 针对浏览器
    } else {
        const elink = document.createElement('a'); // 创建a标签
        elink.download = filename;
        elink.style.display = 'none';
        // 创建一个指向blob的url，这里就是点击可以下载文件的根结
        elink.href = URL.createObjectURL(blob);
        document.body.appendChild(elink);
        elink.click();
        URL.revokeObjectURL(elink.href); //移除链接
        document.body.removeChild(elink); //移除a标签
    }
}

const download = _.debounce(async () => {
    // if (timeArr.value.length === 0) {
    //     ElMessage({
    //         type: 'warning',
    //         message: '请选择日期'
    //     })
    //     return
    // }
    const start_time = dayjs(timeArr.value[0]).format('YYYY-MM-DD HH:mm:ss')
    const end_time = dayjs(timeArr.value[1]).format('YYYY-MM-DD HH:mm:ss')
    const code = sessionStorage.getItem('device_code')

    const res = await downloadHistory({ code, start_time, end_time })
    fileDownload(res, code)

}, 1000 * 60, {
    leading: true,
    trailing: false,
})

const handleGetQrcode = async () => {
    const divice_code = sessionStorage.getItem('device_code')
    const res = await getQrcode({ code: code.value, type: 1 })
    qrCode.value = 'data:image/jpg;base64,' + res?.data
    dialogVisible.value = true
}
</script>

<style scoped lang="scss">
:deep(.el-dialog) {
    border-radius: 20px;
    overflow: hidden;

    .el-button--large {
        border-radius: 8px;
        // height: 50px;
    }
}

:deep(.el-dialog__header) {
    padding: 0;
    margin-right: 0;
}

:deep(.el-dialog__body) {
    padding: 0;
    padding-top: 29px;
}
</style>