import { useLayoutStore } from '../store/modules/layout'
import request from '/@/utils/request'
import axios, { AxiosResponse } from 'axios'

export const api = {
    child_device_index: '/api/child/index/index',
    device_index: '/api/home/run',
    addChild:'/api/child/index/add',
    delChild:'/api/child/index/del',
    childDevice: '/api/child/device/device',
    childDeviceIndex: '/api/child/device/index',
    deviceAdd: '/api/child/device/add',
    childUpdate: '/api/child/index/update',
    deviceDel: '/api/child/device/del',
    dtu: '/api/dtu',
    dtudtu: '/api/dtu/dtu',
    dtuUpload: '/api/dtu/upload',
    delDtu: '/api/dtu/del/ids',
    deviceIndexApi: '/api/device/index',
    deviceMap: '/api/device/index/map',
    runHistoryApi: '/api/device/index/runHistory',
    historyChart: '/api/device/index/chart',
    dtu_operation: '/api/device/dtu', // 500
    deviceHistory : '/api/device/history',
    dtuUpdate : '/api/device/dtu/update',
    historyDownload : '/api/device/history/download',
    qrcode:'/api/qr_code',
    historyTotal:'/api/device/history/total',
    childUpdateApi:'/api/child/index/update',
    projectUpdateApi:'/api/project/update',
    homeDown:'/api/home/_down',
    projectDown:'/api/project/_down',
    childDown:'/api/child/index/_down',
    childDeviceDown:'/api/child/device/_down',
}

/*
** 子用户设备列表
 */
export function childIndexIndex(params:any): Promise<AxiosResponse<IResponse<string>>> {
    return request({
        url: api.child_device_index,
        method: 'post',
        data: params
    })
}

/* 设备实时数据 */
export function deviceIndex(params:any): Promise<AxiosResponse<IResponse<string>>> {
    return request({
        url: api.device_index,
        method: 'post',
        data: params
    })
}
/* 添加子用户 */
export function addChild(params:any): Promise<AxiosResponse<IResponse<string>>> {
    return request({
        url: api.addChild,
        method: 'post',
        data: params
    })
}
/* 删除子用户 */
export function delChild(params:any): Promise<AxiosResponse<IResponse<string>>> {
    return request({
        url: api.delChild,
        method: 'post',
        data: params
    })
}

/* 子账户可绑定设备 */
export function getChildDevice(params:any): Promise<AxiosResponse<IResponse<string>>> {
    return request({
        url: api.childDevice,
        method: 'post',
        data: params
    })
}
/* 子用户设备列表 */
export function childDeviceIndex(params:any): Promise<AxiosResponse<IResponse<string>>> {
    return request({
        url: api.childDeviceIndex,
        method: 'post',
        data: params
    })
}
/* 绑定子设备 */
export function deviceAdd(params:any): Promise<AxiosResponse<IResponse<string>>> {
    return request({
        url: api.deviceAdd,
        method: 'post',
        data: params
    })
}
/* 绑定子设备 */
export function childUpdate(params:any): Promise<AxiosResponse<IResponse<string>>> {
    return request({
        url: api.childUpdate,
        method: 'post',
        data: params
    })
}
/* 解绑 */
export function deviceDel(params:any): Promise<AxiosResponse<IResponse<string>>> {
    return request({
        url: api.deviceDel,
        method: 'post',
        data: params
    })
}
/* 固件列表 */
export function dtuList(params:any): Promise<AxiosResponse<IResponse<string>>> {
    return request({
        url: api.dtu,
        method: 'post',
        data: params
    })
}
/* 可选固件 */
export function optionalDtuList(params:any): Promise<AxiosResponse<IResponse<string>>> {
    return request({
        url: api.dtudtu,
        method: 'post',
        data: params
    })
}
/* 升级 */
export function uploadDtu(params:any): Promise<AxiosResponse<IResponse<string>>> {
    return request({
        url: api.dtuUpload,
        method: 'post',
        data: params
    })
}
/* 删除固件 */
export function delDtu(params:any): Promise<AxiosResponse<IResponse<string>>> {
    return request({
        url: api.delDtu,
        method: 'post',
        data: params
    })
}
/* 获取实时数据 */
export function deviceIndexApi(params:any): Promise<AxiosResponse<IResponse<string>>> {
    return request({
        url: api.deviceIndexApi,
        method: 'post',
        data: {...params, hideLoading:true}
    })
}
/* 获取地图信息 */
export function getDeviceMap(params:any): Promise<AxiosResponse<IResponse<string>>> {
    return request({
        url: api.deviceMap,
        method: 'post',
        data: params
    })
}
/* 运行历史数据 */
export function runHistory(params:any): Promise<AxiosResponse<IResponse<string>>> {
    return request({
        url: api.runHistoryApi,
        method: 'post',
        data: params
    })
}
/* 运行历史图表 */
export function getHistoryChart(params:any): Promise<AxiosResponse<IResponse<string>>> {
    return request({
        url: api.historyChart,
        method: 'post',
        data: params
    })
}
/* 固件升级历史 */
export function dtuOperationList(params:any): Promise<AxiosResponse<IResponse<string>>> {
    return request({
        url: api.dtu_operation,
        method: 'post',
        data: params
    })
}
/* 历史数据 */
export function getDeviceHistory(params:any): Promise<AxiosResponse<IResponse<string>>> {
    return request({
        url: api.deviceHistory,
        method: 'post',
        data: params
    })
}
/* 固件升级 */
export function handleDtuUpdate(params:any): Promise<AxiosResponse<IResponse<string>>> {
    return request({
        url: api.dtuUpdate,
        method: 'post',
        data: params
    })
}
/* 获取二维码

 */
export function getQrcode(params:any): Promise<AxiosResponse<IResponse<string>>> {
    return request({
        url: api.qrcode,
        method: 'get',
        params: params
    })
}
/* 获取二维码

 */
export function getHistoryTotal(params:any): Promise<AxiosResponse<IResponse<string>>> {
    return request({
        url: api.historyTotal,
        method: 'post',
        data: params
    })
}
/* 
* 更新子账户信息
 */
export function childUpdateCompany(params:any): Promise<AxiosResponse<IResponse<string>>> {
    return request({
        url: api.childUpdateApi,
        method: 'post',
        data: params
    })
}
/* 
* 更新项目信息
 */
export function projectUpdate(params:any): Promise<AxiosResponse<IResponse<string>>> {
    return request({
        url: api.projectUpdateApi,
        method: 'post',
        data: params
    })
}
/* 固件升级 */
// export function downloadHistory(params:any){
//     const { getStatus } = useLayoutStore()
//     const baseUrl = '/api'
//     return axios({method:'post', url:baseUrl + api.historyDownload,data:params, headers: {token:getStatus.ACCESS_TOKEN}, responseType: 'blob'})
//     // return request({
//     //     url: api.historyDownload,
//     //     responseType:"blob",
//     //     method: 'post',
//     //     data: params
//     // })
// }

