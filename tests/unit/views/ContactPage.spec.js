import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import Router from "vue-router";
import flushPromises from "flush-promises";
import http from "src/store/http";
import store from "src/store";
import ContactPage from "src/views/ContactPage.vue";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Router);

let router;

jest.mock("src/store/http", function() {
  return {
    post: jest.fn()
  };
});

describe("ContactPage", () => {
  beforeEach(() => {
    router = new Router({
      routes: [{ name: "error", path: "/error" }, { name: "home", path: "/home" }]
    });

    router.beforeEach((to, from, next) => {
      next(false);
    });

    store.dispatch("contact/clearMessage");
  });

  it("creates", () => {
    const wrapper = mount(ContactPage, { localVue, store, router });

    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it("renders the form by default", () => {
    const wrapper = mount(ContactPage, { localVue, store, router });

    expect(wrapper.contains('section[data-rel="contact-form"]')).toBeTruthy();
    expect(wrapper.contains('section[data-rel="message-sent"]')).toBeFalsy();
  });

  it("prevents the form from submitting if the required fields are not filled in", () => {
    const wrapper = mount(ContactPage, {
      localVue,
      router,
      store
    });
    const submitFormSpy = jest.spyOn(wrapper.vm, "submitForm");

    wrapper.find("form").trigger("submitHandler");

    expect(submitFormSpy).not.toHaveBeenCalled();
    expect(wrapper.contains('section[data-rel="contact-form"]')).toBeTruthy();
  });

  it("prevents the form from submitting if the email field is invalid", () => {
    const wrapper = mount(ContactPage, {
      localVue,
      router,
      store
    });
    const submitFormSpy = jest.spyOn(wrapper.vm, "submitForm");

    store.commit("contact/updateMessage", {
      name: "John Doe",
      email: "john.doeexample.com",
      message: "Hi nvent!"
    });

    expect(submitFormSpy).not.toHaveBeenCalled();
    expect(wrapper.contains('section[data-rel="contact-form"]')).toBeTruthy();
  });

  it("clears the form and displays a success message after the form was successfully submitted", async () => {
    const wrapper = mount(ContactPage, {
      localVue,
      router,
      store
    });

    store.commit("contact/updateMessage", {
      name: "John Doe",
      email: "john.doe@example.com",
      message: "Hi nvent!"
    });

    const storeClearMessageSpy = jest.spyOn(wrapper.vm, "clearMessage");

    http.post.mockReturnValue(Promise.resolve());

    wrapper.find("form").trigger("submit");

    await flushPromises();

    expect(wrapper.find('section[data-rel="message-sent"]').exists());
    expect(storeClearMessageSpy).toHaveBeenCalled();
  });

  it("redirects to the error page if the form fails to submit", async () => {
    const wrapper = mount(ContactPage, {
      localVue,
      store,
      router
    });

    store.commit("contact/updateMessage", {
      name: "John Doe",
      email: "john.doe@example.com",
      message: "Hi nvent!"
    });

    http.post.mockReturnValue(Promise.reject());

    wrapper.find("form").trigger("submit");

    const routerPushSpy = jest.spyOn(wrapper.vm.$router, "push");

    await flushPromises();

    expect(routerPushSpy).toHaveBeenCalledWith({ name: "error", params: {}, path: "/error" });
  });

  it("redirects to the home page if the user clicks cancel", async () => {
    const wrapper = mount(ContactPage, {
      localVue,
      store,
      router
    });

    const routerPushSpy = jest.spyOn(wrapper.vm.$router, "push");
    const storeClearMessageSpy = jest.spyOn(wrapper.vm, "clearMessage");

    wrapper.find("form .form-controls a").trigger("click");

    await flushPromises();

    expect(storeClearMessageSpy).toHaveBeenCalled();
    expect(routerPushSpy).toHaveBeenCalledWith({ name: "home", path: "/home", params: {} });
  });
});
