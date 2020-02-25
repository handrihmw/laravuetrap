import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    apiURL: 'http://softgeartodo.lol/api',
    serverPath: 'http://softgeartodo.lol'
  },
  mutations: {},
  actions: {}
})