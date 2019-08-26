import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import VeLine from 'v-charts/lib/line.common'
import store from './store/index'
import Yto from './components/index'
import router from './router/index'
import frameInRoutes from '@/router/routes'

import './fiters' // 加载过滤器
import './styles/index.scss'
import 'flex.css'
import './utils/directives'
// 关键是这两行
import common from './utils/common'

Vue.use(common)
Vue.use(Yto) // yto组件

Vue.config.productionTip = false

if (window.screen.width <= 1366) {
  Vue.use(ElementUI, { size: 'small' })
} else {
  Vue.use(ElementUI, { size: 'medium' })
}
Vue.prototype.$pages = {
  current: 1,
  size: 10,
  sizes: [10, 20, 30, 40],
  total: 100
}
Vue.component(VeLine.name, VeLine)
new Vue({
  router,
  store,
  render: h => h(App),
  created () {
    // 处理路由 得到每一级的路由设置
    this.$store.commit('ytoBase/page/init', frameInRoutes)
  },
  mounted () {
    // 用户登录后从数据库加载一系列的设置
    this.$store.dispatch('ytoBase/user/load')
  }
}).$mount('#app')
