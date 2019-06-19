// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
var envPath = require('./prod.env')
if (process.argv[2] === 'dev') {
  envPath = require('./prod.dev.env')
} else if(process.argv[2] === 'sit') {
  envPath = require('./prod.sit.env')
}

module.exports = {
  build: {
    env: envPath,
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: envPath.BASE_API.replace(/\"/g, '') + '/' + envPath.BASE_APP +'/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 8080,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '',
    proxyTable: {
      '/mocks': {
        target: 'http://localhost:8082', // 你接口的域名
        //secure: false,      // 如果是https接口，需要配置这个参数
        changeOrigin: true     // 如果接口跨域，需要进行这个参数配置
        // pathRewrite: {
        //   '^/api': ''
        // }
      }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: true
  }
}
