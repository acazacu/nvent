import Vuex from "vuex";
import { shallowMount, createLocalVue } from '@vue/test-utils';
import ContactComponent from '../../../src/components/ContactComponent.vue';
import flushPromises from "flush-promises";

const localVue = createLocalVue();
localVue.use(Vuex);

const storeFactory = actions => new Vuex.Store({
  modules: {
    contact: {
      namespaced: true,
      actions: { ...actions },
    },
  },
});

const mockFactory = mocks => ({
  ...mocks
});

describe('ContactComponent', () => {
  it('creates', () => {
    const wrapper = shallowMount(ContactComponent, {
      localVue,
      store: storeFactory(null),
    });
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it('passes the user input to the store on form submit', () => {
    const sendMessageSpy = jest.fn();

    const wrapper = shallowMount(ContactComponent, {
      localVue,
      store: storeFactory({
        sendMessage: sendMessageSpy
      }),
      mocks: mockFactory({
        $router: {
          push: () => {}
        }
      }),
    });

    const formData = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '123456789',
      message: 'Hi stranger!'
    };
    wrapper.find('[data-rel="name"]').setValue(formData.name);
    wrapper.find('[data-rel="email"]').setValue(formData.email);
    wrapper.find('[data-rel="phone"]').setValue(formData.phone);
    wrapper.find('[data-rel="message"]').setValue(formData.message);
    wrapper.find("form").trigger("submit.prevent");

    expect(sendMessageSpy.mock.calls.length).toBe(1);
    expect(sendMessageSpy.mock.calls[0][1]).toStrictEqual(formData);
  });

  it('redirects to contact-success on a successful submit', async () => {
    const sendMessageSpy = jest.fn().mockReturnValue(Promise.resolve());
    const pushSpy = jest.fn();
    const wrapper = shallowMount(ContactComponent, {
      localVue,
      store: storeFactory({
        sendMessage: sendMessageSpy
      }),
      mocks: mockFactory({
        $router: {
          push: pushSpy
        }
      }),
    });

    expect.assertions(2);
    wrapper.find("form").trigger("submit.prevent");
    await flushPromises();

    expect(pushSpy.mock.calls.length).toBe(1);
    expect(pushSpy.mock.calls[0][0]).toStrictEqual({ name: 'contact-success'});
  });

  it('redirects to contact-error on a failed submit', async () => {
    const sendMessageSpy = jest.fn().mockReturnValue(Promise.reject());
    const pushSpy = jest.fn();
    const wrapper = shallowMount(ContactComponent, {
      localVue,
      store: storeFactory({
        sendMessage: sendMessageSpy
      }),
      mocks: mockFactory({
        $router: {
          push: pushSpy
        }
      }),
    });

    expect.assertions(2);
    wrapper.find("form").trigger("submit.prevent");
    await flushPromises();

    expect(pushSpy.mock.calls.length).toBe(1);
    expect(pushSpy.mock.calls[0][0]).toStrictEqual({ name: 'contact-error'});  });
});
