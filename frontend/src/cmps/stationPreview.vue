<template>
  <li class="station-preview-currStation column-layout-container">
    <router-link class="link" :to="'/details/' + station._id">
      <div>{{ station.name }}</div>
      <div @click="clicked(station)">songs: {{ station.songs.length }}</div>
    </router-link>
  </li>
</template>

<script>
export default {
  props: ["station"],

  methods: {
    clicked(station) {
      console.log(station);
    },
  },
};
</script>
