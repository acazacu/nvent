import { shallowMount, createLocalVue } from "@vue/test-utils";

import HeaderComponent from "src/views/components/HeaderComponent.vue";

const localVue = createLocalVue();

describe("HeaderComponent", () => {
  it("should create", () => {
    const wrapper = shallowMount(HeaderComponent, {
      localVue,
      stubs: ["router-link", "font-awesome-icon"],
      mocks: {
        $router: {
          afterEach: jest.fn()
        }
      }
    });
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
