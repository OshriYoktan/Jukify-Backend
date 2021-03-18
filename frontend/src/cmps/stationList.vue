<template>
  <section class="container">
    <div class="explore-sub-container column-layout-container sub-container">
      <div class="flex column-layout-container ">
        <ul class="stations-list" v-for="(station, idx) in stations" :key="idx">
          <station-preview :station="station" />
        </ul>
      </div>
    </div>
  </section>
</template>
 
 
<script>
import stationPreview from "../cmps/stationPreview.vue";
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