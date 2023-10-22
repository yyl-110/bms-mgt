<template>
    <div id="mapDiv" class="w-full h-full z-0"></div>
</template>

<script setup lang="ts">
import { createVNode, onMounted, watch, render } from 'vue';
import TestTemplate from './TestTemplate.vue'

const props = defineProps({
    pos_info: {
        type: Object,
        default: () => { }
    }
})

let map: any = null
let zoom: number = 4
let infoWindow: any = null

const init = () => {
    map = new window.T.Map('mapDiv', {
        attributionControl: false,
        inertia: false,
        lang: 'en'
    });
    map.centerAndZoom(new T.LngLat(116.40969, 37.43997405227057), zoom);
    //创建缩放平移控件对象
    const control = new T.Control.Zoom();
    control.setPosition(T_ANCHOR_BOTTOM_LEFT);
    //添加缩放平移控件
    map.addControl(control);

    let arrayObj = new Array();
    let icon = new T.Icon({
        iconUrl: 'http://114.55.33.117/libs/map/img/icon-accident.png'
    })
    let datas: any = []
    for (let i in props.pos_info) {
        let lnglat = new T.LngLat(props.pos_info[i][0], props.pos_info[i][1])
        let marker = new T.Marker(lnglat, { title: i, icon: icon });
        datas[lnglat.lat + lnglat.lng] = i + ',' + props.pos_info[i][5] + ',' + props.pos_info[i][2] + ',' + props.pos_info[i].status

        marker.addEventListener('click', function (e) {
            show(datas[e.lnglat.getLat() + e.lnglat.getLng()], { lat: e.lnglat.getLat(), lng: e.lnglat.getLng() })
        })

        arrayObj.push(marker);
    }

    let markers = new T.MarkerClusterer(map, { markers: arrayObj, });

}

// 创建信息窗口
const openInfoWindow = (lat, lng, val) => {
    if (infoWindow) infoWindow.closeInfoWindow()
    const data = val.split(',')
    // 创建虚拟节点并传参
    const infoWindowContent = createVNode(TestTemplate, {
        id: data[0],
        time: data[2],
        status: data[3]
    })
    let node = document.createElement('div') // 创建一个div节点
    render(infoWindowContent, node) // 实例组件挂载到node节点上
    // 监听组件点击事件
    infoWindowContent.el.addEventListener('click', (e) => {
        if (e.target.id === 'close') {
            infoWindow.closeInfoWindow()
        }
    })
    // 创建天地图信息窗口 infoWindowContent.el：test模板dom
    infoWindow = new T.InfoWindow(infoWindowContent.el, {
        closeButton: false // 关闭天地图弹框默认关闭图标
    })
    // 设置信息窗口经纬度(地图坐标) 成都
    infoWindow.setLngLat(new T.LngLat(lng, lat))
    // 地图添加信息窗口，地图自己去初始化哈，别直接复制说代码跑不起来，这里只是示例
    map.addOverLay(infoWindow)
}

const show = (val, location) => {
    openInfoWindow(location.lat, location.lng, val)
}

onMounted(() => {
    if (!map) { init() }
})
watch(() => props.pos_info, (val) => {
    init()
}, { deep: true })
</script>

<style scoped lang="scss">
:deep(.tdt-control-copyright) {
    display: none !important;
}

//	修改天地图信息窗口默认样式
:deep(.tdt-infowindow-content-wrapper, .tdt-infowindow-tip) {
    background-color: transparent;
}

:deep(.tdt-infowindow-content-wrapper) {
    border-radius: 6px;
    padding: 0;
}

:deep(.tdt-infowindow-content) {
    margin: 0;
}

:deep(.tdt-infowindow-tip-container) {
    display: none;
}
</style>