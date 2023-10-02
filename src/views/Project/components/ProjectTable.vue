<template>
    <div class="w-full">
        <el-table ref="tableRef" row-key="device_id" :data="tableData" style="width: 100%" stripe>
            <el-table-column :align="'center'" type="index" label="序号" width="80" :index="indexMethod" />
            <el-table-column :align="'center'" prop="project_name" label="项目号" sortable />
            <el-table-column :align="'center'" prop="identify_code" label="用户项目号" sortable />
            <el-table-column :align="'center'" prop="description" label="描述" />
            <el-table-column :align="'center'" prop="num" label="设备数" sortable />
            <el-table-column :align="'center'" prop="online" label="在线数" sortable />
        </el-table>
        <div class="pageWrap h-[70px] flex justify-end items-center">
            <el-pagination v-model:current-page="currentPage" background v-model:page-size="pageSize"
                :page-sizes="[100, 200, 300, 400]" layout="total, sizes, prev, pager, next, jumper" :total="400" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const props = defineProps({
    device_list: { type: Object, default: () => { } }
})
const currentPage = ref(1)
const pageSize = ref(10)

const tableData = computed(() => {
    return props.device_list?.data
})
const indexMethod = (index: number) => {
    return index + 1
}

// const tableData: any[] = [
//     {
//         date: '2016-05-03',
//         name: 'Tom',
//         address: 'No. 189, Grove St, Los Angeles',
//         tag: 'Home',
//     },
// ]

</script>

<style scoped>
.el-table {
    border: 1px solid #E5E5E5;
}
</style>