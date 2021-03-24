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
            <font-awesome-icon
              style="color: red"
              icon="heart"
              @click="addStationLike"
            />
            {{ likes(currStation.likes) }}
          </div>
        </div>
        <div class="menu-container">
          <span class="station-menu">⋮</span>
          <span class="station-menu-delete" @click="removeStation">🗑</span>
        </div>
      </div>
      <div class="station-play-like row-layout-container">
        <font-awesome-icon icon="play" @click="playVideo(null)" />
        <font-awesome-icon icon="random" @click="shuffleSongs" />
        <font-awesome-icon
          v-if="!isLiked"
          icon="heart"
          @click="addStationLike"
        />
        <font-awesome-icon
          v-else
          style="color: red"
          icon="heart"
          @click="addStationLike"
        />
      </div>
      <div class="search-songs-container row-layout-container">
        <font-awesome-icon
          class="search-icon"
          icon="search"
          v-if="!isSearch"
          @click="isSearch = !isSearch"
        />
        <font-awesome-icon
          class="search-icon"
          icon="search"
          style="color: #1db954"
          v-else
          @click="isSearch = !isSearch"
        />
        <div class="search-songs row-layout-container">
          <form v-if="isSearch">
            <input
              @input="debounceInput"
              type="text"
              placeholder="Search song online"
              v-model="search"
            />
          </form>
        </div>
      </div>
    </div>
    <div class="chat-room column-layout-container">
      <station-chat :currStation="currStation" />
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
            <font-awesome-icon
              class="delete-song"
              icon="trash-alt"
              @click.stop="removeSong(song._id)"
              style="color: red"
            />
          </li>
        </ul>
      </div>
      <div
        class="songs-result-container"
        :style="{ 'max-width': resultsMaxwidth }"
      >
        <ul>
          <li
            @click="addToStation(idx)"
            v-for="(song, idx) in foundSongs"
            :key="idx"
          >
            <span>{{ songResaultNameDisplay(song.snippet.title) }}</span>
            <font-awesome-icon class="add-song" icon="plus" />
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import { stationService } from "../services/station.service";
import { socketService } from "../services/socket.service.js";
import playerControl from "../cmps/player-control";
import stationChat from "../cmps/station-chat";
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
      isResult: false,
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
      socketService.emit(
        "station new-song",
        this.$store.state.playerStore.songId
      );
      socketService.emit("chat topic", this.currStation._id);
    },
    playSongForSockets(id) {
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
        if (!this.search) this.isResult = false;
        this.isResult = true;
        console.log("in search");
        console.log("this.isResult:", this.isResult);
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
      } catch (err) {
        if ((err = "cancel")) return;
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
        await this.$confirm(
          "Are you sure you want to delete this station?",
          "Warning",
          {
            confirmButtonText: "Yes",
            cancelButtonText: "No",
            type: "warning",
          }
        );
        const stationId = this.currStation._id;
        await this.$store.dispatch({
          type: "removeStation",
          stationId,
        });
        this.$message({
          type: "success",
          message: "Station deleted successfuly!",
        });
        this.$router.push("/explore");
      } catch (err) {
        if (err === "cancel") return;
        this.$message({
          type: "error",
          message: "Station could'nt be deleted, please try again later.",
        });
      }
    },
    async addStationLike() {
      try {
        const num = this.isLiked ? -1 : 1;
        const addLike = {
          station: this.currStation._id,
          num,
        };
        await this.$store.dispatch({ type: "addStationLike", addLike });
        this.isLiked = !this.isLiked;
      } catch {}
    },
    songNameDisplay(song) {
      var songName = JSON.parse(JSON.stringify(song.name));
      const name =
        song.name.length >= 40 ? songName.slice(0, 40) + "..." : song.name;
      return name;
    },
    songResaultNameDisplay(song) {
      const name = song.length >= 50 ? song.slice(0, 50) + "..." : song;
      return name;
    },
    async shuffleSongs() {
      try {
        const stationId = this.currStation._id;
        await this.$store.dispatch({ type: "shuffleSongs", stationId });
        this.playVideo();
      } catch {}
    },
    debounce(func, wait = 500) {
      let timeout;
      return function (...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    },
  },
  computed: {
    genres() {
      return this.$store.state.stationStore.genres;
    },
    resultsMaxwidth() {
      return this.isResult ? "100vw" : "0";
    },
  },
  async created() {
    try {
      await this.$store.dispatch({ type: "loadStations" });
      const id = this.$route.params.stationName;
      this.$store.dispatch({ type: "setCurrStation", id });
      this.currStation = this.$store.state.stationStore.currStation;
      socketService.on("station change-song", this.playSongForSockets);
      this.debounceInput = this.debounce(this.searchSongs);
    } catch {}
  },
  destroyed() {
    socketService.off("station change-song", this.playSongForSockets);
    socketService.terminate();
  },
  components: {
    playerControl,
    stationChat,
  },
};
</script>