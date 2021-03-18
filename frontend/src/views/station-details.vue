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
        @click="playVideo(song.videoId)"
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
    <div v-if="videoId" class="song-video">
      <youtube :video-id="videoId" ref="youtube" autoplay="1"></youtube>
    </div>

    <div v-if="videoId" class="song-player">
      <div class="playing-now">Playing Now: {{ videoId }}</div>
      <div class="playing-btns">
        <button>Previous</button>
        <button @click="pauseSong" v-if="!isPlaying">Stop</button>
        <button @click="pauseSong" v-else>Start</button>
        <button @click="nextSong">Next</button>
      </div>
      <div class="music-btns">
        <button @click="muteSong" v-if="!isMuted">Mute</button>
        <button @click="muteSong" v-if="isMuted">Un Mute</button>
        <input
          type="range"
          min="0"
          max="50"
          @change="setSongVolume(volumeRange)"
          v-model="volumeRange"
          class="set-volume"
        />
        <span>{{ volumeRange }}</span>
      </div>
      <div v-if="playingSongVideoId" class="player">
        <youtube :playingVideoId="playingSongVideoId" ref="youtube"></youtube>
      </div>
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
      isNew: false,
      search: "",
      videoId: "",
      // TODO: player object
      isPlaying: false,
      isMuted: false,
      volumeRange: 50,
    };
  },
  methods: {
    // TODO: ToggleVideo
    playVideo(videoId) {
      this.videoId = videoId;
      this.player.playVideo();
    },
    pauseSong() {
      if (!this.isPlaying) {
        this.isPlaying = true;
        this.player.pauseVideo();
      } else {
        this.isPlaying = false;
        this.player.playVideo();
      }
    },
    // Till here
    setSongVolume(val) {
      this.player.setVolume(val);
    },
    muteSong() {
      if (!this.isMuted) {
        this.isMuted = true;
        this.player.mute();
      } else {
        this.isMuted = false;
        this.player.unMute();
      }
    },
    nextSong() {
      // TODO: next video in currStation.songs (idx)
      // this.$store.state.stationStore.stations[idx].videoId
      this.player.nextVideo();
    },
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
      this.videoId = videoId;
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
    player() {
      return this.$refs.youtube.player;
    },
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
      stationService.getStationIdxById(id).then((idx) => {
        const station = this.$store.state.stationStore.stations[idx];
        this.currStation = station;
      });
  },
  components: {},
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