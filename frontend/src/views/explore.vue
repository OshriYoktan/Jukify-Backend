<template>
  <div>
    <h1>Looking For Playlist</h1>
    <h3>Start listening to the best new releases</h3>
    <div v-if="stations.length">
      <ul>
        <li v-for="(station, idx) in stations" :key="idx">
          <router-link :to="'/explore/' + station">{{ station }}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import youtube from "../cmps/youtube";
import { stationService } from "../services/station.service";
export default {
  name: "explore",
  data() {
    return {
      stations: ["Omer Adam", "noga erez", "eyal golan"],
      // stations: [
      //   { name: "Omer Adam", genres: "mizrahit" },
      //   { name: "Noga Erez", genres: "yam tihoni" },
      //   { name: "Eyal Golan", genres: "mizrahit" },
      // ],
    };
  },
  methods: {},
  components: {
    youtube,
  },
};
</script>

<style>
</style>

