import { mount, createLocalVue } from '@vue/test-utils';
import VueRouter from "vue-router";
import Vuex from "vuex";

import store from 'src/store';
import router from 'src/router';
import ErrorPage from 'src/views/ErrorPage';

const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(Vuex);

describe('ErrorPage', () => {
  it('creates', () => {
    const wrapper = mount(ErrorPage, { localVue, store, router });
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
