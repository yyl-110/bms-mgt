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
            <el-form label-position="right" label-width="80px" ref="addForm" :model="formValue" size="large">
                <el-form-item label="上传文件" prop="file_name">
                    <el-upload class="w-full" action="" :http-request="uploadFile" :show-file-list="false">
                        <div class="upload flex items-center justify-between px-[14px] rounded-[10px] h-[50px] w-full"
                            style="border: 1px solid #E5E5E5;">
                            <span :class="uploadData?.name ? 'text-[#333333]' : 'text-[#999999]'">{{ uploadData?.name ?
                                uploadData.name : '请选择上传的文件' }}</span>
                            <img src="../../../../assets/img/wj.png" alt="" class="w-6 h-6">
                        </div>
                    </el-upload>
                </el-form-item>
                <el-form-item label="项目号" prop="projectId">
                    <el-select v-model="formValue.projectId" placeholder="Select" class="w-full" size="large"
                        @change="getDtuList()">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </el-form-item>
                <el-form-item label="可选设备">
                    <el-transfer v-model="leftValue" filterable :titles="['未选设备', '已选设备']" :data="data"
                        filter-placeholder="关键字搜索" />
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
import { computed, onMounted, ref } from 'vue';
import { projectData } from '../../../../api/project'
import { optionalDtuList, uploadDtu } from '../../../../api'
import { getFormData } from '/@/utils/tools'

const breakpoints = useBreakpoints(breakpointsTailwind)
const largerThan2xl = breakpoints.greater('2xl') // only larger than sm
const largerThanMd = breakpoints.greater('md') // only larger than sm
const emits = defineEmits(['handleClose', 'bindSucess'])
const props = defineProps({
    bindVisible: {
        type: Boolean,
        default: false
    },
})

const formValue = ref({
    projectId: 0,
    file_name: ''
})
// 穿梭框数据
const data = ref([])
const leftValue = ref([])
const projectList = ref([])
const dtuList = ref([])
const uploadData = ref({})

const visible = computed(() => {
    return props.bindVisible
})

interface IGj {
    id: number
    file_name: string
};
interface Option {
    key: number
    label: string
    disabled?: boolean
}
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

const generateData = (_data: IGj[]): Option[] => {
    const data: Option[] = []
    for (let i = 0; i <= _data.length - 1; i++) {
        data.push({
            key: _data[i]?.id,
            label: _data[i]?.file_name,
            disabled: false,
        })
    }
    return data
}

const uploadFile = (e) => {
    uploadData.value = e.file
    console.log('e:', e)
}

/* 获取项目列表 */
const getProjectList = async () => {
    const res = await projectData({})
    if (res.code === 1) {
        projectList.value = res?.data?.data?.data
    }
}

/* 获取可选固件列表 */
const getDtuList = async () => {
    leftValue.value = []
    const res: any = await optionalDtuList({ project_id: formValue.value.projectId, file_name: uploadData.value })
    if (res.code === 1) {
        dtuList.value = res.data
        if (Array.isArray(res.data)) {
            data.value = generateData(res.data)
        }
    }

}


const handleClose = () => {
    emits('handleClose')
}

const handelBind = async () => {
    if (!uploadData.value.name) {
        ElMessage({
            message: '文件不能为空',
            type: 'error',
        })
        return
    }
    if (!leftValue.value.length) {
        ElMessage({
            message: '请选择固件',
            type: 'error',
        })
        return
    }
    const device_ids = leftValue.value.join(',')
    console.log({ project_id: formValue.value.projectId, device_ids, filename: uploadData.value })
    const res = await uploadDtu(getFormData({project_id: formValue.value.projectId, device_ids, filename: uploadData.value}));
    if (res.code === 1) {
        ElMessage({
            message: '上传成功！',
            type: 'success',
        })
        emits('bindSucess')
    }
}

onMounted(() => {
    getProjectList()
    getDtuList()
})

</script>

<style lang="scss" scoped>
:deep(.el-upload) {
    width: 100%;
}

:deep(.el-input) {
    --el-component-size-large: 50px;
    --el-border-radius-base: 10px;
}

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