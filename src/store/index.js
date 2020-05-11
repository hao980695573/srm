import Vue from 'vue'
import Vuex from 'Vuex'
import state from './state'
import mutations from './mutations'
// vuex本地持久化
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

// 通过Vuex创建了一个仓库，然后暴露出去
export default new Vuex.Store({
  state: state,
  mutations: mutations,
  plugins: [createPersistedState({
    storage: window.localStorage
  })]
})
