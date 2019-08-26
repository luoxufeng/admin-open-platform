export default {
  namespaced: true,
  actions: {
    /**
     * @description 用户登录后从持久化数据加载一系列的设置
     * @param {Object} state vuex state
     */
    load ({ commit, dispatch }) {
      return new Promise(async resolve => {
        // DB -> store 持久化数据加载上次退出时的多页列表
        await dispatch('ytoBase/page/openedLoad', null, { root: true })
        // DB -> store 加载页面过渡效果设置
        await dispatch('ytoBase/transition/load', null, { root: true })
        // DB -> store 持久化数据加载侧边栏折叠状态
        await dispatch('ytoBase/sidebar/asideCollapseLoad', null, {
          root: true
        })
        // end
        resolve()
      })
    }
  }
}
