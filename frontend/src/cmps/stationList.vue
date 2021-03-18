<template>
  <section class="container">
    <div class="explore-sub-container column-layout-container sub-container">
      <div class="flex column-layout-container" v-for="(genre, idx) in genres" :key="idx">
        <h1>{{genre}}</h1>
        <ul class="stations-list" v-for="(station, idx) in stations" :key="idx">
          <station-preview :station="station" :genre="genre" />
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
      genres: ["Hip-Pop", "Band", "Israeli"],
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