import request from '/@/utils/request'
import { AxiosResponse } from 'axios'

const api = {
    child_device_index: '/api/child/index/index',
    device_index: '/api/home/run',
    addChild:'/api/child/index/add',
    delChild:'/api/child/index/del'
}
/*
** 子用户设备列表
 */
export function childDeviceIndex(params:any): Promise<AxiosResponse<IResponse<string>>> {
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
