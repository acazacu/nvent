import Vue from 'vue';
import Vuex from 'vuex';
import contactModule from './modules/contact';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    contactModule,
  },
});
