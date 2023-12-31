<template>
    <div>
        <OverviewCard :list="list" />
        <div class="tableWrap w-full bg-[#fff] rounded-[10px] mt-5 px-5">
            <div class="header flex items-center h-auto py-2.5 lg:h-[60px] lg:py-0 flex-wrap lg:flex-nowrap">
                <div class="flex items-center w-full lg:flex-1 leftContent flex-wrap lg:flex-nowrap lg:w-auto">
                    <span class="text-t3 font-[500] text-[20px] flex-shrink-0">{{ $t('subUser.deviceList') }}</span>
                    <div class="input w-[50%] min-w-[200px] rounded-[6px] ml-5 lg:ml-[50px]">
                        <el-input v-model="searchVal" :placeholder="$t('table.searchText')" size="large"
                            @keyup.enter.native="search">
                            <template #append>
                                <el-button :icon="Search" @click="search" />
                            </template>
                        </el-input>
                    </div>
                </div>
                <div class="flex items-center mt-2.5 options ml-auto lg:ml-0 lg:mt-0">
                    <el-button class="text-[#999]" @click="dialogDelVisible = true">
                        {{ $t('table.allUnbind') }}
                    </el-button>
                    <el-popover placement="bottom-end" title="" trigger="click">
                        <template #reference>
                            <el-button class="text-[#999]">
                                <img src="/@/assets/img/filter.png" class="w-5 h-5" alt="">
                                {{ $t('table.filter') }}
                            </el-button>
                        </template>
                        <el-checkbox-group v-model="checkList" @change="changeCheck">
                            <el-checkbox :label="item.label" v-for="item in filterList" :key="item.key" />
                        </el-checkbox-group>
                    </el-popover>

                    <el-button class="text-[#999]" @click="pointTable">
                        <img src="/@/assets/img/point.png" class="w-5 h-5" alt="">
                        {{ $t('table.print') }}
                    </el-button>
                    <el-button class="text-[#999]" @click="exportTable">
                        <img src="/@/assets/img/export.png" class="w-5 h-5" alt="">
                        {{ $t('table.export') }}
                    </el-button>
                </div>
            </div>
            <DeviceTable :deviceList="deviceData" @changePagination="changePagination" @handleOption="handleOption"
                :search="searchVal" :checkList="checkList" @handleSort="handleSort" />
        </div>
        <el-dialog v-model="dialogDelVisible" :width='largerThanSm ? "500" : "60%"' :show-close="false">
            <template #header>
                <div
                    class="my-header w-full h-[50px] md:h-[60px] bg-[#F5F5FD] flex justify-center items-center text-[18px] xl:text-[22px] text-t3 relative">
                    {{ $t('table.unbind') }}
                    <img src="/@/assets/img/close.png"
                        class="w-[14px] h-[14px] cursor-pointer absolute right-[25px] top-[23px]"
                        @click="dialogDelVisible = false" alt="">
                </div>
            </template>
            <div
                class="text-center text-t3 text-[16px] sm:text-[20px] xl:h-[90px] h-[50px] flex justify-center items-center">
                {{ $t('table.areYueUnbind') }}
            </div>
            <template #footer>
                <span class="dialog-footer flex justify-center items-center">
                    <el-button type="primary" class="w-[150px] h-[40px] xl:h-[50px] rounded-[10px]" size="large"
                        @click="confirmOption">
                        {{ $t('btn.confirm') }}
                    </el-button>
                    <el-button class="w-[150px] h-[40px] xl:h-[50px] rounded-[10px]" size="large"
                        @click="dialogDelVisible = false">
                        {{ $t('btn.cancel') }}
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import OverviewCard from '../components/OverviewCard.vue';
import { Search } from '@element-plus/icons-vue';
import print from '/@/utils/print';
import { childDeviceIndex, childIndexIndex, deviceDel } from '/@/api';
import { useRoute } from 'vue-router';
import DeviceTable from '../components/DeviceTable.vue';
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';
import { ElMessage } from 'element-plus';
const breakpoints = useBreakpoints(breakpointsTailwind)
const largerThanSm = breakpoints.greater('sm') // only larger than sm
import { useI18n } from 'vue-i18n'
import { tableDown } from '/@/utils/request';
const { t } = useI18n()

