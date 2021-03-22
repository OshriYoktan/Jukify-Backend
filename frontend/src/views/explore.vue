<template>
    <div class="explore-sub-container column-layout-container">
        <h1>Explore world music</h1>
        <filter-songs />
      <div class="explore-header column-layout-container">
      </div>
      <div class="cards-container column-layout-container">
        <ul class="genre-container column-layout-container" v-for="(genre, idx) in genres" :key="idx">
          <h1>{{ genre }}</h1>
          <div class="station-card-container row-layout-container">
          <station-list :genre="genre" />
          </div>
        </ul>
      </div>
    </div>
</template>
 
<script>
import stationList from '../cmps/stationList'
import filterSongs from '../cmps/filter-songs'
export default {
  name: "explore",
  computed: {
    genres() {
      return this.$store.state.stationStore.genres;
    },
  },
  components: {
    stationList,
    filterSongs
  },

};
</script>