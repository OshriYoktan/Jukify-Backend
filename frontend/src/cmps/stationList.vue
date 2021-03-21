<template>
  <li class="station-song row-layout-container">
    <div
      class="station-card-container"
      v-for="station in stationsFiltered"
      :key="station._id"
    >
      <station-preview :station="station" />
    </div>
  </li>
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
    checkGenre() {
      const stationsAfterFilter = this.stations.filter((s) => {
        return s.genres.includes(this.genre.toLowerCase());
      });
      this.stationsFiltered = stationsAfterFilter;
    },
  },
  async created() {
    await this.$store.dispatch({ type: "loadStations" });
    this.stations = this.$store.state.stationStore.stations;
    this.checkGenre();
  },
  components: {
    stationPreview,
  },
};
</script>