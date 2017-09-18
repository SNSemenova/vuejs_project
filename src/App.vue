<template>
  <div id="app">
    <configured-table></configured-table>
    <pulse-loader v-if="loading"></pulse-loader>
  </div>
</template>

<script>
  import configuredTable from './components/configuredTable.vue'
  import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
export default {
  components: {
    configuredTable,
    PulseLoader
  },
  computed: {
    loading() {
      return this.$store.getters.loading
    }
  }
}
</script>

<style lang="css">
@import './style/index.css';
</style>
