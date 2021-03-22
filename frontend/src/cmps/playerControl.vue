<template>
  <div class="song-player row-layout-container">
    <div class="song-video">
      <youtube :video-id="songId" ref="youtube"></youtube>
    </div>
    <div class="playing-now row-layout-container">
      <h3>Playing Now:<br>{{ song }}</h3>
    </div>
    <div class="playing-btns row-layout-container">
      <button @click="changeSong(-1)">
        <font-awesome-icon icon="step-backward" />
      </button>
      <button @click="togglePlay" v-if="!songPlayer.isPlaying">
        <font-awesome-icon icon="play" />
      </button>
      <button @click="togglePlay" v-else>
        <font-awesome-icon icon="pause-circle" />
      </button>
      <button @click="changeSong(1)">
        <font-awesome-icon icon="step-forward" />
      </button>
    </div>
    <div class="music-btns row-layout-container">
      <button @click="muteSong" v-if="!songPlayer.isMuted"><font-awesome-icon icon="volume-mute" /></button>
      <button @click="muteSong" v-else><font-awesome-icon icon="volume-up" /></button>
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
      songId: null,
      songPlayer: {
        isPlaying: false,
        isMuted: false,
        volumeRange: 50,
        songName: "",
      },
    };
  },
  methods: {
    async togglePlay() {
      const playing = await this.$store.dispatch({ type: "togglePlay" });
      this.songPlayer.isPlaying = !this.songPlayer.isPlaying;
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
      this.songId = this.$store.getters.getSongId;
      this.$nextTick(() => {
        this.player.playVideo();
      });
      this.songPlayer.songName = this.$store.getters.getSongName;
    },
    async muteSong() {
      const isMute = await this.$store.dispatch({ type: "muteSong" });
      this.songPlayer.isMuted = !this.songPlayer.isMuted;
      console.log('this.songPlayer.isMuted:', this.songPlayer.isMuted)
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
    song() {
      var song = JSON.parse(JSON.stringify(this.songPlayer.songName));
      const name = song.slice(0, 30) + '...'
      return name;
    },
  },
  created() {
    this.$nextTick(() => {
      this.player.playVideo();
    });
    this.playVideo(this.songId);
    this.songPlayer.songName = this.$store.getters.getSongName;
  },
};
</script>
