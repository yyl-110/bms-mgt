import {nextTick, ref} from "vue";
import elementResizeDetectorMaker from 'element-resize-detector'
import {debounce} from 'lodash';

/*chart 是echarts图的实例*/
export const chart = ref();
/*检测侧边栏是否缩放*/
let sidebarElm;
/*使用element-resize-detector 来监听侧边栏是否产生变化*/
const erd = elementResizeDetectorMaker();

/*使用防抖debounce函数，减少resize的次数*/
const chartResizeHandler = debounce(() => {
    if (chart.value) {
        chart.value.resize()
    }
},100)
/*在侧边栏宽度变化后，执行该函数*/
const sidebarResizeHandler = (e) => {
    nextTick(() => {
        chartResizeHandler()
    })
}
/*添加窗口大小变化监听*/
const initResizeEvent = () => {
    window.addEventListener('resize', chartResizeHandler)
}
/*移除窗口大小变化监听*/
const destroyResizeEvent = () => {
    window.removeEventListener('resize', chartResizeHandler)
}
/*初始化 sider监听*/
const initSidebarResizeEvent = () => {
    /*获取侧边栏的document*/
    sidebarElm = document.getElementsByClassName('sider-content')[0];
    if (sidebarElm) {
        erd.listenTo(sidebarElm, sidebarResizeHandler)
    }

}
/*移除 sider监听*/
const destroySidebarResizeEvent = () => {
    if (sidebarElm) {
        erd.removeListener(sidebarElm)
    }
}

export const mounted = () => {
    initResizeEvent();
    initSidebarResizeEvent();
}
export const beforeDestroy = () => {
    destroyResizeEvent();
    destroySidebarResizeEvent();
}
