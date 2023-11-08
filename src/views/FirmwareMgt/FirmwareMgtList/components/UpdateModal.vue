<template>
    <el-dialog v-model="visible" :width='largerThan2xl ? "1010" : largerThanMd ? "80%" : "90%"' :show-close="false"
        :destroy-on-close="true" :close-on-click-modal="false">
        <template #header>
            <div
                class="my-header w-full h-[50px] md:h-[60px] bg-[#F5F5FD] flex justify-center items-center text-[18px] xl:text-[22px] text-t3 relative">
                {{ $t('firmware.update') }}
                <img src="/@/assets/img/close.png" class="w-[14px] h-[14px] cursor-pointer absolute right-[25px] top-[23px]"
                    @click="handleClose" alt="">
            </div>
        </template>
        <div class="content pt-[20px]">
            <el-form label-position="right" label-width="140" ref="addForm" :model="formValue" size="large">
                <el-form-item :label="$t('table.project_name')" prop="projectId">
                    <el-select v-model="formValue.projectId" placeholder="Select" filterable class="w-full" size="large"
                        @change="getDtuList()">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </el-form-item>
                <!-- <el-form-item :label="$t('table.kx')">
                    <el-select v-model="formValue.device_code" placeholder="Select" filterable class="w-full" size="large"
                        clearable>
                        <el-option v-for="item in data" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </el-form-item> -->
                <el-form-item :label="$t('table.kx')">
                    <el-transfer v-model="leftValue" filterable :titles="[$t('table.noSelect'), $t('table.selected')]"
                        :data="data" :filter-placeholder="$t('table.searchText')" />
                </el-form-item>
            </el-form>
        </div>
        <template #footer>
            <span class="dialog-footer flex justify-end items-center">
                <el-button type="primary" class="w-[150px] h-[40px] xl:h-[50px] rounded-[10px]" size="large"
                    @click="handelBind">
                    {{ $t('btn.confirm') }}
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';
import { computed, onMounted, ref, watch } from 'vue';
import { projectData } from '../../../../api/project'
import { getChildDevice, handleDtuUpdate, optionalDtuList, uploadDtu } from '../../../../api'
import { getFormData } from '/@/utils/tools'
import { ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()

const breakpoints = useBreakpoints(breakpointsTailwind)
const largerThan2xl = breakpoints.greater('2xl') // only larger than sm
const largerThanMd = breakpoints.greater('md') // only larger than sm
const emits = defineEmits(['handleClose', 'bindSucess'])
const props = defineProps({
    bindVisible: {
        type: Boolean,
        default: false
    },
    handelId: {
        type: Number,
    }
})

const formValue = ref({
    projectId: 0,
    device_code: ''
})
// 穿梭框数据
const data = ref([])
const leftValue = ref([])
const projectList = ref([])
const dtuList = ref([])

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
        list.unshift({ label: locale.value === 'zh' ? '全部' : 'All', value: 0 })
        return list
    }
    return []
})

const generateData = (_data: IGj[]): Option[] => {
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
    const res: any = await getChildDevice({ project_id: formValue.value.projectId })
    if (res.code === 1) {
        dtuList.value = res.data
        if (Array.isArray(res.data)) {
            let arrData = res.data
            let obj: any = {}
            arrData = arrData.reduce(function (item, next) {
                obj[next.device_id] ? '' : obj[next.device_id] = true && item.push(next);
                return item;
            }, []);
            data.value = generateData(arrData)
        }
    }

}


const handleClose = () => {
    emits('handleClose')
}

const handelBind = async () => {
    // if (!formValue.value.device_code) {
    //     ElMessage({
    //         message: '请选择设备',
    //         type: 'error',
    //     })
    //     return
    // }
    if (!leftValue.value.length) {
        ElMessage({
            message: t('table.chooseFirmware'),
            type: 'error',
        })
        return
    }
    const fd = new FormData()
    // leftValue.value.forEach((value, index) => {
    //     fd.append(`device_ids[${index}]`, Number(value))
    // })
    const device_ids = leftValue.value.join(',')
    const res = await handleDtuUpdate({ firmware_id: props.handelId, device_ids });
    if (res.code === 1) {
        ElMessage({
            message: t('table.success'),
            type: 'success',
        })
        leftValue.value = []
        emits('bindSucess')
    }
}

onMounted(() => {
    getProjectList()
    getDtuList()
})

watch(() => props.bindVisible, (val) => {
    if (!val) {
        formValue.value = {
            projectId: 0,
            device_code: ''
        }
    }
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