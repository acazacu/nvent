import {shallowMount, createLocalVue} from '@vue/test-utils';
import VueRouter from "vue-router";

import LogoComponent from 'src/views/components/LogoComponent.vue';

const localVue = createLocalVue();
localVue.use(VueRouter);

describe('LogoComponent', () => {
  it('creates and renders correctly', () => {
    const wrapper = shallowMount(LogoComponent, { localVue });
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
