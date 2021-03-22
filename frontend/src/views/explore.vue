<template>
  <div class="explore-container column-layout-container">
    <div v-if="isLoading" class="loading">
      <img
        src="https://i.pinimg.com/originals/ab/45/bb/ab45bb4451536652faca51ae4f42d5dd.gif"
        alt=""
      />
    </div>
    <div class="explore-header column-layout-container">
      <h1>Explore world music</h1>
      <filter-stations />
    </div>
    <div class="station-card-container row-layout-container">
      <station-list @loader="loading" />
    </div>
  </div>
</template>

<script>
import stationList from "../cmps/stationList";
import filterStations from "../cmps/filter-stations";
export default {
  name: "explore",
  data() {
    return {
      isLoading: true,
    };
  },
  computed: {
    genres() {
      return this.$store.state.stationStore.genres;
    },
  },
  methods: {
    loading(val) {
      this.isLoading = val;
    },
  },
  components: {
    stationList,
    filterStations,
  },
  created() {
    console.log(this.genres);
  },
};
</script>