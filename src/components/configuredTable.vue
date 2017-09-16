<template>
  <div>
    <table>
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
    rows: 32
  }

  export default {
    data: function () {
      return data
    },
    methods: {
      search() {
        this.$store.dispatch('search', this.rows)
      }
    },
    computed: {
      results() {
        return this.$store.getters.results
      },
      config() {
        return this.$store.getters.config
      }
    },
    created: function () {
      this.search()
    }
  }
</script>

<style lang="css">
    @import '../style/table.css';
</style>