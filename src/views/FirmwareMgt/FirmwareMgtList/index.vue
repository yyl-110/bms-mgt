<template>
    <div>
        <div class="tableWrap w-full bg-[#fff] rounded-[10px] mt-5 px-5">
            <div class="header flex items-center h-auto py-2.5 lg:h-[60px] lg:py-0 justify-between">
                <div class="flex items-center w-full lg:flex-1 leftContent flex-wrap lg:flex-nowrap lg:w-auto">
                    <span class="text-t3 font-[500] text-[20px] flex-shrink-0">固件列表</span>
                </div>
                <el-button type="primary" size="large" class="rounded-[10px]" @click="bindVisible = true">
                    上传固件
                </el-button>
            </div>
            <div>
                <el-table ref="tableRef" row-key="device_id" :data="tableData" style="width: 100%" stripe
                    @sort-change="handleSort">
                    <el-table-column type="selection" width="55" />
                    <el-table-column :align="'center'" type="index" label="序号" width="80" :index="indexMethod" />
                    <el-table-column :align="'center'" prop="file_name" label="项目名" sortable />
                    <el-table-column :align="'center'" prop="id" label="项目号" sortable />
                    <el-table-column label="操作" width="300" align="center">
                        <template #default="scope">
                            <el-button type="primary" @click="handleOption(1, scope.row.id)" class="rounded-[5px]">
                                <img src="/@/assets/img/sj.png" alt="" class="w-[16px] h-[16px] mr-2">
                                升级设备</el-button>
                            <el-button type="danger" icon="el-icon-delete" class="rounded-[5px]"
                                @click="handleOption(2, scope.row.id)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="pageWrap h-[70px] flex justify-end items-center">
                    <el-pagination v-model:current-page="currentPage" background v-model:page-size="pageSize"
                        :page-sizes="[5, 10, 20, 30, 40]" layout="total, sizes, prev, pager, next, jumper"
                        :total="tableInfo?.total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
                </div>
            </div>
            <UploadModal :bind-visible="bindVisible" @handleClose="bindVisible = !bindVisible, handelId = null"
                @bindSucess="bindSucess" />

            <el-dialog v-model="dialogDelVisible" :width='largerThanSm ? "500" : "60%"' :show-close="false">
                <template #header>
                    <div
                        class="my-header w-full h-[50px] md:h-[60px] bg-[#F5F5FD] flex justify-center items-center text-[18px] xl:text-[22px] text-t3 relative">
                        删除固件
                        <img src="/@/assets/img/close.png"
                            class="w-[14px] h-[14px] cursor-pointer absolute right-[25px] top-[23px]"
                            @click="dialogDelVisible = false" alt="">
                    </div>
                </template>
                <div
                    class="text-center text-t3 text-[16px] sm:text-[20px] xl:h-[90px] h-[50px] flex justify-center items-center">
                    确定删除固件？
                </div>
                <template #footer>
                    <span class="dialog-footer flex justify-center items-center">
                        <el-button type="primary" class="w-[150px] h-[40px] xl:h-[50px] rounded-[10px]" size="large"
                            @click="confirmOption">
                            确定
                        </el-button>
                        <el-button class="w-[150px] h-[40px] xl:h-[50px] rounded-[10px]" size="large"
                            @click="dialogDelVisible = false">
                            取消
                        </el-button>
                    </span>
                </template>
            </el-dialog>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { delDtu, dtuList } from '/@/api'
import UploadModal from './components/UploadModal.vue'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';
import { ElMessage } from 'element-plus';
const breakpoints = useBreakpoints(breakpointsTailwind)
const largerThanSm = breakpoints.greater('sm') // only larger than sm

const tableData = ref<any>([])
const tableInfo = ref({})
const currentPage = ref(1)
const pageSize = ref(10)
const dialogDelVisible = ref<boolean>(false)
let order = reactive({ value: { filed: '', order: '' } })
const bindVisible = ref<boolean>(false)
const handelId = ref<number | null>(null)

const indexMethod = (index: number) => {
    return index + 1
}

const bindSucess = () => {
    bindVisible.value = false
    fetchData()
}


/* 排序 */
const handleSort = (e) => {
    const payload = { filed: e.prop, order: e.order === "ascending" ? 'asc' : e.order === "descending" ? 'desc' : '' }
    order = { value: payload }
    fetchData()
}
const handleSizeChange = (e) => {
    pageSize.value = e
    fetchData()

}
const handleCurrentChange = (e) => {
    currentPage.value = e
    fetchData()
}

const handleOption = (type: number, id: number) => {
    /* 删除 */
    if (type === 2) {
        handelId.value = id
        dialogDelVisible.value = true
    }
}

const fetchData = async (pages = pageSize.value, size = currentPage.value) => {
    const _order = order.value.filed ? order.value : {}
    const res = await dtuList({ file_name: '', page: pages, list_rows: size, ..._order })
    if (res.code === 1) {
        tableInfo.value = res?.data
        currentPage.value = res.data?.current_page
        pageSize.value = res.data?.per_page
        tableData.value = res.data?.data
        console.log('res:', res)
    }

}

const confirmOption = async () => {
    const delRes: any = await delDtu({ ids: handelId.value })
    if (delRes.code === 1) {
        ElMessage({
            message: '删除成功',
            type: 'success',
        })
        handelId.value = null
        dialogDelVisible.value = false
        fetchData()
    }
}

onMounted(() => {
    fetchData(1)
})

</script>

<style scoped lang="scss">
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

.leftContent {
    --el-border-radius-base: 10px
}

:deep(.el-input__wrapper) {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
}

:deep(.el-input-group__append) {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
}
</style>