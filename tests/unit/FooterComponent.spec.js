import Vuex from "vuex";
import { shallowMount, createLocalVue } from '@vue/test-utils';
import FooterComponent from '../../src/views/components/FooterComponent.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('FooterComponent', () => {
  it('creates and renders correctly', () => {
    const version = '1.0.0';
    const store = new Vuex.Store({
      state: { version },
    });
    const wrapper = shallowMount(FooterComponent, { store, localVue });
    expect(wrapper.isVueInstance()).toBeTruthy();
    expect(wrapper.find('p').text()).toContain(version);
  });
});
