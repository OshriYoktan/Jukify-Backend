<template>
  <section class="explore-container container">
    <div class="explore-sub-container sub-container">
      <h1>Explore world music</h1>
      <h3>Start listening to the best new releases</h3>
      <div v-for="(genre, idx) in genres" :key="idx">
        <h4>{{genre}}</h4>
        <ul>
          <li v-for="(station, idx) in stations" :key="idx">
            <!-- {{station.img}} -->
            <router-link class="link" :to="'/explore/' + station">{{ station }}</router-link>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import youtube from "../cmps/youtube";
import { stationService } from "../services/station.service";
export default {
  name: "explore",
  data() {
    return {
      stations: ["omer adam", "noga erez", "eyal golan", "dudu faruk", "itay levy"],
      // stations: [
      //   { name: "Omer Adam", genres: "mizrahit" },
      //   { name: "Noga Erez", genres: "yam tihoni" },
      //   { name: "Eyal Golan", genres: "mizrahit" },
      // ],
      genres: ['Pop', 'party', 'mizrahit']
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

