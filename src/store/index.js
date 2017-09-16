import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import config from '../../config.json'

Vue.use(VueResource)
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    results: [],
    config: config,
    loading: false
  },
  getters: {
    results(state) {
      return state.results.map(item => {
        return item
      })
    },
    config(state) {
      return state.config
    },
    loading(state) {
      return state.loading
    }
  },
  mutations: {
    set(state, { type, items }) {
      state[type] = items
    }
  },
  actions: {
    search({ commit }, query) {
      commit('set', { type: 'loading', items: true })
      const url = this.getters.config.url
      var resource = Vue.resource(url)
      resource.get({ rows: query}).then(function (response) {
        const results = response.data
        commit('set', { type: 'results', items: results })
        commit('set', { type: 'loading', items: false })
      }, function (error) {
        console.log(error)
      })
    }
  }
})

export default store