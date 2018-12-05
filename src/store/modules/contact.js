import { post } from '../http'

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
    async sendMessage({ state }) {
      try {
        const response = await post('http://localhost:8080', state.message);
        console.log(response);
      } catch(error) {
        throw error;
      }
    },
  },
};
