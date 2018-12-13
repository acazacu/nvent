import Vue from "vue";
import Vuex from "vuex";
import contact from "./modules/contact";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    name: "nvent",
    version: process.env.VUE_APP_VERSION,
    baseUrlApi: process.env.VUE_APP_BASE_URL_API
  },
  modules: {
    contact
  }
});
