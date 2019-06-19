import {
    getJSONStore
} from '@/utils/localStorage' // 获取用户信息

const user = {
    state: {
        userData: null,
        userRoleData: null,
        buttonStatusList: []
    },
    mutations: {
        setUserData: (state, data) => {
            state.userData = data
        },
        setUserRoleData: (state, data) => {
            state.userRoleData = data
        },
        setButtonStatusList: (state, data) => {
            state.buttonStatusList = data
        }
    },
    actions: {
        // 设置用户信息
        setUserInfo: ({
            state,
            commit
        }) => {
            let data = getJSONStore('znUserdata')
            commit('setUserData', data)
        },
        setUserRoleInfo: ({
            state,
            commit
        }) => {
            let data = getJSONStore('znUserRoledata')
            commit('setUserRoleData', data)
        },
        setButtonStatusListInfo: ({
            state,
            commit
        }) => {
            let data = getJSONStore('buttonStatusList')
            commit('setButtonStatusList', data)
        }
    }
}
export default user
