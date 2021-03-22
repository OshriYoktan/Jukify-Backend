<template>
  <div id="app" class="main-layout">
    <section class="container">
      <div class="nav sub-container">
        <div>
          <router-link class="main-logo link" to="/">Jukify</router-link>
        </div>
        <div>
          <router-link class="link" to="/explore">Explore</router-link> |
           <router-link class="link" to="/create">Create station</router-link> |
          <router-link class="link" to="/user">user</router-link>
        </div>
      </div>
    </section>
    <section class="view-router">
      <router-view  />
    </section>
    <section>
      <playerControl v-if="isFirstSong" />
      <playerControl v-else />
    </section>
  </div>
</template>

<script>
import playerControl from "./cmps/playerControl.vue";
export default {
  data() {
    return {
      isFirstSong: this.setFirstSong(),
    };
  },
  methods: {
    setFirstSong() {
      return this.$store.state.playerStore.songId;
    },
  },
  // computed: {
  //   player() {
  //     return this.$refs.youtube.player;
  //   },
  // },
  created() {
    this.$store.dispatch({ type: "loadStations" });
  },
  components: {
    playerControl,
  },
};
</script>
