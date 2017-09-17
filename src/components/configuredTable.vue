<template>
  <div>
    <input type="radio" id="small" :value="config.size.small" v-model="picked" v-on:click="search" :disabled="loading">
    <label for="small">Small set</label>
    <br>
    <input type="radio" id="big" :value="config.size.big" v-model="picked" v-on:click="search" :disabled="loading">
    <label for="big">Big set</label>
    <br>
    <div v-show="picked && !loading && !error">
      <table>
        <tr>
          <th v-for="(field, index) in config.tableFields">
            <a href="#" @click="sort(field.path)">
              {{field.header}}
            </a>
          </th>
        </tr>
        <tr v-for="(person, index) in results">
          <td v-for="(field, index) in config.tableFields">{{person[field.path]}}</td>
        </tr>
      </table>
      <pagination @pageChanged="results"></pagination>
    </div>
    <div v-show="error">
      <br>
      Server error. Please, try later.
    </div>
  </div>
</template>

<script>
  import pagination from './pagination.vue'
  import orderBy from 'lodash.orderby'

  let data = {
    picked: false,
    sortKey: 'id',
    reverse: false
  }

  export default {
    components: {
      pagination
    },
    data: function () {
      return data
    },
    methods: {
      search() {
        this.$store.dispatch('search', this.picked)
      },
      sort(field) {
        if (this.sortKey == field)
          if (this.reverse)
            this.reverse = false
          else this.reverse = true
        else {
          this.sortKey = field
          this.reverse = false
        }
      }
    },
    computed: {
      results() {
        let array = orderBy(this.$store.getters.results, this.sortKey)
        if (this.reverse)
          return array.reverse()
        return array
      },
      config() {
        return this.$store.getters.config
      },
      loading() {
        return this.$store.getters.loading
      },
      error() {
        return this.$store.getters.error
      }
    }
  }
</script>

<style lang="css">
    @import '../style/table.css';
</style>