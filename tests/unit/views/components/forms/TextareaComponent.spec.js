import {shallowMount, createLocalVue} from '@vue/test-utils';

import TextareaComponent from 'src/views/components/forms/TextareaComponent';

const localVue = createLocalVue();
const provide = {
  registerField: jest.fn(),
  deregisterField: jest.fn(),
};
const propsData = {
  name: 'test',
  value: ''
};

describe('TextareaComponent', () => {
  it('creates', () => {
    const wrapper = shallowMount(TextareaComponent, { localVue, provide, propsData });

    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it('renders a text input', () => {
    const wrapper = shallowMount(TextareaComponent, { localVue, provide, propsData });

    expect(wrapper.find('textarea').exists()).toBeTruthy();
  });

  it('invalidates a field with too few characters when the minimum-characters prop is set', () => {
    const wrapper = shallowMount(TextareaComponent, { localVue, provide, propsData: { ...propsData, value: 'hi', minimumCharacters: 3 } });

    wrapper.vm.validate();

    expect(wrapper.vm.isValid).toBeFalsy();
  });

  it('validates a field with enough characters when the minimum-characters prop is set', () => {
    const wrapper = shallowMount(TextareaComponent, { localVue, provide, propsData: { ...propsData, value: 'test', minimumCharacters: 3 } });

    wrapper.vm.validate();

    expect(wrapper.vm.isValid).toBeTruthy();
  });
});
