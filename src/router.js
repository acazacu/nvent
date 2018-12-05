import Vue from 'vue';
import Router from 'vue-router';
import HomePage from './pages/HomePage.vue';
import ContactPage from "./pages/ContactPage";

Vue.use(Router);

export default new Router({
  mode: process.env.VUE_APP_ROUTER_MODE,
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      alias: '/home',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactPage,
    },
  ],
});
