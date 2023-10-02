<template>
    <div>
        <OverviewCard :list="list" />
        <div class="tableWrap w-full bg-[#fff] rounded-[10px] mt-5 px-5">
            <div class="header flex items-center h-auto py-2.5 lg:h-[60px] lg:py-0 flex-wrap lg:flex-nowrap">
                <div class="flex items-center w-full lg:flex-1 leftContent flex-wrap lg:flex-nowrap lg:w-auto">
                    <span class="text-t3 font-[500] text-[20px] flex-shrink-0">用户列表</span>
                    <div class="input w-[50%] min-w-[200px] rounded-[6px] ml-5 lg:ml-[50px]">
                        <el-input v-model="searchVal" placeholder="输入关键字搜索" size="large">
                            <template #append>
                                <el-button :icon="Search" />
                            </template>
                        </el-input>
                    </div>
                    <div class="flex items-center mt-5 sm:mt-0">
                        <el-button class="text-[#fff] w-[100px] rounded-5 md:ml-5" size="large" type="primary"
                            @click="addChildAccount">
                            添加子用户
                        </el-button>
                        <el-button class="text-[#fff] w-[130px] bg-[#05D0CE]" type="info" size="large">
                            子用户绑定设备
                        </el-button>
                    </div>
                </div>
                <div class="flex items-center mt-2.5 options ml-auto lg:ml-0 lg:mt-0">
                    <el-button class="text-[#999]">
                        <img src="../../assets/img/filter.png" class="w-5 h-5" alt="">
                        筛选
                    </el-button>
                    <el-button class="text-[#999]">
                        <img src="../../assets/img/point.png" class="w-5 h-5" alt="">
                        打印
                    </el-button>
                    <el-button class="text-[#999]">
                        <img src="../../assets/img/export.png" class="w-5 h-5" alt="">
                        导出
                    </el-button>
                </div>
            </div>
            <UserTable :userList="userList" @changePagination="changePagination" />

            <!-- 新增 -->
            <el-dialog v-model="dialogVisible" :width='largerThanSm ? "460" : "90%"' :show-close="false">
                <template #header>
                    <div
                        class="my-header w-full h-[50px] md:h-[60px] bg-[#F5F5FD] flex justify-center items-center text-[18px] sm:text-[24px] text-t3 relative">
                        添加子用户
                        <img src="../../assets/img/close.png"
                            class="w-[14px] h-[14px] cursor-pointer absolute right-[25px] top-[23px]"
                            @click="dialogVisible = false" alt="">
                    </div>
                </template>
                <div class="content pt-[20px]">
                    <el-form label-position="right" label-width="80px" ref="addForm" :model="formValue" size="large"
                        :rules="rules">
                        <el-form-item label="子用户名" prop="username">
                            <el-input v-model="formValue.username" />
                        </el-form-item>
                        <el-form-item label="密码" prop="password">
                            <el-input v-model="formValue.password" />
                        </el-form-item>
                        <el-form-item label="确认密码" class="mb-2.5" prop="password2">
                            <el-input v-model="formValue.password2" />
                        </el-form-item>
                    </el-form>
                </div>
                <template #footer>
                    <span class="dialog-footer flex justify-center items-center">
                        <el-button type="primary" @click="submitForm(addForm)"
                            class="w-[150px] h-[40px] xl:h-[50px] rounded-[10px]" size="large">
                            确定
                        </el-button>
                    </span>
                </template>
            </el-dialog>
            <!-- 删除 -->
            <el-dialog v-model="dialogDelVisible" :width='largerThanSm ? "300" : "60%"' :show-close="false">
                <template #header>
                    <div
                        class="my-header w-full h-[50px] md:h-[60px] bg-[#F5F5FD] flex justify-center items-center text-[18px] sm:text-[24px] text-t3 relative">
                        删除子账户
                        <img src="../../assets/img/close.png"
                            class="w-[14px] h-[14px] cursor-pointer absolute right-[25px] top-[23px]"
                            @click="dialogDelVisible = false" alt="">
                    </div>
                </template>
                <div class="text-center text-t3 text-[16px] sm:text-[20px]">{{ popType === 1 ? '确定删除子用户？' : '' }}</div>
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
import { onMounted, ref } from 'vue';
import { deviceIndex, childDeviceIndex, addChild } from '/@/api';
import OverviewCard from './components/OverviewCard.vue';
import UserTable from './components/UserTable.vue';
import { Search } from '@element-plus/icons-vue';
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { ElMessage, FormInstance } from 'element-plus';
const breakpoints = useBreakpoints(breakpointsTailwind)
const largerThanSm = breakpoints.greater('sm') // only larger than sm


const list = ref([{ title: '项目数', num: 0 }, { title: '设备数', num: 0 }, { title: '在线数', num: 0 }, { title: '故障数', num: 0 }])
const searchVal = ref('')
const userList = ref({})
const list_rows = ref(10)
const page = ref(1)
/* 新增 */
const dialogVisible = ref(false)
const dialogDelVisible = ref(true)
const formValue = ref({ username: '', password: '', password2: '' })
const addForm = ref(null)

const popType = ref(1)

const rules = {
    username: [
        {
            required: true,
            message: '请填子用户名',
            trigger: 'change',
        },
    ],
    password: [
        {
            required: true,
            message: '密码不能为空',
            trigger: 'change',
        },
    ],
    password2: [
        {
            required: true,
            message: '请再次输入密码',
            trigger: 'change',
        },
    ],
}

const getDeviceIndex = async () => {
    const res = await deviceIndex()
}
const getChildDeviceList = async (pages = page.value, size = list_rows.value) => {
    const res = await childDeviceIndex({ page: pages, list_rows: size })
    userList.value = res.data
    page.value = res.data?.current_page
    list_rows.value = res.data?.per_page
}
const addChildAccount = () => {
    dialogVisible.value = true
}
/**
 * 确认添加
 * @return {*}
 */
const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate(async (valid) => {
        if (valid) {
            try {
                const res = await addChild({ ...formValue.value })
                if (res?.code === 1) {
                    ElMessage({
                        message: '添加成功',
                        type: 'success',
                    })
                    getChildDeviceList()
                    dialogVisible.value = false
                    formValue.value = { username: '', password: '', password2: '' }
                }
            } catch (error) {
                console.log('error:', error)
                ElMessage({
                    message: '添加失败',
                    type: 'error',
                })
            }

        } else {
            console.log('error submit!')
            return false
        }
    })
}
/**
 * 删除解绑
 * @return {*}
 */
const confirmOption = () => {
    /* 删除 */
    if (popType.value === 1) { }
}

/**
 * 修改分页
 * @param {*} value
 * @param {*} val
 * @return {*}
 */
const changePagination = (value: { type: string, val: number }) => {
    switch (value.type) {
        case 'size':
            getChildDeviceList(page.value, value.val)
            break;
        case 'page':
            getChildDeviceList(value.val, list_rows.value)
            break;

    }
}
onMounted(() => {
    getDeviceIndex()
    getChildDeviceList(1)
})
</script>

<style scoped lang="scss">
:deep(.el-form-item__label) {
    --el-text-color-regular: #666
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

.leftContent {
    --el-border-radius-base: 10px
}

:deep(.el-input__wrapper) {
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
}

:deep(.el-input-group__append) {
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
}

.options {
    .el-button {
        border-radius: 10px;
        border-color: #E5E5E5;
        color: #999;
    }
}
</style>