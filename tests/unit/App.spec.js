import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";

import App from "src/App.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("App", () => {
  const version = "1.0.0";

  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(App, {
      stubs: ["router-view"],
      mocks: {
        $store: new Vuex.Store({
          state: {
            version
          }
        })
      },
      localVue
    });
  });

  it("should create", () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it("should render the correct version in the footer", () => {
    expect(wrapper.find("footer .version").text()).toContain(version);
  });
});
