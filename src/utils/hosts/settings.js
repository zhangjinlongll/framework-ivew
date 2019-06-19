/*
 * getWay
 */
let basehost = process.env.BASE_API
var host = {
    basehost: basehost,
    // sso: basehost + '/api-sso',
    sso: basehost + '/mock/145',
    sale: basehost + '/mock/453',
    db_prefix: 'sks_admin_', // 本地存储的key

    // 状态码字段
    api_status_key_field: 'status',
    // 状态码value
    api_status_value_field: 200,
    api_data_field: 'data',

    api_custom: {
        404: function (res) {
            this.$alert(res.status + ',' + res.msg + '！', '登录错误', {
                confirmButtonText: '确定',
                callback: action => {
                    this.$router.push('/login')
                }
            })
        }
    }
}

var cbs = {
    /**
     * ajax请求成功，返回的状态码不是200时调用
     * @param  {object} err 返回的对象，包含错误码和错误信息
     */
    statusError (err) {
        console.log('err')
        if (err.status !== 404) {
            this.$message({
                showClose: true,
                message: '返回错误：' + err.msg,
                type: 'error'
            })
        } else {
            this.$alert(err.status + ',' + err.msg + '！', '登录错误', {
                confirmButtonText: '确定',
                callback: action => {
                    this.$router.push('/login')
                }
            })
        }
    },

    /**
     * 请求网络出错时调用
     */
    requestError (err) {
        this.$message({
            showClose: true,
            message: '请求错误：' + (err.response ? err.response.status : '') + ',' + (err.response ? err.response.statusText : ''),
            type: 'error'
        })
    }
}

export {
    host,
    cbs
}
