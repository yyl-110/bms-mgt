<template>
    <div class="w-full px-6">
        <el-tabs type="border-card" v-model="tabVal">
            <el-tab-pane :label="$t('device.nav1')" name="1"></el-tab-pane>
            <el-tab-pane :label="$t('device.nav2')" name="2"></el-tab-pane>
            <el-tab-pane :label="$t('device.nav3')" name="3"></el-tab-pane>
            <el-tab-pane :label="$t('device.nav4')" name="4"></el-tab-pane>
        </el-tabs>
        <div v-show="tabVal === '1'" class="w-full mt-[15px] px-5">
            <table class="table table-striped table-bordered">
                <thead>
                    <tr style="text-align: center;">
                        <th>{{ $t('table.name') }}</th>
                        <th style="text-align: center;">{{ $t('table.status') }}</th>
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
                            <th>{{ $t(`runStatus.base${inx + 1 + (4 * index)}`) }}</th>
                            <td>{{ val ?? 'N/A' }}</td>
                        </template>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-show="tabVal === '2'" class="w-full mt-[15px] px-5">
            <table class="table table-striped table-bordered">
                <thead>
                    <tr style="text-align: center;">
                        <th>{{ $t('table.name') }}</th>
                        <th style="text-align: center;">{{ $t('table.status') }}</th>
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
                            <th>{{ $t(`runStatus.cd${inx + 1 + (4 * index)}`) }}</th>
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
                        <th>{{ $t('table.name') }}</th>
                        <th style="text-align: center;">{{ $t('table.status') }}</th>
                    </tr>
                </thead>
                <tbody class="cell-info-tbl">
                    <tr style="text-align: center;" v-for="(item, index) in totalArr" :key="index">
                        <template v-for="(val, inx) in item" :key="inx">
                            <th>{{ $t(`runStatus.total${inx + 1 + (4 * index)}`) }}</th>
                            <td>{{ val ?? 'N/A' }}</td>
                        </template>
                    </tr>
                </tbody>
            </table>
        </div>

        <div v-if="tabVal === '4'" class="w-full mt-[15px] px-5">
            <table class="table table-striped table-bordered">
                <thead>
                    <tr style="text-align: center;">
                        <th>{{ $t('table.name') }}</th>
                        <th style="text-align: center;">{{ $t('table.status') }}</th>
                        <th>{{ $t('table.name') }}</th>
                        <th style="text-align: center;">{{ $t('table.status') }}</th>
                        <th>{{ $t('table.name') }}</th>
                        <th style="text-align: center;">{{ $t('table.status') }}</th>
                        <th>{{ $t('table.name') }}</th>
                        <th style="text-align: center;">{{ $t('table.status') }}</th>
                    </tr>
                </thead>
                <tbody class="cell-info-tbl">
                    <tr style="text-align: center;" v-for="(item, index) in allArr" :key="index">
                        <template v-for="(val, inx) in item" :key="inx">
                            <th>{{ $t(`runStatus.all${inx + 1 + (4 * index)}`) }}</th>
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

const ChgDsgStaList = {
    0: '非充非放',
    1: '充电',
    2: '放电',
    3: '其他'
}

const HeatStaList = {
    0: '否',
    1: '是',
    2: '其他',
}

const SysStaList = {
    0: '正常',
    1: '禁充',
    2: '禁放',
    3: '禁充禁放',
    4: '未知',
}

const baseArr = computed(() => {
    const arr = []
    arr.push(props.data?.StatisticInfo_Type1?.CycleNums)
    arr.push(props.data?.StatisticInfo_Type1?.RunTimeSum)
    arr.push(props.data?.StatisticInfo_Type1?.ChgTimeSum)
    arr.push(props.data?.StatisticInfo_Type1?.DsgTimeSum)
    const ChgDsgSta = ChgDsgStaList[props.data?.SysInfo_Type1?.ChgDsgSta]
    arr.push(ChgDsgSta)
    const HeatSta = HeatStaList[props.data?.SysInfo_Type1?.HeatSta]
    arr.push(HeatSta)
    const SysSta = SysStaList[props.data?.SysInfo_Type1.SysSta]
    arr.push(SysSta)
    arr.push(props.data?.SysInfo_Type1.SelfChkCode)
    arr.push(props.data?.SysInfo_Type1.Hv1)
    arr.push(props.data?.SysInfo_Type1.Hv2)
    arr.push(props.data?.SysInfo_Type1.Hv3)
    arr.push(props.data?.SysInfo_Type1.Hv4)
    const relayArr = props.data?.relay.map(item => {
        if (item === 0) {
            return '断开'
        }
        return item === 1 ? '闭合' : item
    })
    const newArr = arr.concat(relayArr)
    return _.chunk(newArr, 4)
})

const cdArr = computed(() => {
    const arr = []
    arr.push(props.data?.SysInfo_Type1.ChgOnVolt)
    arr.push(props.data?.SysInfo_Type1.ChgerCommuSta)
    const ChgDsgSta = ChgDsgStaList[props.data?.SysInfo_Type1?.ChgDsgSta]
    arr.push(ChgDsgSta)
    const HeatSta = HeatStaList[props.data?.SysInfo_Type1?.HeatSta]
    arr.push(HeatSta)
    arr.push(props.data?.SysInfo_Type1.ChgerReqVolt)
    arr.push(props.data?.SysInfo_Type1.ChgerReqCurr)
    arr.push(props.data?.SysInfo_Type1.ChgerOutVolt)
    arr.push(props.data?.SysInfo_Type1.ChgerOutCurr)
    arr.push(props.data?.StatisticInfo_Type1.ChgTimeSum)
    arr.push(props.data?.StatisticInfo_Type1.ChgTime)
    arr.push(props.data?.StatisticInfo_Type1.ChgCap)
    arr.push(props.data?.StatisticInfo_Type1.ChgEnergy)
    return _.chunk(arr, 4)
})

