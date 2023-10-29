<template>
    <div class='layout-navbar-search hidden-xs-only cursor-pointer flex flex-center px-2' :class='{ "open": isShow }'>
        <!-- @click.stop='changeStatus'  -->
        <div class='layout-navbar-search-select'>
            <el-select v-model="searchVal" filterable remote reserve-keyword placeholder="Search"
                :remote-method="remoteMethod" :loading="loading" @change="changeDevice">
                <el-option v-for="item in searchList" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
        </div>
        <svg-icon class-name='svg-icon' icon-class='svg-search' @click.stop='changeStatus' />
    </div>
</template>
<script lang='ts'>
import { defineComponent, Ref, ref, watch } from 'vue'
import { useLayoutStore } from '/@/store/modules/layout'
import { IMenubarList, ISetting } from '/@/type/store/layout'
import { homeSearch } from '/@/api/home'
import { useRouter } from 'vue-router'
import Fuse from 'fuse.js'

// 不使用则不加载
const pinyin = () => import('pinyin')

interface ISearchList extends IMenubarList {
    searchLabel: string
    pinyinTitle?: string
}
// 搜索查询
const search = async (searchList: Ref<ISearchList[]>, menuList: IMenubarList[], setting: ISetting) => {
    const fuseList: ISearchList[] = []
    const f = async (list: IMenubarList[], text: string) => {
        for (let v of list) {
            const obj: ISearchList = Object.assign({}, v, {
                searchLabel: text + v.meta.title
            })
            // 判断是否开启拼音搜索
            if (setting.usePinyinSearch) {
                const data = await pinyin()
                obj.pinyinTitle = data.default(v.meta.title, {
                    style: data.STYLE_NORMAL
                }).join('')
            }
            fuseList.push(obj)
            if (v.children && v.children.length > 0) {
                f(v.children, `${text + v.meta.title} > `)
            }
        }
    }
    await f(menuList, '')

    const FuseOpts = () => {
        return {
            shouldSort: true,
            threshold: 0.4,
            location: 0,
            distance: 100,
            minMatchCharLength: 1,
            includeScore: true,
            keys: setting.usePinyinSearch ? ['meta.title', 'path', 'pinyinTitle'] : ['meta.title', 'path']
        }
    }
    let fuse = new Fuse(fuseList, FuseOpts())

    watch(() => setting.usePinyinSearch, async () => {
        fuseList.splice(0, fuseList.length)
        await f(menuList, '')
        fuse = new Fuse(fuseList, FuseOpts())
    })

    const searchText = (query: string) => {
        if (query !== '') {
            searchList.value = fuse.search(query).map(v => v.item)
        } else {
            searchList.value = []
        }
    }

    return searchText
}
// search显示隐藏状态
const changeSearchStatus = (searchList: Ref<ISearchList[]>) => {
    const router = useRouter()
    const href = ref('')
    const isShow = ref(false)
    const elSelect = ref()
    const changeStatus = () => {
        isShow.value = !isShow.value
        if (isShow.value && elSelect.value) {
            elSelect.value.focus()
        }
    }

    const hideSearch = () => {
        href.value = ''
        searchList.value.splice(0, searchList.value.length)
        isShow.value = false
    }

    watch(isShow, (newValue) => {
        if (newValue) {
            document.body.addEventListener('click', hideSearch)
        } else {
            document.body.removeEventListener('click', hideSearch)
        }
    })

    const changeRoute = () => {
        router.push({ path: href.value })
        hideSearch()
    }

    return {
        href,
        changeRoute,
        changeStatus,
        isShow,
        elSelect,
        hideSearch
    }
}
export default defineComponent({
    name: 'Search',
    setup() {
        const loading = ref(false)
        const { getMenubar, getSetting } = useLayoutStore()
        const searchList: Ref<ISearchList[]> = ref([])
        const searchText: Ref<null | ((query: string) => void)> = ref(null)
        const searchVal = ref('')

        search(searchList, getMenubar.menuList, getSetting).then(data => {
            searchText.value = data
        })

        const searchFetchData = async (searchValue) => {
            try {
                const res = await homeSearch({ search: searchValue })
                return Promise.resolve(res)
            } catch (error) {
                return Promise.reject()
            }
        }

        const changeDevice = (val) => {
            sessionStorage.setItem('device_code', val)
            window.location.href = '/device'
        }

        const remoteMethod = async (query) => {
            if (query) {
                loading.value = true
                try {
                    const res = await searchFetchData(query)
                    searchList.value = res?.data.map((item) => {
                        return { value: item, label: item, key: item }
                    })
                } catch (error) {
                    searchList.value = []
                } finally {
                    loading.value = false
                }
            } else {
                searchList.value = []
            }

        }

        return {
            searchList,
            searchText,
            searchFetchData,
            changeDevice,
            loading,
            searchVal,
            remoteMethod,
            ...changeSearchStatus(searchList)
        }
    }
})
</script>

<style lang='postcss' scoped>
::v-deep(.el-input__inner) {
    border-top: none;
    border-left: none;
    border-right: none;
    border-radius: 0;
}

::v-deep(.el-select__caret) {
    display: none;
}

.layout-navbar-search {
    .layout-navbar-search-select {
        transition: width 0.2s;
        width: 0;
        overflow: hidden;
    }

    &.open {
        .layout-navbar-search-select {
            width: 185px;
        }
    }
}
</style>