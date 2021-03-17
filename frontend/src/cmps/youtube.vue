<template>
  <div>
    <form @submit.prevent="getId">
      <input type="text" placeholder="search" v-model="name" />
      <button>Search</button>
    </form>
    <youtube
      class="youtube"
      v-if="videoId"
      :video-id="videoId"
      ref="youtube"
      @playing="playing"
    ></youtube>
    <span>{{ nowTime }}</span>
    <button @click.prevent="playVideo">play</button>
  </div>
</template>

<script>
import { stationService } from "../services/station.service.js";
export default {
  props: ["videoId"],
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
    updateTime() {
      setInterval(() => {
        this.$refs.youtube.player.getCurrentTime().then((time) => {
          console.log("hello");
          console.log("time:", time);
          this.currTime = time;
        });
      }, 1000);
    },
    playVideo() {
      this.currTime2 = true;
      this.updateTime();
      console.log("this.$refs.youtube.player:", this.$refs.youtube.player);
      if (this.isPlaying) {
        this.isPlaying = false;
        this.$refs.youtube.player.pauseVideo();
      } else {
        this.isPlaying = true;
        this.$refs.youtube.player.playVideo();
      }
    },
    playing() {
      console.log("o/ we are watching!!!");
    },
    getId() {
      return stationService.askSearch(this.name).then((id) => {
        console.log("id:", id);
        this.videoId = id;
      });
    },
  },
  computed: {
    nowTime() {
      return this.currTime;
    },
  },
};
</script>

<style>
iframe {
  width: 400px;
  height: 400px;
}
</style>