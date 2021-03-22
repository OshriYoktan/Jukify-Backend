<template>
  <div class="home-page column-layout-container">
    <div v-if="isLoading" class="loading">
      <img src="https://i.pinimg.com/originals/ab/45/bb/ab45bb4451536652faca51ae4f42d5dd.gif" alt="">
    </div>
    <div class="hero-container">
      <router-link class="link" to="/explore">start listening </router-link>
    </div>
    <div class="home-cards-container column-layout-container">
      <div class="home-header column-layout-container">
        <h3>Start listening to the best stations</h3>
      </div>
      <div class="cards-container column-layout-container">
        <ul
          class="genre-container column-layout-container"
          v-for="(genre, idx) in genres"
          :key="idx"
        >
          <h1>{{ genre }}</h1>
          <home-list :genre="genre" @loader="loading"/>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import stationPreview from "../cmps/stationPreview";
import homeList from "../cmps/home-list";
export default {
  name: "Home",
  data() {
    return {
      isLoading: true
    }
  },
  computed: {
    genres() {
      return this.$store.state.stationStore.genres;
    },
  },
  methods:{
    loading(val) {
      this.isLoading = val;
    }
  },
  components: {
    stationPreview,
    homeList,
  },

};
</script>