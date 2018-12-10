import { post } from '../http';

export default {
  namespaced: true,
  actions: {
    async sendMessage({ rootState }, message) {
      try {
        await post(`${rootState.baseUrlApi}/contact`, message);
      } catch (error) {
        throw error;
      }
    },
  },
};
