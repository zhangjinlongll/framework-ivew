
/**
 * create by dragon
 * 2019/05/30
 * init http
 */
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { host } from '../hosts/'

Vue.use(VueAxios, axios)
// http request 拦截器
// axios.interceptors.request.use(
//     config => {
//         if (this.store.state.token) {
//             config.headers.Authorization = `token ${this.store.state.token}`
//         }
//         return config
//     },
//     err => { return Promise.reject(err) }
// )
// 动态设置本地和线上接口域名
Vue.axios.defaults.baseURL = host.basehost
// 添加响应拦截器
// axios.interceptors.response.use(function (response) {
//     // 对响应数据做点什么
//     return response
// }, function (error) {
//     let router = new VueRouter()
//     // 对响应错误做点什么
//     this.$Message.show(error)
//     if (error.response) {
//         switch (error.response.status) {
//         case 401:
//             // 返回 401 清除token信息并跳转到登录页面
//             router.replace({
//                 path: 'login',
//                 query: {redirect: router.currentRoute.fullPath}
//             })
//         }
//     }
//     return Promise.reject(error)
// })
/**
 * 封装axios的通用请求
 * @param  {string}   type      get或post
 * @param  {string}   url       请求的接口URL
 * @param  {object}   data      传的参数，没有则传空对象
 * @param  {Function} fn        回调函数
 * @param  {boolean}   tokenFlag 是否需要携带token参数，为true，不需要；false，需要。一般除了登录，都需要
 * @param  {string}   requestType 请求类型为getString时，参数拼在路由后面
 * @param  {string}   requestString 拼在路由后面的参数
 */
export default function ({
    type,
    path,
    data,
    fn,
    requestType,
    requestString,
    errFn,
    tokenFlag,
    headers,
    opts,
    responseType
} = {}) {
    var options = {
        method: type,
        url: path,
        headers: headers && typeof headers === 'object' ? headers : {}
    }
    if (responseType && typeof responseType === 'object') {
        options.responseType = responseType
    }
    // 检测接口权限
    // 默认有API权限
    var apiFlag = true
    if (apiFlag === true) {
        options[type === 'get' ? 'params' : 'data'] = data
        // ! axios内置属性均可写在这里
        if (opts && typeof opts === 'object') {
            for (var f in opts) {
                options[f] = opts[f]
            }
        }
        // 请求头
        Object.assign(options.headers, {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json; charset=UTF-8',
            'X-Auth-Token': localStorage.getItem('token')
        })
        // 发送请求
        Vue.axios(options).then((response) => {
            // 判断网络状态
            if (response && (+response.status === 200)) {
                if (response.data.meta) {
                    if (response.data.meta.success) {
                        return fn(response.data)
                    } else {
                        let {errCode} = response.data
                        this.$Message.error(errCode + ':' + response.data.meta.message)
                        return errFn.call(this, response.data.meta)
                    }
                } else {
                    let {errCode, message} = response.data
                    if (errCode == 0) {
                        // 业务成功
                        return fn(response.data)
                    } else if (+errCode === 10001) {
                        this.$MessageBox.confirm('登录过期，请重新登录！', '提示', {
                            confirmButtonText: '确定',
                            showCancelButton: false,
                            closeOnClickModal: false,
                            closeOnPressEscape: false,
                            type: 'warning'
                        }).then(() => {
                            localStorage.removeItem('token')
                            localStorage.removeItem('user_id')
                            localStorage.removeItem('userInfo')
                            localStorage.removeItem('user_name')
                            localStorage.removeItem('menus')
                            localStorage.removeItem('elements')
                            location.reload()
                        })
                    } else if (+errCode === 10002) {
                        this.$Message.confirm('抱歉！您没有权限访问，请联系管理员！', '提示', {
                            confirmButtonText: '确定',
                            showCancelButton: false,
                            closeOnClickModal: false,
                            closeOnPressEscape: false,
                            type: 'warning'
                        })
                    } else {
                        // 业务失败
                        this.$Message.error(errCode + ':' + message)
                        return errCode + ':' + message
                    }
                }
            } else {
                this.$Message.error('系统异常，请联系管理员！')
                return '系统异常，请联系管理员！'
            }
        }).catch((err) => {
            console.log(err)
            if (errFn) {
                errFn.call(this, err)
            }
            this.$Message.error('服务器异常')
        })
    } else {
        this.$Message.error('您没用权限请求该接口！')
    }
}
