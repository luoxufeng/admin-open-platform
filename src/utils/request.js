import axios from 'axios'
import Vue from 'vue'
// create an axios instance
import urlConfig from './urlConfig'
// let PROURI = 'http://10.130.36.178:8082' //178环境
// let PROURI = 'http://10.130.36.213:8082' //213环境
// let PROURI = 'http://10.128.40.180:8082' //生产环境
let PROURI = urlConfig.PROURI
const service = axios.create({
  // baseURL: env == 'production' ? PROURI : DEVURI, // api的base_url
  baseURL: PROURI, // api的base_url
  timeout: 8000, // request timeout
  headers: {
    // source: 'YTO-STEWARD'
    'Content-Type': 'application/json'
  }
})
service.interceptors.request.use(
  config => {
    config.withCredentials = true
    let token = JSON.parse(sessionStorage.getItem('token')) || ''
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  error => {
    // Do something with request error
    Promise.reject(error)
  }
)

// respone interceptor
service.interceptors.response.use(
  response => {
    let ifStatus = response.status !== 0
    let code = response.data.status == -999
    if (code) {
      // token 过期
      sessionStorage.clear()
      localStorage.clear()
      document.cookie = ''
      window.location.href = urlConfig.redirectUrl
      Vue.$message.warning(response.data.message)
      return Promise.reject(response)
    }
    if (ifStatus && response.config.responseType === 'json') {
      console.log('请求错误：', response.message)
      Vue.prototype.$alert(response.message, '提示', {
        confirmButtonText: '确定',
        callback: () => {
          return false
        }
      })
      return Promise.reject(response)
    }
    return response.data
  },
  error => {
    let errorMeg = '错误代码：' + error.response.status
    Vue.prototype.$alert(errorMeg, '提示', {
      confirmButtonText: '确定',
      callback: () => {
        return false
      }
    })
    console.log('error>>>>>:', error.response)
    return Promise.reject(error)
  }
)

export default service
