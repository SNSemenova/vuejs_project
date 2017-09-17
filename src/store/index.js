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
    loading: false,
    page: 0,
    totalPages: 0
  },
  getters: {
    results(state) {
      let start = state.page * state.config.page_size
      let subset = state.results.slice(start, start + state.config.page_size)
      return subset.map(item => {
        return item
      })
    },
    config(state) {
      return state.config
    },
    loading(state) {
      return state.loading
    },
    totalPages(state) {
      return state.totalPages
    },
    hasPrev(state) {
      return state.page > 0
    },
    hasNext(state) {
      return state.page + 1 < state.totalPages
    },
    currentPage(state) {
      return state.page + 1
    }
  },
  mutations: {
    set(state, { type, items }) {
      state[type] = items
    },
    increment(state, type) {
      state[type]++
    },
    decrement(state, type) {
      state[type]--
    }
  },
  actions: {
    search({ commit }, query) {
      commit('set', { type: 'loading', items: true })
      const url = this.getters.config.url
      const pageSize = this.getters.config.page_size
      this.state.page = 0
      var resource = Vue.resource(url)
      resource.get({ rows: query}).then(function (response) {
        const results = response.data
        commit('set', { type: 'results', items: results })
        commit('set', { type: 'totalPages', items: Math.ceil(results.length / pageSize) })
        commit('set', { type: 'loading', items: false })
      }, function (error) {
        console.log(error)
      })
    },
    changePage({ commit }, query) {
      commit(query, 'page')
    },
    addFavorite({ commit }, query) {
      let array = this.getters.results
      let index = array.findIndex(function(el) {
        return el === query
      })
      this.getters.results[index].favorite = true
    }
  }
})

export default store