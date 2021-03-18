<template>
  <section class="flex column-layout-container" v-if="currStation">
    <div v-if="!isNew">
      <h1>{{ currStation.name }}</h1>
      <h2>GENRES</h2>
    </div>
    <!-- TODO : mew component called CREATE STATION -->
    <div v-if="isNew">
      <form @submit.prevent="addStation">
        <input
          type="text"
          placeholder="station name"
          v-model="currStation.name"
        />
        <input type="file" @change="imgLoad" />
        <!-- <input type="text" v-model="currStation.genre" /> -->

        <button>Save</button>
      </form>
    </div>
    <!-- utill here -->
    <ul v-if="currStation">
      <li
        v-for="song in currStation.songs"
        @click="playSong(song.videoId)"
        :key="song._id"
      >
        {{ song.name }}
        <button @click="removeSong(song._id)">x</button>
      </li>
    </ul>
    <button @click="searchStatus">Add song to station.</button>
    <form @submit.prevent="searchSongs" v-if="isSearch">
      <input type="text" placeholder="Search song online" v-model="search" />
      <button>Find</button>
    </form>
    <div v-if="foundSongs && isSearch">
      <ul>
        <li v-for="(song, idx) in foundSongs" :key="idx">
          {{ song.snippet.title }}
          <button @click="addToStation(idx)">+</button>
        </li>
      </ul>
    </div>
    <div v-if="playingSongVideoId" class="player">
      <youtube :playingVideoId="playingSongVideoId" ref="youtube"></youtube>
    </div>
  </section>
</template>

<script>
import youtube from "../cmps/youtube";
import { stationService } from "../services/station.service";

export default {
  name: "station-details",
  data() {
    return {
      currStation: null,
      foundSongs: null,
      isSearch: false,
      isNew: false,
      search: "",
      playingSongVideoId: null,
    };
  },
  methods: {
    async removeSong(id) {
      try {
        const payload = {
          id,
          stationId: this.currStation._id,
        };
        await this.$store.dispatch({ type: "removeSong", payload });
        console.log("song deleted");
      } catch {}
    },
    imgLoad(ev) {
      const image = ev.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (ev) => {
        this.currStation.imgUrl = ev.target.result;
      };
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
        console.log("song added");
      } catch {}
    },
    searchStatus() {
      return this.isSearch ? (this.isSearch = false) : (this.isSearch = true);
    },
    playSong(videoId) {
      this.playingSongVideoId = videoId;
    },
    async addStation() {
      try {
        const station = this.currStation;
        await this.$store.dispatch({ type: "addStation", station });
      } catch {}
    },
  },
  computed: {
    songs() {
      return this.$store.state.stationState.songs;
    },
  },
  created() {
    this.currStation = null;
    const id = this.$route.params.stationName;
    if (!id) {
      this.currStation = stationService.getEmptystation();
      this.isNew = true;
      console.log("this.currStation:", this.currStation);
    } else
      stationService.getStationById(id).then((station) => {
        console.log("station:", station);
        this.currStation = station;
      });
  },
  components: {
    youtube,
  },
};
</script>