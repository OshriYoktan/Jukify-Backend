<template>
  <li v-if="isSameGenre" class="station-preview-currStation column-layout-container">
    <router-link class="link column-layout-container" :to="'/details/' + station._id">
      <img :src="station.imgUrl" :alt="station.name + ' image, cold\'nt found.'" />
      <div>{{ station.name }}</div>
      <div>♥ {{ this.likesToShow }}</div>
      <div @click="clicked(station)">{{ station.songs.length }} songs</div>
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
    // console.log('this.isSameGenre:', this.isSameGenre)
    this.$emit('isGender',this.isSameGenre)
  },
};
</script>
