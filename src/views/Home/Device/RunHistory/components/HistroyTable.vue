<template>
    <div class="w-full">
        <el-table ref="tableRef" row-key="device_id" :data="tableData" style="width: 100%;" stripe
            @sort-change="handleSort">
            <el-table-column :align="'center'" type="index" label="序号" width="80" :index="indexMethod"
                v-if="checkList.includes('序号')" />
            <el-table-column :align="'center'" prop="type" label="充放电状态" sortable v-if="checkList.includes('充放电状态')">
                <template #default="scope">
                    <div>{{ typeList.find(i => i.value === scope.row.type)?.label }}</div>
                </template>
            </el-table-column>
            <el-table-column :align="'center'" prop="bgn_ts" label="开始时间" sortable v-if="checkList.includes('开始时间')">
                <template #default="scope">
                    <div class="cursor-pointer text-primary">
                        {{ scope.row.bgn_ts }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column :align="'center'" prop="end_ts" label="结束时间" sortable v-if="checkList.includes('结束时间')">
            </el-table-column>
            <el-table-column :align="'center'" prop="bgn_soc" label="开始SOC" sortable v-if="checkList.includes('开始SOC')">
            </el-table-column>
            <el-table-column :align="'center'" prop="end_soc" label="结束SOC" sortable v-if="checkList.includes('结束SOC')">
            </el-table-column>
            <el-table-column :align="'center'" prop="length" label="本次时长" sortable v-if="checkList.includes('本次时长')">
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

const typeList = [
    {
        value: 0,
        label: '按充电状态',
    },
    {
        value: 3,
        label: '非充非放',
    },
    {
        value: 1,
        label: '充电',
    },
    {
        value: 2,
        label: '放电',
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
    return index + 1
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