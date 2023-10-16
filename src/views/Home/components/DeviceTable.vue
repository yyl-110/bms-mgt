<template>
    <div class="w-full">
        <el-table ref="tableRef" row-key="device_id" :data="tableData" style="width: 100%" stripe @sort-change="handleSort">
            <el-table-column :align="'center'" type="index" :label="$t('table.index')" width="80" :index="indexMethod"
                v-if="checkList.includes($t('table.index'))" />
            <el-table-column :align="'center'" prop="project_name" :label="$t('table.project_name')" sortable width="180"
                v-if="checkList.includes($t('table.project_name'))" />
            <!-- <el-table-column :align="'center'" prop="identify_code" label="用户项目号" sortable width="180" /> -->
            <el-table-column :align="'center'" prop="identify_code" :label="$t('table.identify_code')" sortable width="200"
                v-if="checkList.includes($t('table.identify_code'))">
                <template #default="scope">
                    <div class="cursor-pointer text-primary" @click="goTo(scope.row.identify_code)">
                        {{ scope.row.identify_code }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column :align="'center'" prop="desc" :label="$t('table.desc')" sortable
                v-if="checkList.includes($t('table.desc'))" />
            <el-table-column :align="'center'" prop="version" :label="$t('table.version')" sortable width="180"
                v-if="checkList.includes($t('table.version'))" />
            <el-table-column :align="'center'" prop="iccid" label="SIM" sortable width="180"
                v-if="checkList.includes('SIM')" />
            <el-table-column :align="'center'" prop="dataupdate_datetime" :label="$t('table.dataupdate_datetime')" sortable
                width="180" v-if="checkList.includes($t('table.dataupdate_datetime'))" />
            <el-table-column :align="'center'" prop="EndTime" :label="$t('table.EndTime')" sortable width="180"
                v-if="checkList.includes($t('table.EndTime'))" />
            <el-table-column :align="'center'" prop="status" :label="$t('table.status')" sortable width="180"
                v-if="checkList.includes($t('table.status'))" />
        </el-table>
        <div class="pageWrap h-[70px] flex justify-end items-center">
            <el-pagination v-model:current-page="currentPage" background v-model:page-size="pageSize"
                :page-sizes="[5, 10, 20, 30, 40]" layout="total, sizes, prev, pager, next, jumper"
                :total="device_list?.total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const props = defineProps({
    device_list: { type: Object, default: () => { } },
    checkList: { type: Array, default: () => [] },
})
const emits = defineEmits(['changePagination', 'handleOption', 'handleSort'])
const currentPage = ref(1)
const pageSize = ref(10)

const tableData = computed(() => {
    return props.device_list?.data
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

const goTo = (code: string) => {
    sessionStorage.setItem('device_code', code)
    window.location.href = '/device'
}

</script>

<style scoped>
.el-table {
    border: 1px solid #E5E5E5;
}
</style>