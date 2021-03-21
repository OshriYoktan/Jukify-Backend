<template>
  <input
    type="text"
    placeholder="Search a song:"
    @input="filterSong"
    v-model="filterBy.byName"
  />
</template>

<script>
export default {
  data() {
    return {
      filterBy: {
        byName: "",
      },
    };
  },
  methods: {
    filterSong() {
      this.$store.commit({ type: "setFilter", payload:  this.filterBy.byName  });
      this.$store.dispatch({ type: "loadStations" });
    },
  },
};
</script>

<style>
</style>