/**
 * 用户模块
 * @type {Object}
 */
import {
    host
} from '../../utils/hosts/'
export default [
    {
        name: '获取按钮权限',
        method: 'noHasBtn',
        path: host.sso + '/user/menu/noHasBtn',
        type: 'post'
    }
]