const allArr = computed(() => {
    const relayArr = props.data?.relay.map(item => {
        if (item === 0) {
            return '断开'
        }
        return item === 1 ? '闭合' : item
    })
    const arr = [...relayArr]
    arr.push(props.data?.StatisticInfo_Type1.CycleNums)
    arr.push(props.data?.StatisticInfo_Type1.RunTimeSum)
    arr.push(props.data?.StatisticInfo_Type1.ChgTimeSum)
    arr.push(props.data?.StatisticInfo_Type1.DsgTimeSum)
    const ChgDsgSta = ChgDsgStaList[props.data?.SysInfo_Type1?.ChgDsgSta]
    arr.push(ChgDsgSta)
    const HeatSta = HeatStaList[props.data?.SysInfo_Type1?.HeatSta]
    arr.push(HeatSta)
    const SysSta = SysStaList[props.data?.SysInfo_Type1.SysSta]
    arr.push(SysSta)
    arr.push(props.data?.SysInfo_Type1.SelfChkCode)
    arr.push(props.data?.SysInfo_Type1.ChgOnVolt)
    arr.push(props.data?.SysInfo_Type1.ChgerCommuSta)
    arr.push(props.data?.SysInfo_Type1.ChgerReqVolt)
    arr.push(props.data?.SysInfo_Type1.ChgerReqCurr)
    arr.push(props.data?.SysInfo_Type1.ChgerOutVolt)
    arr.push(props.data?.SysInfo_Type1.ChgerOutCurr)
    arr.push(props.data?.SysInfo_Type1.SleepTimeCnt)
    arr.push(props.data?.SysInfo_Type1.SleepLeftTime)
    arr.push(props.data?.SysInfo_Type1.Hv1)
    arr.push(props.data?.SysInfo_Type1.Hv2)
    arr.push(props.data?.SysInfo_Type1.Hv3)
    arr.push(props.data?.SysInfo_Type1.Hv4)
    arr.push(props.data?.SysInfo_Type1.VccVolt)
    arr.push(props.data?.SysInfo_Type1.KeyOnolt)
    arr.push(props.data?.SysInfo_Type1.RlyDiagCode)
    arr.push(props.data?.SysInfo_Type1.Cc2Res)
    arr.push(props.data?.SysInfo_Type1.CcRes)
    arr.push(props.data?.SysInfo_Type1.CpPwm)
    arr.push(props.data?.SysInfo_Type1.Gb27930_Sta1)
    arr.push(props.data?.SysInfo_Type1.Gb27930_Sta2)
    arr.push(props.data?.StatisticInfo_Type1.ChgCap)
    arr.push(props.data?.StatisticInfo_Type1.DsgCap)
    arr.push(props.data?.StatisticInfo_Type1.ChgEnergy)
    arr.push(props.data?.StatisticInfo_Type1.DsgEnergy)
    arr.push(props.data?.StatisticInfo_Type1.ChgCapSum)
    arr.push(props.data?.StatisticInfo_Type1.DsgCapSum)
    arr.push(props.data?.StatisticInfo_Type1.ChgEnergySum)
    arr.push(props.data?.StatisticInfo_Type1.DsgEnergySum)
    arr.push(props.data?.StatisticInfo_Type1.ChgTime)
    arr.push(props.data?.StatisticInfo_Type1.DsgTime)
    arr.push(props.data?.StatisticInfo_Type1.RunTime)
    arr.push(props.data?.soh)
    arr.push(props.data?.SysInfo_Type1.Insu)
    arr.push(props.data?.SysInfo_Type1.InsuRp)
    arr.push(props.data?.SysInfo_Type1.InsuRn)
    arr.push('N/A')
    arr.push(props.data?.SysInfo_Type1.Ntc1Val)
    arr.push(props.data?.SysInfo_Type1.Ntc2Val)
    arr.push('N/A')
    arr.push('N/A')
    return _.chunk(arr, 4)
})

const totalArr = computed(() => {
    const arr = []
    arr.push(props.data?.StatisticInfo_Type1.CycleNums)
    arr.push(props.data?.StatisticInfo_Type1.RunTimeSum)
    arr.push(props.data?.StatisticInfo_Type1.ChgTimeSum)
    arr.push(props.data?.StatisticInfo_Type1.DsgTimeSum)
    arr.push(props.data?.StatisticInfo_Type1.ChgCap)
    arr.push(props.data?.StatisticInfo_Type1.DsgCap)
    arr.push(props.data?.StatisticInfo_Type1.ChgEnergy)
    arr.push(props.data?.StatisticInfo_Type1.DsgEnergy)
    arr.push(props.data?.StatisticInfo_Type1.ChgCapSum)
    arr.push(props.data?.StatisticInfo_Type1.DsgCapSum)
    arr.push(props.data?.StatisticInfo_Type1.ChgEnergySum)
    arr.push(props.data?.StatisticInfo_Type1.DsgEnergySum)
    arr.push(props.data?.StatisticInfo_Type1.ChgTime)
    arr.push(props.data?.StatisticInfo_Type1.DsgTime)
    arr.push(props.data?.StatisticInfo_Type1.RunTime)
    arr.push(props.data?.soh)
    return _.chunk(arr, 4)
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