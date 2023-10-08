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
        pid: 0,
        name: "/home",
        title: "Home",
        ismenu: 1,
        icon: null,
        display: 1
    },
    {
        id: 2,
        pid: 1,
        name: "/home/index",
        title: "Home",
        ismenu: 1,
        icon: null,
        display: 1
    },
    {
        id: 3,
        pid: 0,
        name: "/project",
        title: "ProjectList",
        ismenu: 1,
        icon: "el-icon-project",
        display: 1
    },
    {
        id: 4,
        pid: 3,
        name: "/project/list",
        title: "ProjectList",
        ismenu: 1,
        icon: "el-icon-project",
        display: 1
    },
    {
        id: 5,
        pid: 0,
        name: "/user-mgt",
        title: "UserMgt",
        ismenu: 1,
        icon: "el-icon-userMgt",
        display: 1
    },
    {
        id: 6,
        pid: 5,
        name: "/user-mgt/sub",
        title: "UserMgtSub",
        ismenu: 1,
        icon: "el-icon-user",
        display: 1
    },
    {
        id: 13,
        pid: 5,
        name: "/user-mgt/sub/list",
        title: "UserMgtSubList",
        ismenu: 1,
        icon: "el-icon-user",
        display: 0
    },
    {
        id: 7,
        pid: 0,
        name: "/firmware-mgt",
        title: "FirmwareMgt",
        ismenu: 1,
        icon: "el-icon-mgt",
        display: 1
    },
    {
        id: 8,
        pid: 7,
        name: "/firmware-mgt/list",
        title: "FirmwareMgtList",
        ismenu: 1,
        icon: "el-icon-list",
        display: 1
    },
    {
        id: 9,
        pid: 7,
        name: "/user-mgt/device",
        title: "Sub user devices",
        ismenu: 1,
        icon: null,
        display: 0
    },
    {
        id: 10,
        pid: 2,
        name: "/home/index/device/index",
        title: "RealTime",
        ismenu: 1,
        icon: null,
        display: 0
    },
    {
        id: 11,
        pid: 2,
        name: "/home/index/device/map",
        title: "PositionInfo",
        ismenu: 1,
        icon: null,
        display: 0
    },
    {
        id: 12,
        pid: 2,
        name: "/home/index/device/runHistory",
        title: "RunHistory",
        ismenu: 1,
        icon: null,
        display: 0
    }
]