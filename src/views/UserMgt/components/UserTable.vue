<template>
    <div class="w-full" id="TableWrap">
        <el-table ref="tableRef" row-key="device_id" :data="tableData" style="width: 100%" stripe  @sort-change="handleSort">
            <el-table-column type="selection" width="55" />
            <el-table-column :align="'center'" type="index" label="序号" width="80" :index="indexMethod"
                v-if="checkList.includes('序号')" />
            <el-table-column :align="'center'" prop="username" label="子用户名" sortable v-if="checkList.includes('子用户名')">
                <template #default="scope">
                    <div class="cursor-pointer text-primary" @click="goTo(scope.row.id)">{{
                        scope.row.username }}</div>
                </template>
            </el-table-column>
            <el-table-column :align="'center'" prop="company" label="公司" width="120" sortable v-if="checkList.includes('公司')">
                <template #default="scope">
                    <div class="flex items-center justify-center">
                        {{ scope.row.company }}
                        <img src="/@/assets/img/edit.png" class="w-4 h-4 ml-5 cursor-pointer" alt="">
                    </div>
                </template>
            </el-table-column>
            <el-table-column :align="'center'" prop="num" label="设备数" sortable width="100"
                v-if="checkList.includes('设备数')" />
            <el-table-column label="操作" width="400" align="center" v-if="checkList.includes('操作')">
                <template #default="scope">
                    <el-button type="primary" icon="el-icon-lock" @click="handleOption(4, scope.row.id)">修改密码</el-button>
                    <el-button type="info" icon="el-icon-plus" @click="handleOption(3, scope.row.id)">添加设备</el-button>
                    <el-button type="danger" icon="el-icon-delete" @click="handleOption(1, scope.row.id)">删除子用户</el-button>
                    <!-- <el-button type="danger" @click="handleOption(2)">解除绑定</el-button> -->
                </template>
            </el-table-column>
        </el-table>
        <div class="pageWrap h-[70px] flex justify-end items-center">
            <el-pagination v-model:current-page="currentPage" background v-model:page-size="pageSize"
                :page-sizes="[5, 10, 20, 30, 40]" layout="total, sizes, prev, pager, next, jumper"
                :total="userList?.total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { Edit } from '@element-plus/icons-vue';
import { computed, ref, watch, defineEmits } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
    userList: { type: Object, default: () => { } },
    checkList: { type: Array, default: () => [] },
})
const emits = defineEmits(['changePagination', 'handleOption', 'handleSort'])
const currentPage = ref(1)
const pageSize = ref(10)
const router = useRouter()

const tableData = computed(() => {
    return props.userList?.data
})
// const tableData = computed(() =>
//     props.userList?.data?.filter(
//         (data: any) =>
//             !props.search ||
//             data?.username.toLowerCase().includes(props.search.toLowerCase())
//     )
// )
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
const handleOption = (val: number, id: number) => {
    emits('handleOption', { type: val, id })
}

const goTo = (id: number) => {
    sessionStorage.setItem('child_id', JSON.stringify(id))
    router.push(`/user-mgt/sub/list`)
}
const handleSort = (e) => {
    const payload = { filed: e.prop, order: e.order === "ascending" ? 'asc' : e.order === "descending" ? 'desc' : '' }
    emits('handleSort', payload)
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