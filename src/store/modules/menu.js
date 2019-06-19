import {
    getJSONStore
} from '@/utils/localStorage' // 获取用户信息
const menu = {
    state: {
        menuList: null,
        leftmenuList: null,
        showSearchAll: false
    },
    mutations: {
        setMenuList: (state, data) => {
            state.menuList = data
        },
        setLeftMenu: (state, data) => {
            state.leftmenuList = data
        },
        setShowSearchAll: (state, data) => {
            state.showSearchAll = data
        }
    },
    actions: {
        getMenuList: ({
            state,
            commit
        }, list) => {
            let data = getJSONStore('menuList')
            commit('setMenuList', data)
        },
        getLeftMenu: ({
            state,
            commit
        }, item) => {
            // let data = getJSONStore('childrenmenuList')
            commit('setLeftMenu', item)
        },
        setShowSearch: ({
            state,
            commit
        }, data) => {
            commit('setShowSearchAll', data)
        }
    }
}
export default menu
