import { shallowMount, createLocalVue } from '@vue/test-utils';

import InputEmailComponent from 'src/views/components/forms/InputEmailComponent';

const localVue = createLocalVue();
const provide = {
  registerField: jest.fn(),
  deregisterField: jest.fn(),
};
const propsData = {
  name: 'test',
  value: ''
};

describe('InputEmailComponent', () => {
  it('creates', () => {
    const wrapper = shallowMount(InputEmailComponent, { localVue, provide, propsData });

    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it('renders an email input', () => {
    const wrapper = shallowMount(InputEmailComponent, { localVue, provide, propsData });

    expect(wrapper.find('input[type="email"]').exists()).toBeTruthy();
  });

  it('invalidates an incorrect email value', () => {
    const wrapper = shallowMount(InputEmailComponent, { localVue, provide, propsData: { ...propsData, value: 'test' } });

    wrapper.vm.validate();

    expect(wrapper.vm.isValid).toBeFalsy();
  });

  it('validates a correct email value', () => {
    const wrapper = shallowMount(InputEmailComponent, { localVue, provide, propsData: { ...propsData, value: 'test@example.com' } });

    wrapper.vm.validate();

    expect(wrapper.vm.isValid).toBeTruthy();
  });
});
