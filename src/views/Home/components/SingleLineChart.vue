<template>
    <div ref='chartDom' class='w-full h-full' />
</template>

<script lang='ts' setup>
import { defineComponent, onMounted, ref, defineProps, watch } from 'vue'
import { echarts, ECOption } from '/@/components/Echart'
import _ from 'lodash'
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()


const chartDom = ref(null)
const props = defineProps({
    lineData: {
        type: Object,
        default: () => { }
    }
})
const chartPie: () => ECOption = () => {
    const data = { key: [0.1, 0.2, 0.4], val: [100, 200, 400] }
    const option: ECOption = {
        title: {
            text: t('home.runTime'),
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
            right: '10%',
            bottom: '8%',
            containLabel: true,
        },
        legend: {
            show: false,
        },
        xAxis: {
            name: `${t('home.time')}(h)`,
            nameTextStyle: {
                color: "#666666",
                fontSize: 14,
                fontWeight: 400,
            },
            type: 'category',
            data: props.lineData.key,
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
                show: true,
                textStyle: {
                    color: '#666666'
                }
            },
        },

        yAxis: {
            name: `(${t('home.tower')})`,
            nameTextStyle: {
                color: "#666666",
                fontSize: 14,
                fontWeight: 400,
                padding: [10, 0, 0, -40]
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
                    color: '#393939',
                    fontSize: 12
                }
            }
        },
        series: [{
            name: t('home.cd'),
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
            data: props.lineData.val
        },
        ]
    }
    return option
}

// 图标初始化
const chartInit = () => {
    let myChart = echarts.init(chartDom.value as unknown as HTMLElement)
    myChart.setOption(chartPie())
}

//echarts图表自适应方法
const resizeChart = () => {
    const myChart = echarts.init(chartDom.value);
    window.addEventListener(
        "resize",
        () => {
            myChart.resize();
        },
        false
    );
}

onMounted(() => {
    if (!_.isEmpty(props.lineData)) {
        chartInit()
        resizeChart()
    }
})

watch(() => props.lineData, () => {
    chartInit()
    resizeChart()
}, { deep: true })
// watch(() => locale.value, () => {
//     chartInit()
// }, { deep: true })
defineExpose({ resizeChart })

</script>