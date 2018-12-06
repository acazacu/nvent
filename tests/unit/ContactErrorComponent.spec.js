import { mount, createLocalVue } from '@vue/test-utils';
import VueRouter from "vue-router";
import ContactErrorComponent from '../../src/views/components/ContactErrorComponent.vue';

const localVue = createLocalVue();
localVue.use(VueRouter);

let router;

describe('ContactErrorComponent', () => {
  beforeEach(() => {
    router = new VueRouter({
      routes: [
        { path: '', name: 'home' }
      ]
    });
  });

  it('creates', () => {
    const wrapper = mount(ContactErrorComponent, { localVue, router });
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
