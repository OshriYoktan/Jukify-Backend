<template>
  <li v-if="isSameGenre" class="station-preview-currStation column-layout-container">
    <router-link class="link" :to="'/details/' + station._id">
      <img :src="station.imgUrl" :alt="station.name + ' image'" />
      <div>{{ station.name }}</div>
      <div>♥{{ this.likesToShow }}</div>
      <div @click="clicked(station)">songs: {{ station.songs.length }}</div>
    </router-link>
  </li>
</template>

<script>
export default {
  props: ["station", "genre"],
  data() {
    return {
      likesToShow: null,
      isSameGenre: false,
    };
  },
  methods: {
    clicked(station) {
      console.log(station);
    },
    likes(likes) {
      likes.toLocaleString();
    },
    checkGenre() {
      if (this.station.genres.includes(this.genre.toLowerCase())) this.isSameGenre = true
      else this.isSameGenre = false
    },
  },
  created() {
    this.likesToShow = this.station.likes.toLocaleString();
    this.checkGenre()
  },
};
</script>
