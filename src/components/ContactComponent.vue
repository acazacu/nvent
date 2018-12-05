<template>
  <form v-on:submit.prevent="onMessageFormSubmit">
    <div class="form-item">
      <input :value="message.name" @input="updateName" placeholder="Name...">
    </div>
    <div class="form-item">
      <input :value="message.email" @input="updateEmail" placeholder="Email...">
    </div>
    <div class="form-item">
      <input :value="message.phone" @input="updatePhone" placeholder="Phone...">
    </div>
    <div class="form-item">
      <textarea :value="message.message" @input="updateMessage" placeholder="Message..."></textarea>
    </div>
    <button type="submit">Send</button>
  </form>
</template>
<style lang="scss">
  form {
    display: flex;
    flex-direction: column;

    .form-item {
      margin: 8px 0;
      display: flex;
      align-items: stretch;
      justify-content: stretch;
      justify-items: stretch;

      input, textarea {
        padding: 4px;
        border: 1px solid lightgray;
      }

      textarea {
        min-height: 200px;
      }
    }

    button[type="submit"] {
      width: 100%;
      border: 1px solid black;
    }
  }
</style>
<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      message: state => state.contact.message,
    }),
  },
  methods: {
    updateName(e) {
      this.$store.commit('contact/updateMessage', { name: e.target.value });
    },
    updateEmail(e) {
      this.$store.commit('contact/updateMessage', { email: e.target.value });
    },
    updatePhone(e) {
      this.$store.commit('contact/updateMessage', { phone: e.target.value });
    },
    updateMessage(e) {
      this.$store.commit('contact/updateMessage', { message: e.target.value });
    },
    onMessageFormSubmit() {
      console.log('aaa');
    },
  },
};
</script>
