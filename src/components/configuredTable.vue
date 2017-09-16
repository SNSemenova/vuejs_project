<template>
  <div>
      <input type="radio" id="small" :value="config.size.small" v-model="picked" v-on:click="search" :disabled="loading">
      <label for="small">Small set</label>
      <br>
      <input type="radio" id="big" :value="config.size.big" v-model="picked" v-on:click="search" :disabled="loading">
      <label for="big">Big set</label>
      <br>
    <table v-if="picked && !loading">
      <tr>
        <th v-for="(field, index) in config.tableFields">{{field.header}}</th>
      </tr>
      <tr v-for="(person, index) in results">
        <td v-for="(field, index) in config.tableFields">{{person[field.path]}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
  let data = {
    picked: false
  }

  export default {
    data: function () {
      return data
    },
    methods: {
      search() {
        this.$store.dispatch('search', this.picked)
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
      }
    }
  }
</script>

<style lang="css">
    @import '../style/table.css';
</style>