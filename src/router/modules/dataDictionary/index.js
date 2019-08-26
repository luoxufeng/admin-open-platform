import baseData from './baseData' // 基础数据字典
const Layout = () => import('@/views/layout/Index.vue')
const second = () => import('@/views/secondNav.vue') // 操作类数据字典

export default [
  // 一级
  {
    path: '/dataDictionary',
    redirect: { name: 'baseData' },
    component: Layout,
    meta: {
      title: '数据字典',
      icon: 'dataDictionary',
      flag: 'main'
    },
    children: [
      {
        path: '/dataDictionary/baseData',
        name: 'baseData',
        component: second,
        redirect: { name: 'baseData' },
        meta: {
          title: '基础数据字典',
          keepAlive: true
        },
        children: [...baseData]
      }
    ]
  }
]
