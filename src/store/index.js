import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import config from '../../config.json'
import orderBy from 'lodash.orderby'

Vue.use(VueResource);
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    results: [],
    config: config,
    loading: false,
    page: 0,
    totalPages: 0,
    error: false,
    sortKey: 'id',
    reverse: false,
    filter: ''
  },
  getters: {
    results(state) {
      let pageSize = state.config.page_size;
      let array = state.results;
      array = array.filter(function (el) {
        return el.firstName.toLowerCase().indexOf(state.filter.toLowerCase()) > -1
          || el.favorite;
      });
      state.totalPages = Math.ceil(array.length / pageSize);
      let set = orderBy(array, state.sortKey);
      if (state.reverse) {
        set = set.reverse();
      }
      let start = state.page * pageSize;
      let subset = set.slice(start, start + pageSize);
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
    },
    error(state) {
      return state.error
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
      commit('set', { type: 'loading', items: true });
      const url = this.getters.config.url;
      this.state.page = 0;
      var resource = Vue.resource(url);
      resource.get({ rows: query}).then(function (response) {
        const results = response.data;
        commit('set', { type: 'error', items: false });
        commit('set', { type: 'results', items: results });
        commit('set', { type: 'loading', items: false })
      }, function (error) {
        commit('set', { type: 'error', items: true });
        commit('set', { type: 'loading', items: false })
      })
    },
    changePage({ commit }, query) {
      commit(query, 'page')
    },
    addFavorite({ commit }, query) {
      let array = this.getters.results;
      let index = array.findIndex(function(el) {
        return el === query.item
      });
      this.getters.results[index].favorite = query.boolean
    },
    setFilter({ commit }, query) {
      commit('set', { type: 'filter', items: query })
    },
    setState({ commit }, query) {
      commit('set', { type: query.type, items: query.field })
    }
  }
});

export default store