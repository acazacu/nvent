import Vue from 'vue';
import Router from 'vue-router';
import HomePage from './views/HomePage.vue';
import ContactPage from "./views/ContactPage";
import ErrorPage from "./views/ErrorPage";

Vue.use(Router);

const router = new Router({
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
      component: ContactPage,
      name: 'contact-form'
    },
    {
      path: '/error',
      component: ErrorPage,
      name: 'error',
      beforeEnter: (to, from, next) => {
        if (from.name) {
          next();
        } else {
          next({ name: 'home' });
        }
      }
    },
  ],
});

export default router;
