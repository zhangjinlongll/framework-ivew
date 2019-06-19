var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
var imgPath = require('../config/prod.env')
if (process.argv[2] === 'dev') {
  imgPath = require('../config/prod.dev.env')
} else if(process.argv[2] === 'sit') {
  imgPath = require('../config/prod.sit.env')
}
if (process.env.NODE_ENV === 'development') {
    imgPath = require('../config/dev.env')
}

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    app: './src/main.js'
    // da: path.resolve(__dirname, '../static/js/da.js')
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      '_c': resolve('src/components')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        exclude: [/fonts/],
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[hash:7].[ext]',
            publicPath: imgPath.BASE_API.replace(/\"/g, '') + '/' + imgPath.BASE_APP + '/',
            outputPath: utils.assetsPath('img/'),
            emitFile: true
          }
        }
      },
      {
        test: /\.(woff2?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        exclude: [/flags/],
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[hash:7].[ext]',
            publicPath: '../../',
            outputPath: utils.assetsPath('fonts/')
          }
        }
      }
    ]
  }
}
