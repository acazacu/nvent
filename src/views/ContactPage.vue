<template>
  <article>
    <section data-rel="contact-form" v-if="!success">
      <h2>Contact me</h2>
      <p>Leave your message here, together with your email so that I may get back to you if necessary.</p>
      <form-component :submitHandler="submitForm" :abortHandler="cancelForm">
        <input-text-component name="name" :value="message.name" placeholder="Name..." @input="updateStore"></input-text-component>
        <input-email-component name="email" v-model="message.email" placeholder="Email..." @input="updateStore"></input-email-component>
        <input-textarea-component name="message" v-model="message.message" placeholder="Message..." @input="updateStore"></input-textarea-component>
      </form-component>
    </section>
    <section data-rel="message-sent" v-if="success">
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

  const { mapActions, mapState, mapMutations } = createNamespacedHelpers('contact');

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
      };
    },
    computed: {
      ...mapState([ 'message' ]),
    },
    methods: {
      ...mapActions([ 'sendMessage', 'clearMessage' ]),
      ...mapMutations([ 'updateMessage' ]),

      async submitForm() {
        try {
          await this.sendMessage(this.message);

          this.success = true;

          this.clearMessage();

        } catch (error) {
          this.$router.push({ name: 'error'})
        }
      },

      cancelForm() {
        this.clearMessage();

        this.$router.push({ name: 'home' });
      },

      updateStore(e) {
        this.updateMessage({ [e.target.name]: e.target.value });
      },
    },
  }
</script>
