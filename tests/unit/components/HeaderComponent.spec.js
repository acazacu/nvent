import Vuex from "vuex";
import {mount, createLocalVue} from '@vue/test-utils';
import VueRouter from "vue-router";
import HeaderComponent from '../../../src/components/HeaderComponent.vue';

const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(Vuex);

let router;

describe('HeaderComponent', () => {
  beforeEach(() => {
    router = new VueRouter({});
  });

  it('creates and renders correctly', () => {
    const name = 'nvent';
    const store = new Vuex.Store({
      state: { name },
    });
    const wrapper = mount(HeaderComponent, { store, router, localVue });
    expect(wrapper.isVueInstance()).toBeTruthy();
    expect(wrapper.find('a').text()).toContain(name);
  });
});
