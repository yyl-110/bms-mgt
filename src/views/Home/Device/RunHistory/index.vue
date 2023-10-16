<template>
    <div>
        <div class="chart h-[450px] rounded-[10px] mb-5 bg-[#fff]">
            <LineChart :lineData="chartData" />
        </div>
        <div class="min-h-[640px] rounded-[10px] mb-5 bg-[#fff] px-5 w-full">
            <div class="flex items-center options justify-end h-[60px]">
                <el-popover placement="bottom-end" title="" trigger="click">
                    <template #reference>
                        <el-button class="text-[#999]">
                            <img src="/@/assets/img/filter.png" class="w-5 h-5" alt="">
                            筛选
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

const indexStore = useIndexStore()
const { runHistorySearch = {} } = storeToRefs(indexStore)

const tableList = ref([])
const list_rows = ref(10)
const page = ref(1)
let order = reactive({ value: { filed: '', order: '' } })
const history_list = ref({})
const chartData = ref({})
const checkList = ref(['序号', '充放电状态', '开始时间', '结束时间', '开始SOC', '结束SOC', '本次时长'])
const filterList = ref([
    { label: '序号', key: 'index' },
    { label: '充放电状态', key: 'type' },
    { label: '开始时间', key: 'bgn_ts' },
    { label: '结束时间', key: 'end_ts' },
    { label: '开始SOC', key: 'bgn_soc' },
    { label: '结束SOC', key: 'end_soc' },
    { label: '本次时长', key: 'length' },
])
const fetchData = async (pages = page.value, size = list_rows.value) => {
    const device_code = sessionStorage.getItem('device_code')
    const _order = order.value.filed ? order.value : {}
    const res: any = await runHistory({ code: device_code, page: pages, list_rows: size, ...runHistorySearch.value, ..._order })
    history_list.value = res.data
    tableList.value = res.data?.data
}

const pointTable = () => {
    let fields = checkList.value.map(i => filterList.value.find(item => item.label === i)?.key)
    console.log('fields:', fields)
    fields.splice(fields.findIndex(i => i === 'index'), 1)
    print.printJson({
        title: '', // 打印出来的标题
        data: tableList.value, // 需要打印的数据
        serial: checkList.value.includes('序号'), // 是否需要打印序列号
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

const getHistoryChartList = async () => {
    const device_code = sessionStorage.getItem('device_code')
    const res = await getHistoryChart({ code: device_code })
    if(res.code === 1) {
        chartData.value = res.data
    }
}



onMounted(() => {
    fetchData()
    getHistoryChartList()
})

watch(() => runHistorySearch, (val) => {
    fetchData()
}, { deep: true })

</script>

<style scoped></style>