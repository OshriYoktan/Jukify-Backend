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
        <div class="menu-container">
          <span class="station-menu" @click="removeStation">⋮</span>
          <span class="station-menu-delete" @click="removeStation">🗑</span>
        </div>
      </div>
      <div class="station-play-like row-layout-container">
        <button @click="playVideo">Play</button>
        <button @click="addStationLike">Like</button>
      </div>
      <div class="search-songs-container row-layout-container">
        <button v-if="!isSearch" @click="isSearch = !isSearch">
          Add songs
        </button>
        <button v-else @click="isSearch = !isSearch">Close</button>
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
            @click="playVideo(song.videoId)"
            v-for="song in currStation.songs"
            :key="song._id"
          >
            <div v-if="foundSongs && isSearch">{{ songNameDisplay(song) }}</div>
            <div v-else>{{ song.name }}</div>
            <button @click.prevent="removeSong(song._id)" style="color: red">
              🗑
            </button>
          </li>
        </ul>
      </div>
      <div v-if="foundSongs && isSearch" class="songs-result-container">
        <ul>
          <li
            @click="addToStation(idx)"
            v-for="(song, idx) in foundSongs"
            :key="idx"
          >
            {{ songResaultNameDisplay(song.snippet.title) }}
            <button>➕</button>
          </li>
        </ul>
      </div>
    </div>
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
      isLiked: false,
    };
  },
  methods: {
    playVideo(id) {
      if (!id) id = this.currStation.songs[0].videoId;
      this.videoId = id;
      this.$store.dispatch({
        type: "setStation",
        currStation: this.currStation,
      });
      this.$store.dispatch({ type: "setVideoId", videoId: this.videoId });
      this.$root.$emit("startPlaySong");
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
    async removeSong(songId) {
      try {
        await this.$confirm(
          "Are you sure you want to delete this song?",
          "Warning",
          {
            confirmButtonText: "Sure",
            cancelButtonText: "Cancel",
            type: "warning",
          }
        );
        const songRemove = {
          songId,
          stationId: this.currStation._id,
        };
        await this.$store.dispatch({ type: "removeSong", songRemove });
          this.$message({
            type: "success",
            message: "Song deleted successfuly!",
          });
      } catch {
        this.$message({
          type: "error",
          message: "Song could'nt be deleted, please try again later.",
        });
      }
    },
    async addToStation(idx) {
      try {
        const selectedSong = this.foundSongs[idx];
        const payload = {
          selectedSong,
          stationId: this.currStation._id,
        };
        console.log("selectedSong:", selectedSong);
        await this.$store.dispatch({ type: "addToStation", payload });
        this.$message({ type: "success", message: "Song added successfuly!" });
      } catch {
        this.$message({
          type: "error",
          message: "Song could'nt be added, please try again later.",
        });
      }
    },
    async removeStation() {
      try {
        // await this.$store.dispatch({
        //   type: "removeStation",
        //   payload: this.currStation._id,
        // });
      } catch {}
    },
    async addStationLike() {
      try {
        this.isLiked = !this.isLiked;
        const num = this.isLiked ? 1 : -1;
        const addLike = {
          station: this.currStation._id,
          num,
        };
        await this.$store.dispatch({ type: "addStationLike", addLike });
      } catch {}
    },
    songNameDisplay(song) {
      var songName = JSON.parse(JSON.stringify(song.name));
      const name =
        song.name.length >= 45 ? songName.slice(0, 45) + "..." : song.name;
      return name;
    },
    songResaultNameDisplay(song) {
      const name = song.length >= 50 ? song.slice(0, 50) + "..." : song;
      return name;
    },
  },
  computed: {
    genres() {
      return this.$store.state.stationStore.genres;
    },
  },
  async created() {
    try {
      await this.$store.dispatch({ type: "loadStations" });
      const id = this.$route.params.stationName;
      this.$store.dispatch({ type: "setCurrStation", id });
      this.currStation = this.$store.state.stationStore.currStation;
    } catch {}
  },
  components: {
    playerControl,
  },
};
</script>