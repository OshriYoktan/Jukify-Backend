<template>
  <div class="station-card-container row-layout-container">
    <ul v-for="station in stations" :key="station._id">
      <station-preview :station="station" :genre="genre" />
    </ul>
  </div>
</template>
 
<script>
import stationPreview from "../cmps/stationPreview.vue";
export default {
  props: ['genre'],
  name: "station-list",
  computed: {
    stations() {
      return this.$store.state.stationStore.stations;
    },
  },
  components: {
    stationPreview,
  },
};
</script>