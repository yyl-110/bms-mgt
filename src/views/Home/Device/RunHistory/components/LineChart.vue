<template>
    <div ref='chartDom' class='w-full h-full' />
</template>

<script setup lang='ts'>
import { defineComponent, onMounted, watch, ref, defineProps } from 'vue'
import { echarts, ECOption } from '/@/components/Echart'
import { LineChart } from 'echarts/charts'
import { isEmpty } from 'element-plus/es/utils'
import _ from 'lodash'

const props = defineProps({
    lineData: {
        type: Object,
        default: () => { }
    }
})

const chartDom = ref(null)

// 圆饼图
const chartPie = () => {
    const xData = Object.keys(props.lineData)
    const yValue = Object.values(props.lineData)
    const cdData = yValue.map(i => i.charge)
    const fdData = yValue.map(i => i.discharge)
    const option: any = {
        tooltip: {
            trigger: 'axis',
            backgroundColor: "rgba(1, 13, 19, 0.5)",
            borderWidth: 0,
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            },
            textStyle: {
                color: "rgba(212, 232, 254, 1)",
                // fontSize: fontChart(0.24),
            },
            confine: true
        },
        grid: {
            top: '20%',
            left: '5%',
            right: '5%',
            bottom: '8%',
            containLabel: true,
        },
        legend: {
            data: ['充电量', '放电量'],
            right: "5%",
            top: 20,
            itemWidth: 15,
            itemHeight: 10,
            itemGap: 15,
            borderRadius: 4,
            textStyle: {
                color: "#000",
                fontSize: 14,
                fontWeight: 400,
            },
        },
        xAxis: {
            type: 'category',
            data: xData,
            axisLine: {
                show: false,
                lineStyle: {
                    color: '#ECECEC'
                }
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                // interval: 0,
                // rotate: 40,
                show: true,
                textStyle: {
                    color: '#666666'
                }
            },
        },
        yAxis: {
            nameGap: 25,  // 表现为上下位置
            type: 'value',
            axisLine: {
                show: false,
                lineStyle: {
                    color: '#666666',
                }
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#ECECEC'
                }
            },
            axisLabel: {
                textStyle: {
                    fontFamily: 'Microsoft YaHei',
                    color: '#393939',
                    fontSize: 12
                }
            }
        },
        series: [{
            name: '充电量',
            type: 'bar',
            barWidth: '10',
            barCategoryGap: '100',
            itemStyle: {
                normal: {
                    borderRadius: [10, 10, 0, 0],
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: '#0078D7'
                    }, {
                        offset: 1,
                        color: '#62B5F6'
                    }]),

                }
            },
            data: cdData
        },
        {
            name: '放电量',
            type: 'bar',
            barWidth: '10',
            barCategoryGap: '20%',
            itemStyle: {
                normal: {
                    borderRadius: [10, 10, 0, 0],
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: '#F98563'
                    }, {
                        offset: 1,
                        color: '#FBAC69'
                    }]),

                }
            },
            data: fdData
        },
        ]
    }
    return option
}

const chartInit = () => {
    let myChart = echarts.init(chartDom.value as unknown as HTMLElement)
    myChart.setOption(chartPie())
    window.onresize = () => {
        myChart.resize()
    }
}

onMounted(() => {
    if (!_.isEmpty(props.lineData)) {
        chartInit()
    }
})

watch(() => props.lineData, () => {
    chartInit()
}, { deep: true })
</script>