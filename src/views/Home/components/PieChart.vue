<template>
    <div ref='chartDom2' class='w-full h-full' />
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
    const data = [
        { value: 1048, name: '≥80' },
        { value: 735, name: '20~80' },
        { value: 580, name: '＜20' },
    ]
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
                        return '{name|' + name + '}{value|' + data[i].value + '%}'
                    }
                }
            },
            textStyle: {
                rich: {
                    name: {
                        fontSize: 14,
                        fontWeight: 400,
                        width: 50,
                        height: 20,
                        padding: [0, 0, 0, 5]
                    },
                    value: {
                        fontSize: 14,
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
                radius: '50%',
                center: ['28%', '50%'],
                data,
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
    const chartDom2 = ref(null)
    onMounted(() => {
        let optionsArray: echarts.ECharts = {}
        let myChart = echarts.init(chartDom2.value as unknown as HTMLElement)
        myChart.setOption(chartPie())
        optionsArray = myChart
        window.onresize = (e) => {
            console.log('e:', e.target.innerWidth)
            if (e.target.innerWidth < 1440) {
                optionsArray.setOption({
                    series: [{
                        radius: '50%',
                    }],
                })
            } else {
                optionsArray.setOption({
                    series: [{
                        radius: '60%',
                    }],
                })
            }
            optionsArray.resize()
        }
    })
    return {
        chartDom2
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