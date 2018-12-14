import { shallowMount, createLocalVue } from "@vue/test-utils";

import LogoComponent from "src/views/components/LogoComponent.vue";

const localVue = createLocalVue();

describe("LogoComponent", () => {
  it("should create", () => {
    const wrapper = shallowMount(LogoComponent, {
      localVue,
      stubs: ["router-link"]
    });
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
