<template>
  <div class="filter-container column-layout-container">
    <div>
      <input
        type="text"
        placeholder="Search station"
        @input="filterSong"
        v-model="filterBy.byName"
      />
    </div>
    <div class="filter-genre-container">
      <button @click="genreSelect('all')">All</button>
      <button v-for="(genre, idx) in genres" :key="idx" @click="genreSelect(genre)">
        {{ genre }}
      </button>
    </div>
    <div v-if="genre">
      <h3>{{showGenre}}</h3>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      genre: false,
      filterBy: {
        byName: "",
        byGenre: "",
      },
    };
  },
  methods: {
    filterSong() {
      const filter = this.filterBy;
      this.$store.dispatch({ type: "setFilter", filter });
    },
    genreSelect(genre) {
      this.genre = genre;
      this.filterBy.byGenre = genre;
      this.filterSong();
    },
  },
  computed: {
    genres() {
      return this.$store.state.stationStore.genres;
    },
    showGenre() {
      this.genre.charAt(0)
      return this.genre
    }
  },
};
</script>

<style>
</style>