<template>
    <div class="pb-5">
        <el-row :gutter='20'>
            <el-col :xs='24' :sm='18' :md='18' :lg='18' :xl='18' class="mb-5">
                <CardContainer :title="$t('device.systemState')">
                    <template #content>
                        <DeviceState />
                    </template>
                </CardContainer>
            </el-col>
            <el-col :xs='24' :sm='6' :md='6' :lg='6' :xl='6' class="mb-5">
                <CardContainer :title="$t('home.title5')">
                    <template #content>
                        <el-scrollbar wrap-class='overflow-x-hidden'>
                            <div class="failcontent flex flex-col pt-[7px] text-[16px] h-[600px] px-3 lg:px-5">
                                <div class="w-full flex items-center h-10 text-[12px] xl:text-[14px]"
                                    v-for="(item, index) in projectInfo?.flt_info" :key="item?.code">
                                    <div class="w-[10%] text-center text-[#666666] text-[14px]">{{ index + 1 }}</div>

                                    <div
                                        class="id w-[80%]  cursor-pointer text-center overflow-hidden text-ellipsis whitespace-nowrap">
                                        {{
                                            getFltDesc(item?.code) }}</div>

                                    <span :class="item?.lvl === '1' ? 'one' : (item?.lvl === '2' ? 'two' : 'three')"
                                        class="rankNum  w-5 h-5 rounded-[50%] flex items-center justify-around text-[14px] flex-shrink-0  text-white">{{
                                            item?.lvl }}</span>
                                </div>
                            </div>
                        </el-scrollbar>
                    </template>
                </CardContainer>
            </el-col>
        </el-row>
        <!-- 显示隐藏模块 -->
        <div class="w-full" v-if="componentVisible('RunStatus')">
            <CardContainer :title="$t('device.runState')" :collapseHeader="true" class="mb-5">
                <template #header>
                    <div class="rounded-[10px] overflow-hidden">
                        <el-collapse v-model="activeNames1">
                            <el-collapse-item name="1">
                                <template #title>
                                    <div class="px-5  text-t3 font-[500] text-xl flex items-center">
                                        {{ $t('device.runState') }}
                                    </div>
                                </template>
                                <div class="min-h-[310px] rounded-[10px]">
                                    <RunState :data="projectInfo.sys_info" />
                                </div>
                            </el-collapse-item>
                        </el-collapse>
                    </div>
                </template>
            </CardContainer>
        </div>
        <CardContainer :title="$t('device.nav6')" :collapseHeader="true" class="mb-5" v-if="componentVisible('CellVlolt')">
            <template #header>
                <div class="rounded-[10px] overflow-hidden">
                    <el-collapse v-model="activeNames2">
                        <el-collapse-item name="1">
                            <template #title>
                                <div class="px-5  text-t3 font-[500] text-xl flex items-center">
                                    {{ $t('device.nav6') }}
                                </div>
                            </template>
                            <div class="max-h-[530px] min-h-[300px] rounded-[10px]">
                                <Single ref="pieChartRef1" />
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </div>
            </template>
        </CardContainer>
        <CardContainer :title="$t('device.nav7')" :collapse-header="true" class="mb-5" v-if="componentVisible('CellTemp')">
            <template #header>
                <div class="rounded-[10px] overflow-hidden">
                    <el-collapse v-model="activeNames3">
                        <el-collapse-item name="1">
                            <template #title>
                                <div class="px-5  text-t3 font-[500] text-xl flex items-center">
                                    {{ $t('device.nav7') }}
                                </div>
                            </template>
                            <div class="min-h-[230px] rounded-[10px]">
                                <Temp ref="pieChartRef2" />
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </div>
            </template>
        </CardContainer>
        <!-- v-if="componentVisible('UserData')" -->
        <div class="w-full" v-if="componentVisible('UserData')">
            <CardContainer :title="$t('device.wdzs')" :collapseHeader="true" class="mb-5">
                <template #header>
                    <div class="rounded-[10px] overflow-hidden">
                        <el-collapse v-model="activeNames4">
                            <el-collapse-item name="1">
                                <template #title>
                                    <div class="px-5  text-t3 font-[500] text-xl flex items-center">
                                        {{ $t('device.wdzs') }}
                                    </div>
                                </template>
                                <div class="min-h-[310px] rounded-[10px]">
                                    <RunStateTransgenus :data="RunStateTransgenusData" />
                                </div>
                            </el-collapse-item>
                        </el-collapse>
                    </div>
                </template>
            </CardContainer>
        </div>

    </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from 'vue';
import DeviceState from '../../components/DeviceState.vue';
import RunState from '../../components/RunState.vue';
import Single from '../../components/Single.vue';
import Temp from '../../components/Temp.vue';
import CardContainer from '/@/components/common/CardContainer.vue'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { useIndexStore } from '/@/store/modules';
import { flt_content } from '../data';
import _ from 'lodash'
import { useI18n } from 'vue-i18n'
import RunStateTransgenus from '../../components/RunStateTransgenus.vue';
import { useRoute } from 'vue-router';
const { locale } = useI18n()
const indexStore = useIndexStore()
const projectData = storeToRefs(indexStore)

const projectInfo = computed(() => {
    return projectData.projectInfo.value
})

const breakpoints = useBreakpoints(breakpointsTailwind)
const largerThanSm = breakpoints.greater('sm') // only larger than sm

const code = sessionStorage.getItem('device_code')

const activeNames1 = ref(['1'])
const activeNames2 = ref(['1'])
const activeNames3 = ref(['1'])
const activeNames4 = ref(['1'])
const pieChartRef1 = ref(null)
const pieChartRef2 = ref(null)

const route = useRoute()
console.log('route:', route)
const componentVisible = computed(() => (val: any) => {
    try {
        return (route?.meta?.inner).includes(val);
    } catch (error) {
        return false
    }
});


const getFltDesc = (code) => {
    const data = flt_content.find(item => (item.code === code))

    if (!_.isEmpty(data)) {
        return locale.value === 'en' ? data?.enInfo : data?.zhInfo
    }
    return code
}

const RunStateTransgenusData = computed(() => {
    const data = projectData.projectInfo.value?.userDate
    if (Array.isArray(data)) {
        return {}
    }
    return data
})

onMounted(() => {
    nextTick(() => {
        //在父组件中调用子组件的自适应方法
        pieChartRef1.value?.resizeChart();
        pieChartRef2.value?.resizeChart()

    })
})
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
</style>