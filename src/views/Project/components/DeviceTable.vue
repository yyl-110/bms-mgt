<template>
    <div class="tableWrap w-full bg-[#fff] rounded-[10px] mt-5 px-5">
        <div class="header flex items-center h-[60px]">
            <span class="text-t3 font-[500] text-[20px] flex-shrink-0">项目设备</span>
            <div class="input w-[60%]">
                <el-input v-model="searchVal" placeholder="输入关键字搜索" size="large" class="ml-[10px]"
                    @keyup.enter.native="search">
                    <template #append>
                        <el-button :icon="Search" @click="search" />
                    </template>
                </el-input>
            </div>
            <el-button class="text-[#999] absolute right-1 sm:right-5">
                <img src="/@/assets/img/export.png" class="w-5 h-5 hidden sm:block" alt="">
                {{ $t('table.export') }}
            </el-button>
        </div>
        <div class="w-full pb-5">
            <el-table ref="tableRef" row-key="device_id" :data="tableData" style="width: 100%" stripe
                @sort-change="handleSort">
                <el-table-column :align="'center'" type="index" label="序号" width="80" :index="indexMethod" />
                <el-table-column :align="'center'" prop="identify_code" label="设备ID" width="180" sortable>
                    <template #default="scope">
                        <div class="text-primary cursor-pointer" @click="goToDetail(scope.row.identify_code)">
                            {{ scope.row.identify_code }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column :align="'center'" prop="desc" width="200" label="描述" />
                <el-table-column :align="'center'" prop="version" label="固定版本" width="180" sortable />
                <el-table-column :align="'center'" prop="status" label="状态" sortable />
            </el-table>

            <div class="pageWrap h-[70px] flex justify-end items-center">
                <el-pagination v-model:current-page="page" background v-model:page-size="list_rows"
                    :page-sizes="[5, 10, 20, 30, 40]" layout="total, sizes, prev, pager, next, jumper"
                    :total="device_list?.total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import { Search } from '@element-plus/icons-vue';
import { onMounted, reactive, ref } from 'vue';
import { homeData } from '/@/api/home';
import { useRouter } from 'vue-router';


const props = defineProps({
    projectName: {
        type: String,
        default: ''
    }
})

const searchVal = ref('')
const tableData = ref([])

const showMap = ref(false)
const list_rows = ref(10)
const page = ref(1)
let order = reactive({ value: { filed: '', order: '' } })
const device_list = ref({})

const search = () => { }

const indexMethod = (index: number) => {
    return index + 1
}

const getHomeData = async (pages = page.value, size = list_rows.value) => {
    const _order = order.value.filed ? order.value : {}
    const res = await homeData({ project_name: props.projectName, page: pages, list_rows: size, ..._order })
    if (res.code === 1) {
        device_list.value = res.data?.device_list
        tableData.value = res.data?.device_list?.data
    }
}

const handleSizeChange = (val) => {
    getHomeData(page.value, val)

}

const handleCurrentChange = (val) => {
    getHomeData(val, list_rows.value)

}

const handleSort = (e) => {
    const payload = { filed: e.prop, order: e.order === "ascending" ? 'asc' : e.order === "descending" ? 'desc' : '' }
    order = { value: payload }
    getHomeData()
}

const goToDetail = (code) => {
    sessionStorage.setItem('device_code', code)

    window.location.href = '/device'
}

onMounted(() => {
    getHomeData()
})

</script>

<style scoped lang="scss"></style>