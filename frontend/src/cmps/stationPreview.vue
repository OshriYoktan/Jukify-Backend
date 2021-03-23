<template>
  <div class="station-card column-layout-container">
    <router-link
      class="link column-layout-container"
      :to="'/details/' + station._id"
    >
      <img
        :src="station.imgUrl"
        :alt="station.name + ' image, cold\'nt found.'"
      />
      <h2>{{ station.name }}</h2>
      <p><span>♥</span> {{ this.likesToShow }}</p>
      <p @click="clicked(station)">{{ station.songs.length }} songs</p>
    </router-link>
  </div>
</template>

<script>
export default {
  props: ["station"],
  data() {
    return {
      likesToShow: null,
    };
  },
  methods: {
    clicked(station) {
    },
    sendStation() {},
    likes(likes) {
      likes.toLocaleString();
    },
  },
  created() {
    this.likesToShow = this.station.likes.toLocaleString();
  },
};
</script>
