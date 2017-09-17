<template>
  <div class="pagination">
    <div class="pagination__left" v-if="hasPrev">
      <a href="#" @click="prevPage">Previous</a>
    </div>
    <span>{{currentPage}} of {{totalPages}}</span>
    <div class="pagination__right" v-if="hasNext">
      <a href="#" @click="nextPage">Next</a>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      nextPage: function () {
        this.$store.dispatch('changePage', 'increment')
      },
      prevPage: function () {
        this.$store.dispatch('changePage', 'decrement')
      }
    },
    computed: {
      hasPrev() {
        return this.$store.getters.hasPrev
      },
      hasNext() {
        return this.$store.getters.hasNext
      },
      currentPage() {
        return this.$store.getters.currentPage
      },
      totalPages() {
        return this.$store.getters.totalPages
      }
    }
  }
</script>

<style lang="css">
  @import '../style/table.css';
</style>