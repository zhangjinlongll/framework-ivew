var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://192.168.2.246:3000"',
  BASE_STYLE: '"DEVStyle"',
  BASE_APP: 'ZNLHApp'
})
