<template>
  <div id="app">
    <section class="container">
      <div class="nav sub-container">
        <div>
          <h1>Jukify</h1>
        </div>
        <div>
          <router-link to="/">Home</router-link> |
          <router-link to="/explore">Explore</router-link> |
          <router-link to="/details">Create station</router-link> |
          <router-link to="/user">user</router-link>
        </div>
      </div>
    </section>
    <section>
      <router-view />
    </section>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch({type: 'loadStations'})
  }
}
</script>
