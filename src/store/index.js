import Vue from 'vue'
import Vuex from 'vuex'
import ytoBase from './modules/ytoBase'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    ytoBase
  }
})
