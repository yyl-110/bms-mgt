<template>
    <div>
        <CardContainer :title="$t('table.FirmwareUpgrade')" class="mb-5" v-if="componentVisible('Upgrade')">
            <template #content>
                <div class="h-[100px] w-full  px-5">
                    <div class="flex gap-[23px] items-center">
                        <div class="label text-[16px] text-[#666]">{{ $t('table.UpgradableFirmware') }}</div>
                        <el-select v-model="dtuId" placeholder="Select" size="large" filterable class="w-[50%]">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                        </el-select>
                        <el-button size="large" type="primary" class="rounded-md" @click="updateDtu"> <img
                                src="/@/assets/img/sj.png" alt="" class="w-[16px] h-[16px] mr-2">
                            {{ $t('firmware.update') }}</el-button>
                    </div>
                </div>
            </template>
        </CardContainer>
        <CardContainer :title="$t('table.operationsHistory')" class="mb-5">
            <template #content>
                <div class=" w-full px-5">
                    <el-table ref="tableRef" row-key="device_id" :data="tableData" style="width: 100%" stripe>
                        <el-table-column :align="'center'" type="index" :label="$t('table.index')" width="120"
                            :index="indexMethod" />
                        <el-table-column :align="'center'" prop="file_name" :label="$t('table.fileName')" width="700" />
                        <el-table-column :align="'center'" prop="update_status" :label="$t('table.updateState')"
                            width="140">
                            <template #default="scope">
                                <div>
                                    <el-progress :percentage="scope.row.update_status - 10"
                                        v-if="scope.row.update_status > 10 && scope.row.update_status < 110" />
                                    <span v-else>{{ getStatusDsc(scope.row.update_status) }}</span>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column :align="'center'" prop="username" :label="$t('table.creator')" width="100" />
                        <el-table-column :align="'center'" prop="create_time" :label="$t('table.creationDate')"
                            width="200" />
                        <el-table-column :align="'center'" prop="upgrade_begin_date"
                            :label="$t('table.dataupdate_datetime')" width="200" />
                        <el-table-column :align="'center'" prop="upgrade_end_date" :label="$t('table.EndTime')"
                            width="200" />
                        <el-table-column :align="'center'" prop="description" :label="$t('table.desc')" width="100" />
                    </el-table>
                </div>
            </template>
        </CardContainer>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { dtuOperationList, optionalDtuList, handleDtuUpdate } from '/@/api';
import CardContainer from '/@/components/common/CardContainer.vue';
import { ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router';
const { t } = useI18n()

const dtuId = ref('')
const tableData = ref([])
let options = ref([])

const route = useRoute()
const componentVisible = computed(() => (val: any) => {
    try {
        return (route?.meta?.inner).includes(val);
    } catch (error) {
        return false
    }
});

const canUseDtuList = async () => {
    const device_code = sessionStorage.getItem('device_code')
    const res = await optionalDtuList({ project_id: device_code })
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
    if (status === 1) return '完成'
    if (status === 2) return '升级失败'
    if (status === 3) return '升级超时'
    return '未升级'
}

const updateDtu = async () => {
    const device_code = sessionStorage.getItem('device_code')
    const res = await handleDtuUpdate({ firmware_id: dtuId.value, code: device_code })
    if (res.code === 1) {
        ElMessage({
            type: 'success',
            message: t('table.success')
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