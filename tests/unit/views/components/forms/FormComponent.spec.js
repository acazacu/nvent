import { mount, createLocalVue } from '@vue/test-utils';

import FormComponent from 'src/views/components/forms/FormComponent';
import Vue from "vue";
import flushPromises from "flush-promises";

const localVue = createLocalVue();

let fieldComponentId = 0;
const fieldComponentFactory = (validateSpy = jest.fn(), withErrors = false) => {
  return Vue.component(`field-component${fieldComponentId++}`, {
    template: `<input type="text" data-rel="field-component${fieldComponentId++}"></input>`,
    inject: [ 'registerField', 'deregisterField' ],
    mounted: function() {
      this.registerField(this);
    },
    destroyed() {
      this.deregisterField(this);
    },
    methods: {
      validate: validateSpy
    },
    data() {
      return {
        errors: withErrors ? [ 'test-error' ] : []
      }
    }
  });
};

describe('FormComponent', () => {
  let submitHandlerSpy;
  let abortHandlerSpy;
  let propsData;

  beforeEach(() => {
    submitHandlerSpy = jest.fn();
    abortHandlerSpy = jest.fn();
    propsData = { submitHandler: submitHandlerSpy, abortHandler: abortHandlerSpy };
  });

  it('creates', () => {
    const wrapper = mount(FormComponent, { localVue, propsData });

    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it('provides a method for fields to register themselves to the form', () => {
    const wrapper = mount(FormComponent, {
      localVue,
      propsData,
      slots: {
        default: [ fieldComponentFactory() ]
      }
    });

    expect(wrapper.vm.$data.fields.length).toBe(1);
  });

  it('provides a method for fields to deregister themselves to the form', () => {
    const fieldComponent1 = fieldComponentFactory();
    const fieldComponent2 = fieldComponentFactory();
    const wrapper = mount(FormComponent, {
      localVue,
      propsData,
      slots: {
        default: [ fieldComponent1, fieldComponent2 ],
      },
    });

    expect(wrapper.vm.$data.fields.length).toBe(2);

    const fieldComponent1Wrapper = wrapper.find(fieldComponent1);
    fieldComponent1Wrapper.destroy();

    expect(wrapper.vm.$data.fields.length).toBe(1);

    const fieldComponent2Wrapper = wrapper.find(fieldComponent2);
    expect(wrapper.vm.$data.fields).toContain(fieldComponent2Wrapper.vm);
  });

  it('does not submit when some fields are invalid', async () => {
    const fieldValidateSpy = jest.fn().mockReturnValue();
    const fieldComponent1 = fieldComponentFactory(fieldValidateSpy, true);
    const fieldComponent2 = fieldComponentFactory(fieldValidateSpy, false);
    const wrapper = mount(FormComponent, {
      localVue,
      propsData,
      slots: {
        default: [ fieldComponent1, fieldComponent2 ]
      }
    });

    wrapper.find('form').trigger('submit');

    await flushPromises();

    expect(fieldValidateSpy).toHaveBeenCalled();
    expect(submitHandlerSpy).not.toHaveBeenCalled();
  });

  it('submits when all registered fields have validated', async () => {
    const fieldComponent1 = fieldComponentFactory(undefined, false);
    const fieldComponent2 = fieldComponentFactory(undefined, false);
    const wrapper = mount(FormComponent, {
      localVue,
      propsData,
      slots: {
        default: [ fieldComponent1, fieldComponent2 ]
      }
    });

    submitHandlerSpy.mockReturnValue(Promise.resolve());
    wrapper.find('form').trigger('submit');

    expect(wrapper.vm.$data.loading).toBeTruthy();

    await flushPromises();

    expect(wrapper.vm.$data.loading).toBeFalsy();

    expect(submitHandlerSpy).toHaveBeenCalled();
  });

  it('displays a load mask while submitting', async () => {
    const fieldComponent = fieldComponentFactory(undefined, false);
    const wrapper = mount(FormComponent, {
      localVue,
      propsData,
      slots: {
        default: [ fieldComponent ]
      }
    });

    submitHandlerSpy.mockReturnValue(Promise.resolve());
    wrapper.find('form').trigger('submit');

    expect(wrapper.find('.load-mask').exists()).toBeTruthy();

    await flushPromises();

    expect(wrapper.find('.load-mask').exists()).toBeFalsy();
  });

  it('executes the abort handler when cancel is clicked', async () => {
    const wrapper = mount(FormComponent, {
      localVue,
      propsData,
    });

    wrapper.find('[data-rel="cancel-button"]').trigger('click');

    expect(abortHandlerSpy).toHaveBeenCalled();
  });
});
