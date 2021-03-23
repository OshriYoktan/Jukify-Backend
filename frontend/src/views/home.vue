<template>
  <div class="home-page-container column-layout-container">
    <!-- <div v-if="isLoading" class="loading">
      <img
        class="jukify-loader"
        src="https://lh3.googleusercontent.com/proxy/mdV6pM1AH6AnviLd-YsC6oV5HnpQdDK_d3PwUs700ZKXwRoLZMtPNS3km2kPk1M28Icr2J3XSBoQ3dxicZGufx04kckHmDLNS2DnyFVG"
        alt=""
      />
    </div> -->
    <div class="hero-container">
      <router-link class="link" to="/explore">start listening </router-link>
    </div>
    <div class="home-cards-container column-layout-container">
      <h1>Looking for music?</h1>
      <div
        class="home-genre-container column-layout-container"
        v-for="(genre, idx) in genres"
        :key="idx"
      >
        <h2>{{ genre }}</h2>
        <home-list :genre="genre" @loader="loading" />
      </div>
    </div>
  </div>
</template>
<script>
import homeList from "../cmps/home-list";
export default {
  name: "Home",
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
    homeList,
  },
};
</script>