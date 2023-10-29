<template>
    <div>
        <CardContainer :title="$t('device.historicalChart')">
            <template #content>
                <div class="min-h-[50vh]">
                    <el-row :gutter='20'>
                        <el-col :xs='24' :sm='24' :md='12' :lg='12' :xl='12'>
                            <HistoryChart :tableData="chart1" :time="timeData" :title="title1"
                                :legend="[$t('device.ceilingVoltage'), $t('device.minimumVoltage')]" :type="2" />
                        </el-col>
                        <el-col :xs='24' :sm='24' :md='12' :lg='12' :xl='12'>
                            <HistoryChart :tableData="chart2" :time="timeData" :title="title2"
                                :legend="[$t('device.totalVoltage')]" :type="1" />
                        </el-col>
                        <el-col :xs='24' :sm='24' :md='12' :lg='12' :xl='12'>
                            <HistoryChart :tableData="chart3" :time="timeData" :title="title3"
                                :legend="[$t('device.maximumTemp'), $t('device.minimumTemp')]" :type="2" />
                        </el-col>
                        <el-col :xs='24' :sm='24' :md='12' :lg='12' :xl='12'>
                            <HistoryChart :tableData="chart4" :time="timeData" :title="title4"
                                :legend="[$t('device.totalCurrent')]" :type="1" />
                        </el-col>
                    </el-row>
                </div>
            </template>
        </CardContainer>
    </div>
</template>

<script setup lang="ts">
import CardContainer from '/@/components/common/CardContainer.vue'
import { computed, onMounted, ref, watch } from 'vue';
import { getHistoryTotal } from '/@/api';
import HistoryChart from '../../components/HistoryChart.vue';
import { useIndexStore } from '/@/store/modules';
import { storeToRefs } from 'pinia';
const indexStore = useIndexStore()
const { runHistoryChartSearch = {} } = storeToRefs(indexStore)
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const timeData = ref([])
const chart1 = ref([])
const chart2 = ref([])
const chart3 = ref([])
const chart4 = ref([])

const title1 = computed(() => {
    return `${t('device.ceilingVoltage')}/${t('device.minimumVoltage')}（V）`
})
const title2 = computed(() => {
    return `${t('device.totalVoltage')}（V）`
})
const title4 = computed(() => {
    return `${t('device.totalCurrent')}（A）`
})
const title3 = computed(() => {
    return `${t('device.maximumTemp')}/${t('device.minimumTemp')}（℃）`
})


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
}

onMounted(() => {
    fetchData()
})

watch(() => runHistoryChartSearch, (val) => {
    fetchData()
}, { deep: true })

</script>

<style scoped lang="scss"></style>