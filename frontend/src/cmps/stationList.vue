<template>
  <div class="station-card-container row-layout-container">
    <ul v-for="station in stations" :key="station._id" :class="classes">
      <station-preview :isGender="classes" :station="station" :genre="genre" />
    </ul>
  </div>
</template>
 
<script>
import stationPreview from "../cmps/stationPreview.vue";
export default {
  props: ["genre"],
  name: "station-list",
  data() {
    return {
      isGenre: false,
    };
  },
  computed: {
    stations() {
      return this.$store.state.stationStore.stations;
    },
    classes(genre = false) {
      if (!genre) console.log('ss');
      if (!genre) return 'display-none';
    },
  },
  components: {
    stationPreview,
  },
};
</script>