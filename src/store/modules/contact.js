import { post } from "../http";
import defaultState from "./contact.json";

export const mutations = {
  updateMessage(state, payload) {
    state.message = { ...state.message, ...payload };
  }
};

export const actions = {
  async sendMessage({ dispatch, state }) {
    try {
      await post(`${process.env.VUE_APP_BASE_URL_API}/contact`, state.message);
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
  mutations: mutations,
  actions: actions
};
