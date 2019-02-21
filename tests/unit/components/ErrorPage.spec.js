import { shallowMount, createLocalVue, RouterLinkStub } from "@vue/test-utils";

import ErrorPage from "src/components/ErrorPage";

const localVue = createLocalVue();

describe("ErrorPage", () => {
  it("should create", () => {
    const wrapper = shallowMount(ErrorPage, {
      localVue,
      stubs: {
        RouterLink: RouterLinkStub
      }
    });
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
