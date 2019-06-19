/**
 * 导出所有模块需要用到接口
 * 一级属性：模块名
 * 一级属性中的方法：当前模块需要用的接口
 * @type {Object}
 */
import user from './user/'
import login from './login/'
import common from './common'
import sale from './sale/'
import opr from './opr'
import tms from './tms'
import iot from './iot'
import fin from './fin'
import ser from './ser'
import cis from './cis'
import dms from './dms'

export default [
    {
        module: 'login',
        name: '登录管理',
        list: login
    },
    {
        module: 'user',
        name: '用户管理',
        list: user
    },
    {
        module: 'common',
        name: '通用接口管理',
        list: common
    },
    {
        module: 'sale',
        name: '销售管理',
        list: sale
    },
    {
        module: 'opr',
        name: '运营管理',
        list: opr
    },
    {
        module: 'tms',
        name: '供应链管理',
        list: tms
    },
    {
        module: 'iot',
        name: '物联网',
        list: iot
    },
    {
        module: 'fin',
        name: '财务管理',
        list: fin
    },
    {
        module: 'ser',
        name: '服务管理',
        list: ser
    },
    {
        module: 'cis',
        name: '信用管理',
        list: cis
    },
    {
        module: 'dms',
        name: '设备管理',
        list: dms
    }
]

// 注意通用路径配置字段为 url
