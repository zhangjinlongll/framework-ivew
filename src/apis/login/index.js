/**
 * 用户模块
 * @type {Object}
 */
import {
    host
} from '../../utils/hosts/'
export default [
    {
        name: '用户获取菜单和按钮权限',
        method: 'getIndexMenuAndButton',
        path: host.sso + '/api/v1/getIndexMenuAndButton',
        type: 'get'
    },
    {
        name: '从权限系统获取全量菜单',
        method: 'tree',
        path: host.sso + '/api/v1/tree',
        type: 'get'
    },
    {
        name: '登录接口',
        method: 'login',
        path: host.sso + '/api/v1/login',
        type: 'get'
    },
    {
        name: '登出',
        method: 'logout',
        path: host.sso + '/api/v1/logout',
        type: 'get'
    },
    {
        name: '加密',
        method: 'aes',
        path: host.cschost + '/api/v1/aes',
        type: 'get'
    },
    {
        name: '查询用户是否存在',
        method: 'checkAccount',
        path: host.sso + '/api/v1/checkAccount',
        type: 'get'
    }
]
