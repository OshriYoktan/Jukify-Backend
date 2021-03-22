<template>
  <div class="song-player">
    <div class="song-video">
      <youtube :video-id="songId" ref="youtube"></youtube>
    </div>
    <div class="playing-now">Playing Now: {{ $store.getters.getSongName }}</div>
    <div class="playing-btns">
      <button @click="changeSong(-1)">Previous</button>
      <button @click="togglePlay" v-if="!$store.getters.getIsSongPlaying">Stop</button>
      <button @click="togglePlay" v-else>Start</button>
      <button @click="changeSong(1)">Next</button>
    </div>
    <div class="music-btns">
      <button @click="muteSong" v-if="!$store.getters.getIsSongMuted">Mute</button>
      <button @click="muteSong" v-else>Unmute</button>
      <input
        type="range"
        min="0"
        max="100"
        @change="setSongVolume(songPlayer.volumeRange)"
        v-model="songPlayer.volumeRange"
        class="set-volume"
      />
      <span>{{ $store.getters.getSongVolume }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      songPlayer: {
        volumeRange: 50,
      },
    };
  },
  methods: {
    async togglePlay() {
      const isPalying = await this.$store.dispatch({ type: "togglePlay" });
      return isPalying ? this.player.pauseVideo() : this.player.playVideo();
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
      return isMute ? this.player.mute() : this.player.unMute();
    },
  },
  computed: {
    player() {
      return this.$refs.youtube.player;
    },
    songs() {
      return this.$store.state.stationState.songs;
    },
    songId(){
      return this.$store.getters.getSongId;
    }
  },
  mounted() {
    this.$root.$on("startPlaySong", () => {
      this.$nextTick(() => {
        this.player.playVideo();
      });
      this.playVideo(this.songId);
      this.$store.getters.getSongName;
    });
  },
};
</script>
