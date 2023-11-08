import { defineStore } from "pinia";
import { deviceIndexApi,getDeviceMap,runHistory } from "/@/api";
import dayjs from "dayjs";

export const useIndexStore = defineStore({
    id: 'index',
    state: ():any => ({
        projectInfo:{},
        mapInfo:{},
        runHistorySearch: {
            type:'',
            start_time:'',
            end_time:'',
            month:'',
        },
        runHistoryChartSearch: {
            start_time:dayjs().format('YYYY-MM-DD HH:mm:ss'),
            end_time:dayjs().format('YYYY-MM-DD HH:mm:ss')
        },
        isFullscreenState:false
    }),
    getters: {
        getProjectInfo ():any {
            return this.projectInfo
        },
        getMapInfo ():any {
            return this.mapInfo
        },
        getRunHistory():any {
            return this.runHistorySearch
        },
    },
    actions: {
        handleRunHistorySearch (val:any){
            this.runHistorySearch = val
        },
        handleRunHistoryChartSearch (val:any){
            this.runHistoryChartSearch = val
        },
       async getDeviceIndex ():Promise<void>{
        const device_code = sessionStorage.getItem('device_code')
        if(device_code) {
            const res = await deviceIndexApi({code:device_code})
            if(res.code === 1) {
                this.projectInfo = res.data
            }
        }
        },
       async handelGetMapInfo ():Promise<void>{
        const device_code = sessionStorage.getItem('device_code')
        if(device_code) {
            const res = await getDeviceMap({code:device_code})
            if(res.code === 1) {
                this.mapInfo = res.data
            }
        }
        },
         changeFullscreenState(val:any) {
            this.isFullscreenState = val
        }

     }
})