<template>
    <div class="w-full min-h-[600px] px-6">
        <el-row :gutter='20'>
            <el-col :xs='24' :sm='24' :md='12' :lg='8' :xl='8'>
                <div class="h-[120px] w-full rounded-[10px] bg-[#fff] flex items-center gap-[30px] pl-5 mb-[24px]"
                    style="box-shadow: 0px 1px 5px 0px #DDE0E4;">
                    <img src="/img/icon1.png" alt="" class="w-[68px] h-[68px]">
                    <div>
                        <p class="text-[#666] text-6">{{ $t('device.totalVoltage') }}(V)</p>
                        <span class="text-t3 font-[500] text-[36px] mt-6">{{ projectInfo?.sys_info?.total_volt }}</span>
                    </div>
                </div>
            </el-col>
            <el-col :xs='24' :sm='24' :md='12' :lg='8' :xl='8'>
                <div class="h-[120px] w-full rounded-[10px] bg-[#fff] flex items-center gap-[30px] pl-5 mb-[24px]"
                    style="box-shadow: 0px 1px 5px 0px #DDE0E4;">
                    <img src="/img/icon2.png" alt="" class="w-[68px] h-[68px]">
                    <div>
                        <p class="text-[#666] text-6">{{ $t('device.totalCurrent') }}(A)</p>
                        <span class="text-t3 font-[500] text-[36px] mt-6">{{ projectInfo?.sys_info?.total_curr }}</span>
                    </div>
                </div>
            </el-col> <el-col :xs='24' :sm='24' :md='12' :lg='8' :xl='8'>
                <div class="h-[120px] w-full rounded-[10px] bg-[#fff] flex items-center gap-[30px] pl-5 mb-[24px]"
                    style="box-shadow: 0px 1px 5px 0px #DDE0E4;">
                    <img src="/img/icon3.png" alt="" class="w-[68px] h-[68px]">
                    <div>
                        <p class="text-[#666] text-6">SOC(%)</p>
                        <span class="text-t3 font-[500] text-[36px] mt-6">{{ projectInfo?.sys_info?.soc }}</span>
                    </div>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter='40'>
            <el-col :xs='24' :sm='24' :md='12' :lg='12' :xl='12'>
                <div class="w-full rounded-[10px] overflow-hidden">
                    <div class="item flex items-center h-[70px] bg-[#FAFAFA]">
                        <div class="title flex-1 h-full flex items-center justify-center text-[18px] text-[#666]">
                            {{ $t('device.show1') }}(V)</div>
                        <div class="title flex-1 h-full flex items-center justify-center text-6 text-t3">
                            {{ projectInfo?.sys_info?.cell_volt_max }}</div>
                    </div>
                    <div class="item flex items-center h-[70px]">
                        <div class="title flex-1 h-full flex items-center justify-center text-[18px] text-[#666]">
                            {{ $t('device.show2') }}</div>
                        <div class="title flex-1 h-full flex items-center justify-center text-6 text-t3">
                            {{ projectInfo?.sys_info?.cell_volt_max_pos }}</div>
                    </div>
                    <div class="item flex items-center h-[70px] bg-[#FAFAFA]">
                        <div class="title flex-1 h-full flex items-center justify-center text-[18px] text-[#666]">
                            {{ $t('device.show3') }}(V)</div>
                        <div class="title flex-1 h-full flex items-center justify-center text-6 text-t3">
                            {{ projectInfo?.sys_info?.cell_volt_min }}</div>
                    </div>
                    <div class="item flex items-center h-[70px]">
                        <div class="title flex-1 h-full flex items-center justify-center text-[18px] text-[#666]">
                            {{ $t('device.show4') }}</div>
                        <div class="title flex-1 h-full flex items-center justify-center text-6 text-t3">
                            {{ projectInfo?.sys_info?.cell_volt_min_pos }}</div>
                    </div>
                    <div class="item flex items-center h-[70px] bg-[#FAFAFA]">
                        <div class="title flex-1 h-full flex items-center justify-center text-[18px] text-[#666]">
                            {{ $t('device.show5') }}(V)</div>
                        <div class="title flex-1 h-full flex items-center justify-center text-6 text-t3">
                            {{ projectInfo?.sys_info?.cell_volt_avg }}</div>
                    </div>
                    <div class="item flex items-center h-[70px]">
                        <div class="title flex-1 h-full flex items-center justify-center text-[18px] text-[#666]">
                            {{ $t('device.show6') }}(V)</div>
                        <div class="title flex-1 h-full flex items-center justify-center text-6 text-t3">
                            {{ projectInfo?.sys_info?.cell_volt_diff }}</div>
                    </div>
                </div>
            </el-col>
            <el-col :xs='24' :sm='24' :md='12' :lg='12' :xl='12'>
                <div class="w-full rounded-[10px]">
                    <div class="w-full h-[420px] rounded-[10px] overflow-hidden">
                        <div class="item flex items-center h-[70px] bg-[#FAFAFA]">
                            <div class="title flex-1 h-full flex items-center justify-center text-[18px] text-[#666]">
                                {{ $t('device.show7') }}(℃)</div>
                            <div class="title flex-1 h-full flex items-center justify-center text-6 text-t3">
                                {{ projectInfo?.sys_info?.cell_temp_max }}</div>
                        </div>
                        <div class="item flex items-center h-[70px]">
                            <div class="title flex-1 h-full flex items-center justify-center text-[18px] text-[#666]">
                                {{ $t('device.show8') }}(℃)</div>
                            <div class="title flex-1 h-full flex items-center justify-center text-6 text-t3">
                                {{ projectInfo?.sys_info?.cell_temp_max_pos }}</div>
                        </div>
                        <div class="item flex items-center h-[70px] bg-[#FAFAFA]">
                            <div class="title flex-1 h-full flex items-center justify-center text-[18px] text-[#666]">
                                {{ $t('device.show9') }}(℃)</div>
                            <div class="title flex-1 h-full flex items-center justify-center text-6 text-t3">
                                {{ projectInfo?.sys_info?.cell_temp_min }}</div>
                        </div>
                        <div class="item flex items-center h-[70px]">
                            <div class="title flex-1 h-full flex items-center justify-center text-[18px] text-[#666]">
                                {{ $t('device.show10') }}(℃)</div>
                            <div class="title flex-1 h-full flex items-center justify-center text-6 text-t3">
                                {{ projectInfo?.sys_info?.cell_temp_min_pos }}</div>
                        </div>
                        <div class="item flex items-center h-[70px] bg-[#FAFAFA]">
                            <div class="title flex-1 h-full flex items-center justify-center text-[18px] text-[#666]">
                                {{ $t('device.show11') }}(℃)</div>
                            <div class="title flex-1 h-full flex items-center justify-center text-6 text-t3">
                                {{ projectInfo?.sys_info?.cell_temp_avg }}</div>
                        </div>
                        <div class="item flex items-center h-[70px]">
                            <div class="title flex-1 h-full flex items-center justify-center text-[18px] text-[#666]">
                                {{ $t('device.show12') }}(℃)</div>
                            <div class="title flex-1 h-full flex items-center justify-center text-6 text-t3">
                                {{ projectInfo?.sys_info?.cell_temp_diff }}</div>
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useIndexStore } from '/@/store/modules';
import { storeToRefs } from 'pinia';

const indexStore = useIndexStore()
const projectData = storeToRefs(indexStore)

const projectInfo = computed(() => {
    return projectData.projectInfo.value
})


</script>

<style scoped></style>