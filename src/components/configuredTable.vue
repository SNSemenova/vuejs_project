<template>
  <div>
    <input type="radio" id="small" :value="config.size.small" v-model="picked" v-on:click="search" :disabled="loading">
    <label for="small">Small set</label>
    <br>
    <input type="radio" id="big" :value="config.size.big" v-model="picked" v-on:click="search" :disabled="loading">
    <label for="big">Big set</label>
    <br>
    <div v-if="picked && !loading && !error">
      <input v-model="filter" placeholder="Filter users by name">
      <table>
        <tr>
          <th>★</th>
          <th v-for="field in config.tableFields">
            <span v-if="reverse"> ▲ </span>
            <span v-else> ▼ </span>
            <a href="#" @click="sort(field.path)">
              {{field.header}}
            </a>
          </th>
        </tr>
        <tr v-for="person in results" v-on:click="show = person">
          <a href="#" class="favorite" v-on:click="addFavorite(person)"
             v-bind:class="{ active: favorite.indexOf(person.id) != -1 }">★</a>
          <td v-for="field in config.tableFields">{{person[field.path]}}</td>
        </tr>
      </table>
      <pagination @pageChanged="results"></pagination>
      <br>
      <!--TODO remove hardcode and add data to config.json -->
      <div v-if="show">
        Выбран пользователь <b> {{show.firstName}} {{show.lastName}} </b> <br>
        Описание:<br>
        <textarea>
          {{show.description}}
        </textarea><br>
        Адрес проживания: <b> {{show.adress.streetAddress}} </b><br>
        Город: <b> {{show.adress.city}} </b><br>
        Провинция/штат: <b> {{show.adress.state}} </b><br>
        Индекс: <b> {{show.adress.zip}} </b>
      </div>
    </div>
    <div v-show="error">
      <br>
      Server error. Please, try later.
    </div>
  </div>
</template>

<script>
  import pagination from './pagination.vue'

  let data = {
    picked: false,
    sortKey: 'id',
    reverse: false,
    filter: '',
    isActive: false,
    favorite: [],
    show: false
  };

  export default {
    components: {
      pagination
    },
    data: function () {
      return data
    },
    watch: {
      filter () {
        this.$store.dispatch('setState', {type: 'filter', field: this.filter})
      }
    },
    methods: {
      search() {
        this.$store.dispatch('search', this.picked)
      },
      sort(field) {
        this.$store.dispatch('setState', {type: 'sortKey', field: field});
        if (this.sortKey === field)
          this.reverse = !this.reverse;
        else {
          this.sortKey = field;
          this.reverse = false
        }
        this.$store.dispatch('setState', {type: 'reverse', field: this.reverse})
      },
      showObject(obj) {
        let keys = Object.keys(obj);
        let buildedString = "";
        keys.forEach(key => {
          buildedString += key + ": " + obj[key] + " "
        });
        return buildedString
      },
      addFavorite(item) {
        let array = this.favorite;
        let index = array.indexOf(item.id);
        if (index !== -1) {
          array.splice(index, 1);
          this.$store.dispatch('addFavorite', { item: item, boolean: false })
        }
        else {
          array.push(item.id);
          this.$store.dispatch('addFavorite', { item: item, boolean: true })
        }
      }
    },
    computed: {
      results() {
        return this.$store.getters.results
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