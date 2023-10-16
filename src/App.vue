<template>
    <ElConfigProvider :locale="locale === 'en' ? en : zh">
        <router-view />
    </ElConfigProvider>
</template>

<script lang='ts'>
import { defineComponent, ref, Ref, watch } from 'vue'
import zh from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'
import { ElConfigProvider } from 'element-plus'
import { changeThemeDefaultColor } from '/@/utils/changeThemeColor'
import { ITheme } from '/@/type/config/theme'
import theme from '/@/config/theme'
import { useLayoutStore } from '/@/store/modules/layout'
import { useI18n } from 'vue-i18n'

export default defineComponent({
    name: 'App',
    components: {
        ElConfigProvider
    },
    setup() {
        const { locale } = useI18n()
        changeThemeDefaultColor()
        const { getSetting } = useLayoutStore()

        // 重新获取主题色
        const f = () => {
            let themeArray = theme()
            return getSetting.theme >= themeArray.length ? themeArray[0] : themeArray[getSetting.theme]
        }

        let themeStyle: Ref<ITheme> = ref(f())
        watch(() => getSetting.theme, () => themeStyle.value = f())
        watch(() => getSetting.color.primary, () => themeStyle.value = f())

        watch(() => locale.value, () => {
            window.location.reload()
        })

        return {
            locale,
            en,
            zh,
            themeStyle,
            getSetting
        }
    }
})
</script>

<style lang='postcss'>
.layout-sidebar-sidesetting>i {
    background-color: v-bind(themeStyle.sidebarActiveBg);
    color: v-bind(themeStyle.sidebarColor);
}

.layout-sidebar {
    background-color: v-bind(themeStyle.sidebarBg);

    .layout-sidebar-logo {
        background-color: v-bind(themeStyle.logoBg || themeStyle.sidebarBg);
        color: v-bind(themeStyle.logoColor || '#E5E5E5');
        font-weight: 600;
    }

    .el-menu {
        background-color: v-bind(themeStyle.sidebarBg);
        border-right: 0;

        .el-menu {
            background-color: v-bind(themeStyle.sidebarChildrenBg);
        }
    }

    .el-sub-menu__title {
        color: v-bind(themeStyle.sidebarColor);
    }

    .el-menu-item {
        color: v-bind(themeStyle.sidebarColor);
    }

    .el-menu-item:focus,
    .el-menu-item:hover,
    .el-sub-menu__title:hover {
        background-color: transparent;
        color: v-bind(themeStyle.sidebarActiveColor);
    }

    .el-menu-item-group__title {
        padding: 0;
    }

    .el-menu-item.is-active {
        background-color: v-bind(themeStyle.sidebarActiveBg);
        color: v-bind(themeStyle.sidebarActiveColor);
        border-right: 3px solid v-bind(themeStyle.sidebarActiveBorderRightBg);
    }

    .el-sub-menu.is-active>.el-sub-menu__title,
    .el-sub-menu.is-active>.el-sub-menu__title>i {
        color: v-bind(themeStyle.sidebarActiveColor);
    }
}

.layout-main-navbar {
    background-color: v-bind(getSetting.mode === "vertical" || getSetting.isPhone ? themeStyle.navbarBg : themeStyle.sidebarBg);
    color: v-bind(getSetting.mode === "vertical" || getSetting.isPhone ? themeStyle.navbarColor : themeStyle.sidebarColor);

    .el-breadcrumb .el-breadcrumb__inner,
    .el-breadcrumb .el-breadcrumb__separator,
    .el-breadcrumb .el-breadcrumb__inner:hover,
    .el-breadcrumb .el-breadcrumb__separator:hover,
    .el-dropdown {
        color: v-bind(themeStyle.navbarColor);
    }

    .layout-sidebar-menubar {
        .el-menu {
            background-color: v-bind(themeStyle.sidebarBg);
            border-right: 0;
        }

        .el-menu--horizontal {
            &>.el-menu-item {
                color: v-bind(themeStyle.sidebarColor);
            }

            &>.el-sub-menu .el-sub-menu__title {
                color: v-bind(themeStyle.sidebarColor);
            }

            .el-menu-item:not(.is-disabled):focus,
            .el-menu-item:not(.is-disabled):hover {
                background-color: v-bind(themeStyle.sidebarActiveBg);
                color: v-bind(themeStyle.sidebarActiveColor);
            }

            &>.el-sub-menu .el-sub-menu__title:hover {
                background-color: v-bind(themeStyle.sidebarActiveBg);
                color: v-bind(themeStyle.sidebarActiveColor);
            }

            &>.el-menu-item-group__title {
                padding: 0;
            }

            &>.el-menu-item.is-active {
                background-color: v-bind(themeStyle.sidebarActiveBg);
                color: v-bind(themeStyle.sidebarActiveColor) !important;
                border-right: 3px solid v-bind(themeStyle.sidebarActiveBorderRightBg);
            }

            &>.el-sub-menu.is-active>.el-sub-menu__title,
            &>.el-sub-menu.is-active>.el-sub-menu__title>i {
                color: v-bind(themeStyle.sidebarActiveColor);
            }
        }
    }
}

.layout-main-tags {
    background-color: v-bind(themeStyle.tagsbg);
    color: v-bind(themeStyle.tagsColor);

    .layout-tags-active {
        background-color: v-bind(themeStyle.tagsActiveBg);
        color: v-bind(themeStyle.tagsActiveColor);
    }
}

.layout-main-content {
    background-color: v-bind(themeStyle.mainBg);
}

.el-popper {
    .el-menu-item-group__title {
        padding: 0;
    }
}
</style>