<template>
    <div ref='chartDom' class='w-full h-[360px]' />
</template>

<script lang='ts'>
import { defineComponent, onMounted, ref, defineProps } from 'vue'
import { echarts, ECOption } from '/@/components/Echart'

const props = defineProps({
    pieData: {
        type: Array,
        default: () => []
    }
})

// 圆饼图
const chartPie: () => ECOption = () => {
    const option: ECOption = {
        title: {
            text: '日充放电量',
            left: '20',
            top: "15",
            textStyle: {
                color: "#333333",
                fontSize: 20,
                fontWeight: 600,
            },
        },
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
            top: '25%',
            left: '5%',
            right: '5%',
            bottom: '8%',
            containLabel: true,
        },
        legend: {
            data: ['充电量', '放电量'],
            right: "22%",
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
            data: ['1', '2', '3', '4'],
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
            name: 'kWh',
            nameTextStyle: {
                color: "#666666",
                fontSize: 14,
                fontWeight: 600,
                padding: [10, 0, 0, -50]
            },
            nameGap: 25,  // 表现为上下位置
            type: 'value',
            //max:'5000',
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

                },
            },
            data: [3000, 2000, 1500, 2500,]
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
            data: [4000, 3800, 4200, 3800,]
        },
        ]
    }
    return option
}

// 图标初始化
const chartInit = () => {
    const chartDom = ref(null)
    onMounted(() => {
        const optionsArray: echarts.ECharts[] = []
        let myChart = echarts.init(chartDom.value as unknown as HTMLElement)
        myChart.setOption(chartPie())
        optionsArray.push(myChart)
        window.onresize = () => {
            optionsArray.forEach(v => v.resize())
        }
    })
    return {
        chartDom
    }
}


export default defineComponent({
    setup() {

        return {
            ...chartInit()
        }
    }
})
</script>