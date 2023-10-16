<template>
    <el-menu :mode='getMenubar.isPhone ? "vertical" : getSetting.mode' :default-active='activeMenu'
        :collapse='getMenubar.status === 1 || getMenubar.status === 3' :class='{
            "el-menu-vertical-demo": true,
            "w-[200px]": getMenubar.status === 0 || getMenubar.status === 2,
            "w-0": getMenubar.status === 3,
            "w-16": getMenubar.status === 1,
            "w-full": getSetting.mode === "horizontal" && !getMenubar.isPhone,
        }' :collapse-transition='false' :unique-opened='true' @select='onOpenChange'>
        <menubar-item v-for='v in filterMenubarData' :key='v.path' :index='v.path' :menu-list='v' />
    </el-menu>
</template>

<script lang='ts'>
import { defineComponent, computed } from 'vue'
import MenubarItem from '/@/layout/components/menubarItem.vue'
import { useRoute, useRouter } from 'vue-router'
import { IMenubarList } from '/@/type/store/layout'
import { useLayoutStore } from '/@/store/modules/layout'
import { useIndexStore } from '/@/store/modules'

// 过滤隐藏的菜单，并提取单条的子菜单
const filterMenubar = (menuList: IMenubarList[], isShowHomeChild: boolean) => {
    const f = (menuList: IMenubarList[]) => {
        let arr: IMenubarList[] = []
        const _menuList = !isShowHomeChild ? menuList.filter(v => (!v.meta.hidden && (v.parentId !== 1))) : menuList.filter(v => (!v.meta.hidden))
        console.log('_menuList:', _menuList)
        _menuList.forEach(v => {
            let child = v.children && v.children.filter(v => !v.meta.hidden)
            let currentItem = v
            if (!v.meta.alwaysShow && child && child.length === 1) {
                [currentItem] = child
            }
            arr.push(currentItem)
            if (currentItem.children && currentItem.children.length > 0) {
                arr[arr.length - 1].children = f(currentItem.children)
            }
        })
        return arr
    }
    return f(menuList)
}

export default defineComponent({
    name: 'LayoutMenubar',
    components: {
        MenubarItem
    },
    setup() {
        const hiddenName = ['Device', 'PositionInfo', 'RunHistory', 'DeviceUpgrade', 'History', 'HistoryChart']
        const route = useRoute()
        const router = useRouter()
        const { getMenubar, setRoutes, changeCollapsed, getSetting, changeProjectBarStatus } = useLayoutStore()
        const { getDeviceIndex, handelGetMapInfo } = useIndexStore()
        let isShowHomeChild = hiddenName.includes(route.name)
        const filterMenubarData = filterMenubar(getMenubar.menuList, isShowHomeChild)
        setRoutes(filterMenubarData)

        const activeMenu = computed(() => {
            switch (route?.name) {
                case 'Device':
                    getDeviceIndex()
                    changeProjectBarStatus(1)
                    break;
                case 'PositionInfo':
                    handelGetMapInfo()
                    changeProjectBarStatus(2)
                    break;
                case 'RunHistory':
                    getDeviceIndex()
                    changeProjectBarStatus(3)
                    break;
                case 'DeviceUpgrade':
                    getDeviceIndex()
                    changeProjectBarStatus(4)
                    break;
                case 'History':
                    getDeviceIndex()
                    changeProjectBarStatus(5)
                    break;
                case 'HistoryChart':
                    getDeviceIndex()
                    changeProjectBarStatus(6)
                    break;
                default:
                    changeProjectBarStatus(1)
                    break;
            }
            if (route.meta.activeMenu) return route.meta.activeMenu
            return route.path
        })
        const onOpenChange = (d: any) => {
            router.push({ path: d })
            getMenubar.status === 2 && changeCollapsed()
        }
        return {
            getMenubar,
            filterMenubarData,
            activeMenu,
            onOpenChange,
            getSetting
        }
    }
})
</script>