<template>
  <section class="details-container column-layout-container" v-if="currStation">
    <h1>{{ currStation.name }} station</h1>
    <div v-if="currStation" class="station-songs-container">
      <ul>
        <li
          v-for="song in currStation.songs"
          @click="playVideo(song.videoId)"
          :key="song._id"
        >
          {{ song.name }}
          <button @click="removeSong(song._id)">x</button>
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
    <div v-if="videoId" class="song-video">
      <youtube :video-id="videoId" ref="youtube"></youtube>
    </div>

    <div v-if="videoId" class="song-player">
      <div class="playing-now">Playing Now: {{ songPlayer.songName }}</div>
      <div class="playing-btns">
        <button @click="changeSong(-1)">Previous</button>
        <button @click="toggleSong" v-if="!songPlayer.isPlaying">Stop</button>
        <button @click="toggleSong" v-else>Start</button>
        <button @click="changeSong(1)">Next</button>
      </div>
      <div class="music-btns">
        <button @click="muteSong" v-if="!songPlayer.isMuted">Mute</button>
        <button @click="muteSong" v-else>Unmute</button>
        <input
          type="range"
          min="0"
          max="50"
          @change="setSongVolume(songPlayer.volumeRange)"
          v-model="songPlayer.volumeRange"
          class="set-volume"
        />
        <span>{{ songPlayer.volumeRange }}</span>
      </div>
      <!-- <div v-show="videoId" class="player"> -->
      <youtube :video-id="videoId" ref="youtube"></youtube>
      <!-- </div> -->
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
      isSearch: false,
      search: "",
      videoId: "",
      songPlayer: {
        isPlaying: false,
        isMuted: false,
        volumeRange: 50,
        songName: "",
      },
      // player: null
      genreCount: 1,
    };
  },
  methods: {
    playVideo(videoId) {
      const currSong = this.currStation.songs.find((song) => {
        return song.videoId === videoId;
      });
      this.songPlayer.songName = currSong.name;
      this.videoId = videoId;
      this.$nextTick(() => {
        this.player.playVideo();
      });
    },
    toggleSong() {
      if (!this.songPlayer.isPlaying) {
        this.songPlayer.isPlaying = true;
        this.player.pauseVideo();
      } else {
        this.songPlayer.isPlaying = false;
        this.player.playVideo();
      }
    },
    setSongVolume(val) {
      this.player.setVolume(val);
    },
    muteSong() {
      if (!this.songPlayer.isMuted) {
        this.songPlayer.isMuted = true;
        this.player.mute();
      } else {
        this.songPlayer.isMuted = false;
        this.player.unMute();
      }
    },
    changeSong(num) {
      var idx = this.currStation.songs.findIndex((song) => {
        return song.videoId === this.videoId;
      });
      var songIdx = idx + num;
      if (songIdx === this.currStation.songs.length) songIdx = 0;
      if (songIdx === -1) songIdx = this.currStation.songs.length - 1;
      const nextSong = this.currStation.songs[songIdx];
      this.videoId = nextSong.videoId;
      this.songPlayer.songName = nextSong.name;
      this.$nextTick(() => {
        this.player.playVideo();
      });
    },
    playSong(videoId) {
      this.videoId = videoId;
    },
    async removeSong(id) {
      try {
        const payload = {
          id,
          stationId: this.currStation._id,
        };
        await this.$store.dispatch({ type: "removeSong", payload });
      } catch {}
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
  },
  computed: {
    player() {
      return this.$refs.youtube.player;
    },
    songs() {
      return this.$store.state.stationState.songs;
    },
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