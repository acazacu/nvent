import { mount, createLocalVue } from "@vue/test-utils";
import VueRouter from "vue-router";
import Vuex from "vuex";

import store from "src/store";
import router from "src/router";
import HomePage from "src/views/HomePage";

const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(Vuex);

describe("HomePage", () => {
  it("creates", () => {
    const wrapper = mount(HomePage, { localVue, store, router });
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
