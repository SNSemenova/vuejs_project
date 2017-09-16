<template>
  <div id="app">
    <configured-table />
  </div>
</template>

<script>
  import configuredTable from './components/configuredTable.vue'
export default {
  components: {
    configuredTable
  }
}
</script>

<style lang="css">
@import './style/index.css';
</style>
