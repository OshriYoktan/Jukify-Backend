<template>
  <div class="song-player">
    <div class="song-video">
      <youtube :video-id="songId" ref="youtube"></youtube>
    </div>
    <div class="playing-now row-layout-container">
      <h3>Playing Now:<br />{{ song }}</h3>
    </div>
    <div class="playing-btns row-layout-container">
      <font-awesome-icon icon="step-backward" @click="changeSong(-1)" />
      <font-awesome-icon
        icon="play"
        @click="togglePlay"
        v-if="$store.getters.getIsSongPlaying"
      />
      <font-awesome-icon icon="pause-circle" @click="togglePlay" v-else />
      <font-awesome-icon icon="step-forward" @click="changeSong(1)" />
    </div>
    <div class="music-btns row-layout-container">
      <button @click="muteSong" v-if="!$store.getters.getIsSongMuted">
        <font-awesome-icon icon="volume-mute" />
      </button>
      <button @click="muteSong" v-else>
        <font-awesome-icon icon="volume-up" />
      </button>
      <input
        type="range"
        min="0"
        max="100"
        @change="setSongVolume(songPlayer.volumeRange)"
        v-model="songPlayer.volumeRange"
        class="set-volume"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      songPlayer: {
        volumeRange: 50,
        isPlaying: false
      },
    };
  },
  methods: {
    async togglePlay() {
      const playing = await this.$store.dispatch({ type: "togglePlay" });
      this.songPlayer.isPlaying = this.$store.state.playerStore.songPlayer.isPlaying
      return playing ? this.player.pauseVideo() : this.player.playVideo();
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
      console.log("this.songPlayer.isMuted:", this.songPlayer.isMuted);
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
    songId() {
      return this.$store.getters.getSongId;
    },
    song() {
      var song = JSON.parse(JSON.stringify(this.$store.getters.getSongName));
      const name = song.slice(0, 30) + "...";
      return name;
    },
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