const route = useRoute()

const list = ref([{ title: t('home.projectNum'), num: 0 }, { title: t('home.deviceNum'), num: 0 }, { title: t('home.onlineNum'), num: 0 }])
const searchVal = ref('')
const tableList = ref<any>([])
const deviceData = ref<any>({})
const dialogDelVisible = ref(false)
const list_rows = ref(10)
const page = ref(1)
const handelId = ref<number | null>(null)
let order = reactive({ value: { filed: '', order: '' } })
const checkList = ref([t('table.index'), t('table.identify_code'), t('table.project_name'), t('table.desc'), t('table.status'), t('table.operate')])
const filterList = ref([
    { label: t('table.index'), key: 'index' },
    { label: t('table.identify_code'), key: 'identify_code' },
    { label: t('table.project_name'), key: 'project_name' },
    { label: t('table.desc'), key: 'des' },
    { label: t('table.status'), key: 'status' },
    { label: t('table.operate'), key: 'options' },
])

const pointTable = () => {
    let fields = checkList.value.map(i => filterList.value.find(item => item.label === i)?.key)
    fields.splice(fields.findIndex(i => i === 'index'), 1)
    print.printJson({
        title: '', // 打印出来的标题
        data: tableList.value, // 需要打印的数据
        serial: checkList.value.includes(t('table.index')), // 是否需要打印序列号
        fields, // 需要打印的字段
        properties: fields.map(i => {
            return { field: i, displayName: filterList.value.find(item => item.key === i)?.label }
        })
    })
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
            fetchData(page.value, value.val)
            break;
        case 'page':
            fetchData(value.val, list_rows.value)
            break;
    }
}

/**
 * 删除解绑
 * @return {*}
 */
const confirmOption = async () => {
    /* 单个解绑 */
    if (handelId.value) {
        const res = await deviceDel({ ids: handelId.value })
        if (res.code === 1) {
            ElMessage({
                message: t('table.unBindSuc'),
                type: 'success',
            })
            dialogDelVisible.value = false
            handelId.value = null
            fetchData()
        }
        return
    }
    const tableIdList = deviceData.value?.data.map(item => item.id)
    const allUnbindRes = await deviceDel({ ids: tableIdList.join(',') })
    if (allUnbindRes.code === 1) {
        ElMessage({
            message: t('table.unBindSuc'),
            type: 'success',
        })
        dialogDelVisible.value = false
        fetchData()
    }

}

const handleOption = (id: number) => {
    dialogDelVisible.value = true
    handelId.value = id
}

const handleSort = (val) => {
    order = { value: val }
    fetchData()
}

const search = () => {
    fetchData()
}

const fetchData = async (pages = page.value, size = list_rows.value) => {
    const _order = order.value.filed ? order.value : {}
    const res = await childDeviceIndex({ child_id: sessionStorage.getItem('child_id') ? Number(sessionStorage.getItem('child_id')) : 0, page: pages, list_rows: size, ..._order, search: searchVal.value })
    if (res.code === 1) {
        deviceData.value = res?.data
        page.value = res.data?.current_page
        list_rows.value = res.data?.per_page
        tableList.value = res.data?.data
        list.value[0].num = res.data.project_name
        list.value[1].num = res.data.device_num
        list.value[2].num = res.data.online_num
    }
}

const exportTable = async () => {
    tableDown({ search: searchVal.value }, 'childDeviceDown')
}

const changeCheck = () => { }
onMounted(() => {
    fetchData(1)
})

</script>

<style scoped lang="scss">
:deep(.el-form-item__label) {
    --el-text-color-regular: #666
}

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

.leftContent {
    --el-border-radius-base: 10px
}

:deep(.el-input__wrapper) {
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
}

:deep(.el-input-group__append) {
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
}

.options {
    .el-button {
        border-radius: 10px;
        border-color: #E5E5E5;
        color: #999;
    }
}
</style>