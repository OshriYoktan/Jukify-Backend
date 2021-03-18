<template>
  <div >
    <button @click="playVideo">play</button>
    <!-- <span>{{ nowTime }}</span> -->
  </div>
</template>

<script>
import { stationService } from "../services/station.service.js";
export default {
  props: ["playingVideoId"],
  name: "youtube",
  data() {
    return {
      name: "",
      videoId: "",
      autoplay: 1,
      isPlaying: false,
      currTime: 0,
    };
  },
  methods: {
    // updateTime() {
    //   setInterval(() => {
    //     this.$refs.youtube.player.getCurrentTime().then((time) => {
    //       this.currTime = time;
    //     });
    //   }, 1000);
    // },
    playVideo() {
      // this.player.playVideo()
      console.log(this.player);
      // console.log(this.$parent.$refs.youtube)
    // this.player.playVideo()
      // this.updateTime();
      // if (this.isPlaying) {
      //   this.isPlaying = false;
      //   this.$refs.youtube.player.pauseVideo();
      // } else {
      //   this.isPlaying = true;
      //   this.$refs.youtube.player.playVideo();
      // }
    },
    playing() {
      console.log("o/ we are watching!!!");
    },
  },
  computed: {
    player() {
      return this.$parent.$refs.youtube
    },
    nowTime() {
      return this.currTime;
    },
  },
  created() {
    this.videoId = this.playingVideoId
  }
};
</script>

<style>
iframe {
  width: 400px;
  height: 400px;
}
</style>