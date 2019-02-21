<template>
  <article>
    <section data-rel="contact-form" v-if="!success">
      <p>
        Send me a message via
        <a target="_blank" href="https://www.linkedin.com/in/nvent-nl/" title="My Linkedin profile"
          >linkedin <font-awesome-icon icon="external-link-alt"></font-awesome-icon
        ></a>
        or use the form below.
      </p>
      <form-component v-on:submit="submitForm" v-on:cancel="cancelContact">
        <input-email-component
          name="email"
          v-model="message.email"
          placeholder="Your email..."
          @input="updateStore"
          required
        ></input-email-component>
        <input-text-component
          name="subject"
          :value="message.subject"
          placeholder="Subject..."
          @input="updateStore"
          required
        ></input-text-component>
        <textarea-component
          name="message"
          v-model="message.message"
          placeholder="Message..."
          @input="updateStore"
          required
        ></textarea-component>
        <div data-rel="load-mask" v-if="loading" class="load-mask"></div>
      </form-component>
    </section>
    <section data-rel="message-sent" v-if="success">
      <h2>Message sent!</h2>
      <p>Your message has been sent. <router-link to="/">Go back to the homepage</router-link>.</p>
    </section>
  </article>
</template>
<style lang="scss">
.load-mask {
  position: absolute;
  z-index: 2;
  background-color: white;
  opacity: 0.5;
  width: 100%;
  height: 100%;
}
</style>
<script>
import { createNamespacedHelpers } from "vuex";
import InputTextComponent from "./forms/InputTextComponent";
import FormComponent from "./forms/FormComponent";
import InputEmailComponent from "./forms/InputEmailComponent";
import TextareaComponent from "./forms/TextareaComponent";

const { mapActions, mapState, mapMutations } = createNamespacedHelpers("contact");

export default {
  components: {
    FormComponent,
    InputTextComponent,
    InputEmailComponent,
    TextareaComponent
  },
  data() {
    return {
      success: false,
      loading: false
    };
  },
  computed: {
    ...mapState(["message"])
  },
  methods: {
    ...mapActions(["sendMessage", "clearMessage"]),
    ...mapMutations(["updateMessage"]),

    async submitForm() {
      try {
        this.loading = true;
        await this.sendMessage();

        this.success = true;

        this.clearMessage();
      } catch (error) {
        this.$router.push({ name: "error" });
      } finally {
        this.loading = false;
      }
    },

    cancelContact() {
      this.clearMessage();

      this.$router.push({ name: "home" });
    },

    updateStore(e) {
      this.updateMessage({ [e.target.name]: e.target.value });
    }
  }
};
</script>
