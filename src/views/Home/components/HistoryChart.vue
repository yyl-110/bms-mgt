<template>
    <div ref="chartDom" class="w-full h-[440px]" />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { echarts } from '/@/components/Echart';

const chartDom = ref(null)

const initOptions = () => {
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
            data: ['最高电压', '最低电压'],
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
            data: ['13:00', '14:00', '15:00', '16:00', '17:00'],
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
                name: '最高电压/最低电压（V）',
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
        series: [
            {
                name: '最高电压',
                type: 'line',
                showAllSymbol: true, //显示所有图形。
                //标记的图形为实心圆
                symbolSize: 3, //标记的大小
                itemStyle: {
                    //折线拐点标志的样式
                    color: 'white',
                    borderWidth: '2',
                    borderColor: '#FF4F68',
                    normal: {
                        color: '#FF4F68'//拐点颜色
                    }
                },
                lineStyle: {
                    color: '#FF4F68'
                },
                data: [175, 160, 153, 121, 156]
            },
            {
                name: '最低电压',
                type: 'line',
                showAllSymbol: true, //显示所有图形。
                symbolSize: 3, //标记的大小
                itemStyle: {
                    //折线拐点标志的样式
                    color: 'white',
                    borderWidth: '2',
                    borderColor: '#1182FB',
                    normal: {
                        color: '#1182FB'//拐点颜色
                    }
                },
                lineStyle: {
                    color: '#1182FB'
                },
                data: [200, 140, 205, 162, 175]
            }
        ]
    }
}

// 图标初始化
const chartInit = () => {
    let myChart = echarts.init(chartDom.value as unknown as HTMLElement)
    myChart.setOption(initOptions())
}

onMounted(() => {
    chartInit()
})

</script>

<style scoped></style>