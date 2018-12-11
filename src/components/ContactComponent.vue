<template>
  <section>
    <header>
      <h2>Contact me</h2>
    </header>
    <p>Leave your message with your contact details here and I will get back to you via phone or email.</p>
    <form-component :submitHandler="submitForm" :abortHandler="cancelForm">
      <input-text-component v-model="name" placeholder="Name..."></input-text-component>
      <input-email-component v-model="email" placeholder="Email..."></input-email-component>
      <input-textarea-component v-model="message" placeholder="Message..."></input-textarea-component>
    </form-component>
  </section>
</template>
<style lang="scss">
  p {
    color: #333;
    margin: 16px 0 8px 0;
    font-size: 12px;
  }
</style>
<script>
import { createNamespacedHelpers } from 'vuex';
import InputTextComponent from "./InputTextComponent";
import FormComponent from "./FormComponent";
import InputEmailComponent from "./InputEmailComponent";
import InputTextareaComponent from "./InputTextareaComponent";

const { mapActions } = createNamespacedHelpers('contact');

export default {
  components: {
    FormComponent,
    InputTextComponent,
    InputEmailComponent,
    InputTextareaComponent,
  },
  data() {
    return {
      name: 'John Doe',
      email: 'john.doe@example.com',
      message: 'Hi Nvent!',
    }
  },

  methods: {
    ...mapActions([ 'sendMessage' ]),

    async submitForm() {
      try {
        await this.sendMessage({
          name: this.name,
          from: this.email,
          message: this.message
        });
        this.$router.push({ name: 'contact-success'})
      } catch (error) {
        this.$router.push({ name: 'contact-error'})
      }
    },

    cancelForm() {
      this.name = '';
      this.email = '';
      this.message = '';

      this.$router.push({ name: 'home' });
    },
  },
};
</script>
