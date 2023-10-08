<template>
    <div class="w-full" id="TableWrap">
        <el-table ref="tableRef" row-key="device_id" :data="tableData" style="width: 100%" stripe @sort-change="handleSort">
            <el-table-column type="selection" width="55" />
            <el-table-column :align="'center'" sortable type="index" label="序号" width="80" :index="indexMethod"
                v-if="checkList.includes('序号')" />
            <el-table-column :align="'center'" prop="identify_code" sortable label="设备ID"
                v-if="checkList.includes('设备ID')" />
            <el-table-column :align="'center'" prop="project_name" label="项目号" sortable v-if="checkList.includes('项目号')" />
            <el-table-column :align="'center'" prop="des" label="描述" sortable v-if="checkList.includes('描述')">
                <template #default="scope">
                    <div class="flex items-center justify-center">
                        {{ scope.row.des }}
                        <img src="/@/assets/img/edit.png" class="w-4 h-4 ml-5 cursor-pointer" alt="">
                    </div>
                </template>
            </el-table-column>
            <el-table-column :align="'center'" prop="status" label="状态" sortable width="100"
                v-if="checkList.includes('状态')" />
            <el-table-column label="操作" align="center" v-if="checkList.includes('操作')">
                <template #default="scope">
                    <el-button type="danger" @click="handleOption(scope.row.device_id)">
                        <svg-icon class-name='cursor-pointer' icon-class='svg-unbind' class="text-lg" />
                        解除绑定</el-button>
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
    return index + 1
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