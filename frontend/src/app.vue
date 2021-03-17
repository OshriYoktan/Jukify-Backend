<template>
  <div id="app">
    <div id="nav">
    <div>
      <h1>Jukify</h1>
    </div>
      <router-link to="/">Home</router-link> |
      <router-link to="/explore">Explore</router-link> |
      <router-link to="/edit">Create station</router-link> |
      <router-link to="/user">user</router-link>
    </div>
    <section>
      <router-view />
    </section>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
