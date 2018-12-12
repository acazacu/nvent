import { mount, createLocalVue } from '@vue/test-utils';
import VueRouter from "vue-router";
import Vuex from "vuex";

import store from 'src/store';
import router from 'src/router';
import ContactPage from 'src/views/ContactPage.vue';

const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(Vuex);

describe('ContactPage', () => {
  it('creates', () => {
    const wrapper = mount(ContactPage, { localVue, store, router });
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  // it('passes the user input to the store on form submit', () => {
  //   const sendMessageSpy = jest.fn();
  //
  //   const wrapper = mount(ContactComponent, { localVue, store, router, mocks: mockFactory({
  //       $router: {
  //         push: () => {}
  //       }
  //     }) });
  //
  //   const formData = {
  //     name: 'John Doe',
  //     email: 'john.doe@example.com',
  //     phone: '123456789',
  //     message: 'Hi stranger!'
  //   };
  //   wrapper.find('[data-rel="name"]').setValue(formData.name);
  //   wrapper.find('[data-rel="email"]').setValue(formData.email);
  //   wrapper.find('[data-rel="phone"]').setValue(formData.phone);
  //   wrapper.find('[data-rel="message"]').setValue(formData.message);
  //   wrapper.find("form").trigger("submit.prevent");
  //
  //   expect(sendMessageSpy.mock.calls.length).toBe(1);
  //   expect(sendMessageSpy.mock.calls[0][1]).toStrictEqual(formData);
  // });
  //
  // it('redirects to contact-success on a successful submit', async () => {
  //   const pushSpy = jest.fn();
  //   const wrapper = mount(ContactComponent, { localVue, store, router, mocks: mockFactory({
  //       $router: {
  //         push: pushSpy
  //       }
  //     }) });
  //
  //   expect.assertions(2);
  //   wrapper.find("form").trigger("submit.prevent");
  //   await flushPromises();
  //
  //   expect(pushSpy.mock.calls.length).toBe(1);
  //   expect(pushSpy.mock.calls[0][0]).toStrictEqual({ name: 'contact-success'});
  // });
  //
  // it('redirects to contact-error on a failed submit', async () => {
  //   const pushSpy = jest.fn();
  //   const wrapper = mount(ContactComponent, { localVue, store, router, mocks: mockFactory({
  //       $router: {
  //         push: pushSpy
  //       }
  //     }) });
  //
  //   expect.assertions(2);
  //   wrapper.find("form").trigger("submit.prevent");
  //   await flushPromises();
  //
  //   expect(pushSpy.mock.calls.length).toBe(1);
  //   expect(pushSpy.mock.calls[0][0]).toStrictEqual({ name: 'contact-error'});
  // });
});
