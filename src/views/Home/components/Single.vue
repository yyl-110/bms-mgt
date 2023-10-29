<template>
    <div class="w-full px-6">
        <el-tabs type="border-card" v-model="tabVal">
            <el-tab-pane :label="$t('device.nav8')" name="1"></el-tab-pane>
            <el-tab-pane :label="$t('device.nav9')" name="2"></el-tab-pane>
        </el-tabs>
        <div v-show="tabVal === '1'" class="w-full">
            <div class="map w-full">
                <div ref='chartDom' class='w-full h-[440px]' />
            </div>
        </div>
        <div v-if="tabVal === '2'" class="w-full mt-5">
            <table id="table_volt" class="table table-striped table-bordered">
                <thead>
                    <tr style="text-align: center;">
                        <th style="text-align: center;">{{ $t('device.nav5') }}</th>
                        <th style="text-align: center;">{{ $t('device.nav6') }}(V)</th>
                        <th style="text-align: center;">{{ $t('device.nav5') }}</th>
                        <th style="text-align: center;">{{ $t('device.nav6') }}(V)</th>
                        <th style="text-align: center;">{{ $t('device.nav5') }}</th>
                        <th style="text-align: center;">{{ $t('device.nav6') }}(V)</th>
                        <th style="text-align: center;">{{ $t('device.nav5') }}</th>
                        <th style="text-align: center;">{{ $t('device.nav6') }}(V)</th>
                    </tr>
                </thead>
                <tbody id="signal_cell_volts" class="cell-info-tbl">

                    <tr v-for="(item, index) in cellInfo" :key="index">

                        <td v-for="val in item">{{ val }}</td>
                    </tr>
                </tbody>
            </table>
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

function sliceArray(arr, size) {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
        result.push(arr.slice(i, i + size));
    }
    return result;
}

const cellInfo = computed(() => {
    const data = projectData.projectInfo.value.cell_volt_info
    const arr = sliceArray(data, 4)
    const newArr: any = []
    arr.forEach((item, index) => {
        let _item = [...item]
        item.forEach((val, inx) => {
            _item.splice(inx + inx, 0, 'V' + ((inx + 1) + (index * item.length)))

        })
        newArr.push(_item)
    })

    return newArr
})

const tabVal = ref<string>('1')
const chartDom = ref(null)

// 圆饼图
const chartPie = () => {
    const xData = []
    if (projectInfo.value?.cell_volt_info) {
        for (let i = 1; i < projectInfo.value?.cell_volt_info.length; i++) {
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
                    show: false,
                    position: 'top'
                },
                data: projectInfo.value?.cell_volt_info,
                smooth: true,
                markPoint: {
                    data: [
                        { type: 'max', name: '最高值' },
                        { type: 'min', name: '最低值' }
                    ]
                }
            },
        ]
    }
    return option
}
const initChart = () => {
    let myChart = echarts.init(chartDom.value as unknown as HTMLElement)
    myChart.setOption(chartPie())
}
onMounted(() => {
    if (projectInfo.value) {
        initChart()
        resizeChart()
    }
})

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

defineExpose({
    resizeChart
})

watch(() => projectInfo, (val) => {
    initChart()
    resizeChart()
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
}

.table-bordered {
    border: 1px solid #E5E5E5;
}

.table {
    width: 100%;
    max-width: 100%;
    margin-bottom: 20px;
    border-collapse: collapse;
    border-spacing: 0;
    background-color: transparent;

    tr {
        text-align: center;
    }

    tbody {
        color: #333333;

        tr {
            height: 40px;

            &:nth-child(2n) {
                background: #FAFAFA;
            }

            &:not(:last-child) {
                border-bottom: 1px solid #E5E5E5;
            }
        }
    }

    thead {
        background: #F6F7FC;
        height: 40px;

        th {
            font-size: 14px;
            font-weight: 400;
            color: #666666;
        }
    }

}
</style>