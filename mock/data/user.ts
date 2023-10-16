import { IMenubarList } from '/@/type/store/layout'
export const user = [
    { name: 'admin', pwd: 'admin' },
    { name: 'dev', pwd: 'dev' },
    { name: 'test', pwd: 'test' }
]

export const role = [
    { name: 'admin', description: '管理员' },
    { name: 'dev', description: '开发人员' },
    { name: 'test', description: '测试人员' }
]

export const user_role = [
    { userName: 'admin', roleName: 'admin' },
    { userName: 'dev', roleName: 'dev' },
    { userName: 'test', roleName: 'test' }
]

export const permission = [
    { name: 'add', description: '新增' },
    { name: 'update', description: '修改' },
    { name: 'remove', description: '删除' }
]

export const role_route = [
    { roleName: 'admin', id: 1, permission: [] },
    { roleName: 'admin', id: 10, permission: [] },
    { roleName: 'admin', id: 2, permission: [] },
    { roleName: 'admin', id: 20, permission: [] },
    { roleName: 'admin', id: 21, permission: [] },
    { roleName: 'admin', id: 22, permission: [] },
    { roleName: 'admin', id: 3, permission: [] },
    { roleName: 'admin', id: 30, permission: [] },
    { roleName: 'admin', id: 300, permission: [] },
    { roleName: 'admin', id: 31, permission: [] },
    { roleName: 'admin', id: 310, permission: [] },
    { roleName: 'admin', id: 4, permission: [] },
    { roleName: 'admin', id: 40, permission: [] },
    { roleName: 'admin', id: 41, permission: [] },
    { roleName: 'admin', id: 42, permission: [] },
    { roleName: 'admin', id: 43, permission: [] },
    { roleName: 'admin', id: 5, permission: [] },
    { roleName: 'admin', id: 50, permission: ['add', 'update', 'remove'] },

    { roleName: 'dev', id: 1, permission: [] },
    { roleName: 'dev', id: 10, permission: [] },
    { roleName: 'dev', id: 5, permission: [] },
    { roleName: 'dev', id: 50, permission: ['add'] },

    { roleName: 'test', id: 1, permission: [] },
    { roleName: 'test', id: 10, permission: [] },
    { roleName: 'test', id: 5, permission: [] },
    { roleName: 'test', id: 50, permission: ['update'] }
]

export const route:Array<IMenubarList> = [
    {
        id: 1,
        parentId: 0,
        name: "Home",
        path: "/",
        redirect: "/home",
        component: "Layout",
        meta: {
            title: "首页",
            icon: "svg-home",
        }
    },
    {
        id: 50,
        parentId: 1,
        name: "HomePage",
        path: "/home",
        component: "Home",
        meta: {
            title: "首页",
            alwaysShow:true,
            icon: "svg-home",
        }
    },
    {
        id: 51,
        parentId: 1,
        name: "Device",
        path: "/device",
        display:0,
        component: "RealTime",
        meta: {
            title: "实时状态",
            icon: "svg-status"
        }
    },
    {
        id: 52,
        parentId: 1,
        name: "PositionInfo",
        path: "/positioninfo",
        display:0,
        component: "PositionInfo",
        meta: {
            title: "位置状态",
            icon: "svg-location"
        }
    },
    {
        id: 53,
        parentId: 1,
        name: "RunHistory",
        path: "/runhistory",
        display:0,
        component: "RunHistory",
        meta: {
            title: "运行历史",
            icon: "svg-play"
        }
    },
    {
        id: 54,
        parentId: 1,
        name: "DeviceUpgrade",
        path: "/deviceupgrade",
        component: "DeviceUpgrade",
        display:0,

        meta: {
            title: "固件升级",
            icon: "svg-update"
        }
    },
    {
        id: 55,
        parentId: 1,
        name: "History",
        path: "/history",
        component: "History",
        display:0,

        meta: {
            title: "历史数据",
            icon: "svg-history"
        }
    },
    {
        id: 55,
        parentId: 1,
        name: "HistoryChart",
        path: "/historychart",
        display:0,
        component: "HistoryChart",
        meta: {
            title: "历史图表",
            icon: "svg-chart"
        }
    },
    {
        id: 2,
        parentId: 0,
        name: "Project",
        path: "/Project",
        redirect: "/project/list",
        component: "Layout",
        meta: {
            title: "项目管理",
            icon: "svg-project"
        }
    },
    {
        id: 20,
        parentId: 2,
        name: "ProjectList",
        path: "/Project/list",
        component: "ProjectList",
        meta: {
            title: "项目列表",
            icon: "svg-project"
        }
    },
    {
        id: 3,
        parentId: 0,
        name: "UserMgt",
        path: "/user-mgt",
        component: "Layout",
        redirect: "/user-mgt/sub",
        meta: {
            title: "用户管理",
            icon: "svg-userMgt",
            "alwaysShow": true
        }
    },
    {
        id: 30,
        parentId: 3,
        name: "UserMgtSub",
        path: "/user-mgt/sub",
        component: "UserMgtSub",
        meta: {
            title: "子用户",
            icon: "svg-user"
        }
    },
    {
        id: 31,
        parentId: 3,
        name: "UserMgtSubList",
        path: "/user-mgt/sub/list",
        component: "UserMgtSubList",
        meta: {
            title: "子用户",
            icon: "el-icon-user",
            hidden:true,
            activeMenu:'/user-mgt/sub'
        }
    },
    {
        id: 4,
        parentId: 0,
        name: "FirmwareMgt",
        path: "/firmware-mgt",
        component: "Layout",
        redirect: "/firmware-mgt/list",
        meta: {
            title: "固件管理",
            icon: "svg-fMgt",
            alwaysShow: true
        }
    },
    {
        id: 40,
        parentId: 4,
        name: "FirmwareMgtList",
        path: "/firmware-mgt/list",
        component: "FirmwareMgtList",
        meta: {
            title: "固件列表",
            icon: "svg-list"
        }
    }
]