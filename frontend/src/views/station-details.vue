<template>
  <section class="details-container" v-if="currStation">
    <div class="station-details column-layout-container">
      <div class="station-img column-layout-container">
        <img :src="currStation.imgUrl" />
      </div>

      <div class="station-desc row-layout-container">
        <div>
          <div>
            <h1>{{ currStation.name }}</h1>
            <p>{{ currStation.desc }}</p>
          </div>
          <div>
            <span style="color: red">♥</span> {{ likes(currStation.likes) }}
          </div>
        </div>
        <span class="station-menu" @click="removeStation">⋮</span>
      </div>
      <div class="station-play-like row-layout-container">
        <button>Play</button>
        <button @click="addStationLike">Like</button>
      </div>
      <div class="search-songs-container row-layout-container">
        <button @click="isSearch = !isSearch">Find songs</button>
        <div class="search-songs row-layout-container">
          <form @submit.prevent="searchSongs" v-if="isSearch">
            <input
              type="text"
              placeholder="Search song online"
              v-model="search"
            />
            <button>Find</button>
          </form>
        </div>
      </div>
    </div>
    <div class="chat-room column-layout-container">
      <h1>Chat Room</h1>
    </div>
    <div class="songs-container row-layout-container">
      <div v-if="currStation" class="station-songs-container">
        <ul>
          <li
            v-for="song in currStation.songs"
            @click="playVideo(song.videoId)"
            :key="song._id"
          >
            {{ song.name }}
            <button @click="removeSong(song._id)" style="color: red">🗑</button>
          </li>
        </ul>
      </div>
      <div v-if="foundSongs && isSearch" class="songs-result-container">
        <ul>
          <h3>Songs:</h3>
          <li
            @click="addToStation(idx)"
            v-for="(song, idx) in foundSongs"
            :key="idx"
          >
            {{ song.snippet.title }}
          </li>
        </ul>
      </div>
    </div>
    <playerControl :station="currStation" v-if="videoId" :videoId="videoId" />
  </section>
</template>

<script>
import { stationService } from "../services/station.service";
import playerControl from "../cmps/playerControl.vue";
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
      isLiked: false,
    };
  },
  methods: {
    playVideo(id) {
      this.$store.dispatch({
        type: "setStation",
        currStation: this.currStation,
      });
      this.videoId = id;
    },
    likes(likes) {
      return likes.toLocaleString();
    },
    async searchSongs() {
      try {
        const songs = await stationService.askSearch(this.search);
        this.foundSongs = songs;
      } catch {}
    },
    async removeSong(id) {
      try {
        const payload = {
          id,
          stationId: this.station._id,
        };
        await this.$store.dispatch({ type: "removeSong", payload });
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
    async removeStation() {
      try {
        // await this.$store.dispatch({
        //   type: "removeStation",
        //   payload: this.currStation._id,
        // });
      } catch {}
    },
    addStationLike() {
      this.isLiked = !this.isLiked;
      const num = this.isLiked ? 1 : -1;
      const addLike = {
        station: this.currStation._id,
        num,
      };
      this.$store.dispatch({ type: "addStationLike", addLike });
    },
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
    playerControl,
  },
};
</script>