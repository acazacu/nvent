import { shallowMount, createLocalVue } from "@vue/test-utils";

import InputComponent from "src/views/components/forms/InputComponent";

const localVue = createLocalVue();
const provide = {
  registerField: jest.fn(),
  deregisterField: jest.fn()
};
const propsData = {
  name: "test",
  value: ""
};
describe("InputComponent", () => {
  it("creates", () => {
    const wrapper = shallowMount(InputComponent, { localVue, provide, propsData });

    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it("renders a label when provided one via props", () => {
    const wrapper = shallowMount(InputComponent, {
      localVue,
      provide,
      propsData: { ...propsData, label: "test" }
    });

    expect(wrapper.find("label").exists()).toBeTruthy();
    expect(wrapper.find("label").text()).toBe("test");
  });

  it("passes a placeholder when to the input when provided one via props", () => {
    const wrapper = shallowMount(InputComponent, {
      localVue,
      provide,
      propsData: { ...propsData, placeholder: "test" }
    });

    expect(wrapper.find("input").attributes("placeholder")).toBe("test");
  });

  it("calls the provided register function on mount", () => {
    shallowMount(InputComponent, { localVue, provide, propsData });

    expect(provide.registerField).toHaveBeenCalled();
  });

  it("calls the provided deregister function on destroy", () => {
    const wrapper = shallowMount(InputComponent, { localVue, provide, propsData });

    wrapper.destroy();
    expect(provide.deregisterField).toHaveBeenCalled();
  });

  it("bubbles the input event as in fires on the input element", () => {
    const wrapper = shallowMount(InputComponent, { localVue, provide, propsData });

    wrapper.find("input").setValue("test");

    expect(wrapper.emitted().input).toBeTruthy();
  });

  it("validates on the input change event", () => {
    const wrapper = shallowMount(InputComponent, { localVue, provide, propsData });
    const validateSpy = jest.spyOn(wrapper.vm, "validate");

    wrapper.find("input").trigger("change");
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });

  it("accepts empty values by default", () => {
    const wrapper = shallowMount(InputComponent, { localVue, provide, propsData });

    wrapper.find("input").trigger("change");
    expect(wrapper.vm.isValid).toBeTruthy();
  });

  it("validates against empty values when configured to do so", () => {
    const wrapper = shallowMount(InputComponent, {
      localVue,
      provide,
      propsData: { ...propsData, required: true }
    });

    wrapper.find("input").trigger("change");
    expect(wrapper.vm.isValid).toBeFalsy();
  });
});
