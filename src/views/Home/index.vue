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
                <div class="lineContainer h-full w-full bg-white rounded-[10px] relative">
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
                        <el-button class="text-[#999]">
                            <img src="../../assets/img/filter.png" class="w-5 h-5" alt="">
                            筛选
                        </el-button>
                        <el-button class="text-[#999]">
                            <img src="../../assets/img/point.png" class="w-5 h-5" alt="">
                            打印
                        </el-button>
                        <el-button class="text-[#999]">
                            <img src="../../assets/img/export.png" class="w-5 h-5" alt="">
                            导出
                        </el-button>
                    </div>
                </template>
                <template #content>
                    <div class=" bg-white min-h-[500px] px-5">
                        <DeviceTable :device_list="device_list" />
                    </div>
                </template>
            </CardContainer>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { homeData } from '/@/api/home'
import OverviewCard from './components/OverviewCard.vue'
import CardContainer from '/@/components/common/CardContainer.vue'
import PieChart from './components/PieChart.vue';
import LineChart from './components/LineChart.vue';
import Map from '/@/components/common/Map.vue';
import SingleLineChart from './components/SingleLineChart.vue';
import DeviceTable from './components/DeviceTable.vue';

const list = ref([{ title: '项目数', num: 0 }, { title: '设备数', num: 0 }, { title: '在线数', num: 0 }, { title: '故障数', num: 0 }])
const selectTime: string = ref('2')
const showMap = ref(false)
const pos_info = ref({})
const device_list = ref({})
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

const getHomeData = async () => {
    const res = await homeData()
    if (res.code === 1) {
        list.value[0].num = res.data?.project_num
        list.value[1].num = res.data?.device_num
        list.value[2].num = res.data?.online_num
        list.value[3].num = res.data?.flt_num
        pos_info.value = res.data?.pos_info
        device_list.value = res.data?.device_list
    }
    console.log('res:', res)
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