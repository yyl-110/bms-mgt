import { useLayoutStore } from '/@/store/modules/layout'
import axios from 'axios'
import { AxiosResponse } from 'axios'
import { ElLoading, ElNotification } from 'element-plus'
import i18n from '../i18n'
import { api } from '../api'
import { objectToQueryString } from './tools'

let loading:{close():void}
const baseURL = import.meta.env.MODE === 'development' ? '/api' : import.meta.env.VITE_BASE_API as string | undefined
// import.meta.env.VITE_BASE_API as string | undefined,
const {t,locale} = i18n.global
// 创建 axios 实例
const request = axios.create({
    // API 请求的默认前缀
    baseURL,
    timeout: 60000 // 请求超时时间
})

// 异常拦截处理器
const errorHandler = (error:{message:string}) => {
    const { getStatus, logout } = useLayoutStore()

    loading.close()
    let title = error.message
    const { status } = error?.response
    if(status === 401) {
        title = t('config.401')
        if (getStatus.ACCESS_TOKEN) {
            logout()
        }
    }
    ElNotification({
        title: t('config.requestFail'),
        message: title,
        type: 'error'
    })
    return Promise.reject(error)
}

// request interceptor
request.interceptors.request.use(config => {
    let {data, params, method} = config
    const {hideLoading = false} = data || {}
    if(method === 'get') {
        // params.lang = locale.value
        config.params = params
    }
    if(method === 'post') {
        // data.lang = locale.value
        config.data = data
    }
    const { getStatus } = useLayoutStore()
    if(!hideLoading) {
        loading = ElLoading.service({
            lock: true,
            text: 'Loading',
            // spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.4)'
        })
    }
    // config.headers['Content-Type'] = 'application/x-www-form-urlencode'
    const token = getStatus.ACCESS_TOKEN
    // 如果 token 存在
    // 让每个请求携带自定义 token 请根据实际情况自行修改
    if (token) {
        config.headers['token'] = token
        config.headers['lang'] = locale.value === 'zh' ? 'zh-cn' : 'en'
    }
    return config
}, errorHandler)

// response interceptor
request.interceptors.response.use((response:AxiosResponse<IResponse>) => {
    const { data } = response
    loading?.close()
    if(data.code !== 1) {
        const title = t('config.requestFail')
        ElNotification({
            title,
            message: data.msg,
            type: 'error'
        })
        return Promise.reject(new Error(data.msg || 'Error'))
    }
    return response.data
}, errorHandler)

export const downloadHistory = (params:any) => {
    const { getStatus } = useLayoutStore()
    const query = objectToQueryString({...params,token:getStatus.ACCESS_TOKEN,lang: locale.value === 'zh' ? 'zh-cn' : 'en'})
    const url = `${baseURL}/api/device/history/download?${query}`
    window.open(url)
    // return axios({method:'get', url:baseURL + '/api/device/history/download',params:params, headers: {token:getStatus.ACCESS_TOKEN}, responseType: 'blob'})
}

export const tableDown = (params:any, type:string) => {
    const { getStatus } = useLayoutStore()
    const query = objectToQueryString({...params,token:getStatus.ACCESS_TOKEN,lang: locale.value === 'zh' ? 'zh-cn' : 'en'})
    const url = `${baseURL}${api[type]}?${query}`
    console.log('url:', url)
    window.open(url)
}

export default request