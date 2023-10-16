<template>
    <div class="w-full px-6">
        <el-tabs type="border-card" v-model="tabVal">
            <el-tab-pane label="曲线" name="1"></el-tab-pane>
            <el-tab-pane label="表格" name="2"></el-tab-pane>
        </el-tabs>
        <div v-show="tabVal === '1'" class="w-full">
            <div class="map w-full">
                <div ref='chartDom' class='w-full h-[440px]' />
            </div>
        </div>
        <div v-if="tabVal === '2'" class="w-full flex flex-wrap mt-5">
            <div class="flex" v-for="(item, index) in projectInfo.cell_temp_info" :key="index">
                <div class="flex flex-col">
                    <div
                        class="bg-[#F6F7FC] text-[#666666] min-w-[120px] h-10 flex items-center justify-center text-[14px]">
                        序号</div>
                    <div class="h-10 bg-[#fff] flex items-center justify-center text-t3 text-[14px]">{{ index + 1 }}</div>
                </div>
                <div class="flex flex-col">
                    <div
                        class="bg-[#F6F7FC] text-[#666666] min-w-[120px] h-10 flex items-center justify-center text-[14px]">
                        单体电压(V)</div>
                    <div class="h-10 bg-[#fff] flex items-center justify-center text-t3 text-[14px]">{{ item }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { echarts, ECOption } from '/@/components/Echart'
import { computed } from 'vue';
import { useIndexStore } from '/@/store/modules';
import { storeToRefs } from 'pinia';

const indexStore = useIndexStore()
const projectData = storeToRefs(indexStore)

const projectInfo = computed(() => {
    return projectData.projectInfo.value
})

const tabVal = ref<string>('1')
const chartDom = ref(null)

// 圆饼图
const chartPie = () => {
    const xData = []
    if (projectInfo.value?.cell_temp_info) {
        for (let i = 1; i < projectInfo.value?.cell_temp_info.length; i++) {
            xData.push(`${i}#`)
        }
    }
    const option: ECOption = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999'
                }
            }
        },
        color: ['#1182FB'],
        grid: {
            left: '5%',
            bottom: '5%',
            right: '5%',
        },
        legend: [
            {
                show: false,
            }
        ],
        xAxis: [
            {
                type: 'category',
                data: xData,
                axisPointer: {
                    type: 'shadow'
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
            }
        ],
        series: [
            {
                name: '融资比数',
                type: 'line',
                symbol: 'circle',
                symbolSize: 10,
                lineStyle: {
                    color: '#1182FB'
                },
                label: {
                    show: true,
                    position: 'top'
                },
                data: projectInfo.value?.cell_temp_info
            }
        ]
    }
    return option
}
const initChart = () => {
    let myChart = echarts.init(chartDom.value as unknown as HTMLElement)
    myChart.setOption(chartPie())
    window.onresize = () => {
        myChart.resize()
    }
}
onMounted(() => {
    if (projectInfo.value) {
        initChart()
    }
})

watch(() => projectInfo, (val) => {
    initChart()
}, { deep: true })

</script>

<style scoped lang="scss">
:deep(.el-tabs__content) {
    display: none;
}

:deep(.el-tabs--border-card) {
    border: none;

}

:deep(.el-tabs__header) {
    background: #F5F5FD;
    border-radius: 10px 10px 0px 0px;
    border: none;
}

:deep(.el-tabs__item) {
    padding: 0 45px !important;
    border: none !important;
    --el-bg-color-overlay: transparent;

    &.is-active {
        background: url('../../../assets/img/navbg.png') no-repeat;
        // background-color: transparent;
        background-size: 100% 100%;
        background-position: center center;
    }
}</style>