import request from '/@/utils/request'
import axios, { AxiosResponse } from 'axios'
import { IMenubarList } from '/@/type/store/layout'
const baseURL = import.meta.env.MODE === 'development' ? '/api' : import.meta.env.VITE_BASE_API as string | undefined


const api = {
    login: '/api/user/login',
    verify: '/api/user/verify',
    logout:'/api/user/logout',
    getUser: '/api/User/getUser',
    getRouterList: '/api/home/rule',
    publickey: '/api/User/Publickey'
}

export interface loginParam {
    userName: string,
    password: string,
    code:string,
}

export function login(param: loginParam):Promise<AxiosResponse<IResponse<string>>> {
    return request({
        url: api.login,
        method: 'post',
        data: param
    })
}
export function loginout(param: any):Promise<AxiosResponse<IResponse<string>>> {
    return request({
        url: api.logout,
        method: 'post',
        data: param
    })
}
export function verify():Promise<AxiosResponse<IResponse<string>>> {
    return axios.get(baseURL + '/api/user/verify',{ responseType:'arraybuffer' })
    // return axios.get(import.meta.env.VITE_BASE_API as string | undefined + '/api/user/verify',{ responseType:'arraybuffer' })
}

export function publickey():Promise<AxiosResponse<IResponse<string>>> {
    return request({
        url: api.publickey,
        method: 'get'
    })
}

interface IGetuserRes {
    name: string
    role: Array<string>
}

export function getUser(): Promise<AxiosResponse<IResponse<IGetuserRes>>> {
    return request({
        url: api.getUser,
        method: 'get'
    })
}
export function getRouterList(params:any): Promise<AxiosResponse<IResponse<Array<IMenubarList>>>> {
    return request({
        url: api.getRouterList,
        method: 'post',
        data: params
    })
}