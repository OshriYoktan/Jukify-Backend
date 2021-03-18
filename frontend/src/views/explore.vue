<template>
  <section class="explore-container column-layout-container">
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