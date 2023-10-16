<template>
    <div class="w-full px-6">
        <el-tabs type="border-card">
            <el-tab-pane label="基本"></el-tab-pane>
            <el-tab-pane label="充电"></el-tab-pane>
            <el-tab-pane label="统计"></el-tab-pane>
            <el-tab-pane label="全部"></el-tab-pane>
        </el-tabs>
    </div>
</template>

<script setup lang="ts">

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
</style>