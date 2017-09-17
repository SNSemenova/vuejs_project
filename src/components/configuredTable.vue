<template>
  <div>
    <input type="radio" id="small" :value="config.size.small" v-model="picked" v-on:click="search" :disabled="loading">
    <label for="small">Small set</label>
    <br>
    <input type="radio" id="big" :value="config.size.big" v-model="picked" v-on:click="search" :disabled="loading">
    <label for="big">Big set</label>
    <br>
    <div v-show="picked && !loading">
      <input v-model="filter" placeholder="Filter users by name">
      <table>
        <tr>
          <th>★</th>
          <th v-for="(field, index) in config.tableFields">
            <a href="#" @click="sort(field.path)">
              {{field.header}}
            </a>
          </th>
        </tr>
        <tr v-for="(person, index) in results">
          <a href="#" class="favorite" @click="addFavorite(person)"
             v-bind:class="{ active: favorite.indexOf(person.id) != -1 }">★</a>
          <td v-for="(field, index) in config.tableFields">{{person[field.path]}}</td>
        </tr>
      </table>
      <pagination @pageChanged="results"></pagination>
    </div>
  </div>
</template>

<script>
  import pagination from './pagination.vue'
  import orderBy from 'lodash.orderby'

  let data = {
    picked: false,
    sortKey: 'id',
    reverse: false,
    filter: '',
    isActive: false,
    favorite: []
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
      },
      addFavorite(item) {
        let array = this.favorite
        let index = array.indexOf(item.id)
        if (index != -1) {
          array.splice(index, 1)
          this.$store.dispatch('addFavorite', { item: item, boolean: false })
        }
        else {
          array.push(item.id)
          this.$store.dispatch('addFavorite', { item: item, boolean: true })
        }
      }
    },
    computed: {
      results() {
        let array = orderBy(this.$store.getters.results, this.sortKey)
        let filter = this.filter
        if (filter != '')
          array = array.filter(function(el) {
            return el.firstName.toLowerCase().indexOf(filter.toLowerCase()) > -1
              || el.favorite;
          })
        if (this.reverse)
          return array.reverse()
        return array
      },
      config() {
        return this.$store.getters.config
      },
      loading() {
        return this.$store.getters.loading
      }
    }
  }
</script>

<style lang="css">
  @import '../style/table.css';
</style>