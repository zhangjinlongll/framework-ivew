/**
 * create by dragon
 * 2019/05/30
 * init
 */
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
import store from './store'
import iView from 'iview'
import ZnBaseTable from '@mobile-component/zn_vue_ui_basetable'
import ZnBasePage from '@mobile-component/zn_vue_ui_basepage'
import ZnFullSelect from '@/components/common/select/fullSelect'
// import '../static/scss/theme/index.scss'
// import '../static/less/theme/common.less'
import './utils/register'
import './directives'
import filter from './utils/filters'
Vue.use(BootstrapVue)
Vue.use(iView)
Vue.use(filter)
Vue.use(ZnBaseTable)
Vue.use(ZnBasePage)
Vue.component('zn-full-select', ZnFullSelect)

router.beforeEach((to, from, next) => {
    iView.Message.destroy()
    // 路由进入下一个路由对象前，判断是否需要登陆
    // 存储targeturl 排除登录页
    if (to.name != 'Login') {
        localStorage.setItem('zntargeturl', location.href)
    }
    // 更新pageId
    try {
        var mli = JSON.parse(localStorage.menuListAll)
        var _menuId = null
        var _hash = location.href.split('#')[1]
        if (location.href.indexOf('#') !== -1) {
            _hash = location.href.split('#')[1].split('/')
        }
        var _hashStr = _hash && _hash.length >= 2 ? '#/' + _hash[1] : ''
        var mEach = function (obj) {
            obj.forEach(function (v) {
                if (!v) {
                    return false
                }
                if (v.url && v.url === _hashStr) {
                    _menuId = v.menuId
                }
                if (v.childs && v.childs.length > 0) {
                    mEach(v.childs)
                }
            })
        }
        mEach(mli)
        var convert = function (str) {
            var count = 0
            var strArray = str.toUpperCase().split('')
            strArray.forEach(function (item, index) {
                count += item.charCodeAt() - 64 + index * 25
            })
            return count
        }
        if (!_menuId) {
            _menuId = '0' + convert(_hashStr)
        }
        var metaTags = document.getElementsByTagName('meta')
        for (var i = 0; i < metaTags.length; i++) {
            if (metaTags[i].getAttribute('name') == 'pageId') {
                metaTags[i].setAttribute('content', _menuId)
            }
        }
    } catch (e) {
    }
    next()
})

/* eslint-disable no-new */
new Vue({
    el: '#znlhApp',
    router,
    store,
    template: '<App/>',
    components: {
        App
    }
})
