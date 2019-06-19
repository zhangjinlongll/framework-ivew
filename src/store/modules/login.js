import {
    getJSONStore
} from '@/utils/localStorage' // 获取用户信息

const user = {
    state: {
        accountList: []
    },
    mutations: {
        setAccountList: (state, data) => {
            state.accountList = data
        }
    },
    actions: {
        // 设置登录信息
        setAccountList: ({
            state,
            commit
        }) => {
            let data = getJSONStore('betaAccountList')
            commit('setAccountList', data)
        }
    }
}
export default user
