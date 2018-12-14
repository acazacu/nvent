import { post } from "../http";
import defaultState from "./contact.json";

const contactMutations = {
  updateMessage(state, payload) {
    state.message = { ...state.message, ...payload };
  }
};

const contactActions = {
  async sendMessage({ rootState, dispatch, state }) {
    try {
      await post(`${rootState.baseUrlApi}/contact`, state.message);
      dispatch("clearMessage");
    } catch (error) {
      throw error;
    }
  },

  clearMessage({ commit }) {
    commit("updateMessage", defaultState.message);
  }
};

export default {
  namespaced: true,
  state: defaultState,
  mutations: contactMutations,
  actions: contactActions
};
