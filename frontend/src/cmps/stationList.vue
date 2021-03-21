<template>
  <div v-if="genre" class="station-card-container row-layout-container">
    <li v-for="station in stationsFiltered" :key="station._id">
      <station-preview :station="station" />
    </li>
    <!-- <ul v-else class="display-none"></ul> -->
  </div>
</template>
 
<script>
import stationPreview from "../cmps/stationPreview.vue";
export default {
  props: ["genre"],
  name: "station-list",
  data() {
    return {
      isSameGenre: true,
      stations: null,
      stationsFiltered: null,
      currStation: null,
    };
  },
  methods: {
    setStations() {
      this.stations = this.$store.state.stationStore.stations;
      this.checkGenre()
    },
    checkGenre() {
      const stationsAfterFilter = this.stations.filter((s) => {
        return s.genres.includes(this.genre.toLowerCase())
      });
      this.stationsFiltered = stationsAfterFilter;
      console.log("this.stationsFiltered:", this.stationsFiltered);
    },
    classes(genre = false) {
      if (!genre) console.log('ss');
      if (!genre) return 'display-none';
    },
  },
  created() {
    this.setStations();
  },
  components: {
    stationPreview,
  },
};
</script>