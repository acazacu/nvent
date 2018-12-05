import Vue from 'vue';
import Vuex from 'vuex';
import contact from "./modules/contact";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    version: process.env.VUE_APP_VERSION,
  },
  modules: {
    contact,
  },
});
