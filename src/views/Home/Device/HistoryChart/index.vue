<template>
    <div>
        <CardContainer title="历史图标">
            <template #content>
                <div class="min-h-[50vh]">
                    <el-row :gutter='20'>
                        <el-col :xs='24' :sm='24' :md='12' :lg='12' :xl='12'>
                            <HistoryChart />
                        </el-col>
                        <el-col :xs='24' :sm='24' :md='12' :lg='12' :xl='12'>
                            <HistoryChart />
                        </el-col>
                    </el-row>
                </div>
            </template>
        </CardContainer>
    </div>
</template>

<script setup lang="ts">
import CardContainer from '/@/components/common/CardContainer.vue'
import { onMounted } from 'vue';
import { getHistoryChart } from '/@/api';
import HistoryChart from '../../components/HistoryChart.vue';


const fetchData = async () => {
    const device_code = sessionStorage.getItem('device_code')
    const res = await getHistoryChart({ code: device_code })
    console.log('res:', res)
}

onMounted(() => {
    fetchData()
})

</script>

<style scoped></style>