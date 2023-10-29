<template>
    <div ref="chartDom" class="w-full px-3 h-[440px]" />
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { echarts } from '/@/components/Echart';

const props = defineProps({
    type: {
        type: Number,
        default: 1,
    },
    title: {
        type: String,
        default: '',
    },
    time: {
        type: Array,
        detault: () => []
    },
    tableData: {
        type: Array,
        detault: () => []
    },
    legend: {
        type: Array,
        detault: () => []
    }
})
const chartDom = ref(null)

const initOptions = () => {
    const colorArr = ['#FF4F68', '#1182FB']
    const series = props.tableData?.map((item, index) => {
        return {
            name: props.legend[index],
            type: 'line',
            showAllSymbol: true, //显示所有图形。
            //标记的图形为实心圆
            symbolSize: 3, //标记的大小
            itemStyle: {
                //折线拐点标志的样式
                color: 'white',
                borderWidth: '2',
                borderColor: colorArr[index],
                normal: {
                    color: colorArr[index]//拐点颜色
                }
            },
            lineStyle: {
                color: colorArr[index]
            },
            data: item.map(i => Number(i))
        }
    })
    return {
        grid: {
            top: '14%',
            left: '5%',
            right: '5%',
            bottom: '8%',
            containLabel: true
        },
        tooltip: {
            trigger: 'axis',
            borderWidth: 1,
            axisPointer: {
                type: 'shadow'
            },

        },
        legend: [{
            top: 'top',
            right: '10%',
            orient: 'horizontal',
            data: props.legend,
            itemWidth: 15,
            itemHeight: 10,
            itemGap: 15,
            borderRadius: 4,
            textStyle: {
                color: '#666',
                fontSize: 14,
                fontWeight: 400
            }
        }],
        xAxis: {
            type: 'category',
            data: props.time,
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#D1D8E6'
                }
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#666666' //X轴文字颜色
                }
            }
        },
        yAxis: [
            {
                type: 'value',
                name: props.title,
                nameTextStyle: {
                    color: '#666666',
                    fontSize: 14,
                    fontWeight: 400,
                    padding: [0, 0, 0, 100], // 四个数字分别为上右下左与原位置距离
                },
                nameGap: 30,  // 表现为上下位置
                axisLine: {
                    show: false,
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    color: '#666666',
                    fontSize: 14
                },
                splitLine: {
                    show: false,
                }

            }

        ],
        series,
    }
}

// 图标初始化
const chartInit = () => {
    let myChart = echarts.init(chartDom.value as unknown as HTMLElement)
    myChart.setOption(initOptions())
    window.onresize = () => {
        myChart.resize()
    }
}

onMounted(() => {
    if (props.tableData?.length) {
        chartInit()
    }
})

watch(() => props.tableData, (val) => {
    chartInit()
}, { deep: true })


</script>

<style scoped></style>