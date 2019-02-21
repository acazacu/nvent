import { createLocalVue, shallowMount } from "@vue/test-utils";
import Vuex from "vuex";
import flushPromises from "flush-promises";
import ContactPage from "src/components/ContactPage.vue";
import FormComponent from "src/components/forms/FormComponent.vue";
import mockContactState from "src/store/modules/contact.json";
import contact from "src/store/modules/contact";

jest.mock("src/store/modules/contact", () => {
  return {
    namespaced: true,
    state: mockContactState,
    actions: {
      sendMessage: jest.fn(),
      clearMessage: jest.fn()
    },
    mutations: {
      updateMessage: jest.fn()
    }
  };
});

const localVue = createLocalVue();
localVue.use(Vuex);

describe("ContactPage", () => {
  let $store;
  let $router;
  let wrapper;

  beforeEach(() => {
    jest.clearAllMocks();

    $store = new Vuex.Store({
      modules: {
        contact
      }
    });
    $router = {
      push: jest.fn()
    };
    wrapper = shallowMount(ContactPage, {
      stubs: ["router-link", "form-component"],
      mocks: {
        $store,
        $router
      },
      localVue
    });
  });

  it("should create", () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it("should render the form by default", () => {
    expect(wrapper.contains('section[data-rel="contact-form"]')).toBeTruthy();
    expect(wrapper.contains('section[data-rel="message-sent"]')).toBeFalsy();
  });

  it("should send the message when the form submits", async () => {
    wrapper.find(FormComponent).vm.$emit("submit");

    await flushPromises();

    expect(contact.actions.sendMessage).toHaveBeenCalled();
  });

  it("should display a load-mask while the message is being sent", async () => {
    wrapper.find(FormComponent).vm.$emit("submit");

    expect(wrapper.vm.$data.loading).toBeTruthy();
    await flushPromises();
    expect(wrapper.vm.$data.loading).toBeFalsy();
  });

  it("should clear the store state when the message is successfully sent", async () => {
    contact.actions.sendMessage.mockResolvedValue();
    wrapper.find(FormComponent).vm.$emit("submit");

    await flushPromises();
    expect(contact.actions.clearMessage).toHaveBeenCalled();
  });

  it("should replace the form with a success message when the message is successfully sent", async () => {
    contact.actions.sendMessage.mockResolvedValue();
    wrapper.find(FormComponent).vm.$emit("submit");

    await flushPromises();
    expect(wrapper.contains('section[data-rel="contact-form"]')).toBeFalsy();
    expect(wrapper.contains('section[data-rel="message-sent"]')).toBeTruthy();
  });

  it("should redirect to the error page if it fails to send the message", async () => {
    contact.actions.sendMessage.mockRejectedValue();

    wrapper.find(FormComponent).vm.$emit("submit");

    await flushPromises();

    expect($router.push).toHaveBeenCalledWith({ name: "error" });
  });

  it("should clear the message and redirect to the homepage when the form cancels", async () => {
    wrapper.find(FormComponent).vm.$emit("cancel");

    await flushPromises();

    expect(contact.actions.clearMessage).toHaveBeenCalled();
    expect($router.push).toHaveBeenCalledWith({ name: "home" });
  });
});
