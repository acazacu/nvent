import { shallowMount, createLocalVue } from "@vue/test-utils";
import InputComponent from "src/components/forms/InputComponent";

const localVue = createLocalVue();

describe("InputComponent", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(InputComponent, {
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

  it("should call the provided registerField method on mount", () => {
    expect(wrapper.vm.registerField).toHaveBeenCalled();
  });

  it("should call the provided deregisterField method on destroy", () => {
    wrapper.destroy();
    expect(wrapper.vm.deregisterField).toHaveBeenCalled();
  });

  it("should render a label when provided one via props", () => {
    wrapper.setProps({
      label: "label-test"
    });

    expect(wrapper.find("label").text()).toBe("label-test");
  });

  it("should render a placeholder when provided one via props", () => {
    wrapper.setProps({
      placeholder: "placeholder-test"
    });

    expect(wrapper.find("input").attributes("placeholder")).toBe("placeholder-test");
  });

  it("should bubble the input event from the input element", () => {
    wrapper.find("input").setValue("test");

    expect(wrapper.emitted().input).toBeTruthy();
  });

  it("should validate on the input change event", () => {
    wrapper.setMethods({
      validate: jest.fn()
    });

    wrapper.find("input").trigger("change");

    expect(wrapper.vm.validate).toHaveBeenCalled();
  });

  it("should accept empty values by default", () => {
    wrapper.find("input").trigger("change");

    expect(wrapper.vm.isValid).toBeTruthy();
  });

  it("should validate against empty values when configured to do so", () => {
    wrapper.setProps({
      required: true
    });

    wrapper.find("input").trigger("change");

    expect(wrapper.vm.isValid).toBeFalsy();
  });
});
