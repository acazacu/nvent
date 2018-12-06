import { mount, createLocalVue } from '@vue/test-utils';
import VueRouter from "vue-router";
import ContactSuccessComponent from '../../src/views/components/ContactSuccessComponent.vue';

const localVue = createLocalVue();
localVue.use(VueRouter);

let router;

describe('ContactSuccessComponent', () => {
  beforeEach(() => {
    router = new VueRouter({});
  });

  it('creates', () => {
    const wrapper = mount(ContactSuccessComponent, { localVue, router });
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
