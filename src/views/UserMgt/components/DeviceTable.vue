<template>
    <div class="w-full" id="TableWrap">
        <el-table ref="tableRef" row-key="device_id" :data="tableData" style="width: 100%" stripe @sort-change="handleSort">
            <el-table-column type="selection" width="55" />
            <el-table-column :align="'center'" sortable type="index" :label="$t('table.index')" width="120"
                :index="indexMethod" v-if="checkList.includes($t('table.index'))" />
            <el-table-column :align="'center'" prop="identify_code" sortable :label="$t('table.identify_code')"
                v-if="checkList.includes($t('table.identify_code'))" min-width="160" />
            <el-table-column :align="'center'" prop="project_name" :label="$t('table.project_name')" sortable
                v-if="checkList.includes($t('table.project_name'))" min-width="160" />
            <el-table-column :align="'center'" prop="des" :label="$t('table.desc')" sortable
                v-if="checkList.includes($t('table.desc'))" min-width="400">
                <template #default="scope">
                    <div class="flex items-center justify-center">
                        {{ scope.row.des }}
                        <img src="/@/assets/img/edit.png" class="w-4 h-4 ml-5 cursor-pointer" alt="">
                    </div>
                </template>
            </el-table-column>
            <el-table-column :align="'center'" prop="status" :label="$t('table.status')" sortable width="100"
                v-if="checkList.includes($t('table.status'))" />
            <el-table-column :label="$t('table.operate')" :align="'center'"  width="160" v-if="checkList.includes($t('table.operate'))">
                <template #default="scope">
                    <el-button type="danger" @click="handleOption(scope.row.device_id)">
                        <svg-icon class-name='cursor-pointer' icon-class='svg-unbind' class="text-lg" />
                        {{ $t('table.unbind') }}</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pageWrap h-[70px] flex justify-end items-center">
            <el-pagination v-model:current-page="currentPage" background v-model:page-size="pageSize"
                :page-sizes="[5, 10, 20, 30, 40]" layout="total, sizes, prev, pager, next, jumper"
                :total="deviceList?.total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { Edit } from '@element-plus/icons-vue';
import { computed, ref, watch, defineEmits } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
    deviceList: { type: Object, default: () => { } },
    checkList: { type: Array, default: () => [] },
    search: { type: String, default: '' }
})
const emits = defineEmits(['changePagination', 'handleOption', 'handleSort'])
const currentPage = ref(1)
const pageSize = ref(10)
const router = useRouter()

const tableData = computed(() => {
    return props.deviceList?.data
})
// const tableData = computed(() => {
//     return props.deviceList?.data?.filter(
//         (data: any) =>
//             !props.search ||
//             data?.project_name.toLowerCase().includes(props.search.toLowerCase())
//     )
// }
// )
const indexMethod = (index: number) => {
    return index + (currentPage.value - 1) * pageSize.value + 1;
}
const handleSizeChange = (val) => {
    emits('changePagination', { type: 'size', val })
}
const handleCurrentChange = (val) => {
    emits('changePagination', { type: 'page', val })
}
const handleOption = (id: number) => {
    emits('handleOption', id)
}

const handleSort = (e) => {
    const payload = { filed: e.prop, order: e.order === "ascending" ? 'asc' : e.order === "descending" ? 'desc' : '' }
    emits('handleSort', payload)
}

watch(() => props.deviceList, () => {
    currentPage.value = props.deviceList?.current_page
    pageSize.value = props.deviceList?.per_page
}, { deep: true })


</script>

<style scoped>
.el-table {
    border: 1px solid #E5E5E5;
}
</style>