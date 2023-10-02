<template>
    <div class="w-full">
        <el-table ref="tableRef" row-key="device_id" :data="tableData" style="width: 100%" stripe>
            <el-table-column type="selection" width="55" />
            <el-table-column :align="'center'" type="index" label="序号" width="80" :index="indexMethod" />
            <el-table-column :align="'center'" prop="username" label="子用户名" />
            <el-table-column :align="'center'" prop="company" label="公司" />
            <el-table-column :align="'center'" prop="num" label="设备数" sortable width="100" />
            <el-table-column label="Operations" width="400" align="center">
                <template #default>
                    <el-button type="primary" icon="el-icon-lock" @click="handleOption(4)">修改密码</el-button>
                    <el-button type="info" icon="el-icon-plus" @click="handleOption(3)">添加设备</el-button>
                    <el-button type="danger" icon="el-icon-delete" @click="handleOption(1)">删除子用户</el-button>
                    <el-button type="danger" @click="handleOption(2)">解除绑定</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pageWrap h-[70px] flex justify-end items-center">
            <el-pagination v-model:current-page="currentPage" background v-model:page-size="pageSize"
                :page-sizes="[5, 10, 20, 30, 40]" layout="total, sizes, prev, pager, next, jumper"
                :total="props.userList?.total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, defineEmits } from 'vue';

const props = defineProps({
    userList: { type: Object, default: () => { } },
})
const emits = defineEmits(['changePagination', 'handleOption'])
const currentPage = ref(1)
const pageSize = ref(10)

const tableData = computed(() => {
    return props.userList?.data
})
const indexMethod = (index: number) => {
    return index + 1
}
const handleSizeChange = (val) => {
    emits('changePagination', { type: 'size', val })
    console.log('val:', val)
}
const handleCurrentChange = (val) => {
    emits('changePagination', { type: 'page', val })
    console.log('val:', val)
}
const handleOption = (val: number) => {
    emits('handleOption', val)
}

watch(() => props.userList, () => {
    currentPage.value = props.userList?.current_page
    pageSize.value = props.userList?.per_page
}, { deep: true })


</script>

<style scoped>
.el-table {
    border: 1px solid #E5E5E5;
}
</style>