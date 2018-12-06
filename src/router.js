import Vue from 'vue';
import Router from 'vue-router';
import HomePage from './views/HomePage.vue';
import ContactPage from "./views/ContactPage";
import ContactSuccessComponent from "./views/components/ContactSuccessComponent";
import ContactErrorComponent from "./views/components/ContactErrorComponent";
import ContactComponent from "./views/components/ContactComponent";

Vue.use(Router);

const beforeEnterContact = (to, from, next) => {
  if (from.name === 'contact-form') {
    next();
  } else {
    next({ name: 'contact-form' });
  }
};

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
      children: [
        { path: '', name: 'contact-form', component: ContactComponent },
        {
          path: 'success',
          name: 'contact-success',
          component: ContactSuccessComponent,
          beforeEnter: beforeEnterContact,
        },
        {
          path: 'error',
          name: 'contact-error',
          component: ContactErrorComponent,
          beforeEnter: beforeEnterContact,
        },
      ]
    },
  ],
});

export default router;
