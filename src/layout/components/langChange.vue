<template>
    <div class="flex items-center ml-[5px] xl:ml-[15px]">
        <span class="text-t3 text-[16px] mr-1 xl:mr-5">语言/Lang：</span>
        <div class="flex items-center text-[16px] gap-x-5">
            <span :class="locale === 'zh' ? 'text-t3' : 'text-[#999999]'" class=" cursor-pointer"
                @click="changeLang('zh')">{{ $t('config.langZh') }}</span>
            <div class="line w-[1px] bg-[#DCDCDC] h-[17px]"></div>
            <span :class="locale === 'en' ? 'text-t3' : 'text-[#999999]'" class=" cursor-pointer"
                @click="changeLang('en')">{{ $t('config.langEn') }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()

const changeLang = (lang: string) => {
    locale.value = lang
    localStorage.setItem('lang', lang)// 重要！下面遇到问题里解释
}
</script>

<style scoped></style>