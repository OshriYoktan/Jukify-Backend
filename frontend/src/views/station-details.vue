<template>
  <section v-if="currStation">
    <h1>{{ currStation.name }}</h1>
    <h2>GENRES</h2>
    <form @submit.prevent="searchSongs">
      <input type="text" placeholder="Search song online" v-model="search" />
      <button>Find</button>
    </form>
    <ul v-if="currStation">
      <li v-for="song in currStation.songs" :key="song._id">
        {{ song.name }}
        <!-- <button @click="removeSong(song._id)">x</button> -->
      </li>
    </ul>
    <div v-if="foundSongs">
      <ul>
        <li v-for="(song, idx) in foundSongs" :key="idx">
          {{ song.snippet.title }}
          <button @click="addToStaion(idx)">+</button>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import { stationService } from "../services/station.service";

export default {
  name: "station-details",
  data() {
    return {
      currStation: null,
      foundSongs: null,
      search: "",
    };
  },
  methods: {
    async removeSong(id) {
      try {
        await this.$store.dispatch({ type: "removeSong", id: id });
      } catch {}
    },
    async loadSongs() {
      try {
        await this.$store.dispatch({ type: "loadSongs" });
      } catch {}
    },
    async searchSongs() {
      try {
        const songs = await stationService.askSearch(this.search);
        this.foundSongs = songs;
      } catch {}
    },
    async addToStaion(idx) {
      try {
        const selectedSong = this.foundSongs[idx];
        const payload = {
          selectedSong,
          stationId: this.currStation._id,
        };
        await this.$store.dispatch({ type: "addToStation", payload });
      } catch {}
    },
  },
  computed: {
    songs() {
      return this.$store.state.stationState.songs;
    },
  },
  created() {
    const id = this.$route.params.stationName;
    stationService.getStationById(id).then((station) => {
      this.currStation = station;
    });
  },
};
</script>
