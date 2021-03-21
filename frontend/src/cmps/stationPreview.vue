<template>
  <div
    class="station-preview-currStation column-layout-container"
  >
    <router-link
      class="link column-layout-container"
      :to="'/details/' + station._id"
    >
      <img
        :src="station.imgUrl"
        :alt="station.name + ' image, cold\'nt found.'"
      />
      <div>{{ station.name }}</div>
      <div>♥ {{ this.likesToShow }}</div>
      <div @click="clicked(station)">{{ station.songs.length }} songs</div>
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
      console.log(station);
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
