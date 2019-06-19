/**
 * 供应链管理模块
 */
import {
    host
} from '../../utils/hosts/'
export default [
    {
        name: '变量管理-查询列表',
        method: 'list',
        path: host.sso + '/api/v1/list',
        type: 'get'
    }
]
