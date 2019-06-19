import Vue from 'vue'
import Vuex from 'vuex'
import menu from './modules/menu'
import user from './modules/user'
import login from './modules/login'
import modules from './modules/index'
import getters from './getters'
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        menu,
        user,
        login,
        ...modules
    },
    getters
})
export default store
