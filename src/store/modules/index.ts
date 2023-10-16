import { defineStore } from "pinia";
import { deviceIndexApi,getDeviceMap,runHistory } from "/@/api";

export const useIndexStore = defineStore({
    id: 'index',
    state: ():any => ({
        projectInfo:{},
        mapInfo:{},
        runHistorySearch: {
            type:0,
            start_time:'',
            end_time:''
        },
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

     }
})