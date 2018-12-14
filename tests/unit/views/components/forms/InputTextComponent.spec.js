import { shallowMount, createLocalVue } from "@vue/test-utils";

import InputTextComponent from "src/views/components/forms/InputTextComponent";

const localVue = createLocalVue();

describe("InputTextComponent", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(InputTextComponent, {
      localVue,
      propsData: {
        name: "test",
        value: ""
      },
      provide: {
        registerField: jest.fn(),
        deregisterField: jest.fn()
      }
    });
  });

  it("should create", () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it("should render an input of type text", () => {
    expect(wrapper.find("input").attributes().type).toBe("text");
  });
});
