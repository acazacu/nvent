import Vue from "vue";
import router from "./router";
import store from "./store";
import App from "./App.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBars, faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faBars, faExternalLinkAlt);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("body");

if (process.env.VUE_APP_CLI_MODE === "development") {
  Vue.config.devtools = true;
}
