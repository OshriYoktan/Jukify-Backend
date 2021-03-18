<template>
  <div id="app">
    <section class="container">
      <div class="nav sub-container">
        <div>
          <router-link class="main-logo" to="/">Jukify</router-link>
        </div>
        <div>
          <router-link to="/explore">Explore</router-link> |
          <router-link to="/details">Create station</router-link> |
          <router-link to="/user">user</router-link>
        </div>
      </div>
    </section >
    <router-view class="container"/>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch({ type: "loadStations" });
  },
};
</script>
