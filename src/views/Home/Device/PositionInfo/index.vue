<template>
    <div class="w-full h-full">
        <Map :pos_info="mapData" v-if="locale === 'zh'" />
        <Amap :pos_info="mapData" v-else />
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { getDeviceMap } from '/@/api';
import Map from '/@/components/common/Map.vue';
import { useIndexStore } from '/@/store/modules';
import { storeToRefs } from 'pinia';
import Amap from '/@/components/common/Amap.vue';
import { useI18n } from 'vue-i18n';
const indexStore = useIndexStore()
const _mapData = storeToRefs(indexStore)
const device_code: any = sessionStorage.getItem('device_code')
const { t, locale } = useI18n()

const mapData = computed(() => {
    const data = {}
    data[device_code] = {
        0: _mapData.mapInfo.value[0],
        1: _mapData.mapInfo.value[1],
        2: _mapData.mapInfo.value[2],
        3: _mapData.mapInfo.value[3],
        status: _mapData.mapInfo.value.status,
    }
    return data
})


onMounted(() => {
})

</script>

<style lang="scss">
:deep(.el-scrollbar__view) {
    height: 100% !important;
}
</style>