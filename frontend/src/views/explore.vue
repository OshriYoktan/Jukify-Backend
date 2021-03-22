<template>
  <div class="explore-container column-layout-container">
    <div class="explore-header column-layout-container">
      <h1>Explore world music</h1>
      <filter-stations />
    </div>
      <div class="station-card-container row-layout-container">
        <station-list />
      </div>
  </div>
</template>

<script>
import stationList from "../cmps/stationList";
import filterStations from "../cmps/filter-stations";
export default {
  name: "explore",
  computed: {
    genres() {
      return this.$store.state.stationStore.genres;
    },
  },
  components: {
    stationList,
    filterStations,
  },
};
</script>