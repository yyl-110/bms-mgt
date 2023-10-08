<template>
    <div>
        <OverviewCard :list="list" />
        <div class="tableWrap w-full bg-[#fff] rounded-[10px] mt-5 px-5">
            <div class="header flex items-center h-auto py-2.5 lg:h-[60px] lg:py-0 flex-wrap lg:flex-nowrap">
                <div class="flex items-center w-full lg:flex-1 leftContent flex-wrap lg:flex-nowrap lg:w-auto">
                    <span class="text-t3 font-[500] text-[20px] flex-shrink-0">用户列表</span>
                    <div class="input w-[50%] min-w-[200px] rounded-[6px] ml-5 lg:ml-[50px]">
                        <el-input v-model="searchVal" placeholder="输入关键字搜索" size="large" @keyup.enter.native="search">
                            <template #append>
                                <el-button :icon="Search" @click="search" />
                            </template>
                        </el-input>
                    </div>
                    <div class="flex items-center mt-5 sm:mt-0">
                        <el-button class="text-[#fff] w-[100px] rounded-5 md:ml-5" size="large" type="primary"
                            @click="addChildAccount">
                            添加子用户
                        </el-button>
                        <el-button class="text-[#fff] w-[130px] bg-[#05D0CE]" type="info" size="large"
                            @click="bindVisible = true">
                            子用户绑定设备
                        </el-button>
                    </div>
                </div>
                <div class="flex items-center mt-2.5 options ml-auto lg:ml-0 lg:mt-0">
                    <el-popover placement="bottom-end" title="" trigger="click">
                        <template #reference>
                            <el-button class="text-[#999]">
                                <img src="/@/assets/img/filter.png" class="w-5 h-5" alt="">
                                筛选
                            </el-button>
                        </template>
                        <el-checkbox-group v-model="checkList" @change="changeCheck">
                            <el-checkbox :label="item.label" v-for="item in filterList" :key="item.key" />
                        </el-checkbox-group>
                    </el-popover>

                    <el-button class="text-[#999]" @click="pointTable">
                        <img src="/@/assets/img/point.png" class="w-5 h-5" alt="">
                        打印
                    </el-button>
                    <el-button class="text-[#999]">
                        <img src="/@/assets/img/export.png" class="w-5 h-5" alt="">
                        导出
                    </el-button>
                </div>
            </div>
            <UserTable :userList="userList" @changePagination="changePagination" @handleOption="handleOption"
                :search="searchVal" :checkList="checkList" @handleSort="handleSort" />

            <!-- 新增 -->
            <el-dialog v-model="dialogVisible" :width='largerThanSm ? "460" : "90%"' :show-close="false"
                close-on-click-modal>
                <template #header>
                    <div
                        class="my-header w-full h-[50px] md:h-[60px] bg-[#F5F5FD] flex justify-center items-center text-[18px] xl:text-[22px] text-t3 relative">
                        {{ isAdd ? '添加子用户' : '修改密码' }}
                        <img src="/@/assets/img/close.png"
                            class="w-[14px] h-[14px] cursor-pointer absolute right-[25px] top-[23px]"
                            @click="dialogVisible = false" alt="">
                    </div>
                </template>
                <div class="content pt-[20px]">
                    <el-form label-position="right" label-width="80px" ref="addForm" :model="formValue" size="large"
                        :rules="rules">
                        <el-form-item label="子用户名" prop="username">
                            <el-input v-model="formValue.username" :disabled="!isAdd" />
                        </el-form-item>
                        <el-form-item label="密码" prop="password">
                            <el-input v-model="formValue.password" type="password" />
                        </el-form-item>
                        <el-form-item label="确认密码" class="mb-2.5" prop="password2">
                            <el-input v-model="formValue.password2" type="password" />
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
            <el-dialog v-model="dialogDelVisible" :width='largerThanSm ? "500" : "60%"' :show-close="false">
                <template #header>
                    <div
                        class="my-header w-full h-[50px] md:h-[60px] bg-[#F5F5FD] flex justify-center items-center text-[18px] xl:text-[22px] text-t3 relative">
                        {{ popType === 1 ? '删除子账户' : '解除绑定' }}
                        <img src="/@/assets/img/close.png"
                            class="w-[14px] h-[14px] cursor-pointer absolute right-[25px] top-[23px]"
                            @click="dialogDelVisible = false" alt="">
                    </div>
                </template>
                <div
                    class="text-center text-t3 text-[16px] sm:text-[20px] xl:h-[90px] h-[50px] flex justify-center items-center">
                    {{ popType === 1 ? '确定删除子用户？' : '确定解除绑定？' }}
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

            <!-- 子用户绑定设备 -->
            <BindDevice :bind-visible="bindVisible" @handleClose="bindVisible = !bindVisible, handelId = null"
                :childList="childList" :child_id="handelId" @bindSucess="bindSucess" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { deviceIndex, childIndexIndex, addChild, delChild, childUpdate } from '/@/api';
