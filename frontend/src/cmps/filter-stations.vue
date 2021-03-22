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
      <button :class="isClicked('All')" @click="genreSelect('All')">All</button>
      <button
        v-for="(genre, idx) in genres"
        :key="idx"
        :class="isClicked(genre)"
        @click="genreSelect(genre)"
      >
        {{ genre }}
      </button>
    </div>
    <div v-if="genre">
      <h3>{{ showGenre }}</h3>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      genre: "All",
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
    isClicked(genre) {
      return (genre === this.genre && genre === "All") || genre === this.genre
        ? "clicked-filter-btn"
        : "";
    },
  },
  computed: {
    genres() {
      return this.$store.state.stationStore.genres;
    },

    showGenre() {
      this.genre.charAt(0);
      return this.genre;
    },
  },
};
</script>

<style>
</style>