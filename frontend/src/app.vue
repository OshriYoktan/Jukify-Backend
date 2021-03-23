<template>
  <div id="app" class="main-layout">
    <section class="container">
      <div class="nav sub-container">
        <div>
          <router-link class="main-logo link" to="/">
            Jukify</router-link
          >
        </div>
        <div>
          <router-link class="link" to="/explore">Explore</router-link> |
          <router-link class="link" to="/create">Create station</router-link> |
          <router-link class="link" to="/profile">Profile</router-link>
        </div>
      </div>
    </section>
    <section class="view-router">
      <router-view />
    </section>
    <section class="player-container">
      <playerControl />
    </section>
  </div>
</template>

<script>
import {socketService} from "./services/socket.service.js";
import playerControl from "./cmps/playerControl.vue";
export default {
  async created() {
    await this.$store.dispatch({ type: "loadStations" });
    socketService.setup()    
  },
  components: {
    playerControl,
  },
};
</script>
