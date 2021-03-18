<template>
  <section class="explore-container container">
    <div class="explore-sub-container sub-container">
      <h1>Explore world music</h1>
      <h3>Start listening to the best new releases</h3>
      <div>
        <ul v-for="(station, idx) in stations" :key="idx">
          <station-preview :station="station" />
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import stationPreview from "../cmps/stationPreview";
export default {
  name: "explore",
  data() {
    return {
      genres: ["Pop", "party", "mizrahit"],
    };
  },
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