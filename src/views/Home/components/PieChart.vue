<template>
    <div ref='chartDom2' class='w-full h-full chartWrap' />
</template>
<script lang='ts' setup>
import { defineComponent, onMounted, ref, defineProps, watch } from 'vue'
import { echarts, ECOption } from '/@/components/Echart'
import _ from 'lodash'

const props = defineProps({
    pieData: {
        type: Object,
        default: () => { }
    },
    chartType: {
        type: Number,
        default: 1,
    }
})
const chartDom2 = ref(null)
// 圆饼图
const chartPie: () => ECOption = () => {
    const windowWidth = window.innerWidth
    const isMinSccren = windowWidth > 750 && windowWidth < 1540
    let data1 = 0
    let data2 = 0
    let data3 = 0
    let data: any = []
    data1 = props.pieData[1]?.length
    data2 = props.pieData[2]?.length
    data3 = props.pieData[3]?.length
    if (props.chartType === 1) {
        const total = data1 + data2 + data3
        data = [
            { value: (data1 / total * 100).toFixed(2), name: '≥80', color: '#1ECCA1' },
            { value: (data2 / total * 100).toFixed(2), name: '20~80', color: '#FFCB4F' },
            { value: (data3 / total * 100).toFixed(2), name: '＜20', color: '#FF4F68' },
        ]
    } else {
        data = [
            { value: data3, name: '三级', color: '#E63434' },
            { value: data2, name: '二级', color: '#E69934' },
            { value: data1, name: '一级', color: '#F1D036' },
        ]
    }
    const option: ECOption = {
        tooltip: {
            show: true,
            backgroundColor: "#ffffff",
            borderWidth: 0,
            textStyle: {
                color: "#333",
                // fontSize: fontChart(0.24),
            },
        },
        legend: {
            icon: "circle",
            orient: 'vertical',
            top: "center",
            right: '10%',
            itemWidth: 10,
            itemHeight: 10,
            itemGap: 30,
            formatter: (name) => {
                for (var i = 0; i < data.length; i++) {
                    if (name == data[i].name) {
                        return '{name|' + name + '}{value|' + data[i].value + (props.chartType === 1 ? '%}' : '}')
                    }
                }
            },
            textStyle: {
                rich: {
                    name: {
                        fontSize: 12,
                        fontWeight: 400,
                        width: 50,
                        height: 20,
                        padding: [0, 0, 0, 5]
                    },
                    value: {
                        fontSize: 12,
                        fontWeight: 500,
                        height: 20,
                        align: 'left'
                    }
                }
            },
        },
        series: [
            {
                name: '',
                type: 'pie',
                radius: isMinSccren ? '40%' : '60%',
                center: ['28%', '50%'],
                data,
                color: data.map(i => i.color),
                label: {
                    show: false
                },
                labelLine: {
                    show: false
                }
            },
        ]
    }
    return option
}

// 图标初始化
const chartInit = () => {
    const myChart = echarts.init(chartDom2.value as unknown as HTMLElement)
    myChart.setOption(chartPie())
}


//echarts图表自适应方法
const resizeChart = () => {
    const myChart = echarts.init(chartDom2.value);
    window.addEventListener(
        "resize",
        () => {
            myChart.resize();
        },
        false
    );
}

onMounted(() => {
    if (!_.isEmpty(props.pieData)) {
        chartInit()
        resizeChart()
    }
})

watch(() => props.pieData, () => {
    if (!_.isEmpty(props.pieData)) {
        chartInit()
        resizeChart()
    }

}, { deep: true })

defineExpose({
    resizeChart
})
</script>

<style lang="scss" scoped>
.chartWrap {
    >div {
        width: 100%;
    }
}
</style>