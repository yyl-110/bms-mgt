<template>
    <div class="pb-5">
        <OverviewCard :list='list' />
        <el-row :gutter='20' class="mb-5">
            <el-col :xs='24' :sm='12' :md='12' :lg='6' :xl='6' class='mb-1'>
                <CardContainer :title="$t('home.title1')" :collapseHeader="true">
                    <template #header>
                        <div class="rounded-[10px] overflow-hidden">
                            <el-collapse v-model="activeNames2">
                                <el-collapse-item name="1">
                                    <template #title>
                                        <div class="px-5  text-t3 font-[500] text-xl flex items-center">
                                            {{ $t('home.title1') }}
                                        </div>
                                    </template>
                                    <div class="h-[308px] w-full bg-[#fff]">
                                        <PieChart :pieData="socData" ref="pieChartRef1" />
                                    </div>
                                </el-collapse-item>
                            </el-collapse>
                        </div>
                    </template>
                </CardContainer>
            </el-col>
            <el-col :xs='24' :sm='12' :md='12' :lg='6' :xl='6' class='mb-1'>
                <CardContainer :title="$t('home.title2')" :collapseHeader="true">
                    <template #header>
                        <div class="rounded-[10px] overflow-hidden">
                            <el-collapse v-model="activeNames3">
                                <el-collapse-item name="1">
                                    <template #title>
                                        <div class="px-5  text-t3 font-[500] text-xl flex items-center">
                                            {{ $t('home.title2') }}
                                        </div>
                                    </template>
                                    <div class="h-[308px] w-full bg-[#fff]">
                                        <PieChart :pieData="pie_flt" :chart-type="2" ref="pieChartRef2" />
                                    </div>
                                </el-collapse-item>
                            </el-collapse>
                        </div>
                    </template>
                </CardContainer>
            </el-col>
            <el-col :xs='24' :sm='24' :md='24' :lg='12' :xl='12' class='mb-1'>
                <div class="lineContainer h-[360px] w-full bg-white rounded-[10px] relative">
                    <el-select v-model="selectTime" class="right-[10px] top-[14px] w-[100px] z-10 md:right-[19px]"
                        placeholder="" style="position: absolute;" @change="handleChangeTime">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                    <LineChart :lineData="chargeData" ref="lineChartRef" />
                </div>
            </el-col>
        </el-row>
        <el-collapse v-model="activeNames1" class="mb-5">
            <el-collapse-item title="" name="1" class="rounded-[10px] overflow-hidden">
                <el-row :gutter='20'>
                    <el-col :xs='24' :sm='18' :md='18' :lg='18' :xl='18' class="mb-1">
                        <CardContainer :title="$t('home.title4')" :class="isFullscreen ? 'fullScreen' : ''">
                            <template #header>
                                <div class="flex items-center pr-5">
                                    <el-checkbox v-model="showMap" :label="$t('home.onlineShow')" size="large"
                                        @change="changeOnline" />
                                    <Screenfull />
                                    <!-- <svg-icon class-name='cursor-pointer' icon-class='svg-fullscreen' class="ml-10" /> -->
                                </div>
                            </template>
                            <template #content>
                                <div class="map w-full px-2 h-[758px] pb-2">
                                    <Map :pos_info="pos_info" />
                                </div>
                            </template>
                        </CardContainer>
                    </el-col>
                    <el-col :xs='24' :sm='6' :md='6' :lg='6' :xl='6' class="mb-1">
                        <CardContainer :title="$t('home.title5')">
                            <template #content>
                                <div
                                    class="failcontent flex flex-col pt-[0px] text-[16px] h-[758px] px-3 lg:px-5 overflow-x-hidden overflow-y-auto pb-5">
                                    <div class="w-full flex items-center h-10 text-[12px] xl:text-[14px]"
                                        v-for="(item, index) in flt_info" :key="item?.identify_code">
                                        <div class="w-[20%] text-center text-[#666666] text-[14px]">{{ index + 1 }}
                                        </div>
                                        <div class="id w-[70%] text-primary cursor-pointer text-center"
                                            @click="goTo(item?.identify_code)">{{
                                                item?.identify_code }}</div>
                                        <span
                                            :class="item?.flt_lvl === '1' ? 'one' : (item?.flt_lvl === '2' ? 'two' : 'three')"
                                            class="rankNum  w-5 h-5 rounded-[50%] flex items-center justify-around text-[14px] flex-shrink-0  text-white">{{
                                                item?.flt_lvl }}</span>
                                    </div>
                                </div>
                            </template>
                        </CardContainer>
                    </el-col>
                </el-row>
            </el-collapse-item>
        </el-collapse>

        <el-collapse v-model="activeNames4" class="mb-5">
            <el-collapse-item title="" name="1" class="rounded-[10px] overflow-hidden">
                <el-row :gutter='20' class='mb-5'>
                    <el-col :xs='24' :sm='5' :md='5' :lg='5' :xl='5' class="mb-1">
                        <div class="h-[490px] w-full rounded-[10px] overflow-y-auto bg-white">
                            <div :class="(index % 2 === 0) ? 'bg-[#FAFAFA]' : 'bg-[#fff]'"
                                class="item w-full flex items-center h-[70px] bg-[#FAFAFA]"
                                v-for="(val, key, index) in  totalInfo " :key="key">
                                <span
                                    class="flex-shrink-0 w-[75%] xl:w-[55%] text-center text-[14px] xl:text-[16px] text-[#666] ">{{
                                        totalDataEnum[key]
                                    }}</span>
                                <span class="flex-shrink-0 w-[25%] xl:w-[45%] text-center text-[14px] text-t3 font-[500]">{{
                                    val }}</span>
                            </div>
                        </div>
                    </el-col>
                    <el-col :xs='24' :sm='19' :md='19' :lg='19' :xl='19'>
                        <div class="lineContainer w-full bg-white rounded-[10px] relative h-[490px]">
                            <SingleLineChart :lineData="runData" ref="SingleLineChartRef" />
                        </div>
                    </el-col>
                </el-row>
            </el-collapse-item>
        </el-collapse>

        <!-- 设备列表 -->
        <div class="sbList w-full">
            <CardContainer :title="$t('home.title6')" class="h-full" :hasSearch="true" @handleSearch="handleSearch">
                <template #header>
                    <div class="flex items-center pr-5 options">
                        <el-popover placement="bottom-end" title="" trigger="click">
                            <template #reference>
                                <el-button class="text-[#999]">
                                    <img src="/@/assets/img/filter.png" class="w-5 h-5" alt="">
                                    {{ $t('table.filter') }}
                                </el-button>
                            </template>
                            <el-checkbox-group v-model="checkList">
                                <el-checkbox :label="item.label" v-for=" item  in  filterList " :key="item.key" />
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
                </template>
                <template #content>
                    <div class=" bg-white min-h-[500px] px-5">
                        <DeviceTable :device_list="device_list" @changePagination="changePagination" :checkList="checkList"
                            @handleSort="handleSort" @refresh="getDeviceList" />
                    </div>
                </template>
            </CardContainer>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, reactive, ref } from 'vue'
