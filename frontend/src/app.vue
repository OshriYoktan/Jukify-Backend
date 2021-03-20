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
      <router-view />
    </section>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch({ type: "loadStations" });
  },
};
</script>
