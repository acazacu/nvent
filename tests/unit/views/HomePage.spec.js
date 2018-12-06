import { mount, createLocalVue } from '@vue/test-utils';
import VueRouter from "vue-router";
import HomePage from '../../../src/views/HomePage.vue';

const localVue = createLocalVue();
localVue.use(VueRouter);

let router;

describe('HomePage', () => {
  beforeEach(() => {
    router = new VueRouter({
      routes: [
        { path: '/contact', name: 'contact-form' }
      ]
    });
  });

  it('creates', () => {
    const wrapper = mount(HomePage, { localVue, router });
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
