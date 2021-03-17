<template>
  <div>
    <h1>Explore</h1>
    <div>
    </div>
    <div v-if="playlists.length">
      <ul>
        <li
          v-for="(playlist, idx) in playlists"
          :key="idx"
          @click="loadPlaylists(playlist)"
        >
          {{ playlist }}
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
import { playlistService } from "../services/playlist.service";
export default {
  name: "explore",
  data() {
    return {
      playlists: ["Omer Adam", "noga erez", "eyal golan"],
      songs: [],
    };
  },
  methods: {
    loadPlaylists(song) {
      this.songs = [];
      playlistService.askSearch(song).then((res) => {
        console.log("res:", res);
        res.forEach((song) => {
          const playlist = {
            title: song.snippet.title,
            artist: song.snippet.channelTitle,
            desc: song.snippet.description,
            img: song.snippet.thumbnails.default.url,
            videoId: song.id.videoId,
            publishAt: song.snippet.publishedAt,
          };
          this.songs.push(playlist);
        });
        console.log("this.playlists:", this.playlists);
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