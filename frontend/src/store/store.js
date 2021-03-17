import Vue from 'vue'
import Vuex from 'vuex'
// import { userStore } from './userStore.js';
import { stationStore } from './stationStore.js';
Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {

  },
  getters: {
  },
  mutations: {
  },
  actions: {

  },
  modules: {
    stationStore,
    // userStore,
  },
});
