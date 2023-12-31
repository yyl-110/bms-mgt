<template>
    <div>
        <div class="chart h-[450px] rounded-[10px] mb-5 bg-[#fff]">
            <div class="left absolute left-5 top-10  z-10">
                <el-button type="primary" size="small" :icon="ArrowLeftBold" @click="changeEndTime(1)">
                </el-button>
            </div>
            <div class="right absolute right-5 top-10  z-10">
                <el-button type="primary" size="small" :icon="ArrowRightBold" @click="changeEndTime(2)"
                    :disabled="isLastMonth">
                </el-button>
            </div>
            <LineChart :lineData="chartData" />
        </div>
        <div class="min-h-[640px] rounded-[10px] mb-5 bg-[#fff] px-5 w-full">
            <div class="flex items-center options justify-end h-[60px]">
                <el-popover placement="bottom-end" title="" trigger="click">
                    <template #reference>
                        <el-button class="text-[#999]">
                            <img src="/@/assets/img/filter.png" class="w-5 h-5" alt="">
                            {{ $t('table.filter') }}
                        </el-button>
                    </template>
                    <el-checkbox-group v-model="checkList">
                        <el-checkbox :label="item.label" v-for="item in filterList" :key="item.key" />
                    </el-checkbox-group>
                </el-popover>

                <el-button class="text-[#999]" @click="pointTable">
                    <img src="/@/assets/img/point.png" class="w-5 h-5" alt="">
                    {{ $t('table.print') }}
                </el-button>
                <el-button class="text-[#999]">
                    <img src="/@/assets/img/export.png" class="w-5 h-5" alt="">
                    {{ $t('table.export') }}
                </el-button>
            </div>
            <HistroyTable :history_list="history_list" @changePagination="changePagination" :checkList="checkList"
                @handleSort="handleSort" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue';
import { runHistory, getHistoryChart } from '/@/api';
import LineChart from './components/LineChart.vue';
import HistroyTable from './components/HistroyTable.vue';
import print from '/@/utils/print';
import { useIndexStore } from '/@/store/modules';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n'
import { ArrowLeftBold, ArrowRightBold } from '@element-plus/icons-vue';
import dayjs from 'dayjs';
const { t } = useI18n()

const indexStore = useIndexStore()
const { handleRunHistorySearch } = indexStore
const { runHistorySearch } = storeToRefs(indexStore)

const isLastMonth = ref(false)

const tableList = ref([])
const list_rows = ref(10)
const page = ref(1)
let order = reactive({ value: { filed: '', order: '' } })
const history_list = ref({})
const chartData = ref({})
const checkList = ref([t('table.index'), t('runStatus.base5'), t('table.dataupdate_datetime'), t('table.EndTime'), t('table.startSoc'), t('table.endSoc'), t('table.time')])
const filterList = ref([
    { label: t('table.index'), key: 'index' },
    { label: t('runStatus.base5'), key: 'type' },
    { label: t('table.dataupdate_datetime'), key: 'bgn_ts' },
    { label: t('table.EndTime'), key: 'end_ts' },
    { label: t('table.startSoc'), key: 'bgn_soc' },
    { label: t('table.endSoc'), key: 'end_soc' },
    { label: t('table.time'), key: 'length' },
])
const fetchData = async (pages = page.value, size = list_rows.value) => {
    const device_code = sessionStorage.getItem('device_code')
    const _order = order.value.filed ? order.value : {}
    const _runHistorySearch = { ...runHistorySearch.value }
    if (_runHistorySearch.type === '') delete _runHistorySearch.type
    const res: any = await runHistory({ code: device_code, page: pages, list_rows: size, ..._runHistorySearch, ..._order })
    page.value = res.data?.current_page
    list_rows.value = res.data?.per_page
    history_list.value = res.data
    tableList.value = res.data?.data
}

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


const handleSort = (val) => {
    order = { value: val }
    fetchData()
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

const getHistoryChartList = async (time = '') => {
    const device_code = sessionStorage.getItem('device_code')
    const res = await getHistoryChart({ code: device_code, end_time: time })
    if (res.code === 1) {
        chartData.value = res.data
        try {
            const keys = Object.keys(chartData.value)
            const lastMonth = keys[keys.length - 1]
            isLastMonth.value = dayjs().isSame(lastMonth, 'month')
        } catch (error) {
            console.log('error:', error)
        }
    }
}

const changeEndTime = (type: number) => {
    let end_time = ''
    const keys = Object.keys(chartData.value)
    if (type === 1) {
        const currentDate = keys[keys.length - 1]
        const day = dayjs(currentDate).subtract(1, 'month').endOf('month').format('YYYY-MM-DD');
        console.log('end_time:', day)
        end_time = day
    }
    if (type === 2) {
        const lastMonth = keys[keys.length - 1]
        const day = dayjs(lastMonth).add(1, 'month').endOf('month').format('YYYY-MM-DD');
        end_time = day
    }
    handleRunHistorySearch({
        ...runHistorySearch.value,
        end_time
    })
    getHistoryChartList(end_time)
}


onMounted(() => {
    fetchData()
    getHistoryChartList()
})


watch(() => runHistorySearch.value, (val) => {
    fetchData()
}, { deep: true })

</script>

<style scoped></style>