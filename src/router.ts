import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import About from './views/About.vue';

Vue.use(Router);

export default new Router({
  mode: process.env.VUE_APP_ROUTER_MODE,
  base: process.env.BASE_URL,
  routes: [
      {
          path: '/',
          alias: '/home',
          name: 'home',
          component: Home,
      },
      {
        path: '/about',
          component: About,
      },
  ],
});
