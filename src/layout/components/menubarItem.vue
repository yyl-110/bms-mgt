<template>
    <el-sub-menu v-if='menuList.children && menuList.children.length > 0' :key='menuList.path' :index='menuList.path'>
        <template #title>
            <svg-icon :icon-class='menuList.meta.icon || "icon-home"' class='mr-2.5 w-5 h-5' />
            <!-- <component :is='UseElIcon("el-icon-location")' /> -->
            <span>{{ menuList.meta.title }}</span>
        </template>
        <el-menu-item-group>
            <menubar-item v-for='v in menuList.children' :key='v.path' :index='v.path' :menu-list='v' />
        </el-menu-item-group>
    </el-sub-menu>

    <el-menu-item v-else :key='menuList.path' :index='menuList.path'>
        <svg-icon :icon-class='menuList.meta.icon || "icon-home"' class='mr-2.5 w-5 h-5' />
        <!-- <component :is='UseElIcon(menuList.meta.icon || "el-icon-setting")' /> -->
        <template #title>
            <span>
                {{ menuList.meta.title }}
            </span>
        </template>
    </el-menu-item>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { IMenubarList } from '/@/type/store/layout'
import { UseElIcon } from '/@/components/SvnIcon/elIcon'

export default defineComponent({
    name: 'MenubarItem',
    props: {
        menuList: {
            type: Object as PropType<IMenubarList>,
            default: () => { return {} }
        }
    },
    setup() {
        return {
            UseElIcon
        }
    }
})
</script>