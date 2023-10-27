import request from '/@/utils/request'
import { AxiosResponse } from 'axios'

const api = {
    home: '/api/home',
    home_history: '/api/home/run',
    home_total:'/api/home/total',
    homeDeviceList:'/api/home/device_list',
    homeUpdateApi:'/api/home/update',
    homeSearchApi:'/api/home/search'
}

interface IHomeParam {
    type: string
    search: string
    project_name: string
    user_project_name: string
    idetify_code: string
    version:string
    status?:string
}



export function homeData(param: any): Promise<AxiosResponse<IResponse<string>>> {
    return request({
        url: api.home,
        method: 'post',
        data: param
    })
}
export function homeHistory(param: IHomeParam): Promise<AxiosResponse<IResponse<string>>> {
    return request({
        url: api.home_history,
        method: 'post',
        data: param
    })
}
export function getHomeTotal(param: any): Promise<AxiosResponse<IResponse<string>>> {
    return request({
        url: api.home_total,
        method: 'post',
        data: param
    })
}
export function getHomeDeviceList(param: any): Promise<AxiosResponse<IResponse<string>>> {
    return request({
        url: api.homeDeviceList,
        method: 'post',
        data: param
    })
}
export function HomeUpdate(param: any): Promise<AxiosResponse<IResponse<string>>> {
    return request({
        url: api.homeUpdateApi,
        method: 'post',
        data: param
    })
}
export function homeSearch(param: any): Promise<AxiosResponse<IResponse<string>>> {
    return request({
        url: api.homeSearchApi,
        method: 'post',
        data: {...param,hideLoading:true}
    })
}