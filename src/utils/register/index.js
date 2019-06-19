import Vue from 'vue'
import plugins from './plugin'
import gFunc from '../gFunc.js'
/**
 * 把一些全局对象和一些全局方法，注册到Vue原型上
 */
Vue.use({
    install (Vue, options) {
        // 注册第三方库
        for (let key in plugins) {
            Vue.prototype['$$' + key] = plugins[key]
        }
        for (let key in gFunc) {
            Vue.prototype['$$' + key] = gFunc[key]
        }
    }
})
