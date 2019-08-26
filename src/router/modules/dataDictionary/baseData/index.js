/*
 * 基础数据模块
 * */
const timelinessTypeSet = () =>
  import('@/views/dataDictionary/baseData/timelinessTypeSet.vue') // 时效类型设置
export default [
  {
    path: '/dataDictionary/baseData/timelinessTypeSet',
    name: 'timelinessTypeSet',
    component: timelinessTypeSet,
    meta: {
      title: '时效类型设置',
      keepAlive: true
    }
  }
]
