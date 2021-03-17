<template>
  <section>
    <h1>{{ stationName }}</h1>
    <h2>GENRES</h2>
    <div class="station-img">
      <img :src="stationImg" alt="" />
    </div>
    <form @submit.prevent="addSong">
      <input type="text" placeholder="Search song online" v-model="search" />
      <button>Find</button>
    </form>
    <ul v-if="searchedSongs.length">
      <li v-for="(searchedSong, idx) in searchedSongs" :key="idx">
        {{ searchedSong.snippet.title }}
        <button @click="addToStaion(searchedSong.snippet.title)">+</button>
      </li>
    </ul>
    <div v-if="songs.length">
      <ul>
        <li v-for="(song, idx) in songs" :key="idx">
          {{ song.title }}
          <button @click="removeSong(song.videoId)">x</button>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import { stationService } from "../services/station.service.js";
export default {
  name: "station-details",
  data() {
    return {
      songs: [],
      stationName: this.$route.params.stationName,
      stationImg: "",
      search: "",
      searchedSongs: [],
    };
  },
  methods: {
    removeSong(id) {
      const idx = this.songs.findIndex((song) => {
       return song.videoId === id
      });
      this.songs.splice(idx, 1)
    },


    
    loadSongs() {
      const name = this.$route.params.stationName;
      stationService.askSearch(name).then((songs) => {
        this.stationImg = songs[0].snippet.thumbnails.default.url;
        songs.forEach((song) => {
          const songToStation = {
            title: song.snippet.title,
            artist: song.snippet.channelTitle,
            desc: song.snippet.description,
            img: song.snippet.thumbnails.default.url,
            videoId: song.id.videoId,
            publishAt: song.snippet.publishedAt,
          };
          this.songs.push(songToStation);
        });
      });
    },
    addSong() {
      const searchedSong = this.search;
      stationService.askSearch(searchedSong).then((songs) => {
        songs.forEach((song) => {
          this.searchedSongs.push(song);
        });
      });
      this.searchedSongs = [];
    },
    addToStaion(songTitle) {
      stationService.askSearch(songTitle).then((song) => {
        var currSong = {
          title: song[0].snippet.title,
          artist: song[0].snippet.channelTitle,
          desc: song[0].snippet.description,
          img: song[0].snippet.thumbnails.default.url,
          videoId: song[0].id.videoId,
          publishAt: song[0].snippet.publishedAt,
        };
        this.songs.push(currSong);
      });
      this.searchedSongs = [];
    },
  },
  created() {
    // this.$store.dispatch({ type: "loadStations" });
    this.loadSongs();
  },
};
</script>
