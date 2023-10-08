import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { IMenubarList } from '/@/type/store/layout'
import { components } from '/@/router/asyncRouter'

const Components:IObject<() => Promise<typeof import('*.vue')>> = Object.assign({}, components, {
    Layout: (() => import('/@/layout/index.vue')) as unknown as () => Promise<typeof import('*.vue')>,
    Redirect: (() => import('/@/layout/redirect.vue')) as unknown as () => Promise<typeof import('*.vue')>,
    LayoutBlank: (() => import('/@/layout/blank.vue')) as unknown as () => Promise<typeof import('*.vue')>
})

// 静态路由页面
export const allowRouter:Array<IMenubarList> = [
    {
        name: 'Home',
        path: '/',
        component: Components['Layout'],
        redirect: '/home',
        meta: { title: '首页', icon: 'el-icon-star' },
        children: [
            {
                name: 'Home',
                path: '/home',
                component: Components['Home'],
                meta: { title: '首页', icon: 'el-icon-home' },
                // children: [
                //     {
                //         name: 'Device',
                //         path: '/device',
                //         component: Components['Device'],
                //         redirect: '/home/device/index',
                //         meta: { title: '设备', icon: 'el-icon-home' },
                //         children: [
                //             {
                //                 name: 'DeviceIndex',
                //                 path: '/index',
                //                 component: Components['PositionInfo'],
                //                 meta: { title: '设备', icon: 'el-icon-home' }
                //             }
                //         ]
                //     }
                // ]
            }
        ]
    },
    {
        name: 'ErrorPage',
        path: '/ErrorPage',
        meta: { title: '错误页面', icon: 'el-icon-eleme',hidden: true },
        component: Components.Layout,
        redirect: '/ErrorPage/404',
        children: [
            {
                name: '401',
                path: '/ErrorPage/401',
                component: Components['401'],
                meta: { title: '401', icon: 'el-icon-tools' }
            },
            {
                name: '404',
                path: '/ErrorPage/404',
                component: Components['404'],
                meta: { title: '404', icon: 'el-icon-tools' }
            }
        ]
    },
    {
        name: 'RedirectPage',
        path: '/redirect',
        component: Components['Layout'],
        meta: { title: '重定向页面', icon: 'el-icon-eleme', hidden: true },
        children: [
            {
                name: 'Redirect',
                path: '/redirect/:pathMatch(.*)*',
                meta: {
                    title: '重定向页面',
                    icon: ''
                },
                component: Components.Redirect
            }
        ]
    },
    {
        name: 'Login',
        path: '/Login',
        component: Components.Login,
        meta: { title: '登录', icon: 'el-icon-eleme', hidden: true }
    }
]

const router = createRouter({
    history: createWebHistory(), // createWebHistory
    routes: allowRouter as RouteRecordRaw[]
})

export default router