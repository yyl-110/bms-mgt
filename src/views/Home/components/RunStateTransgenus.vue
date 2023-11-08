<template>
    <div class="w-full px-6">
        <el-tabs type="border-card" v-model="tabVal">
            <el-tab-pane :label="$t('device.nav10')" name="1"></el-tab-pane>
            <el-tab-pane :label="$t('device.nav11')" name="2"></el-tab-pane>
            <el-tab-pane :label="$t('device.nav12')" name="3"></el-tab-pane>
        </el-tabs>
        <div v-if="tabVal === '1'" class="w-full mt-[15px] px-5">
            <table class="table table-striped table-bordered">
                <thead>
                    <tr style="text-align: center;">
                        <th>{{ $t('table.name') }}</th>
                        <th style="text-align: center;">{{ $t('table.status') }}</th>
                        <th>{{ $t('table.name') }}</th>
                        <th style="text-align: center;">{{ $t('table.status') }}</th>
                        <th>{{ $t('table.name') }}</th>
                        <th style="text-align: center;">{{ $t('table.status') }}</th>
                    </tr>
                </thead>
                <tbody class="cell-info-tbl">
                    <tr style="text-align: center;" v-for="(item, index) in baseArr" :key="index">
                        <template v-for="(val, inx) in item" :key="inx">
                            <th>{{ $t(`runStatus.vd${inx + 1 + (3 * index)}`) }}</th>
                            <td v-if="inx === 0 && index === 0">{{ ms[val] ?? 'N/A' }}</td>
                            <td v-else-if="inx === 1 && index === 0">{{ dw[val] ?? 'N/A' }}</td>
                            <td v-else-if="inx === 0 && index === 1">{{ zy[val] ?? 'N/A' }}</td>
                            <td v-else-if="inx === 1 && index === 1">{{ sf[val] ?? 'N/A' }}</td>
                            <td v-else>{{ val ?? 'N/A' }}</td>
                        </template>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-if="tabVal === '2'" class="w-full mt-[15px] px-5">
            <table class="table table-striped table-bordered">
                <thead>
                    <tr style="text-align: center;">
                        <th>{{ $t('table.name') }}</th>
                        <th style="text-align: center;">{{ $t('table.status') }}</th>
                        <th>{{ $t('table.name') }}</th>
                        <th style="text-align: center;">{{ $t('table.status') }}</th>
                        <th>{{ $t('table.name') }}</th>
                        <th style="text-align: center;">{{ $t('table.status') }}</th>
                    </tr>
                </thead>
                <tbody class="cell-info-tbl">
                    <tr style="text-align: center;" v-for="(item, index) in cdArr" :key="index">
                        <template v-for="(val, inx) in item" :key="inx">
                            <th>{{ $t(`runStatus.ws${inx + 1 + (3 * index)}`) }}</th>
                            <td>{{ val ?? 'N/A' }}</td>
                        </template>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-if="tabVal === '3'" class="w-full mt-[15px] px-5">
            <table class="table table-striped table-bordered">
                <thead>
                    <tr style="text-align: center;">
                        <th>{{ $t('table.name') }}</th>
                        <th style="text-align: center;">{{ $t('table.status') }}</th>
                        <th>{{ $t('table.name') }}</th>
                        <th style="text-align: center;">{{ $t('table.status') }}</th>
                        <th>{{ $t('table.name') }}</th>
                        <th style="text-align: center;">{{ $t('table.status') }}</th>
                    </tr>
                </thead>
                <tbody class="cell-info-tbl">
                    <tr style="text-align: center;" v-for="(item, index) in totalArr" :key="index">
                        <template v-for="(val, inx) in item" :key="inx">
                            <th>{{ $t(`runStatus.hs${inx + 1 + (3 * index)}`) }}</th>
                            <td>{{ val ?? 'N/A' }}</td>
                        </template>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import _ from 'lodash'
const props = defineProps({
    data: {
        type: Object,
        default: () => { }
    }
})

const ms = ref({ 0: "标准模式", 1: "标准模式", 2: "标准模式", 3: "标准模式" })
const dw = ref({ 0: "空挡", 1: "后退", 2: "前进" })
const zy = ref({ 0: "无人", 1: "有人", })
const sf = ref({ 0: "释放", 1: "刹车" })

const baseArr = computed(() => {
    const arr = []
    arr.push(props.data?.speed_mode)
    arr.push(props.data?.gear_pos)
    arr.push(props.data?.speed)
    arr.push(props.data?.seat_status)
    arr.push(props.data?.handbrake)
    arr.push(props.data?.l_volt)
    arr.push(props.data?.acc_pedal)
    arr.push(props.data?.brake_pedal)
    arr.push(props.data?.run_time)
    arr.push(props.data?.total_mile)
    arr.push(props.data?.vcu_lvl)
    arr.push(props.data?.vcu_code)
    return _.chunk(arr, 3)
})

const cdArr = computed(() => {
    const arr = []
    arr.push(props.data?.speed_rate)
    arr.push(props.data?.torque)
    arr.push(props.data?.in_volt)
    arr.push(props.data?.bus_curr)
    arr.push(props.data?.three_curr)
    arr.push(props.data?.c_temp)
    arr.push(props.data?.motor_temp)
    arr.push(props.data?.motor_flt_lvl)
    arr.push(props.data?.motor_flt_code)
    return _.chunk(arr, 3)
})
const totalArr = computed(() => {
    const arr = []
    arr.push(props.data?.pump_rate)
    arr.push(props.data?.pump_torque)
    arr.push(props.data?.p_in_volt)
    arr.push(props.data?.p_bus_curr)
    arr.push(props.data?.p_three_curr)
    arr.push(props.data?.p_temp)
    arr.push(props.data?.p_motor_temp)
    arr.push(props.data?.pressure_flt_lvl)
    arr.push(props.data?.pressure_flt_code)
    return _.chunk(arr, 3)
})


const tabVal = ref('1')

</script>

<style scoped lang="scss">
:deep(.el-tabs__content) {
    display: none;
}

:deep(.el-tabs--border-card) {
    border: none;

}

:deep(.el-tabs__header) {
    background: #F5F5FD;
    border-radius: 10px 10px 0px 0px;
    border: none;
}

:deep(.el-tabs__item) {
    padding: 0 45px !important;
    border: none !important;
    --el-bg-color-overlay: transparent;

    &.is-active {
        background: url('../../../assets/img/navbg.png') no-repeat;
        // background-color: transparent;
        background-size: 100% 100%;
        background-position: center center;
    }
}

.table-bordered {
    border: 1px solid #E5E5E5;
}

.table {
    width: 100%;
    max-width: 100%;
    margin-bottom: 20px;
    border-collapse: collapse;
    border-spacing: 0;
    background-color: transparent;

    tbody {
        color: #333333;

        tr {
            height: 40px;

            th {
                font-weight: 400;
            }

            &:nth-child(2n) {
                background: #FAFAFA;
            }

            &:not(:last-child) {
                border-bottom: 1px solid #E5E5E5;
            }
        }
    }

    thead {
        background: #F6F7FC;
        height: 40px;

        th {
            font-size: 14px;
            font-weight: 400;
            color: #666666;
        }
    }

}
</style>