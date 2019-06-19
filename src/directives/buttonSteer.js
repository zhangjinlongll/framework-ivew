import store from '@/store'
import { getJSONStore } from '@/utils/localStorage'
export default function install (Vue) {
    Vue.directive('button-steer', {
        bind (el, binding, vnode) {
            let buttonName = el.innerText
            if (store.state.user.buttonStatusList && store.state.user.buttonStatusList.length) {
                btnOpt(store.state.user.buttonStatusList)
            }
            // 按钮处理
            function btnOpt (data) {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].businessName && (data[i].businessName.trim() == buttonName.trim()) && !data[i].selected && el.parentNode) {
                        el.parentNode.removeChild(el)
                    }
                }
            }
        },
        update (el, binding) {
            let buttonName = el.innerText
            if (store.state.user.buttonStatusList && store.state.user.buttonStatusList.length) {
                btnOpt(store.state.user.buttonStatusList)
            }
            // 按钮处理
            function btnOpt (data) {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].businessName && (data[i].businessName.trim() == buttonName.trim()) && !data[i].selected && el.parentNode) {
                        el.parentNode.removeChild(el)
                    }
                }
            }
        }
    })
}
