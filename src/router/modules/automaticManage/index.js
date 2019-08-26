const Layout = () => import('@/views/layout/Index.vue')
const systemManage = () => import('@/views/automaticManage/systemManage.vue') // 系统版本管理
const automaticRelation = () =>
  import('@/views/automaticManage/automaticRelation.vue') // 自动化绑定关系管理

export default [
  // 一级路由
  {
    path: '/automaticManage',
    redirect: { name: 'systemManage' },
    component: Layout,
    meta: {
      title: '自动化设备管理',
      icon: 'automaticManage'
    },
    children: [
      {
        // 1
        path: '/automaticManage/systemManage',
        name: 'systemManage',
        component: systemManage,
        meta: {
          title: '系统版本管理'
        }
      },
      {
        // 2
        path: '/automaticManage/automaticRelation',
        name: 'automaticRelation',
        component: automaticRelation,
        meta: {
          title: '网点自动化绑定关系管理'
        }
      }
    ]
  }
]
