<template>
  <div class="song-player">
    <div class="song-video">
      <youtube :video-id="songId" ref="youtube"></youtube>
    </div>
    <div class="playing-now">Playing Now: {{ songPlayer.songName }}</div>
    <div class="playing-btns">
      <button @click="changeSong(-1)">Previous</button>
      <button @click="togglePausePlay" v-if="!songPlayer.isPlaying">
        Stop
      </button>
      <button @click="togglePausePlay" v-else>Start</button>
      <button @click="changeSong(1)">Next</button>
    </div>
    <div class="music-btns">
      <button @click="muteSong" v-if="!songPlayer.isMuted">Mute</button>
      <button @click="muteSong" v-else>Unmute</button>
      <input
        type="range"
        min="0"
        max="100"
        @change="setSongVolume(songPlayer.volumeRange)"
        v-model="songPlayer.volumeRange"
        class="set-volume"
      />
      <span>{{ songPlayer.volumeRange }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["videoId", "station"],
  data() {
    return {
      songId: this.videoId,
      songPlayer: {
        isPlaying: false,
        isMuted: false,
        volumeRange: 50,
        songName: "",
      },
    };
  },
  methods: {
    togglePausePlay() {
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
    playVideo(videoId) {
      const currSong = this.station.songs.find((song) => {
        return song.videoId === videoId;
      });
      this.songPlayer.songName = currSong.name;
      this.$nextTick(() => {
        this.player.playVideo();
      });
    },
    changeSong(num) {
      var idx = this.station.songs.findIndex((song) => {
        return song.videoId === this.songId;
      });
      var songIdx = idx + num;
      if (songIdx === this.station.songs.length) songIdx = 0;
      if (songIdx === -1) songIdx = this.station.songs.length - 1;
      const nextSong = this.station.songs[songIdx];
      this.songId = nextSong.videoId;
      this.songPlayer.songName = nextSong.name;
      this.$nextTick(() => {
        this.player.playVideo();
      });
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
    muteSong() {
      if (!this.songPlayer.isMuted) {
        this.songPlayer.isMuted = true;
        this.player.mute();
      } else {
        this.songPlayer.isMuted = false;
        this.player.unMute();
      }
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
    this.$nextTick(() => {
      this.player.playVideo();
    });
    this.playVideo(this.songId);
  },
};
</script>
