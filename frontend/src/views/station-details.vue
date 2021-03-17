<template>
  <section>
    <h1>details</h1>
    <!-- <div v-if="stations.length">
        <ul>
            <li v-for="(song, idx) in stations" :key="idx">
                {{song.title}}
            </li>
        </ul>
    </div> -->
  </section>
</template>

<script>
export default {
  name: "station-details",
  methods: {},
  created() {
    const id = this.$route.params.toyId;
    console.log('id:', id)
    // toyService.getToyById(id).then((toy) => (this.currToy = toy));
  },
};
</script>