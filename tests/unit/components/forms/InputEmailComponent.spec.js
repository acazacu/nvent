import { shallowMount, createLocalVue } from "@vue/test-utils";

import InputEmailComponent from "src/components/forms/InputEmailComponent";

const localVue = createLocalVue();

describe("InputEmailComponent", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(InputEmailComponent, {
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

  it("should render an input of type email", () => {
    expect(wrapper.find("input").attributes().type).toBe("email");
  });

  it("should validate against incorrect email addresses", () => {
    wrapper.setProps({
      value: "sdfsafas"
    });

    wrapper.vm.validate();

    expect(wrapper.vm.isValid).toBeFalsy();
  });

  it("should validate a correct email value", () => {
    wrapper.setProps({
      value: "john.doe@example.com"
    });

    wrapper.vm.validate();

    expect(wrapper.vm.isValid).toBeTruthy();
  });
});
