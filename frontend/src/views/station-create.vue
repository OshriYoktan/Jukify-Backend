<template>
  <div class="station-create-container column-layout-container">
    <div>
      <h1>Create new station!</h1>
    </div>
    <div class="form-container row-layout-container">
      <div>
        <div class="img-container">
          <img v-if="!imgSrc" src="../assets/img/no-img-jukify.jpg" />
          <img v-else :src="imgSrc" />
        </div>
        <div class="img-upload-container flex">
          <label>
            <input
              type="file"
              @change="imgLoad"
              class="img-upload-input"
            />Upload Image</label
          >
          <button v-if="!isUrl" @click="isUrl = !isUrl">Use URL</button>
          <div v-if="isUrl">
            <input type="text" placeholder="Place URL here" v-model="imgSrc" />
            <button @click="isUrl = !isUrl">Save</button>
          </div>
        </div>
      </div>
      <div>
        <form @submit.prevent="addStation">
          <input
            type="text"
            placeholder="Station name"
            v-model="newStation.name"
          />
          <genre-select @genre-selected="setGenre" />
          <textarea
            placeholder="Station description"
            rows="3"
            v-model="newStation.desc"
          />
          <button>Save</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import genreSelect from "../cmps/genre-select";
import { stationService } from "../services/station.service";
export default {
  data() {
    return {
      newStation: null,
      imgSrc: null,
      isUrl: false,
    };
  },
  methods: {
    setGenre(genres) {
      this.newStation.genres = genres;
    },
    imgLoad(ev) {
      if (!ev.target.files[0]) return;
      const image = ev.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (ev) => {
        this.imgSrc = ev.target.result;
      };
    },
    async addStation() {
      try {
        this.newStation.name.replace(" and ", " & ");
        this.newStation.imgUrl = this.imgSrc;
        const station = this.newStation;
        const stationId = await this.$store.dispatch({
          type: "addStation",
          station,
        });
        this.$router.push(`/details/${stationId}`);
      } catch {}
    },
  },
  components: {
    genreSelect,
  },
  created() {
    this.newStation = stationService.getEmptyStation();
  },
};
</script>

<style>
</style>