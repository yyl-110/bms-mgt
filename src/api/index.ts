import request from '/@/utils/request'
import { AxiosResponse } from 'axios'

const api = {
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
    delDtu: '/api/dtu/del/ids/1',

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
export function deviceIndex(): Promise<AxiosResponse<IResponse<string>>> {
    return request({
        url: api.device_index,
        method: 'post',
        data: {}
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
/* 可选固件 */
export function uploadDtu(params:any): Promise<AxiosResponse<IResponse<string>>> {
    return request({
        url: api.dtuUpload,
        method: 'post',
        data: params
    })
}
/* 可选固件 */
export function delDtu(params:any): Promise<AxiosResponse<IResponse<string>>> {
    return request({
        url: api.delDtu,
        method: 'post',
        data: params
    })
}

