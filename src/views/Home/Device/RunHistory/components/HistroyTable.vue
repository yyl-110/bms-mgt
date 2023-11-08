<template>
    <div class="w-full">
        <el-table ref="tableRef" row-key="device_id" :data="tableData" style="width: 100%;" stripe
            @sort-change="handleSort">
            <el-table-column :align="'center'" type="index" :label="$t('table.index')" width="120" :index="indexMethod"
                v-if="checkList.includes($t('table.index'))" />
            <el-table-column :align="'center'" prop="type" :label="$t('runStatus.base5')" sortable
                v-if="checkList.includes($t('runStatus.base5'))">
                <template #default="scope">
                    <div>{{ typeList.find(i => i.value === scope.row.type)?.label }}</div>
                </template>
            </el-table-column>
            <el-table-column :align="'center'" prop="bgn_ts" :label="$t('table.dataupdate_datetime')" sortable
                v-if="checkList.includes($t('table.dataupdate_datetime'))" width="200">
                <template #default="scope">
                    <div class="cursor-pointer text-primary" @click="goTo(scope.row.bgn_id)">
                        {{ scope.row.bgn_ts }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column :align="'center'" prop="end_ts" :label="$t('table.EndTime')" sortable
                v-if="checkList.includes($t('table.EndTime'))">
            </el-table-column>
            <el-table-column :align="'center'" prop="bgn_soc" :label="$t('table.startSoc')" sortable
                v-if="checkList.includes($t('table.startSoc'))">
            </el-table-column>
            <el-table-column :align="'center'" prop="end_soc" :label="$t('table.endSoc')" sortable
                v-if="checkList.includes($t('table.endSoc'))">
            </el-table-column>
            <el-table-column :align="'center'" prop="length" :label="$t('table.time')" sortable
                v-if="checkList.includes($t('table.time'))">
            </el-table-column>
        </el-table>
        <div class="pageWrap h-[70px] flex justify-end items-center">
            <el-pagination v-model:current-page="currentPage" background v-model:page-size="pageSize"
                :page-sizes="[5, 10, 20, 30, 40]" layout="total, sizes, prev, pager, next, jumper"
                :total="history_list?.total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router';
const { t } = useI18n()
const router = useRouter()
const typeList = [
    {
        value: 1,
        label: t('device.cd'),
    },
    {
        value: 2,
        label: t('device.fd'),
    },
    {
        value: 0,
        label: t('device.nocnof'),
    },
]
const props = defineProps({
    history_list: { type: Object, default: () => { } },
    checkList: { type: Array, default: () => [] },
})
const emits = defineEmits(['changePagination', 'handleOption', 'handleSort'])
const currentPage = ref(1)
const pageSize = ref(10)

const tableData = computed(() => {
    return props.history_list?.data
})
const indexMethod = (index: number) => {
    return index + (currentPage.value - 1) * pageSize.value + 1;
}

const goTo = (id) => {
    router.push({
        path: '/history',
        query: { key_id: id }
    })
}


const handleSizeChange = (val) => {
    emits('changePagination', { type: 'size', val })
}
const handleCurrentChange = (val) => {
    emits('changePagination', { type: 'page', val })
}
const handleSort = (e) => {
    const payload = { filed: e.prop, order: e.order === "ascending" ? 'asc' : e.order === "descending" ? 'desc' : '' }
    emits('handleSort', payload)
}

</script>

<style scoped>
.el-table {
    border: 1px solid #E5E5E5;
}
</style>