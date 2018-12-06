import { mount, createLocalVue } from '@vue/test-utils';
import VueRouter from "vue-router";
import HeaderComponent from '../../src/views/components/HeaderComponent.vue';

const localVue = createLocalVue();
localVue.use(VueRouter);

let router;

describe('HeaderComponent', () => {
  beforeEach(() => {
    router = new VueRouter({});
  });

  it('creates', () => {
    const wrapper = mount(HeaderComponent, { localVue, router });
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
