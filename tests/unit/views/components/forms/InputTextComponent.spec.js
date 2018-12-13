import { shallowMount, createLocalVue } from "@vue/test-utils";

import InputTextComponent from "src/views/components/forms/InputTextComponent";

const localVue = createLocalVue();
const provide = {
  registerField: jest.fn(),
  deregisterField: jest.fn()
};
const propsData = {
  name: "test",
  value: ""
};

describe("InputTextComponent", () => {
  it("creates", () => {
    const wrapper = shallowMount(InputTextComponent, { localVue, provide, propsData });

    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it("renders a text input", () => {
    const wrapper = shallowMount(InputTextComponent, { localVue, provide, propsData });

    expect(wrapper.find('input[type="text"]').exists()).toBeTruthy();
  });
});
