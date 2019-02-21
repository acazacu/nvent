import { createLocalVue, shallowMount, RouterLinkStub } from "@vue/test-utils";

import HomePage from "src/components/HomePage";

const localVue = createLocalVue();

describe("HomePage", () => {
  it("should create", () => {
    const wrapper = shallowMount(HomePage, {
      localVue,
      stubs: {
        RouterLink: RouterLinkStub
      },
      mocks: {
        $store: jest.fn()
      }
    });
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
