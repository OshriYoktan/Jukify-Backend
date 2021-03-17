<template>
  <div>
    <h1>Explore</h1>
    <div>
    </div>
    <div v-if="stations.length">
      <ul>
        <li
          v-for="(station, idx) in stations"
          :key="idx"
          @click="loadStations(station)"
        >
          {{ station }}
        </li>
      </ul>
    </div>
    <div v-if="songs.length">
      <ul>
        <li v-for="(song, idx) in songs" :key="idx">
          {{ song.title }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import youtube from "../cmps/youtube";
import { stationService } from "../services/station.service";
export default {
  name: "explore",
  data() {
    return {
      stations: ["Omer Adam", "noga erez", "eyal golan"],
      songs: [],
    };
  },
  methods: {
    loadStations(song) {
      this.songs = [];
      stationService.askSearch(song).then((res) => {
        console.log("res:", res);
        res.forEach((song) => {
          const station = {
            title: song.snippet.title,
            artist: song.snippet.channelTitle,
            desc: song.snippet.description,
            img: song.snippet.thumbnails.default.url,
            videoId: song.id.videoId,
            publishAt: song.snippet.publishedAt,
          };
          this.songs.push(station);
        });
      });
    },
  },
  components: {
    youtube,
  },
};
</script>

<style>
</style>