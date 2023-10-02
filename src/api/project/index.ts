import request from '/@/utils/request'
import { AxiosResponse } from 'axios'

const api = {
    project: '/api/project/index',
}

interface IProjectParam {
    search: string
    project_name: string
    user_project_name: string
    description: string
    filed:string
}

export function projectData(param: IProjectParam): Promise<AxiosResponse<IResponse<string>>> {
    return request({
        url: api.project,
        method: 'post',
        data: param
    })
}