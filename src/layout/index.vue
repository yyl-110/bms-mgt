<template>
    <div class='layout flex h-screen'>
        <div class='layout-sidebar-mask fixed w-screen h-screen bg-black bg-opacity-25 z-20'
            :class='{ "hidden": getMenubar.status !== 2 }' @click='changeCollapsed' />
        <div v-if='getSetting.mode === "vertical" || getMenubar.isPhone'
            class='layout-sidebar flex flex-col h-screen transition-width duration-200 shadow overflow-x-hidden' :class='{
                "w-[200px]": getMenubar.status === 0 || getMenubar.status === 2,
                "w-0": getMenubar.status === 3,
                "w-16": getMenubar.status === 1,
                "absolute z-30": getMenubar.status === 2 || getMenubar.status === 3,
            }'>
            <div class='layout-sidebar-logo flex h-[60px] relative flex-center shadow-lg'>
                <!-- v-if='getMenubar.status === 0 || getMenubar.status === 2' -->
                <span :class='getMenubar.status === 1 ? "hidden" : ""' class="cursor-pointer" @click="goHome">{{
                    $t('config.name') }}</span>
            </div>
            <div class='layout-sidebar-menubar flex flex-1 overflow-hidden'>
                <el-scrollbar wrap-class='scrollbar-wrapper overflow-x-hidden'>
                    <layout-menubar />
                </el-scrollbar>
            </div>
        </div>
        <div class='layout-main flex flex-1 flex-col overflow-x-hidden overflow-y-auto'>
            <div
                class='layout-main-navbar flex justify-between items-center h-[60px] shadow-sm overflow-hidden relative z-10'>
                <layout-navbar />
            </div>
            <div v-if='getSetting.showTags'
                class='layout-main-tags h-10 text-sm shadow-sm text-gray-600 relative flex items-center'>
                <layout-tags />
            </div>
            <div class="layout-state min-h-[50px] flex items-center" v-if="isShowProjectBar">
                <project-info />
            </div>
            <div class='layout-main-content flex-1 overflow-hidden'>
                <layout-content />
            </div>
        </div>
        <!-- 设置 -->
        <!-- <div class='layout-sidebar-sidesetting fixed right-0 top-64 z-10'>
            <layout-side-setting />
        </div> -->
    </div>
</template>

<script lang='ts'>
import { computed, defineComponent, onMounted, watch } from 'vue'
import LayoutContent from '/@/layout/components/content.vue'
import LayoutMenubar from '/@/layout/components/menubar.vue'
import LayoutNavbar from '/@/layout/components/navbar.vue'
import LayoutTags from '/@/layout/components/tags.vue'
import LayoutSideSetting from '/@/layout/components/sideSetting.vue'
import { throttle } from '/@/utils/tools'
import { useLayoutStore } from '/@/store/modules/layout'
import { useIndexStore } from '/@/store/modules/index'
import ProjectInfo from './components/projectInfo.vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

export default defineComponent({
    name: 'Layout',
    components: {
        LayoutContent,
        LayoutMenubar,
        LayoutNavbar,
        LayoutTags,
        LayoutSideSetting,
        ProjectInfo
    },
    setup() {
        const { changeDeviceWidth, changeCollapsed, getMenubar, getSetting } = useLayoutStore()
        const router = useRouter()

        const hiddenName = ['Device', 'PositionInfo', 'RunHistory', 'DeviceUpgrade', 'History', 'HistoryChart']
        const route = useRoute()
        const isShowProjectBar = computed(() => hiddenName.includes(route.name))


        onMounted(async () => {
            changeDeviceWidth()
            const throttleFn = throttle(300)
            let throttleF = async function () {
                await throttleFn()
                changeDeviceWidth()
            }
            window.addEventListener('resize', throttleF, true)
        })
        const goHome = () => {
            router.push('/home')
        }

        return {
            getMenubar,
            getSetting,
            goHome,
            changeCollapsed,
            isShowProjectBar,
        }
    }
})
</script>

<style lang='postcss' scoped>
::v-deep(.layout-sidebar-sidesetting .el-drawer__header) {
    margin-bottom: 0;
}

::v-deep(.el-menu--horizontal>.el-menu-item) {
    height: 48px;
}

::v-deep(.el-menu--horizontal>.el-sub-menu .el-sub-menu__title) {
    height: 48px;
    line-height: 48px;
}
</style>