import { getHomeDeviceList, getHomeTotal, homeData } from '/@/api/home'
import { deviceIndex } from '/@/api'
import OverviewCard from '../components/OverviewCard.vue'
import CardContainer from '/@/components/common/CardContainer.vue'
import PieChart from '../components/PieChart.vue';
import LineChart from '../components/LineChart.vue';
import Map from '/@/components/common/Map.vue';
import SingleLineChart from '../components/SingleLineChart.vue';
import DeviceTable from '../components/DeviceTable.vue';
import print from '/@/utils/print';
import Screenfull from '/@/layout/components/screenfull.vue'
import { useI18n } from 'vue-i18n'
import { useIndexStore } from '/@/store/modules'
import { storeToRefs } from 'pinia'
const { t, locale } = useI18n()
const indexStore = useIndexStore()
const indexStoreState = storeToRefs(indexStore)
console.log('indexStoreState:', indexStoreState?.isFullscreenState.value)

const isFullscreen = computed(() => {
    return indexStoreState?.isFullscreenState.value
})

const activeNames1 = ref(['1'])
const activeNames2 = ref(['1'])
const activeNames3 = ref(['1'])
const activeNames4 = ref(['1'])
const activeNames5 = ref(['1'])

const totalDataEnum = {
    ChgCapSum: '累计充电容量(Ah)',
    ChgEnergySum: '累计充电能量(kWh)',
    ChgTimeSum: '累计充电时间(h)',
    DsgCapSum: '累计放电容量(Ah)',
    DsgEnergySum: '累计放电能量(kWh)',
    DsgTimeSum: '累计放电时间(h)',
    RunTimeSum: '累计运行时间(h)',
}
const list = ref([{ title: t('home.projectNum'), num: 0 }, { title: t('home.deviceNum'), num: 0 }, { title: t('home.onlineNum'), num: 0 }, { title: t('home.faults'), num: 0 }])
const chargeData = ref({})
const selectTime = ref<number>(1)
const showMap = ref(false)
const pos_info = ref({})
const tableList = ref([])
const flt_info = ref([]) //故障信息
const totalInfo = ref({})
const socData = ref({})
const pie_flt = ref({})
const list_rows = ref(10)
const runData = ref({}) //运行历史
const searchVal = ref('')
const page = ref(1)
let order = reactive({ value: { filed: '', order: '' } })
const device_list = ref({})
const checkList = ref([t('table.index'), t('table.project_name'), t('table.identify_code'), t('table.desc'), t('table.version'), t('table.status')])
const filterList = ref([
    { label: t('table.index'), key: 'index' },
    { label: t('table.project_name'), key: 'project_name' },
    // { label: '用户项目号', key: 'identify_code' },
    { label: t('table.identify_code'), key: 'identify_code' },
    { label: t('table.desc'), key: 'des' },
    { label: t('table.version'), key: 'version' },
    { label: 'SIM', key: 'iccid' },
    { label: t('table.dataupdate_datetime'), key: 'dataupdate_datetime' },
    { label: t('table.EndTime'), key: 'EndTime' },
    { label: t('table.status'), key: 'status' },
])
const options = [
    {
        value: 1,
        label: t('home.lastWeek'),
    },
    {
        value: 2,
        label: t('home.lastMonth'),
    }, {
        value: 3,
        label: t('home.lastyear'),
    },]
