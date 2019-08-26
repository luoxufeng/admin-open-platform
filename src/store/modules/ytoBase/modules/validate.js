import request from '@/utils/request'

export default {
  namespaced: true,
  state: {
    url: '',
    id: ''
  },

  actions: {
    unique ({ state }, obj) {
      return request({
        // baseURL,
        url: state.url,
        method: 'post',
        data: { ...obj, ...{ id: state.id } }
      })
    }
  },
  mutations: {}
}
