<template>
  <section class="details-container column-layout-container" v-if="currStation">
    <h1>{{ currStation.name }}</h1>
    <div v-if="currStation" class="station-songs-container">
      <ul>
        <li
          v-for="song in currStation.songs"
          @click="playVideo(song.videoId)"
          :key="song._id"
        >
          {{ song.name }}
          <button @click="removeSong(song._id)">✖</button>
        </li>
      </ul>
    </div>
    <div class="search-songs-container column-layout-container">
      <button @click="isSearch = !isSearch">Find songs</button>
      <form @submit.prevent="searchSongs" v-if="isSearch">
        <input type="text" placeholder="Search song online" v-model="search" />
        <button>Find</button>
      </form>
    </div>
    <div v-if="foundSongs && isSearch" class="songs-result-container">
      <ul>
        <li v-for="(song, idx) in foundSongs" :key="idx">
          {{ song.snippet.title }}
          <button @click="addToStation(idx)">➕</button>
        </li>
      </ul>
    </div>
    <playerControll :station="currStation" v-if="videoId" :videoId="videoId" />
  </section>
</template>

<script>
import { stationService } from "../services/station.service";
import playerControll from "../cmps/playerControll.vue";
export default {
  name: "station-details",
  data() {
    return {
      currStation: null,
      foundSongs: null,
      isSearch: false,
      search: "",
      videoId: null,
      genreCount: 1,
    };
  },
  methods: {
    playVideo(id) {
      this.videoId = id;
    },
  },

  async searchSongs() {
    try {
      const songs = await stationService.askSearch(this.search);
      this.foundSongs = songs;
    } catch {}
  },
  async addToStation(idx) {
    try {
      const selectedSong = this.foundSongs[idx];
      const payload = {
        selectedSong,
        stationId: this.currStation._id,
      };
      await this.$store.dispatch({ type: "addToStation", payload });
    } catch {}
  },

  computed: {
    genres() {
      return this.$store.state.stationStore.genres;
    },
  },
  created() {
    const id = this.$route.params.stationName;
    stationService.getStationIdxById(id).then((idx) => {
      const station = this.$store.state.stationStore.stations[idx];
      this.currStation = station;
    });
  },
  components: {
    playerControll,
  },
};
</script>

<style >
iframe {
  width: 100%;
  max-width: 0px;
  height: 0;
}

.song-player {
  display: flex;
  justify-content: space-between;
  background-color: grey;
  width: 100%;
  height: 75px;
  margin-top: 238px;
}
</style>