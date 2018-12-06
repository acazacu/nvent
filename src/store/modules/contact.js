import { post } from '../http';
export default {
  namespaced: true,
  actions: {
    async sendMessage() {
      try {
        await post('http://localhost:8080', { test: 1 });
      } catch (error) {
        throw error;
      }
    },
  },
};
