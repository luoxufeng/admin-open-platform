import Vue from 'vue'
import Router from 'vue-router'
import frameInRoutes from './routes'
import oauth from '@/oauth'
import util from '@/utils/util.js' // 404
// 进度条
import NProgress from 'nprogress'
const page404 = () => import('@/views/errorPage/404')
const page401 = () => import('@/views/errorPage/401')

Vue.use(Router)
let routers = frameInRoutes.concat([
  {
    path: '/page401',
    name: 'page401',
    component: page401,
    hidden: true,
    meta: {
      title: '401'
    }
  },
  {
    path: '/page404',
    name: 'page404',
    component: page404,
    hidden: true,
    meta: {
      title: '404'
    }
  },
  { path: '*', redirect: '/page404', hidden: true }
])
const router = new Router({
  mode: 'history',
  // base: baseUrl,
  routes: routers
})

router.beforeEach((to, from, next) => {
  // 进度条
  NProgress.start()
  const needAuth = to.meta.auth || ''
  if (needAuth === false) {
    // 不需要登录
    return next()
  }
  if (!oauth.isAuthenticated()) {
    //! oauth.isAuthenticated() 指需要授权登陆
    // 需要登录，但是没有登录或登录无效
    oauth.authenticate(to, router.mode).then(response => {
      next('/')
    })
    // next();
  } else {
    // next()
    // debugger
    let urls = JSON.parse(sessionStorage.getItem('urls'))
    if (!urls) {
      return next()
    } else {
      let result = urls.includes(to.fullPath)
      if (to.path === '/home') {
        next()
      } else {
        if (!result) {
          next()
          return Vue.prototype.$alert('你没有当前页面权限')
        } else {
          next()
        }
      }
    }
  }
})
router.afterEach(to => {
  // 进度条
  NProgress.done()
  // 需要的信息
  const app = router.app
  const { name, params, query } = to
  // 多页控制 打开新的页面
  app.$store.dispatch('ytoBase/page/open', { name, params, query })
  // 更改标题
  util.title(to.meta.title)
})

export default router
