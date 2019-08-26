import Cookies from 'js-cookie'
import request from '@/utils/request'
import store from '@/store'
import urlConfig from '../utils/urlConfig'
let AUTH = 'oauth'
let USER = 'user'
class OAuth {
  // 存储用户信息
  setUserInfo (user) {
    sessionStorage.setItem(USER, JSON.stringify(user))
  }
  setUserNameInfo (userName) {
    sessionStorage.setItem('displayName', JSON.stringify(userName))
  }
  getUserInfo () {
    let user = sessionStorage.getItem('user')
    return JSON.parse(user)
  }
  // 存储token
  setAuthInfo (token) {
    sessionStorage.setItem('token', JSON.stringify(token))
  }
  getAuthInfo () {
    let auth = sessionStorage.getItem('token')
    return JSON.parse(auth)
  }
  // 存储accessToken
  setAccessToken (accessToken) {
    sessionStorage.setItem('accessToken', JSON.stringify(accessToken))
  }
  getAccessToken () {
    let accessToken = sessionStorage.getItem('accessToken')
    return JSON.parse(accessToken)
  }
  // 存储菜单权限
  setMenus (menu) {
    sessionStorage.setItem('menus', JSON.stringify(menu))
  }
  getMenus () {
    let menus = sessionStorage.getItem('menus')
    return JSON.parse(menus)
  }
  // 存储按钮权限
  setBtns (button) {
    sessionStorage.setItem('button', JSON.stringify(button))
  }
  getBtns () {
    let button = sessionStorage.getItem('button')
    return JSON.parse(button)
  }
  isAuthenticated () {
    // 从sessionStorage中读取登录信息。
    let auth = this.getAuthInfo()
    if (auth !== null) {
      // 如果已登录调获取权限菜单接口
      // let menu = this.getRouterMenu();
      return true
    }
    return false
  }

  /**
   * 用户授权
   */
  authenticate (to, mode) {
    debugger
    let env = process.env.NODE_ENV
    if (!(env == 'production')) {
      this.setAuthInfo('admin')
      return this.getRouterMenu()
    }
    // 从sessionStorage里面获取token.
    // 获取授权代码
    // ("00000000");
    let code = to.query['authCode']
    let fullPath = to.fullPath
    if (code === undefined) {
      // 没有登录
      let redirectUri =
        window.location.origin +
        (mode === 'history' ? '' + to.fullPath : '/#' + to.fullPath)
      this.redirectToLogin(redirectUri)
    }
    return this.retrieveToken(code)
  }
  // 导航到登录页面
  redirectToLogin (redirectUri) {
    // 清空缓存的token信息。
    // debugger
    this.clearAuthInfo()
    Cookies.set('redirect_uri', redirectUri)
    // 刷新state
    // let path = 'http://61.152.207.98/enduser/sp/sso/ytojwt9?enterpriseId=yto&redirect_url=' + redirectUri//测试环境
    // let path = 'http://idp.yto56.com.cn/enduser/sp/sso/ytojwt6?enterpriseId=yto&redirect_url=' + redirectUri//生产环境
    let path = urlConfig.oauthUrl + redirectUri
    console.log(path)
    window.location.href = path
  }
  // 获取token 接口
  async retrieveToken (code) {
    let self = this
    // form数据
    let postData = {}
    postData.authCode = code
    // postData.id = '1086'
    await request({
      url: '/basedata/jwt/token',
      method: 'post',
      data: postData
    })
      .then(res => {
        // self.setAccessToken(res.data.accessToken); //存储accessToken
        self.setAuthInfo(res.data.token) // 存储token
        self.setUserInfo(res.data.user) // 存储用户信息
        store.commit('ytoBase/sidebar/SET_USERINFOR', res.data.user)
      })
      .then(res => {
        let menu = this.getRouterMenu()
      })
  }
  // 获取菜单权限
  async getRouterMenu () {
    await request({
      url: '/basedata/permission/menu',
      method: 'post',
      data: {}
    }).then(res => {
      console.log(res)
      this.getBtnAouth()
      // this.setMenus(res.data.permissions)
      let arr = []
      res.data.permissions.map((item1, index1) => {
        item1.children.map((item2, index2) => {
          if (item2.relationUrl) {
            item2.relationUrl = '/' + item2.relationUrl
            arr.push(item2.relationUrl)
          }
          if (item2.children) {
            item2.children.map((item3, index3) => {
              item3.relationUrl = '/' + item3.relationUrl
              arr.push(item3.relationUrl)
            })
          }
        })
      })
      let menus = sessionStorage.setItem(
        'menus',
        JSON.stringify(res.data.permissions)
      )
      let urls = sessionStorage.setItem('urls', JSON.stringify(arr))
      store.commit('ytoBase/sidebar/SET_MENUS', res.data.permissions)
    })
  }
  find (str, cha, num) {
    var x = str.indexOf(cha)
    for (var i = 0; i < num; i++) {
      x = str.indexOf(cha, x + 1)
    }
    return x
  }
  // 获取按钮权限
  async getBtnAouth () {
    await request({
      url: '/basedata/permission/button',
      method: 'post',
      data: {}
    }).then(res => {
      console.log(res)
      // this.setBtns(res.data)
      let arr = []
      res.data.voList.map((item, indexx) => {
        if (item.permissionValue) {
          arr.push(item.permissionValue)
        }
      })
      sessionStorage.setItem('voList', JSON.stringify(res.data.voList))
      sessionStorage.setItem('buttons', JSON.stringify(arr))
      store.commit('ytoBase/sidebar/SET_BUTTON', arr)
      store.commit('ytoBase/sidebar/SET_VOLIST', res.data.voList)
    })
  }
  // check 按钮权限
  checkBtnAouth (code, authList = []) {
    if (authList.length == 0) {
      // console.log("项目权限为空, CODE: " + code + '无权限');
      return false
    }
    let result = authList.includes(code)
    if (!result) {
      console.log('CODE: ' + code + '无权限')
    }
    return result
  }
  clearAuthInfo () {
    sessionStorage.removeItem(AUTH)
    sessionStorage.removeItem(USER)
    Cookies.remove('redirect_uri')
  }
  authLogout () {
    let self = this
    removeStore('userInfo')
    self.clearAuthInfo()
    let redirectUri = encodeURIComponent(window.location.href)
    let oauthServer = config.oauth2.ssoServer
    let url = oauthServer + '/logout?redirect_url=' + redirectUri
    window.location = url
  }
}

export default new OAuth()
