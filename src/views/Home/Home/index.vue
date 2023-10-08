<template>
    <div>
        <OverviewCard :list='list' />
        <el-row :gutter='20' class='mb-5'>
            <el-col :xs='24' :sm='12' :md='12' :lg='6' :xl='6' class='mb-2'>
                <CardContainer title="设备soc">
                    <template #content>
                        <div class="h-[308px] w-full">
                            <PieChart />
                        </div>
                    </template>
                </CardContainer>
            </el-col>
            <el-col :xs='24' :sm='12' :md='12' :lg='6' :xl='6' class='mb-2'>
                <CardContainer title="故障等级">
                    <template #content>
                        <div class="h-[308px] w-full">
                            <PieChart />
                        </div>
                    </template>
                </CardContainer>
            </el-col>
            <el-col :xs='24' :sm='24' :md='24' :lg='12' :xl='12' class='mb-2'>
                <div class="lineContainer h-[360px] w-full bg-white rounded-[10px] relative">
                    <el-select v-model="selectTime" class="right-[10px] top-[14px] w-[100px] z-10 md:right-[19px]"
                        placeholder="" style="position: absolute;">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                    <LineChart />
                </div>
            </el-col>
        </el-row>
        <el-row :gutter='20' class='mb-5'>
            <el-col :xs='24' :sm='18' :md='18' :lg='18' :xl='18' class='mb-2'>
                <CardContainer title="地图统计">
                    <template #header>
                        <div class="flex items-center pr-5">
                            <el-checkbox v-model="showMap" label="显示在线" size="large" @change="changeOnline" />
                            <svg-icon class-name='cursor-pointer' icon-class='svg-fullscreen' class="ml-10" />
                        </div>
                    </template>
                    <template #content>
                        <div class="map w-full px-2 h-[758px] pb-2">
                            <Map :pos_info="pos_info" />
                        </div>
                    </template>
                </CardContainer>
            </el-col>
            <el-col :xs='24' :sm='6' :md='6' :lg='6' :xl='6' class='mb-2'>
                <CardContainer title="故障信息">
                    <template #content>
                        <div
                            class="failcontent flex flex-col px-1 pt-[7px] text-[16px] h-[758px] lg:px-5 overflow-x-hidden overflow-y-auto">
                            <div class="w-full flex items-center justify-between h-10" v-for="item in 5"><span
                                    class="rankNum w-5 h-5 rounded-[50%] flex items-center justify-center text-[14px] flex-shrink-0 bg-red text-white">1</span>
                                <div class="id max-w-[140px]">868575028559195</div>
                                <div class="text-[#666] flex-shrink-0">充电单体过压</div>
                            </div>
                        </div>
                    </template>
                </CardContainer>
            </el-col>
        </el-row>
        <el-row :gutter='20' class='mb-5'>
            <el-col :xs='24' :sm='5' :md='5' :lg='5' :xl='5' class='mb-2'>
                <div class="h-[490px] w-full rounded-[10px] overflow-y-auto bg-white">
                    <div class="item w-full flex items-center h-[70px] bg-[#FAFAFA]">
                        <span class="flex-shrink-0 w-[55%] text-center text-[16px] text-[#666] ">累计运行时间(h)</span>
                        <span class="flex-shrink-0 w-[45%] text-center text-[14px] text-t3 font-[500]">2022.392</span>
                    </div>
                </div>
            </el-col>
            <el-col :xs='24' :sm='19' :md='19' :lg='19' :xl='19' class='mb-2'>
                <div class="lineContainer w-full bg-white rounded-[10px] relative h-[490px]">
                    <el-select v-model="selectTime" class="right-[10px] top-[14px] w-[100px] z-10 md:right-[19px]"
                        placeholder="" style="position: absolute;">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                    <SingleLineChart />
                </div>
            </el-col>
        </el-row>
        <!-- 设备列表 -->
        <div class="sbList w-full">
            <CardContainer title="设备列表" class="h-full">
                <template #header>
                    <div class="flex items-center pr-5 options">
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
                            打印
                        </el-button>
                        <el-button class="text-[#999]">
                            <img src="/@/assets/img/export.png" class="w-5 h-5" alt="">
                            导出
                        </el-button>
                    </div>
                </template>
                <template #content>
                    <div class=" bg-white min-h-[500px] px-5">
                        <DeviceTable :device_list="device_list" @changePagination="changePagination" :checkList="checkList"
                            @handleSort="handleSort" />
                    </div>
                </template>
            </CardContainer>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { homeData } from '/@/api/home'
import OverviewCard from '../components/OverviewCard.vue'
import CardContainer from '/@/components/common/CardContainer.vue'
import PieChart from '../components/PieChart.vue';
import LineChart from '../components/LineChart.vue';
import Map from '/@/components/common/Map.vue';
import SingleLineChart from '../components/SingleLineChart.vue';
import DeviceTable from '../components/DeviceTable.vue';
import print from '/@/utils/print';

const list = ref([{ title: '项目数', num: 0 }, { title: '设备数', num: 0 }, { title: '在线数', num: 0 }, { title: '故障数', num: 0 }])
const selectTime: string = ref('2')
const showMap = ref(false)
const pos_info = ref({})
const tableList = ref([])
const list_rows = ref(10)
const page = ref(1)
let order = reactive({ value: { filed: '', order: '' } })
const device_list = ref({})
const checkList = ref(['序号', '项目号', '设备ID', '描述', '固定版本', '状态'])
const filterList = ref([
    { label: '序号', key: 'index' },
    { label: '项目号', key: 'project_name' },
    // { label: '用户项目号', key: 'identify_code' },
    { label: '设备ID', key: 'identify_code' },
    { label: '描述', key: 'des' },
    { label: '固定版本', key: 'version' },
    { label: 'SIM', key: 'iccid' },
    { label: '开始时间', key: 'dataupdate_datetime' },
    { label: '结束时间', key: 'EndTime' },
    { label: '状态', key: 'status' },
])
const options = [
    {
        value: '1',
        label: '年',
    },
    {
        value: '2',
        label: '月',
    }, {
        value: '3',
        label: '日',
    },]

const getHomeData = async (pages = page.value, size = list_rows.value) => {
    const _order = order.value.filed ? order.value : {}
    const res = await homeData({ page: pages, list_rows: size, ..._order, status: showMap.value ? 'on' : '' })
    if (res.code === 1) {
        list.value[0].num = res.data?.project_num
        list.value[1].num = res.data?.device_num
        list.value[2].num = res.data?.online_num
        list.value[3].num = res.data?.flt_num
        pos_info.value = res.data?.pos_info
        device_list.value = res.data?.device_list
        tableList.value = res.data?.device_list?.data
    }
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

const changeOnline = () => {
    getHomeData()
}

const handleSort = (val) => {
    order = { value: val }
    getHomeData()
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
            getHomeData(page.value, value.val)
            break;
        case 'page':
            getHomeData(value.val, list_rows.value)
            break;

    }
}



onMounted(() => {
    getHomeData()
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
</style>