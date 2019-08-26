import request from '@/utils/request'
import { filterObj } from '@/utils/filterObj'
export default {
  // 验证地址
  validateUrl: '/product/effectiveType/validation',

  // 查询使用范围
  queryUseRange () {
    return request({
      url: '/product/effectiveType/useRange'
    })
  },
  // 查询列表
  queryList (obj) {
    return request({
      url: '/product/effectiveType/list',
      method: 'post',
      data: filterObj(obj)
    })
  },
  // 删除
  deleteByIds (obj) {
    return request({
      url: '/product/effectiveType/batchRemove',
      method: 'post',
      data: obj
    })
  },
  // 改
  update (obj) {
    return request({
      url: '/product/effectiveType/update',
      method: 'post',
      data: obj
    })
  },
  // 新增
  save (obj) {
    return request({
      url: '/product/effectiveType/save',
      method: 'post',
      data: obj
    })
  },
  // 获取某一项详情
  getDetailById (id) {
    return request({
      url: `/product/effectiveType/${id}`,
      method: 'get'
    })
  }
}
