export default {
  namespaced: true,
  state: { },
  actions: {
    sendMessage({ commit }) {
      setTimeout(() => {
        commit();
      }, 1000);
    },
  },
};
