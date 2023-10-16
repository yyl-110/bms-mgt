<template>
    <div>
        <CardContainer title="固件升级">
            <template #content>
                <div class="h-[100px] w-full  px-5">
                    <div class="flex gap-[23px] items-center">
                        <div class="label text-[16px] text-[#666]">可升级固件</div>
                        <el-select v-model="dtuId" placeholder="Select" size="large" class="w-[50%]">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                        </el-select>
                        <el-button size="large" type="primary" class="rounded-md" @click="updateDtu"> <img
                                src="/@/assets/img/sj.png" alt="" class="w-[16px] h-[16px] mr-2">
                            升级固件</el-button>
                    </div>
                </div>
            </template>
        </CardContainer>
        <CardContainer title="操作历史">
            <template #content>
                <div class=" w-full">
                    <el-table ref="tableRef" row-key="device_id" :data="tableData" style="width: 100%" stripe>
                        <el-table-column :align="'center'" type="index" label="序号" width="80" :index="indexMethod" />
                        <el-table-column :align="'center'" prop="file_name" label="文件名" />
                        <el-table-column :align="'center'" prop="update_status" label="升级状态">
                            <template #default="scope">
                                <div>
                                    <el-progress :percentage="scope.row.update_status - 10"
                                        v-if="scope.row.update_status > 10 && scope.row.update_status < 110" />
                                    <span v-else>{{ getStatusDsc(scope.row.update_status) }}</span>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column :align="'center'" prop="username" label="创建者" />
                        <el-table-column :align="'center'" prop="create_time" label="创建日期" />
                        <el-table-column :align="'center'" prop="upgrade_begin_date" label="设定升级起始日期" />
                        <el-table-column :align="'center'" prop="upgrade_end_date" label="设定升级结束日期" />
                        <el-table-column :align="'center'" prop="description" label="描述" />
                    </el-table>
                </div>
            </template>
        </CardContainer>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { dtuOperationList, optionalDtuList, handleDtuUpdate } from '/@/api';
import CardContainer from '/@/components/common/CardContainer.vue';
import { ElMessage } from 'element-plus';

const dtuId = ref('')
const tableData = ref([])
let options = ref([])

const canUseDtuList = async () => {
    const device_code = sessionStorage.getItem('device_code')
    const res = await optionalDtuList({ project_id: device_code })
    console.log('res:', res)
    if (res.code === 1) {
        options.value = (res.data || []).map(i => ({
            value: i.id,
            label: i.file_name,
        }))
    }
}
const fetchData = async () => {
    const device_code = sessionStorage.getItem('device_code')
    const res = await dtuOperationList({ code: device_code })
    if (res.code === 1) {
        tableData.value = res.data
    }
}
const indexMethod = (index: number) => {
    return index + 1
}

const getStatusDsc = (status) => {
    console.log('status:', status)
    if (status === 1) return '完成'
    if (status === 2) return '升级失败'
    if (status === 3) return '升级超时'
    return '升级校验'
}

const updateDtu = async () => {
    const device_code = sessionStorage.getItem('device_code')
    console.log({ firmware_id: dtuId.value, code: device_code })
    const res = await handleDtuUpdate({ firmware_id: dtuId.value, code: device_code })
    if (res.code === 1) {
        ElMessage({
            type: 'success',
            message: '升级成功'
        })
        fetchData()
    }

}

onMounted(() => {
    fetchData()
    canUseDtuList()
})

</script>

<style scoped></style>