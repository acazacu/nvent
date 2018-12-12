import { post } from '../http';

const generateDefaultState = () => ({
  message: {
    name: '',
    email: '',
    message: '',
  },
});

const defaultState = generateDefaultState();

const mutations = {
  updateMessage (state, payload) {
    state.message = { ...state.message, ...payload }
  }
};

const actions = {
  async sendMessage({ rootState, dispatch }, message) {
    try {
      await post(`${rootState.baseUrlApi}/contact`, message);
      dispatch('clearMessage');
    } catch (error) {
      throw error;
    }
  },

  clearMessage({ commit }) {
    commit('updateMessage', defaultState.message);
  }
};

const store = {
  namespaced: true,
  state: generateDefaultState(),
  mutations,
  actions,
};

export {
  store as default,
  defaultState,
  mutations,
  actions,
} ;
