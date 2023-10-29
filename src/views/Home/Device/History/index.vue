<template>
    <div class="pb-5">
        <div class="p-5 bg-[#fff] rounded-[6px]">
            <el-table ref="tableRef" row-key="device_id" :data="tableData" style="width: 100%;" stripe height="700"
                @sort-change="handleSort">
                <el-table-column :align="'center'" type="index" :label="$t('table.index')" fixed width="120" :index="indexMethod" />
                <el-table-column :align="'center'" fixed label="Datetime" prop="Datetime" width="180" />
                <el-table-column :align="'center'" :label="item.title" v-for="(item, index) in  header">
                    <el-table-column :align="'center'" :label="val" v-for="(val) in  item?.children" :prop="val"
                        width="180"></el-table-column>
                </el-table-column>
                <el-table-column :align="'center'" label="Error Detail" prop="Error Detail" width="180" />
            </el-table>
            <div class="pageWrap h-[70px] flex justify-end items-center">
                <el-pagination v-model:current-page="page" background v-model:page-size="list_rows"
                    :page-sizes="[5, 10, 20, 30, 40]" layout="total, sizes, prev, pager, next, jumper"
                    :total="history_list?.total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';
import { getDeviceHistory } from '/@/api';

const list_rows = ref(10)
const page = ref(1)
let order = reactive({ value: { filed: '', order: '' } })
const history_list = ref({})
const tableData = ref<any>([])
const header = ref([])
const headerSub = ref([])


const fetchData = async (pages = page.value, size = list_rows.value) => {
    const device_code = sessionStorage.getItem('device_code')
    const _order = order.value.filed ? order.value : {}
    const res: any = await getDeviceHistory({ code: device_code, page: pages, list_rows: size, ..._order, lang: 'en' })
    if (res.code === 1) {
        history_list.value = res.data
        try {
            headerSub.value = res.data?.header?.header2
            tableData.value = (res?.data?.data || []).map((item: any) => {
                const obj = {}
                const data = (res.data?.header?.header2 || []).map((i: any, inx: number) => obj[i] = item[inx])
                return obj
            })
        } catch (error) {

        }

        /* 数据处理 */
        const header1 = res.data?.header?.header1
        header1.pop()
        const header2 = res.data?.header?.header2
        header2.shift()
        header2.pop()
        header.value = header1.map(i => {
            const list = header2.splice(0, i.col_nums)
            return { ...i, children: list }
        })

    }
}

const indexMethod = (index: number) => {
    return index + (page.value - 1) * list_rows.value + 1;
}


const handleSort = (e: any) => {
    const payload = { filed: e.prop, order: e.order === "ascending" ? 'asc' : e.order === "descending" ? 'desc' : '' }
    order = { value: payload }
    fetchData()

}

const handleSizeChange = (val) => {
    fetchData(page.value, val)
}
const handleCurrentChange = (val) => {
    fetchData(val, list_rows.value)
}

onMounted(() => {
    fetchData()
})

</script>

<style scoped></style>