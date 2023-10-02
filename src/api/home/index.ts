import request from '/@/utils/request'
import { AxiosResponse } from 'axios'

const api = {
    home: '/api/home',
    home_history: '/api/home/run'
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



export function homeData(param: IHomeParam): Promise<AxiosResponse<IResponse<string>>> {
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