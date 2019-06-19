import store from '@/store'
import AsyncValidator from 'async-validator'
import iView from 'iview'
import { setJSONStore, removeStore } from '@/utils/localStorage' // 获取用户信息

// 兼容本地，url是否加ZNLHApp
const sysPrefix = () => {
    let _sysPrefix = location.origin
    if (process.env.NODE_ENV !== 'development') { // 本地
        _sysPrefix = location.origin + '/ZNLHApp'
    }
    return _sysPrefix
}

// 获取按钮权限
const getButtonSteer = (vm) => {
    removeStore('buttonStatusList')
    let userData = store.state.user.userData
    // 获取当前路由url
    let _menuId = null
    let _hash = null
    if (location.href.indexOf('#') !== -1) {
        _hash = location.href.split('#')[1].split('/')
    }
    let _hashStr = _hash && _hash.length >= 2 ? '#/' + _hash[1] : ''
    // 获取菜单权限树
    vm.$$api_base_usertree({
        data: {
            'systemId': 1000,
            'userId': userData.userId
        },
        fn: (data) => {
            queryPermissions(data.data)
        }
    })
    // 获取按钮权限
    function queryPermissions (data) {
        getCurMenuId(data)
        let params = {
            systemId: 1000,
            userId: userData.userId,
            menuId: _menuId
        }
        if (!_menuId) {
            if (_hashStr != '#/dashboard') {
                if (process.env.NODE_ENV !== 'development') { // 本地开发不做限制
                    let menuListAll = window.localStorage.menuListAll
                    if (menuListAll) {
                        let list = JSON.parse(menuListAll)
                        getCurMenuId(list)
                        if (_menuId) { // 判断路由是否在全量菜单里 解决详情页没有配置问题
                            iView.Message.error({
                                content: '您没有菜单权限',
                                duration: 1,
                                onClose: function () {
                                    location.href = sysPrefix() + '/#/dashboard'
                                }
                            })
                        }
                    }
                }
            }
            return
        }
        vm.$$api_user_noHasBtn({
            data: params,
            fn: (data) => {
                setJSONStore('buttonStatusList', data.data)
                vm.$store.dispatch('setButtonStatusListInfo')
            }
        })
    }
    // 匹配当前路由menuId
    function getCurMenuId (obj) {
        obj.forEach(function (v) {
            if (!v) {
                return false
            }
            if (v.url) {
                v.url = v.url.trim()
                if (v.url.indexOf('/ZNLHApp/') != -1) {
                    v.url = v.url.replace('/ZNLHApp/', '')
                }
                if (v.url === _hashStr) {
                    _menuId = v.menuId
                }
            }
            if (v.childs && v.childs.length > 0) {
                getCurMenuId(v.childs)
            }
        })
    }
}

// 下拉列表传值(废弃)
const gSelectSet = (vm, data) => {
    let _this = vm
    if (_this.$refs[data.type] && _this.$refs[data.type].aiSelectObj) {
        if (_this.$refs[data.type].aiSelectDef) {
            _this[_this.$refs[data.type].aiSelectObj][_this.$refs[data.type].aiSelectDef] = data.key
        } else if (_this.$refs[data.type].aiSelectKey) {
            _this[_this.$refs[data.type].aiSelectObj][_this.$refs[data.type].aiSelectKey] = data.key
        }
    } else if (_this.$refs[data.type] && _this.$refs[data.type].aiSelectKey) {
        if (_this.$refs[data.type].aiSelectDef) {
            _this[_this.$refs[data.type].aiSelectDef] = data.key
        } else if (_this.$refs[data.type].aiSelectKey) {
            _this[_this.$refs[data.type].aiSelectKey] = data.key
        }
    }
}

// 埋点上报
const gTracker = () => {
    try {
        if (window && window.da) {
            window.da.init()
        }
    } catch (e) {
        console.log(e)
    }
}

// loading
const gLoading = {
    show: (msg) => {
        let str = (msg && msg != '') ? msg : '正在加载'
        iView.Spin.show({
            render: (h) => {
                return <div class="ai-spin-all">
                    <div class="la-square-jelly-box la-2x">
                        <div></div>
                        <div></div>
                    </div>
                    <div class="ico-logo"></div>
                    <p class="txt">{str}</p>
                </div>
            }
        })
    },
    hide: (msg) => {
        iView.Spin.hide()
    }
}

// 日期转换
const timeToString = (data) => {
    if (!data) return ''
    const date = new Date(data)
    const Y = date.getFullYear() + '-'
    const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    const D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate() + ''
    return Y + M + D
}

