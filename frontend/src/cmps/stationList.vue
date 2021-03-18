<template>
  <div class="container">
    <div class="explore-sub-container column-layout-container sub-container">
      <div class="explore-header column-layout-container">
        <h1>Explore world music</h1>
        <h3>Start listening to the best new releases</h3>
      </div>
      <div
        class="flex column-layout-container"
        v-for="(genre, idx) in genres"
        :key="idx"
      >
        <h1>{{ genre }}</h1>
        <ul class="stations-list" v-for="(station, idx) in stations" :key="idx">
          <station-preview :station="station" :genre="genre" />
        </ul>
      </div>
    </div>
  </div>
</template>
 
<script>
import stationPreview from "../cmps/stationPreview.vue";
export default {
  name: "explore",
  computed: {
    stations() {
      return this.$store.state.stationStore.stations;
    },
    genres() {
      return this.$store.state.stationStore.genres;
    },
  },
  components: {
    stationPreview,
  },
};
</script>