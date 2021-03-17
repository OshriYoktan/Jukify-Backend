<template>
  <section>
    <h1>{{ stationName }}</h1>
    <h2>GENRES</h2>
    <div class="station-img">
      <img :src="stationImg" alt="" />
    </div>
    <form @submit="addSong">
      <input type="text" placeholder="Search song online" v-model="search" />
      <button>Find</button>
    </form>
    <ul v-if="searchedSongs.length">
      <li v-for="(searchedSong,idx) in searchedSongs" :key="idx">
        {{ searchedSong.snippet.title }} 
        <button @click="addToStaion(searchedSong.snippet.title)">+</button>
      </li>
    </ul>
    <div v-if="songs.length">
      <ul>
        <li v-for="(song, idx) in songs" :key="idx">
          {{ song.title }}
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
      stationImg: '',
      search: '',
      searchedSongs: []
    };
  },
  methods: {
    addSong() {
      const searchedSong = this.search
      stationService.askSearch(searchedSong).then((songs) => {
        songs.forEach((song) => {
          this.searchedSongs.push(song)
        })
          console.log(this.searchedSongs);
      })
          this.searchedSongs = []
    },
    addToStaion(songTitle) {
      stationService.askSearch(songTitle).then(song => {
        this.songs.push(song[0])
      })
      this.searchedSongs = []
    }
  },
  created() {
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
};
</script>
