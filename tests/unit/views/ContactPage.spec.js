import { mount, createLocalVue } from '@vue/test-utils';
import VueRouter from "vue-router";
import ContactPage from '../../../src/views/ContactPage.vue';

const localVue = createLocalVue();
localVue.use(VueRouter);

let router;

describe('ContactPage', () => {
  beforeEach(() => {
    router = new VueRouter({});
  });

  it('creates', () => {
    const wrapper = mount(ContactPage, { localVue, router });
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
