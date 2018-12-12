import { createLocalVue, mount } from '@vue/test-utils';
import Vuex from "vuex";
import Router from "vue-router";
import flushPromises from 'flush-promises';
import http from 'src/store/http';
import store from 'src/store';
import ContactPage from 'src/views/ContactPage.vue';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Router);

jest.mock('src/store/http', function() {
  const post = jest.fn();
  return {
    post: post
  };
});

describe.only('ContactPage', () => {
  beforeEach(() => {
    http.post.mockClear();
  });

  it('creates', () => {
    const wrapper = mount(ContactPage, { localVue, store });
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it('renders the form by default', () => {
    const wrapper = mount(ContactPage, { localVue, store });
    expect(wrapper.contains('section[data-rel="contact-form"]')).toBeTruthy();
    expect(wrapper.contains('section[data-rel="message-sent"]')).toBeFalsy();
  });

  it('displays a success message after the form was successfully submitted', async () => {
    const router = new Router({ routes: [] });
    const wrapper = mount(ContactPage, {
      localVue,
      router,
      store,
    });

    http.post.mockReturnValue(Promise.resolve());

    wrapper.find('form').trigger('submit');

    await flushPromises();

    expect(wrapper.contains('section[data-rel="message-sent"]')).toBeTruthy();
    expect(wrapper.contains('section[data-rel="contact-form"]')).toBeFalsy();
  });

  it('redirects to the error page if the form fails to submit', async () => {
    const router = new Router({ routes: [] });
    const wrapper = mount(ContactPage, {
      localVue,
      store,
      router,
    });

    http.post.mockReturnValue(Promise.reject());

    wrapper.find('form').trigger('submit');
    const routerPushSpy = jest.spyOn(wrapper.vm.$router, 'push');

    await flushPromises();

    expect(routerPushSpy).toHaveBeenCalledWith({ "name": "error" });
  });

  it('redirects to the home page if the user clicks cancel', async () => {
    const router = new Router({ routes: [] });
    const wrapper = mount(ContactPage, {
      localVue,
      store,
      router,
    });

    const routerPushSpy = jest.spyOn(wrapper.vm.$router, 'push');
    const clearMessageSpy = jest.spyOn(wrapper.vm, 'clearMessage');

    wrapper.find('form .form-controls a').trigger('click');

    await flushPromises();

    expect(clearMessageSpy).toHaveBeenCalled();
    expect(routerPushSpy).toHaveBeenCalledWith({ "name": "home" });
  });
});
