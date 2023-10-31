<template>
    <div class="w-full" id="TableWrap">
        <el-table ref="tableRef" row-key="device_id" :data="tableData" style="width: 100%" stripe @sort-change="handleSort">
            <el-table-column type="selection" width="55" />
            <el-table-column :align="'center'" type="index" :label="$t('table.index')" width="180" :index="indexMethod"
                v-if="checkList.includes($t('table.index'))" />
            <el-table-column :align="'center'" prop="username" :label="$t('table.subUserName')" sortable
                v-if="checkList.includes($t('table.subUserName'))" min-width="180">
                <template #default="scope">
                    <div class="cursor-pointer text-primary" @click="goTo(scope.row.id)">{{
                        scope.row.username }}</div>
                </template>
            </el-table-column>
            <el-table-column :align="'center'" prop="company" :label="$t('table.company')" width="160" sortable
                v-if="checkList.includes($t('table.company'))">
                <template #default="scope">
                    <div class="flex items-center justify-center">
                        {{ scope.row.company }}
                        <img src="/@/assets/img/edit.png" class="w-4 h-4 ml-5 cursor-pointer" alt=""
                            @click="showModal(scope.row.company, scope.row.id)">
                    </div>
                </template>
            </el-table-column>
            <el-table-column :align="'center'" prop="num" :label="$t('table.deviceNum')" sortable
                v-if="checkList.includes($t('table.deviceNum'))" width="180" />
            <el-table-column :label="$t('table.operate')" width="550" align="center"
                v-if="checkList.includes($t('table.operate'))">
                <template #default="scope">
                    <el-button type="primary" icon="el-icon-lock" @click="handleOption(4, scope.row.id)">{{
                        $t('table.changePassword') }}</el-button>
                    <el-button type="info" icon="el-icon-plus" @click="handleOption(3, scope.row.id)">{{
                        $t('table.addDevice') }}</el-button>
                    <el-button type="danger" icon="el-icon-delete" @click="handleOption(1, scope.row.id)">{{
                        $t('table.delSubUser') }}</el-button>
                    <!-- <el-button type="danger" @click="handleOption(2)">解除绑定</el-button> -->
                </template>
            </el-table-column>
        </el-table>
        <div class="pageWrap h-[70px] flex justify-end items-center">
            <el-pagination v-model:current-page="currentPage" background v-model:page-size="pageSize"
                :page-sizes="[5, 10, 20, 30, 40]" layout="total, sizes, prev, pager, next, jumper" :total="userList?.total"
                @size-change="handleSizeChange" @current-change="handleCurrentChange" />
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
                <el-form label-position="right" label-width="80px" ref="addForm" :model="formValue" size="large">
                    <el-form-item :label="$t('table.company')" prop="value">
                        <el-input v-model="formValue.value" :placeholder="$t('table.enterCompany')" />
                    </el-form-item>
                    <!-- <el-form-item :label="$t('table.password')" prop="password">
                        <el-input v-model="formValue.password" type="password" :placeholder="$t('login.password')" />
                    </el-form-item>
                    <el-form-item :label="$t('table.confirmPwd')" class="mb-2.5" prop="password2">
                        <el-input v-model="formValue.password2" type="password" :placeholder="$t('login.enterPwd')" />
                    </el-form-item> -->
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
import { Edit } from '@element-plus/icons-vue';
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';
import { ElMessage } from 'element-plus';
import { computed, ref, watch, defineEmits } from 'vue';
import { useRouter } from 'vue-router';
import { childUpdateCompany } from '/@/api';
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const breakpoints = useBreakpoints(breakpointsTailwind)
const largerThan2xl = breakpoints.greater('2xl') // only larger than sm
const largerThanMd = breakpoints.greater('md') // only larger than sm

const props = defineProps({
    userList: { type: Object, default: () => { } },
    checkList: { type: Array, default: () => [] },
})
const emits = defineEmits(['changePagination', 'handleOption', 'handleSort', 'refresh'])
const currentPage = ref(1)
const pageSize = ref(10)
const router = useRouter()
const visible = ref(false)
const formValue = ref({ value: '', password: '', password2: '' })
const handleId = ref('')

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
    return index + (currentPage.value - 1) * pageSize.value + 1;
}
const handleSizeChange = (val) => {
    emits('changePagination', { type: 'size', val })
}
const handleCurrentChange = (val) => {
    emits('changePagination', { type: 'page', val })
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

const showModal = (company, id) => {
    handleId.value = id
    formValue.value.value = company
    visible.value = true
}

const editInfo = async () => {
    if (!formValue.value.value) {
        ElMessage({
            message: t('table.enterCompany'),
            type: 'error',
        })
        return
    }
    // if (!formValue.value.password || !formValue.value.password2) {
    //     ElMessage({
    //         message: t('login.password'),
    //         type: 'error',
    //     })
    //     return
    // }
    const res = await childUpdateCompany({
        ids: handleId.value, value: formValue.value.value, field: 'company',
        // password: formValue.value.password, password2: formValue.value.password2
    })
    if (res?.code === 1) {
        ElMessage({
            message: t('table.success'),
            type: 'success',
        })
        visible.value = false
        emits('refresh')
    }
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