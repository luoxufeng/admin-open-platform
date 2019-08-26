// 设置文件
import setting from '@/setting.js'
import request from '@/utils/request'

export default {
  namespaced: true,
  state: {
    userInfor: JSON.parse(sessionStorage.getItem('user')) || [],
    menus: JSON.parse(sessionStorage.getItem('menus')) || [],
    buttons: JSON.parse(sessionStorage.getItem('buttons')) || [],
    voList: JSON.parse(sessionStorage.getItem('voList')) || [],
    isCollapse: setting.menu.isCollapse,
    flagSystem: 'main', // 路由属于哪个系统
    badAmount: 0,
    goodAmount: 0
  },
  getters: {
    userInfor: state => state.userInfor,
    displayName: (state, getters) => getters.userInfor.displayName || ''
  },
  mutations: {
    TOGGLE_SIDEBAR (state) {
      state.isCollapse = !state.isCollapse
      sessionStorage.setItem('sidebar-open', String(state.isOpen))
    },
    UPDATE_FLAG (state, obj) {
      state.flagSystem = obj
    },
    SET_MENUS (state, arr) {
      state.menus = arr
    },
    SET_BUTTON (state, arr) {
      state.buttons = arr
    },
    SET_VOLIST (state, arr) {
      state.voList = arr
    },
    SET_USERINFOR (state, obj) {
      state.userInfor = obj
    }
  },
  actions: {
    /**
     * 设置侧边栏展开或者收缩
     * @param {Object} state vuex state
     * @param {Boolean} collapse is collapse
     */
    asideCollapseSet ({ state, dispatch }, collapse) {
      return new Promise(async resolve => {
        // store 赋值
        state.asideCollapse = collapse
        // 持久化
        await dispatch(
          'ytoBase/db/set',
          {
            dbName: 'sys',
            path: 'menu.isCollapse',
            value: state.isCollapse,
            user: true
          },
          { root: true }
        )
        // end
        resolve()
      })
    },
    /**
     * 切换侧边栏展开和收缩
     * @param {Object} state vuex state
     */
    asideCollapseToggle ({ state, dispatch }) {
      return new Promise(async resolve => {
        // store 赋值
        state.isCollapse = !state.isCollapse
        // 持久化
        await dispatch(
          'ytoBase/db/set',
          {
            dbName: 'sys',
            path: 'menu.isCollapse',
            value: state.isCollapse,
            user: true
          },
          { root: true }
        )
        // end
        resolve()
      })
    },
    /**
     * 从持久化数据读取侧边栏展开或者收缩
     * @param {Object} state vuex state
     */
    asideCollapseLoad ({ state, dispatch }) {
      return new Promise(async resolve => {
        // store 赋值
        state.isCollapse = await dispatch(
          'ytoBase/db/get',
          {
            dbName: 'sys',
            path: 'menu.isCollapse',
            defaultValue: setting.menu.isCollapse,
            user: true
          },
          { root: true }
        )
        // end
        resolve()
      })
    }
  }
}
