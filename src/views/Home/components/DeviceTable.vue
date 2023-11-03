<template>
    <div class="w-full">
        <el-table ref="tableRef" row-key="device_id" :data="tableData" style="width: 100%" stripe @sort-change="handleSort" id="out-table">
            <el-table-column :align="'center'" type="index" :label="$t('table.index')" width="120" :index="indexMethod"
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
            <el-table-column :align="'center'" prop="des" :label="$t('table.desc')" sortable
                v-if="checkList.includes($t('table.desc'))" min-width="150">
                <template #default="scope">
                    <div class="flex items-center justify-center">
                        {{ scope.row.des }}
                        <img src="/@/assets/img/edit.png" class="w-4 h-4 ml-5 cursor-pointer" alt=""
                            @click="showModal(scope.row.des, scope.row.device_id)">
                    </div>
                </template>
            </el-table-column>
            <el-table-column :align="'center'" prop="version" :label="$t('table.version')" sortable width="180"
                v-if="checkList.includes($t('table.version'))" />
            <el-table-column :align="'center'" prop="iccid" label="SIM" sortable width="200"
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
                <el-form label-position="right" label-width="60px" ref="addForm" :model="formValue" size="large">
                    <el-form-item label="描述" prop="value">
                        <el-input v-model="formValue.value" placeholder="填写描述" />
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
import { HomeUpdate } from '/@/api/home';

const props = defineProps({
    device_list: { type: Object, default: () => { } },
    checkList: { type: Array, default: () => [] },
})
const breakpoints = useBreakpoints(breakpointsTailwind)
const largerThan2xl = breakpoints.greater('2xl') // only larger than sm
const largerThanMd = breakpoints.greater('md') // only larger than sm
const emits = defineEmits(['changePagination', 'handleOption', 'handleSort', 'refresh'])
const currentPage = ref(1)
const pageSize = ref(10)
const visible = ref(false)
const handleId = ref('')
const formValue = ref({
    value: ''
})

const tableData = computed(() => {
    return props.device_list?.data
})
const indexMethod = (index: number) => {
    return index + (currentPage.value - 1) * pageSize.value + 1;
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

const showModal = (des, id) => {
    handleId.value = id
    formValue.value.value = des
    visible.value = true
}

const editInfo = async () => {
    if (!formValue.value.value) {
        ElMessage({
            message: '填写描述',
            type: 'error',
        })
        return
    }
    const res = await HomeUpdate({ field: 'description', ids: handleId.value, value: formValue.value.value, })
    if (res?.code === 1) {
        ElMessage({
            message: '修改成功',
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