<template>
    <div>
        <CardContainer title="历史图标">
            <template #content>
                <div class="min-h-[50vh]">
                    <el-row :gutter='20'>
                        <el-col :xs='24' :sm='24' :md='12' :lg='12' :xl='12'>
                            <HistoryChart :tableData="chart1" :time="timeData" title="最高电压/最低电压（V）"
                                :legend="['最高电压', '最低电压']" :type="2" />
                        </el-col>
                        <el-col :xs='24' :sm='24' :md='12' :lg='12' :xl='12'>
                            <HistoryChart :tableData="chart2" :time="timeData" title="总电压（V）" :legend="['总电压']" :type="1" />
                        </el-col>
                        <el-col :xs='24' :sm='24' :md='12' :lg='12' :xl='12'>
                            <HistoryChart :tableData="chart3" :time="timeData" title="最高温度/最低温度（℃）"
                                :legend="['最高温度', '最低温度']" :type="2" />
                        </el-col>
                        <el-col :xs='24' :sm='24' :md='12' :lg='12' :xl='12'>
                            <HistoryChart :tableData="chart4" :time="timeData" title="总电流（A）" :legend="['总电流']" :type="1" />
                        </el-col>
                    </el-row>
                </div>
            </template>
        </CardContainer>
    </div>
</template>

<script setup lang="ts">
import CardContainer from '/@/components/common/CardContainer.vue'
import { onMounted, ref, watch } from 'vue';
import { getHistoryTotal } from '/@/api';
import HistoryChart from '../../components/HistoryChart.vue';
import { useIndexStore } from '/@/store/modules';
import { storeToRefs } from 'pinia';
const indexStore = useIndexStore()
const { runHistoryChartSearch = {} } = storeToRefs(indexStore)

const timeData = ref([])
const chart1 = ref([])
const chart2 = ref([])
const chart3 = ref([])
const chart4 = ref([])


const fetchData = async () => {
    const device_code = sessionStorage.getItem('device_code')
    const res = await getHistoryTotal({ ...runHistoryChartSearch.value, code: device_code, })
    if (res.code === 1) {
        timeData.value = res.data?.time
        chart1.value = [res.data?.H_volt, res.data?.L_volt]
        chart2.value = [res.data?.T_volt]
        chart3.value = [res.data?.H_temp, res.data?.L_temp]
        chart4.value = [res.data?.T_curr]
    }
    console.log('res:', res)
}

onMounted(() => {
    fetchData()
})

watch(() => runHistoryChartSearch, (val) => {
    fetchData()
}, { deep: true })

</script>

<style scoped lang="scss"></style>