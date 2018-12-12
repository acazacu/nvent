import { mount, createLocalVue } from '@vue/test-utils';

import FormComponent from 'src/views/components/forms/FormComponent';

const localVue = createLocalVue();

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
});
