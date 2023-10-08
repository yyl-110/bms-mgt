<template>
    <el-dialog v-model="visible" :width='largerThan2xl ? "1010" : largerThanMd ? "80%" : "90%"' :show-close="false"
        :destroy-on-close="true" :close-on-click-modal="false">
        <template #header>
            <div
                class="my-header w-full h-[50px] md:h-[60px] bg-[#F5F5FD] flex justify-center items-center text-[18px] xl:text-[22px] text-t3 relative">
                子用户绑定设备
                <img src="/@/assets/img/close.png" class="w-[14px] h-[14px] cursor-pointer absolute right-[25px] top-[23px]"
                    @click="handleClose" alt="">
            </div>
        </template>
        <div class="content pt-[20px]">
            <el-form label-position="right" label-width="80px" ref="addForm" :model="formValue" size="large" :rules="rules">
                <el-form-item label="子用户名" prop="username">
                    <el-select v-model="formValue.username" placeholder="Select" class="w-full" :disabled="child_id"
                        @change="handleChangeUserName">
                        <el-option v-for="item in chileOptions" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </el-form-item>
                <el-form-item label="项目号" prop="projectId">
                    <el-select v-model="formValue.projectId" placeholder="Select" class="w-full" @change="getDevice()">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </el-form-item>
                <el-form-item label="可选设备">
                    <el-transfer v-model="leftValue" filterable :titles="['未选设备', '已选设备']" :data="data"
                        filter-placeholder="关键字搜索" @change="handleChange" />
                </el-form-item>
            </el-form>
        </div>
        <template #footer>
            <span class="dialog-footer flex justify-end items-center">
                <el-button type="primary" class="w-[150px] h-[40px] xl:h-[50px] rounded-[10px]" size="large"
                    @click="handelBind">
                    确定
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';
import { computed, onMounted, ref, watch } from 'vue';
import { getChildDevice, childDeviceIndex, deviceAdd } from '/@/api'
import { projectData } from '/@/api/project';
import { ElMessage } from 'element-plus';
const breakpoints = useBreakpoints(breakpointsTailwind)
const largerThan2xl = breakpoints.greater('2xl') // only larger than sm
const largerThanMd = breakpoints.greater('md') // only larger than sm

const emits = defineEmits(['handleClose', 'bindSucess'])

const props = defineProps({
    bindVisible: {
        type: Boolean,
        default: false
    },
    child_id: {
        type: Number,
        default: null
    },
    childList: {
        type: Array,
        default: () => []
    }
})
const chileOptions = computed(() => {
    if (props.childList.length) {
        return props.childList.map(i => {
            return { label: i.username, value: i.id }
        })
    }
    return []
})
const options = computed(() => {
    if (projectList.value.length) {
        const list = projectList.value.map(i => {
            return {
                label: i.project_name,
                value: i.project_id
            }
        })
        list.unshift({ label: '全部', value: 0 })
        return list
    }
    return []
})

const visible = computed(() => {
    return props.bindVisible
})
interface IFormValue {
    username: string
    projectId: number
}
const formValue = ref<IFormValue>({
    username: '',
    projectId: 0
})
interface IDevice {
    device_id: number
    identify_code: string
}
const deviceList = ref<IDevice[]>([])
const projectList = ref([])

const generateData = (_data: IDevice[]): Option[] => {
    const data: Option[] = []
    for (let i = 0; i <= _data.length - 1; i++) {
        data.push({
            key: _data[i]?.device_id,
            label: _data[i]?.identify_code,
            disabled: false,
        })
    }
    return data
}
interface Option {
    key: number
    label: string
    disabled?: boolean
}

// 穿梭框数据
const data = ref([])
const leftValue = ref([])

const handleChange = (
    value: number | string,
    direction: 'left' | 'right',
    movedKeys: string[] | number[]
) => {
    console.log(leftValue.value, direction, movedKeys)
}

const handleClose = () => {
    emits('handleClose')
}

/* 获取设备列表 */
const getDevice = async () => {
    leftValue.value = []
    const res: any = await getChildDevice({ project_id: formValue.value.projectId, child_id: formValue.value.username })
    if (res.code === 1) {
        deviceList.value = res.data
        if (Array.isArray(res.data)) {
            data.value = generateData(res.data)
        }
    }

}

/* 获取项目列表 */
const getProjectList = async () => {
    const res = await projectData({})
    if (res.code === 1) {
        projectList.value = res?.data?.data?.data
    }
}

/* 修改子账户 */
const handleChangeUserName = async (val) => {
    leftValue.value = []
    getDevice()
}

/* 确认绑定 */
const handelBind = async () => {
    if (!formValue.value.username) {
        ElMessage({
            message: '子用户名不能为空',
            type: 'error',
        })
        return
    }
    if (!leftValue.value.length) {
        ElMessage({
            message: '请选择设备',
            type: 'error',
        })
        return
    }
    const device_ids = leftValue.value.join(',')
    const res = await deviceAdd({ child_id: formValue.value.username, device_ids })
    if (res.code === 1) {
        ElMessage({
            message: '绑定成功！',
            type: 'success',
        })
        emits('bindSucess')
    }
}

onMounted(() => {
    getProjectList()
    getDevice()
})

watch(() => props.child_id, () => {
    formValue.value.username = props.child_id
})
watch(() => visible.value, (val) => {
    if (val) {
        leftValue.value = []
        if (props.child_id) {
            formValue.value.projectId = 0
        } else {
            formValue.value = {
                username: '',
                projectId: 0
            }
        }
        getDevice()
    }
})

</script>

<style lang="scss" scoped>
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

:deep(.el-transfer__buttons) {
    display: flex;
    flex-direction: column;
    padding: 0 40px;

    .el-button {
        margin-left: 0;
        margin-bottom: 20px;
        height: 40px;
        border-radius: 10px !important;
    }
}

:deep(.el-transfer) {
    width: 100%;
    display: flex;
    align-items: center;
}

:deep(.el-transfer-panel) {
    flex: 1;
}
</style>