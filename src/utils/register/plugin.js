import axios from '../service/'
import request from '../../apis/'

var plugins = {}
for (let i = 0; i < request.length; i++) {
    if (typeof request[i] === 'object' && request[i].list && Array.isArray(request[i].list)) {
        for (let j = 0; j < request[i].list.length; j++) {
            plugins['api_' + request[i].module + '_' + request[i].list[j].method] = (function (n, m) {
                return function ({
                    type = request[n].list[m].type,
                    path = request[n].list[m].path,
                    data,
                    fn,
                    requestType,
                    requestString,
                    errFn,
                    headers,
                    opts
                } = {}) {
                    axios.call(this, {
                        type,
                        path,
                        data,
                        fn,
                        requestType,
                        requestString,
                        errFn,
                        headers,
                        opts
                    })
                }
            })(i, j)
        }
    }
    // * 全局配置URL
    if (typeof request[i] === 'object' && request[i].list && Array.isArray(request[i].list)) {
        for (let j = 0; j < request[i].list.length; j++) {
            plugins['path_' + request[i].module + '_' + request[i].list[j].method] = request[i].list[j].path
        }
    }
}

export default plugins
