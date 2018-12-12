import { shallowMount, createLocalVue } from '@vue/test-utils';
import VueRouter from "vue-router";
import Vuex from "vuex";

import App from 'src/App.vue';
import store from 'src/store';
import router from 'src/router';

const version = require('../../package').version;

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);

describe('App', () => {
  it('creates and renders correctly', () => {
    const wrapper = shallowMount(App, { localVue, store, router });

    expect(wrapper.isVueInstance()).toBeTruthy();

    expect(wrapper.find('footer .version').text()).toContain(version);
  });
});