// 获取公用select参数
const getSelectData = (vm, type, val) => {
    let userData = store.state.user.userData
    switch (type) {
    case 'build':
        return new Promise((resolve, reject) => {
            vm.$$api_deliver_getBuildingList({
                requestType: 'getString',
                requestString: userData.userId + '/' + userData.sessionId,
                fn: (data) => {
                    resolve(data.obj)
                }
            })
        })
    case 'serie':
        return new Promise((resolve, reject) => {
            vm.$$api_deliver_getSerieList({
                requestType: 'getString',
                requestString: userData.userId + '/' + userData.sessionId,
                fn: (data) => {
                    resolve(data.obj)
                }
            })
        })
    case 'employees':
        return new Promise((resolve, reject) => {
            vm.$$api_base_queryEmployee({
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {},
                fn: (data) => {
                    resolve(data.data)
                }
            })
        })
    case 'company':
        return new Promise((resolve, reject) => {
            vm.$$api_base_queryCompany({
                data: {
                    operatorId: userData.userId,
                    sessionId: userData.sessionId
                },
                fn: (data) => {
                    resolve(data.data)
                }
            })
        })
    case 'province':
        return new Promise((resolve, reject) => {
            vm.$$api_base_queryProvice({
                requestType: 'getString',
                requestString: userData.userId + '/' + userData.sessionId,
                fn: (data) => {
                    resolve(data.obj)
                }
            })
        })
    case 'district':
        return new Promise((resolve, reject) => {
            vm.$$api_base_queryDistrict({
                requestType: 'getString',
                requestString: val + '/' + userData.userId + '/' + userData.sessionId,
                fn: (data) => {
                    resolve(data.obj)
                }
            })
        })
    // 查询所有分区
    case 'communityAll':
        return new Promise((resolve, reject) => {
            vm.$$api_base_queryCommunityAll({
                data: {
                    userId: userData.userId,
                    sessionId: userData.sessionId
                },
                fn: (data) => {
                    resolve(data.data)
                }
            })
        })
    // 查询项目/分区
    case 'buildingZoneVosAll':
        return new Promise((resolve, reject) => {
            vm.$$api_base_queryProjectZoneInfo({
                data: {
                    userId: userData.userId,
                    sessionId: userData.sessionId,
                    cooperationStatus: 1
                },
                fn: (data) => {
                    resolve(data.data)
                }
            })
        })
    }
}

// 获取json对象属性个数
const getJsonLength = function (jsonData) {
    var jsonLength = 0
    for (let item in jsonData) {
        if (item) {
            jsonLength++
        }
    }
    return jsonLength
}

/*
 * async validate 全局校验方法
 * vm vue对象
 * data 需要验证的数据 整表验证数据为数组对象 单条数据验证数据为json对象
 * rules 需要验证的规则 当rules验证规则只有一个属性时表示单元素验证
 * callback 方法回调函数
 */
const validateFunc = function (vm, data, rules, callback) {
    let descriptor = rules
    let ruleLen = getJsonLength(descriptor)
    if (ruleLen == 0) {
        vm.$Message.error({
            content: '校验规则不能为空'
        })
        return
    }
    if (!Array.isArray(data)) {
        data = [data]
    }
    const validator = new AsyncValidator(descriptor)
    data.forEach((item, index) => {
        if (ruleLen > 1) delete item['validateinfo']
        validator.validate(item, { firstFields: true }, (errors, fields) => {
            let fromError = {
                code: 'success',
                index: index
            }
            // 多项验证时需要清空当前验证对象的错误信息提示,单项验证时只需要清空当前项的错误信息
            if (ruleLen > 1) {
                // 清空当前验证数据的错误信息
                vm.$set(item, 'validateinfo', [])
                if (errors) {
                    fromError.code = 'error'
                    fromError.err = errors
                    // 更新错误信息对象
                    vm.$set(item, 'validateinfo', errors)
                }
            } else {
                // 获取当前验证对象的key
                let key = Object.keys(descriptor)[0]
                // 验证对象如果存在错误信息需要清除当前验证项的错误信息
                if (Array.isArray(item.validateinfo)) {
                    item.validateinfo.map((v, i) => {
                        if (v.field == key) {
                            item.validateinfo.splice(i, 1)
                        }
                    })
                } else {
                    vm.$set(item, 'validateinfo', [])
                }
                if (errors) {
                    fromError.code = 'error'
                    fromError.err = errors
                    // 当前项的错误信息添加到验证对象中
                    item.validateinfo.push(errors[0])
                }
            }
            if (callback) {
                callback(fromError)
            }
        })
    })
}

/* 过滤对象中空值 */
const delObjectValue = function (obj) {
    var param = {}
    if (obj === null || obj === undefined || obj === '') return param
    for (var key in obj) {
        if (obj[key] !== null && obj[key] !== undefined && obj[key] !== '') {
            param[key] = obj[key]
        }
    }
    return param
}

/* 移动端判断 */
const wapTestLayout = function () {
    if (navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/webOS/i) ||
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/iPod/i) ||
    navigator.userAgent.match(/BlackBerry/i) ||
    navigator.userAgent.match(/Windows Phone/i)) {
        document.querySelector('body').classList.add('beta-app-wap')
        document.querySelector('body').classList.add('sidebar-hidden')
    }
}

/* layout销毁 */
const wapTestLayoutHide = function () {
    document.querySelector('body').classList.remove('beta-app-wap')
    document.querySelector('body').classList.remove('sidebar-hidden')
}

export default {
    getButtonSteer,
    gSelectSet,
    gTracker,
    gLoading,
    timeToString,
    sysPrefix,
    getSelectData,
    validateFunc,
    delObjectValue,
    wapTestLayout,
    wapTestLayoutHide
}