const pieChartRef1 = ref(null)
const pieChartRef2 = ref(null)
const SingleLineChartRef = ref(null)
const lineChartRef = ref(null)

const getHomeData = async () => {
    const res = await homeData({ status: showMap.value ? 'on' : '' })
    if (res?.code === 1) {
        list.value[0].num = res.data?.project_num
        list.value[1].num = res.data?.device_num
        list.value[2].num = res.data?.online_num
        pos_info.value = res.data?.pos_info
    }
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

const changeOnline = (e) => {
    getHomeData()
}

const handleSort = (val) => {
    order = { value: val }
    device_list.value = {}
    getDeviceList()
}

const handleSearch = (val) => {
    searchVal.value = val
    getDeviceList(val)
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
            getDeviceList(page.value, value.val)
            break;
        case 'page':
            getDeviceList(value.val, list_rows.value)
            break;
    }
}

const getDeviceIndex = async () => {
    const res = await deviceIndex({ type: selectTime.value })
    if (res.code === 1) {
        chargeData.value = res.data
    }
}

const handleChangeTime = () => {
    getDeviceIndex()
}

const goTo = (code: string) => {
    sessionStorage.setItem('device_code', code)
    window.location.href = '/device'
}

const handleGetHomeTotal = async () => {
    const res = await getHomeTotal({})
    flt_info.value = res.data?.flt_info?.info
    totalInfo.value = res.data?.total
    socData.value = res.data?.soc
    pie_flt.value = res.data?.flt_info?.total
    runData.value = res.data?.run
    list.value[3].num = res.data?.flt_num
}

const getDeviceList = async (pages = page.value, size = list_rows.value, search = searchVal.value) => {
    const _order = order.value.filed ? order.value : {}
    const res: any = await getHomeDeviceList({ page: pages, list_rows: size, ..._order, search })
    page.value = res.data?.current_page
    list_rows.value = res.data?.per_page
    device_list.value = res.data
    tableList.value = res.data.data
}




onMounted(() => {
    getHomeData()
    handleGetHomeTotal()
    getDeviceList()
    getDeviceIndex()
    nextTick(() => {
        //在父组件中调用子组件的自适应方法
        pieChartRef1.value?.resizeChart();
        pieChartRef2.value?.resizeChart()
        SingleLineChartRef.value?.resizeChart()
        lineChartRef.value?.resizeChart()

    })
})


</script>

<style lang="scss" scoped>
.options {
    .el-button {
        border-radius: 10px;
        border-color: #E5E5E5;
        color: #999;

    }
}

.rankNum {
    &.one {
        background-color: #F1D036;
    }

    &.two {
        background-color: #E69934;
    }

    &.three {
        background: #E63434;
    }
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

:deep(.el-collapse-item__content) {
    padding-bottom: 0;
    background-color: #f0f2f5;
}
</style>