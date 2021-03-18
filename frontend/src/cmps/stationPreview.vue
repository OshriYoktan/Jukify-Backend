<template>
  <li class="station-preview-currStation column-layout-container">
    <router-link class="link" :to="'/details/' + station._id">
      <div>{{ station.name }}</div>
      <div>♥{{ this.likesToShow }}</div>
      <img :src="station.imgUrl" :alt="station.name + ' image'" />
      <div @click="clicked(station)">songs: {{ station.songs.length }}</div>
    </router-link>
  </li>
</template>

<script>
export default {
  props: ["station"],
  dat() {
    return {
      likesToShow: null,
    };
  },
  methods: {
    clicked(station) {
      console.log(station);
    },
    likes(likes) {
      likes.toLocaleString();
    },
  },
  created() {
    this.likesToShow = this.station.likes.toLocaleString();
    // station.likes
  },
};
</script>
