import { shallowMount, createLocalVue } from "@vue/test-utils";

import FormComponent from "src/views/components/forms/FormComponent";
import Vue from "vue";

const localVue = createLocalVue();

let ChildComponent = Vue.component("child-component", {
  template: "<div></div>",
  inject: ["registerField", "deregisterField"],
  methods: {
    validate: jest.fn()
  }
});

describe("FormComponent", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(FormComponent, {
      localVue,
      slots: {
        default: [ChildComponent, ChildComponent]
      }
    });
  });

  it("should create", () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it("should provide register and deregister methods to its child components", () => {
    expect(wrapper.find(ChildComponent).vm.registerField).toBeDefined();
    expect(wrapper.find(ChildComponent).vm.deregisterField).toBeDefined();
  });

  it("should de/register fields via the provided registerField method ", () => {
    const childComponentVm = wrapper.find(ChildComponent).vm;

    childComponentVm.registerField(childComponentVm);

    expect(wrapper.vm.$data.fields.length).toBe(1);
    expect(wrapper.vm.$data.fields).toContain(childComponentVm);

    childComponentVm.deregisterField(childComponentVm);

    expect(wrapper.vm.$data.fields.length).toBe(0);
  });

  it("should trigger the custom event cancel when clicking the cancel button", function() {
    wrapper.find('[data-rel="cancel-button"]').trigger("click");

    expect(wrapper.emitted("cancel")).toBeTruthy();
  });

  it("should validate when clicking the submit button", () => {
    const isValidSpy = jest.fn();

    wrapper.setMethods({
      isValid: isValidSpy
    });

    wrapper.find("form").trigger("submit");

    expect(isValidSpy).toHaveBeenCalledTimes(1);
  });

  it("should trigger the custom event submit when clicking the submit button and validation passes", async () => {
    wrapper.setMethods({
      isValid: jest.fn().mockReturnValue(true)
    });

    wrapper.find("form").trigger("submit");

    expect(wrapper.emitted("submit")).toBeTruthy();
  });

  it("should not trigger the custom event submit when clicking the submit button and validation fails", async () => {
    wrapper.setMethods({
      isValid: jest.fn().mockReturnValue(false)
    });

    wrapper.find("form").trigger("submit");

    expect(wrapper.emitted("submit")).toBeFalsy();
  });

  it("should only validate true when all fields check as valid", async () => {
    const children = wrapper.findAll(ChildComponent);

    const child1 = children.at(0);
    child1.vm.registerField(child1.vm);
    child1.setMethods({
      validate: jest.fn().mockReturnValue([])
    });

    const child2 = children.at(1);
    child2.vm.registerField(child2.vm);
    child2.setMethods({
      validate: jest.fn().mockReturnValue(["error"])
    });

    expect(wrapper.vm.isValid()).toBeFalsy();

    child2.setMethods({
      validate: jest.fn().mockReturnValue([])
    });

    expect(wrapper.vm.isValid()).toBeTruthy();
  });
});
