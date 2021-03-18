<template>
  <section class="column-layout-container">
      <h1>Explore world music</h1>
      <h3>Start listening to the best new releases</h3>
    <station-list />
  </section>
</template>

<script>
import stationList from '../cmps/stationList'
export default {
  name: 'explore',
  components: {
    stationList
  },
};
</script>

<style>
</style>