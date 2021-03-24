<template>
  <div class="song-player">
    <div class="song-video">
      <youtube :video-id="songId" ref="youtube"></youtube>
    </div>
    <div v-if="song" class="song-image">
      <img :src="songImage" alt="" />
    </div>
    <div class="playing-now row-layout-container" v-if="song">
      <h3>{{ song }}</h3>
    </div>
    <div class="playing-now row-layout-container" v-else>
      <h3>No song has been playing</h3>
    </div>
    <div v-if="songPlayer.currTime" class="duration-song">
      <span>{{ songPlayer.currTime }}</span>
      <input
        @input="setSongTime"
        v-model="songPlayer.currTime"
        type="range"
        :max="songPlayer.duration"
      />
      <span>{{ songPlayer.duration }}</span>
    </div>
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
    async getDuration() {
      this.songPlayer.duration = await this.player.getDuration();
    },
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
      const payload = { dif };
      await this.$store.dispatch({ type: "changeSong", payload });
      this.$nextTick(() => {
        this.player.playVideo();
      });
      this.$store.getters.getSongName;
    },
    async muteSong() {
      const isMute = await this.$store.dispatch({ type: "muteSong" });
      this.songPlayer.isMuted = !this.songPlayer.isMuted;
      return isMute ? this.player.mute() : this.player.unMute();
    },
    async setSongTime() {
      this.player.seekTo(this.songPlayer.currTime)
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
      });
      this.getDuration();
      this.playVideo(this.songId);
      this.$store.getters.getSongName;
    });
  },
  async created() {
    try {
      // socketService.on("station change-song", this.playSongForSockets);
    } catch {}
  },
  destroyed() {
    // socketService.off("station change-song", this.playSongForSockets);
    // socketService.terminate();
  },
};
</script>
