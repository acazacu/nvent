export default {
  namespaced: true,
  state: {
    message: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  },
  mutations: {
    updateMessage(state, payload) {
      state.message = { ...state.message, payload };
    },
  },
  actions: {
    sendMessage({ commit }) {
      setTimeout(() => {
        commit();
      }, 1000);
    },
  },
};
