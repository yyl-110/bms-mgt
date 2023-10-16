<template>
    <div class="pb-5">
        <el-row :gutter='20'>
            <el-col :xs='24' :sm='18' :md='18' :lg='18' :xl='18'>
                <CardContainer title="系统状态">
                    <template #content>
                        <DeviceState />
                    </template>
                </CardContainer>
            </el-col>
            <el-col :xs='24' :sm='6' :md='6' :lg='6' :xl='6'>
                <CardContainer title="故障信息">
                    <template #content>
                        <div
                            class="failcontent flex flex-col px-1 pt-[7px] text-[16px] h-[600px] lg:px-5 overflow-x-hidden overflow-y-auto">
                            <div class="w-full flex items-center justify-around h-10 text-[12px] xl:text-[14px]"
                                v-for="item in 5"><span
                                    class="rankNum w-5 h-5 rounded-[50%] flex items-center justify-around text-[14px] flex-shrink-0 bg-red text-white">1</span>
                                <div class="id max-w-[140px]">868575028559195</div>
                                <div class="text-[#666] flex-shrink-0">充电单体过压</div>
                            </div>
                        </div>
                    </template>
                </CardContainer>
            </el-col>
        </el-row>
        <div class="w-full">
            <CardContainer title="运行状态" :collapseHeader="true">
                <template #header>
                    <div class="rounded-[10px] overflow-hidden">
                        <el-collapse v-model="activeNames1">
                            <el-collapse-item name="1">
                                <template #title>
                                    <div class="px-5  text-t3 font-[500] text-xl flex items-center">
                                        运行状态
                                    </div>
                                </template>
                                <div class="min-h-[310px] rounded-[10px]">
                                    <RunState />
                                </div>
                            </el-collapse-item>
                        </el-collapse>
                    </div>
                </template>
            </CardContainer>
        </div>
        <CardContainer title="单体电压" :collapseHeader="true">
            <template #header>
                <div class="rounded-[10px] overflow-hidden">
                    <el-collapse v-model="activeNames2">
                        <el-collapse-item name="1">
                            <template #title>
                                <div class="px-5  text-t3 font-[500] text-xl flex items-center">
                                    单体电压
                                </div>
                            </template>
                            <div class="max-h-[530px] min-h-[300px] rounded-[10px]">
                                <Single />
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </div>
            </template>
        </CardContainer>
        <CardContainer title="单体温度" :collapse-header="true">
            <template #header>
                <div class="rounded-[10px] overflow-hidden">
                    <el-collapse v-model="activeNames3">
                        <el-collapse-item name="1">
                            <template #title>
                                <div class="px-5  text-t3 font-[500] text-xl flex items-center">
                                    单体温度
                                </div>
                            </template>
                            <div class="min-h-[230px] rounded-[10px]">
                                <Temp />
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </div>
            </template>
        </CardContainer>
    
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DeviceState from '../../components/DeviceState.vue';
import RunState from '../../components/RunState.vue';
import Single from '../../components/Single.vue';
import Temp from '../../components/Temp.vue';
import CardContainer from '/@/components/common/CardContainer.vue'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';

const breakpoints = useBreakpoints(breakpointsTailwind)
const largerThanSm = breakpoints.greater('sm') // only larger than sm

const code = sessionStorage.getItem('device_code')

const activeNames1 = ref(['1'])
const activeNames2 = ref(['1'])
const activeNames3 = ref(['1'])

</script>

<style lang="scss" scoped>
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