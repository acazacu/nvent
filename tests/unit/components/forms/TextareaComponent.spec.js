import { shallowMount, createLocalVue } from "@vue/test-utils";

import TextareaComponent from "src/components/forms/TextareaComponent";

const localVue = createLocalVue();

describe("TextareaComponent", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(TextareaComponent, {
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

  it("should creates", () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it("should render a textarea", () => {
    expect(wrapper.find("textarea").exists()).toBeTruthy();
  });

  it("should validate against values with a character count lower than the minimum set", () => {
    wrapper.setProps({
      value: "hi",
      minimumCharacters: 3
    });

    wrapper.vm.validate();

    expect(wrapper.vm.isValid).toBeFalsy();
  });

  it("should validate a value with a character count lower than the minimum set", () => {
    wrapper.setProps({
      value: "hi nvent",
      minimumCharacters: 3
    });

    wrapper.vm.validate();

    expect(wrapper.vm.isValid).toBeTruthy();
  });
});
