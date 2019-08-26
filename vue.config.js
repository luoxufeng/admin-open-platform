const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  baseUrl: process.env.NODE_ENV === 'production' ? '/' : '/',
  lintOnSave: false,
  productionSourceMap: false,
  chainWebpack: config => {
    config.resolve.alias.set('@', resolve('src'))
  },
  // 代理服务器配置
  devServer: {
    open: true,
    hot: true,
    // host: 'localhost',//本地启动改为自己ip
    host: 'localhost', // 本地启动改为自己ip
    port: 8082,
    proxy: {
      // '/basedata': {
      //   target:
      //     process.env.NODE_ENV === 'production'
      //       ? 'http://10.128.40.180'
      //       : 'http://10.130.36.167:4001',
      //   changeOrigin: true
      // },
      // '/product': {
      //   target: 'http://10.130.36.167:4002',
      //   changeOrigin: true
      // },
      '/organization': {
        target: 'http://10.130.36.167:4003',
        changeOrigin: true
      },
      '/configuration': {
        target: 'http://10.130.36.167:4004', // 成
        changeOrigin: true
      }
      // '/evaluate': {
      //   target: 'http://10.130.36.167:8091',
      //   changeOrigin: true
      // }
    },
    // mock data
    contentBase: path.join(__dirname, 'public'), // since we use CopyWebpackPlugin.
    compress: true,
    before: require('./mock') // 引入mock/index.js
  }
}
