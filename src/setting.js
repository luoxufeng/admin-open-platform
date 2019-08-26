import { version } from '../package'

export default {
  // 侧边栏默认折叠状态
  menu: {
    isCollapse: false
  },
  // 在读取持久化数据失败时默认页面
  page: {
    opened: [
      {
        name: 'Home',
        meta: {
          title: '首页'
        }
      }
    ]
  },
  appName: '开放平台',
  // 版本
  releases: {
    version
  },
  // 是否默认开启页面切换动画
  transition: {
    active: false
  }
}
