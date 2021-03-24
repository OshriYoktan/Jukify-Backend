<template>
  <div class="song-player">
    <div class="song-video">
      <youtube :video-id="songId" ref="youtube"></youtube>
    </div>
    <img v-if="song" :src="songImage" alt="" :class="imgRotate" />
    <div class="playing-now row-layout-container" v-if="song">
      <h3>{{ song }}</h3>
    </div>
    <div class="playing-now row-layout-container" v-else>
      <h3>No song has been playing</h3>
    </div>
    <div class="main-player-section column-layout-container">
      <div class="playing-btns row-layout-container">
        <font-awesome-icon icon="step-backward" @click="changeSong(-1)" />
        <font-awesome-icon
          icon="play"
          @click="togglePlay"
          v-if="!$store.getters.getIsPlaying"
        />
        <font-awesome-icon icon="pause-circle" @click="togglePlay" v-else />
        <font-awesome-icon icon="step-forward" @click="changeSong(1)" />
      </div>
      <div class="duration-song row-layout-container">
        <span>{{ songPlayer.currTime }}</span>
        <input
          class="song-duration"
          @input="setSongTime"
          v-model="songPlayer.currTime"
          type="range"
          :max="songPlayer.duration"
        />
        <span v-if="songPlayer.duration">{{ songPlayer.duration }}</span>
        <span v-else>00:00</span>
      </div>
    </div>
    <div class="music-btns row-layout-container">
      <font-awesome-icon
        icon="volume-mute"
        @click="muteSong"
        v-if="$store.getters.getIsSongMuted"
      />
      <font-awesome-icon icon="volume-up" @click="muteSong" v-else />
      <div class="volume-range-container">
        <el-slider
          @input="setSongVolume(songPlayer.volumeRange)"
          v-if="!$store.getters.getIsSongMuted"
          v-model="songPlayer.volumeRange"
          :show-tooltip="false"
        ></el-slider>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      songPlayer: {
        volumeRange: 100,
        currTime: null,
        duration: null,
      },
    };
  },
  methods: {
    async togglePlay() {
      const playing = await this.$store.dispatch({ type: "togglePlay" });
      playing ? this.player.playVideo() : this.player.pauseVideo();
    },
    async togglePlayForSockets() {
      try {
        const playing = await this.$store.dispatch({ type: "togglePlay" });
        playing ? this.player.playVideo() : this.player.pauseVideo();
      } catch (err) {
        throw err;
      }
    },
    // async getDuration() {
    //   try {
    //     this.songPlayer.duration = await this.player.getDuration();
    //   } catch (err) {
    //     console.log("err", err);
    //   }
    // },
    async setSongVolume(vol) {
      const volume = await this.$store.dispatch({ type: "setSongVolume", vol });
      return this.player.setVolume(volume);
    },
    async playVideo() {
      await this.$store.dispatch({
        type: "playVideo",
      });
      this.$nextTick(() => {
        this.player.playVideo();
      });
    },
    async changeSong(dif) {
      try {
        socketService.emit("player to-next-previouse-song", dif);
      } catch (err) {
        throw err;
      }
    },
    async changeSongForSockets(dif) {
      try {
        const payload = { dif };
        await this.$store.dispatch({ type: "changeSong", payload });
        this.$nextTick(() => {
          this.player.playVideo();
        });
        this.$store.getters.getSongName;
      } catch (err) {
        throw err;
      }
    },

    async muteSong() {
      const isMute = await this.$store.dispatch({ type: "muteSong" });
      this.songPlayer.isMuted = !this.songPlayer.isMuted;
      return isMute ? this.player.mute() : this.player.unMute();
    },
    async setSongTime() {
      this.player.seekTo(this.songPlayer.currTime);
    },
  },
  computed: {
    player() {
      return this.$refs.youtube.player;
    },
    songs() {
      return this.$store.state.stationState.songs;
    },
    songId() {
      return this.$store.getters.getSongId;
    },
    songImage() {
      return this.$store.getters.getSongImage;
    },
    song() {
      var song = JSON.parse(JSON.stringify(this.$store.getters.getSongName));
      if (!song) return;
      const name = song.slice(0, 30) + "...";
      return name;
    },
    imgRotate() {
      console.log(
        "this.$store.state.playerStore.songPlayer.isPlaying:",
        this.$store.state.playerStore.songPlayer.isPlaying
      );
      return this.$store.state.playerStore.songPlayer.isPlaying
        ? "song-image rotating"
        : "song-image";
    },
  },
  created() {},
  mounted() {
    this.$root.$on("startPlaySong", () => {
      this.$nextTick(() => {
        this.player.playVideo();
        setInterval(() => {
          this.player.getCurrentTime().then((duration) => {
            this.songPlayer.currTime = duration.toFixed(0);
          });
        }, 1000);
        // this.getDuration();
        setTimeout(() => {
          this.player.getDuration().then((duration) => {
            this.songPlayer.duration = duration
          })
        },1000)
      });
      this.playVideo(this.songId);
      this.$store.getters.getSongName;
    });
  },
  async created() {
    try {
      socketService.on("player toggle-play-song", () => {
        console.log("socket (player toggle-play-song) arrived");
        this.togglePlayForSockets();
      });
      socketService.on("player next-previouse-song", (dif) => {
        console.log("socket (player next-previouse-song) arrived");
        this.changeSongForSockets(dif);
      });
    } catch (err) {
      console.log("error: ", err);
    }
  },
  destroyed() {
    socketService.off("player toggle-play-song");
    socketService.off("player next-previouse-song");
    socketService.terminate();
  },
};
</script>
