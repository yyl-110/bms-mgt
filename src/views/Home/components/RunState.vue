<template>
    <div class="w-full px-6">
        <el-tabs type="border-card" v-model="tabVal">
            <el-tab-pane label="基本" name="1"></el-tab-pane>
            <el-tab-pane label="充电" name="2"></el-tab-pane>
            <el-tab-pane label="统计" name="3"></el-tab-pane>
            <el-tab-pane label="全部" name="4"></el-tab-pane>
        </el-tabs>
        <div v-show="tabVal === '2'" class="w-full mt-[15px] px-5">
            <table class="table table-striped table-bordered">
                <thead>
                    <tr style="text-align: center;">
                        <th>名称</th>
                        <th style="text-align: center;">状态</th>
                        <th>名称</th>
                        <th style="text-align: center;">状态</th>
                        <th>名称</th>
                        <th style="text-align: center;">状态</th>
                        <th>名称</th>
                        <th style="text-align: center;">状态</th>
                    </tr>
                </thead>
                <tbody class="cell-info-tbl">
                    <tr style="text-align: center;">
                        <th>A+(V)</th>
                        <td>N/A</td>
                        <th>充电机通信状态</th>
                        <td>N/A</td>
                        <th>充放电状态</th>
                        <td>N/A</td>
                        <th>加热状态</th>
                        <td>N/A</td>
                    </tr>
                    <tr style="text-align: center;">
                        <th>请求充电电压(V)</th>
                        <td>N/A</td>
                        <th>请求充电电流(A)</th>
                        <td>N/A</td>
                        <th>充电机输出电压(V)</th>
                        <td>N/A</td>
                        <th>充电机输出电流(A)</th>
                        <td>N/A</td>
                    </tr>
                    <tr style="text-align: center;">
                        <th>累计放电时间(h)</th>
                        <td>N/A</td>
                        <th>本次充电时间(h)</th>
                        <td>N/A</td>
                        <th>本次充电容量(Ah)</th>
                        <td>N/A</td>
                        <th>本次充电能量(kWh)</th>
                        <td>N/A</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-show="tabVal === '1'" class="w-full mt-[15px] px-5">
            <table class="table table-striped table-bordered">
                <thead>
                    <tr style="text-align: center;">
                        <th>名称</th>
                        <th style="text-align: center;">状态</th>
                        <th>名称</th>
                        <th style="text-align: center;">状态</th>
                        <th>名称</th>
                        <th style="text-align: center;">状态</th>
                        <th>名称</th>
                        <th style="text-align: center;">状态</th>
                    </tr>
                </thead>
                <tbody class="cell-info-tbl">
                    <tr style="text-align: center;">
                        <th>循环次数</th>
                        <td>N/A</td>
                        <th>累计运行时间(h)</th>
                        <td>N/A</td>
                        <th>累计充电时间(h)</th>
                        <td>N/A</td>
                        <th>累计放电时间(h)</th>
                        <td>N/A</td>
                    </tr>
                    <tr style="text-align: center;">
                        <th>充放电状态</th>
                        <td>N/A</td>
                        <th>加热状态</th>
                        <td>N/A</td>
                        <th>系统状态</th>
                        <td>N/A</td>
                        <th>自检代码</th>
                        <td>N/A</td>
                    </tr>
                    <tr style="text-align: center;">
                        <th>高压检测1(V)</th>
                        <td>N/A</td>
                        <th>高压检测2(V)</th>
                        <td>N/A</td>
                        <th>高压检测3(V)</th>
                        <td>N/A</td>
                        <th>高压检测4(V)</th>
                        <td>N/A</td>
                    </tr>
                    <tr style="text-align: center;">
                        <th>RL1</th>
                        <td>N/A</td>
                        <th>RL2</th>
                        <td>N/A</td>
                        <th>RL3</th>
                        <td>N/A</td>
                        <th>RL4</th>
                        <td>N/A</td>
                    </tr>
                    <tr style="text-align: center;">
                        <th>RL5</th>
                        <td>N/A</td>
                        <th>RL6</th>
                        <td>N/A</td>
                        <th>RL7</th>
                        <td>N/A</td>
                        <th>RL8</th>
                        <td>N/A</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-if="tabVal === '3'" class="w-full mt-[15px] px-5">
            <table class="table table-striped table-bordered">
                <thead>
                    <tr style="text-align: center;">
                        <th>名称</th>
                        <th style="text-align: center;">状态</th>
                        <th>名称</th>
                        <th style="text-align: center;">状态</th>
                        <th>名称</th>
                        <th style="text-align: center;">状态</th>
                        <th>名称</th>
                        <th style="text-align: center;">状态</th>
                    </tr>
                </thead>
                <tbody class="cell-info-tbl">
                    <tr style="text-align: center;">
                        <th>循环次数</th>
                        <td>N/A</td>
                        <th>累计运行时间(h)</th>
                        <td>N/A</td>
                        <th>累计充电时间(h)</th>
                        <td>N/A</td>
                        <th>累计放电时间(h)</th>
                        <td>N/A</td>
                    </tr>
                    <tr style="text-align: center;">
                        <th>本次充电容量(Ah)</th>
                        <td>N/A</td>
                        <th>本次放电容量(Ah)</th>
                        <td>N/A</td>
                        <th>本次充电能量(kWh)</th>
                        <td>N/A</td>
                        <th>本次放电能量(kWh)</th>
                        <td>N/A</td>
                    </tr>
                    <tr style="text-align: center;">
                        <th>累计充电容量(Ah)</th>
                        <td>N/A</td>
                        <th>累计放电容量(Ah)</th>
                        <td>N/A</td>
                        <th>累计充电能量(kWh)</th>
                        <td>N/A</td>
                        <th>累计放电能量(kWh)</th>
                        <td>N/A</td>
                    </tr>
                    <tr style="text-align: center;">
                        <th>本次充电时间(h)</th>
                        <td>N/A</td>
                        <th>本次放电时间(h)</th>
                        <td>N/A</td>
                        <th>本次运行时间(h)</th>
                        <td>N/A</td>
                        <th>SOH(%)</th>
                        <td>100</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div v-if="tabVal === '4'" class="w-full mt-[15px] px-5">
            <table class="table table-striped table-bordered">
                <thead>
                    <tr style="text-align: center;">
                        <th>名称</th>
                        <th style="text-align: center;">状态</th>
                        <th>名称</th>
                        <th style="text-align: center;">状态</th>
                        <th>名称</th>
                        <th style="text-align: center;">状态</th>
                        <th>名称</th>
                        <th style="text-align: center;">状态</th>
                    </tr>
                </thead>
                <tbody class="cell-info-tbl">
                    <tr style="text-align: center;">
                        <th>RL1</th>
                        <td>N/A</td>
                        <th>RL2</th>
                        <td>N/A</td>
                        <th>RL3</th>
                        <td>N/A</td>
                        <th>RL4</th>
                        <td>N/A</td>
                    </tr>
                    <tr style="text-align: center;">
                        <th>RL5</th>
                        <td>N/A</td>
                        <th>RL6</th>
                        <td>N/A</td>
                        <th>RL7</th>
                        <td>N/A</td>
                        <th>RL8</th>
                        <td>N/A</td>
                    </tr>
                    <tr style="text-align: center;">
                        <th>循环次数</th>
                        <td>N/A</td>
                        <th>累计运行时间(h)</th>
                        <td>N/A</td>
                        <th>累计充电时间(h)</th>
                        <td>N/A</td>
                        <th>累计放电时间(h)</th>
                        <td>N/A</td>
                    </tr>
                    <tr style="text-align: center;">
                        <th>充放电状态</th>
                        <td>N/A</td>
                        <th>加热状态</th>
                        <td>N/A</td>
                        <th>系统状态</th>
                        <td>N/A</td>
                        <th>自检代码</th>
                        <td>N/A</td>
                    </tr>
                    <tr style="text-align: center;">
                        <th>A+(V)</th>
                        <td>N/A</td>
                        <th>充电机通信状态</th>
                        <td>N/A</td>
                        <th>请求充电电压(V)</th>
                        <td>N/A</td>
                        <th>请求充电电流(A)</th>
                        <td>N/A</td>
                    </tr>
                    <tr style="text-align: center;">
                        <th>充电机输出电压(V)</th>
                        <td>N/A</td>
                        <th>充电机输出电流(A)</th>
                        <td>N/A</td>
                        <th>休眠计时时间(min)</th>
                        <td>N/A</td>
                        <th>休眠剩余时间(min)</th>
                        <td>N/A</td>
                    </tr>
                    <tr style="text-align: center;">
                        <th>高压检测1(V)</th>
                        <td>N/A</td>
                        <th>高压检测2(V)</th>
                        <td>N/A</td>
                        <th>高压检测3(V)</th>
                        <td>N/A</td>
                        <th>高压检测4(V)</th>
                        <td>N/A</td>
                    </tr>
                    <tr style="text-align: center;">
                        <th>常电电压(V)</th>
                        <td>N/A</td>
                    <th>KeyOn(V)</th>
                    <td>N/A</td>
                    <th>粘连代码</th>
                    <td>N/A</td>
                    <th>CC2 电阻(Ω)</th>
                    <td>N/A</td>
                </tr>
                <tr style="text-align: center;">
                    <th>CC 电阻(Ω)</th>
                    <td>N/A</td>
                    <th>CP 占空比(%)</th>
                    <td>N/A</td>
                    <th>国标状态1</th>
                    <td>N/A</td>
                    <th>国标状态2</th>
                    <td>N/A</td>
                </tr>
                <tr style="text-align: center;">
                    <th>本次充电容量(Ah)</th>
                    <td>N/A</td>
                    <th>本次放电容量(Ah)</th>
                    <td>N/A</td>
                    <th>本次充电能量(kWh)</th>
                    <td>N/A</td>
                    <th>本次放电能量(kWh)</th>
                    <td>N/A</td>
                </tr>
                <tr style="text-align: center;">
                    <th>累计充电容量(Ah)</th>
                    <td>N/A</td>
                    <th>累计放电容量(Ah)</th>
                    <td>N/A</td>
                    <th>累计充电能量(kWh)</th>
                    <td>N/A</td>
                    <th>累计放电能量(kWh)</th>
                    <td>N/A</td>
                </tr>
                <tr style="text-align: center;">
                    <th>本次充电时间(h)</th>
                    <td>N/A</td>
                    <th>本次放电时间(h)</th>
                    <td>N/A</td>
                    <th>本次运行时间(h)</th>
                    <td>N/A</td>
                    <th>SOH(%)</th>
                    <td>100</td>
                </tr>
                <tr style="text-align: center;">
                    <th>绝缘度(Ω/V)</th>
                    <td>N/A</td>
                    <th>绝缘电阻Rp(kΩ)</th>
                    <td>N/A</td>
                    <th>绝缘电阻Rn(kΩ)</th>
                    <td>N/A</td>
                    <th>保留</th>
                    <td>N/A</td>
                </tr>
                <tr style="text-align: center;">
                    <th>NTC1(℃)</th>
                    <td>N/A</td>
                    <th>NTC2(℃)</th>
                    <td>N/A</td>
                    <th>保留</th>
                    <td>N/A</td>
                    <th>保留</th>
                    <td>N/A</td>
                </tr>
            </tbody>
        </table>
    </div>

</div></template>

<script setup lang="ts">
import { ref } from 'vue';

const tabVal = ref('1')

</script>

<style scoped lang="scss">:deep(.el-tabs__content) {
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

}</style>