<template>
    <div id="mapDiv" class="w-full h-full z-0"></div>
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()

const router = useRouter()

const props = defineProps({
    pos_info: {
        type: Object,
        default: () => { }
    }
})

const map = ref(null)
const markers = ref([])

const markerContent = ` <div class="custom-content-marker">
       <img src="http://114.55.33.117/libs/map/img/icon-accident.png">
    </div>`


const initMap = () => {

    map.value = new AMap.Map('mapDiv', {
        resizeEnable: true,
        lang: locale.value === 'zh' ? 'zh-cn' : "en",
        zoom: 5, //  地图显示的缩放级别
        zooms: [2, 22], // 地图缩放范围
        center: [116.40969, 37.43997405227057], //  地图中心点坐标 此处填【经度，纬度】
    });
    addMarkers()
    map.value.plugin(["AMap.MarkerClusterer"], function () {
        const cluster = new AMap.MarkerClusterer(map.value, markers.value, {
            gridSize: 80,
        });
    })
}

const addMarkers = () => {
    // 循环添加多个标记
    let datas: any = []
    for (let i in props.pos_info) {
        const marker = new AMap.Marker({
            position: [props.pos_info[i][0], props.pos_info[i][1]],
            map: map.value,
            image: 'http://114.55.33.117/libs/map/img/icon-accident.png',
            content: markerContent

        });
        markers.value.push(marker);
        //给标记点添加事件
        marker.on('click', (e) => openInfoWindow(e, i, props.pos_info[i]))
    }
}

const openInfoWindow = (e, code, val) => {
    console.log('e:', code, val)
    map.value.setZoomAndCenter(5, [e.lnglat.lng, e.lnglat.lat])

    const id = code
    const time = val[2]
    const status = val['status']

    const contentElement = document.createElement("div");//这里就是创建Dome元素
    contentElement.className = "custom-info-window";//给Dome设置类方便操作
    contentElement.innerHTML = `
    <div class="z-100 window p-1 pt-[6px] bg-[#fff] min-w-[240px] rounded-[4px]">
        <div class="header w-full flex items-center justify-between px-2">
            <span class="text-t3 text-[18px]">Device Information</span>
            <img src="/@/assets/img/close.png" alt="" class="w-[13px] h-[13px] close" id="close" onclick="closeInfo()">
        </div>
        <div class="px-2 w-full" style="line-height: 24px;">
            <div class="row text-[16px] text-t3 ">
                <span class="text-[16px]">Device ID：</span>
                <span class="text-primary" id="id" onclick="goTo(${id})">${id}</span>
            </div>
            <div class="row text-[16px] text-t3 ">
                <span class="text-[16px]">Time：</span>
                <span>${time}</span>
            </div>
            <div class="row text-[16px] text-t3 ">
                <span class="text-[16px]">Status：</span>
                <span>${status}</span>
            </div>
        </div>
    </div>`


    //创建信息窗体，也就是将上面做的窗体插入地图实例
    const infoWindow = new AMap.InfoWindow({
        isCustom: true, //使用自定义窗体
        content: contentElement,
        offset: new AMap.Pixel(15, -15),
    });
    infoWindow.open(map.value, [e.lnglat.lng, e.lnglat.lat])
}


onMounted(() => {
    if (!map.value) { initMap() }
})
watch(() => props.pos_info, (val) => {
    initMap()
}, { deep: true })

onBeforeMount(() => {
    //地图信息详情关闭按钮在onBeforeMount注册
    window.closeInfo = () => {
        map.value.clearInfoWindow();
    };
    window.goTo = (id) => {
        sessionStorage.setItem('device_code', id)
        window.location.href = '/device'
    }
})

</script>

<style scoped lang="scss">
:deep(.amap-logo) {
    display: none !important;
}

:deep(.amap-copyright) {
    display: none !important;
}

:deep(.custom-content-marker) {
    img {
        width: 30px;
    }
}
</style>