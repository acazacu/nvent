<template>
  <article>
    <section v-if="!success">
      <h2>Contact me</h2>
      <p>Leave your message here, together with your email so that I may get back to you if necessary.</p>
      <form-component :submitHandler="submitForm" :abortHandler="cancelForm">
        <input-text-component v-model="message.name" placeholder="Name..."></input-text-component>
        <input-email-component v-model="message.email" placeholder="Email..."></input-email-component>
        <input-textarea-component v-model="message.message" placeholder="Message..."></input-textarea-component>
      </form-component>
    </section>
    <section v-if="success">
      <h2>Message sent!</h2>
      <p>Your message has been sent. <router-link to="/">Go back to the homepage</router-link>.</p>
    </section>
  </article>
</template>
<style lang="scss">
  article {
    margin: 8px;
    color: #333;
    width: 580px;
  }
</style>
<script>
  import { createNamespacedHelpers } from 'vuex';
  import InputTextComponent from "./components/forms/InputTextComponent";
  import FormComponent from "./components/forms/FormComponent";
  import InputEmailComponent from "./components/forms/InputEmailComponent";
  import InputTextareaComponent from "./components/forms/InputTextareaComponent";

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
        success: false,
        message: {
          name: 'John Doe',
          email: 'john.doe@example.com',
          message: 'Hi Nvent!',
        },
      };
    },
    methods: {
      ...mapActions([ 'sendMessage' ]),

      async submitForm() {
        try {
          await this.sendMessage(this.message);

          this.success = true;
          this.message = { name: '', email: '', message: '' };
        } catch (error) {
          this.$router.push({ name: 'error'})
        }
      },

      cancelForm() {
        this.name = '';
        this.email = '';
        this.message = '';

        this.$router.push({ name: 'home' });
      },
    },
  }
</script>
