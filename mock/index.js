const Mock = require('mockjs') // mockjs 导入依赖模块
const util = require('./util') // 自定义工具模块
// 返回一个函数
module.exports = function (app) {
  // 监听http请求
  app.post('/basedata/permission/menu', function (rep, res) {
    // 每次响应请求时读取mock data的json文件
    // util.getJsonFile方法定义了如何读取json文件并解析成数据对象
    var json = util.getJsonFile('./menu.json')
    // 将json传入 Mock.mock 方法中，生成的数据返回给浏览器
    res.json(Mock.mock(json))
  })

  app.post('/basedata/permission/button', function (rep, res) {
    // 每次响应请求时读取mock data的json文件
    // util.getJsonFile方法定义了如何读取json文件并解析成数据对象
    var json = util.getJsonFile('./button.json')
    // 将json传入 Mock.mock 方法中，生成的数据返回给浏览器
    res.json(Mock.mock(json))
  })

  app.get('/product/effectiveType/useRange', function (rep, res) {
    // 每次响应请求时读取mock data的json文件
    // util.getJsonFile方法定义了如何读取json文件并解析成数据对象
    var json = util.getJsonFile('./userRange.json')
    // 将json传入 Mock.mock 方法中，生成的数据返回给浏览器
    res.json(Mock.mock(json))
  })

  app.post('/product/effectiveType/list', function (rep, res) {
    // 每次响应请求时读取mock data的json文件
    // util.getJsonFile方法定义了如何读取json文件并解析成数据对象
    var json = util.getJsonFile('./list.json')
    // 将json传入 Mock.mock 方法中，生成的数据返回给浏览器
    res.json(Mock.mock(json))
  })

  // 验证
  app.post('/product/effectiveType/validation', function (rep, res) {
    // 每次响应请求时读取mock data的json文件
    var json = { status: 0, message: 'success' }
    // 将json传入 Mock.mock 方法中，生成的数据返回给浏览器
    res.json(Mock.mock(json))
  })

  app.post('/product/effectiveType/save', function (rep, res) {
    // 每次响应请求时读取mock data的json文件
    var json = { status: 0, message: 'success' }
    // 将json传入 Mock.mock 方法中，生成的数据返回给浏览器
    res.json(Mock.mock(json))
  })
}
