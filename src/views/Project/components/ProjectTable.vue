<template>
    <div class="w-full">
        <el-table ref="tableRef" row-key="device_id" :data="tableData" style="width: 100%" stripe @sort-change="handleSort">
            <el-table-column :align="'center'" type="index" :label="$t('table.index')" width="80" :index="indexMethod" />
            <el-table-column :align="'center'" prop="project_name" :label="$t('table.project_name')" width="300" sortable>
                <template #default="scope">
                    <div class="text-primary cursor-pointer flex items-center justify-center">
                        <span @click="checkedProject(scope.row.project_name)">{{ scope.row.project_name }}</span>
                        <img src="/@/assets/img/edit.png" class="w-4 h-4 ml-5 cursor-pointer" alt=""
                            @click="showModal(scope.row.project_name, scope.row.project_id, 1)">
                    </div>
                </template>
            </el-table-column>
            <el-table-column :align="'center'" prop="user_project_name" :label="$t('table.userProjectNumber')" sortable
                width="300">
                <template #default="scope">
                    <div class="flex items-center justify-center">
                        {{ scope.row.user_project_name }}
                        <img src="/@/assets/img/edit.png" class="w-4 h-4 ml-5 cursor-pointer" alt=""
                            @click="showModal(scope.row.user_project_name, scope.row.project_id, 2)">
                    </div>
                </template>
            </el-table-column>
            <el-table-column :align="'center'" prop="description" :label="$t('table.desc')" sortable width="300">
                <template #default="scope">
                    <div class="flex items-center justify-center">
                        {{ scope.row.description }}
                        <img src="/@/assets/img/edit.png" class="w-4 h-4 ml-5 cursor-pointer" alt=""
                            @click="showModal(scope.row.description, scope.row.project_id, 3)">
                    </div>
                </template>
            </el-table-column>
            <el-table-column :align="'center'" prop="num" :label="$t('table.deviceNum')" width="100" sortable />
            <el-table-column :align="'center'" prop="online" :label="$t('table.onlineNum')" width="100" sortable />
        </el-table>
        <div class="pageWrap h-[70px] flex justify-end items-center">
            <el-pagination v-model:current-page="currentPage" background v-model:page-size="pageSize"
                :page-sizes="[5, 10, 20, 30, 40]" layout="total, sizes, prev, pager, next, jumper"
                :total="device_list?.total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        </div>
        <el-dialog v-model="visible" :show-close="false" :width='largerThan2xl ? "800" : largerThanMd ? "50%" : "90%"'
            :destroy-on-close="true" :close-on-click-modal="false">
            <template #header>
                <div
                    class="my-header w-full h-[50px] md:h-[60px] bg-[#F5F5FD] flex justify-center items-center text-[18px] xl:text-[22px] text-t3 relative">
                    {{ $t('home.editInfo') }}
                    <img src="/@/assets/img/close.png"
                        class="w-[14px] h-[14px] cursor-pointer absolute right-[25px] top-[23px]" @click="visible = false"
                        alt="">
                </div>
            </template>
            <div>
                <el-form label-position="right" label-width="100px" ref="addForm" :model="formValue" size="large">
                    <el-form-item :label="typeDesc" prop="value">
                        <el-input v-model="formValue.value" placeholder="请输入" />
                    </el-form-item>
                </el-form>
            </div>
            <template #footer>
                <span class="dialog-footer flex justify-center items-center">
                    <el-button type="primary" class="w-[150px] h-[40px] xl:h-[50px] rounded-[10px]" size="large"
                        @click="editInfo">
                        {{ $t('btn.confirm') }}
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';
import { ElMessage } from 'element-plus';
import { computed, ref } from 'vue';
import { projectUpdate } from '/@/api'

const breakpoints = useBreakpoints(breakpointsTailwind)
const largerThan2xl = breakpoints.greater('2xl') // only larger than sm
const largerThanMd = breakpoints.greater('md') // only larger than sm

const emits = defineEmits(['changePagination', 'handleOption', 'handleSort', 'checkedProject', 'refresh'])

const props = defineProps({
    device_list: { type: Object, default: () => { } }
})
const currentPage = ref(1)
const pageSize = ref(10)
const visible = ref(false)
const handleId = ref('')
const formValue = ref({
    value: ''
})
const type = ref(1) // 1 '项目名' 2 子用户项目名 3 描述

const tableData = computed(() => {
    return props.device_list?.data
})
const indexMethod = (index: number) => {
    return index + 1
}

const typeDesc = computed(() => {
    const desc = type.value === 1 ? '项目名' : type.value === 2 ? '子用户项目名' : '描述'
    return desc
})

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

const checkedProject = (name) => {
    emits('checkedProject', name)
}

const showModal = (des, id, changeType) => {
    type.value = changeType
    handleId.value = id
    formValue.value.value = des
    visible.value = true
}

const editInfo = async () => {
    if (!formValue.value.value) {
        ElMessage({
            message: '数据不能为空',
            type: 'error',
        })
        return
    }
    const propsKey = type.value === 1 ? 'project_name' : type.value === 2 ? 'user_project_name' : 'description'
    const res = await projectUpdate({ field: propsKey, ids: handleId.value, value: formValue.value.value, })
    if (res?.code === 1) {
        ElMessage({
            message: '操作成功',
            type: 'success',
        })
        visible.value = false
        emits('refresh')
    }
}


</script>

<style scoped lang="scss">
.el-table {
    border: 1px solid #E5E5E5;
}

:deep(.el-dialog) {
    border-radius: 20px;
    overflow: hidden;

    .el-button--large {
        border-radius: 8px;
        // height: 50px;
    }
}

:deep(.el-dialog__header) {
    padding: 0;
    margin-right: 0;
}
</style>