import OverviewCard from '../components/OverviewCard.vue';
import UserTable from '../components/UserTable.vue';
import { Search } from '@element-plus/icons-vue';
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { ElMessage, FormInstance } from 'element-plus';
import print from "/@/utils/print";
import BindDevice from '../components/BindDevice.vue';
const breakpoints = useBreakpoints(breakpointsTailwind)
const largerThanSm = breakpoints.greater('sm') // only larger than sm

let order = reactive({ value: { filed: '', order: '' } })
const list = ref([{ title: '项目数', num: 0 }, { title: '设备数', num: 0 }, { title: '在线数', num: 0 }, { title: '故障数', num: 0 }])
const checkList = ref(['序号', '子用户名', '公司', '设备数', '操作'])
const filterList = ref([
    { label: '序号', key: 'index' },
    { label: '子用户名', key: 'username' },
    { label: '公司', key: 'company' },
    { label: '设备数', key: 'num' },
    { label: '操作', key: 'options' },
])
const userTable = ref(null)
const searchVal = ref('')
const userList = ref({})
const childList = ref([])
const list_rows = ref(10)
const page = ref(1)
/* 新增 */
const dialogVisible = ref(false)
const dialogDelVisible = ref(false)
const formValue = ref({ username: '', password: '', password2: '' })
const addForm = ref(null)
const isAdd = ref(false)

const popType = ref(1) // 1 删除  2 解绑
const handelId = ref<number | null>(null)
const bindVisible = ref<boolean>(false)

const rules = {
    username: [
        {
            required: true,
            message: '请填子用户名',
            trigger: 'blur',
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
    const _order = order.value.filed ? order.value : {}
    const res = await childIndexIndex({ page: pages, list_rows: size, ..._order, search: searchVal.value })
    userList.value = res.data
    page.value = res.data?.current_page
    list_rows.value = res.data?.per_page
    childList.value = res.data?.data
}
const addChildAccount = () => {
    isAdd.value = true
    formValue.value = { username: '', password: '', password2: '' }
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
            if (isAdd.value) {
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
                return
            }
            try {
                const res = await childUpdate({ ...formValue.value, ids: handelId.value })
                if (res?.code === 1) {
                    ElMessage({
                        message: '修改成功',
                        type: 'success',
                    })
                    getChildDeviceList()
                    dialogVisible.value = false
                    formValue.value = { username: '', password: '', password2: '' }
                }
            } catch (error) {
                console.log('error:', error)
                ElMessage({
                    message: '修改失败',
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
const confirmOption = async () => {
    /* 删除 */
    if (popType.value === 1) {
        const delRes: any = await delChild({ ids: handelId.value })
        if (delRes.code === 1) {
            ElMessage({
                message: '删除成功',
                type: 'success',
            })
            handelId.value = null
            dialogDelVisible.value = false
            getChildDeviceList()
        }
    }
}

const handleOption = (params: { type: number, id: number }) => {
    switch (params.type) {
        case 1: // 删除
            popType.value = 1
            dialogDelVisible.value = true
            handelId.value = params.id
            break;
        case 2: // 解除绑定
            popType.value = 2
            dialogDelVisible.value = true
            handelId.value = params.id
            break;
        case 3: // 添加设备
            handelId.value = params.id
            bindVisible.value = true
            break;
        case 4: // 修改密码
            handelId.value = params.id
            isAdd.value = false
            dialogVisible.value = true
            formValue.value = { username: childList.value.find(i => i.id === params.id)?.username, password: '', password2: '' }
            break;
    }
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

const pointTable = () => {
    let fields = checkList.value.map(i => filterList.value.find(item => item.label === i)?.key)
    fields.splice(fields.findIndex(i => i === 'index'), 1)
    console.log('fields:', fields)
    print.printJson({
        title: '', // 打印出来的标题
        data: childList.value, // 需要打印的数据
        serial: checkList.value.includes('序号'), // 是否需要打印序列号
        fields, // 需要打印的字段
        properties: fields.map(i => {
            return { field: i, displayName: filterList.value.find(item => item.key === i)?.label }
        })
    })
}
const handleSort = (val) => {
    order = { value: val }
    getChildDeviceList()
}

const search = () => {
    getChildDeviceList()
}

const changeCheck = (e: string[]) => {

}

/* 绑定成功 */
const bindSucess = () => {
    bindVisible.value = !bindVisible.value;
    getChildDeviceList()
}
onMounted(() => {
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