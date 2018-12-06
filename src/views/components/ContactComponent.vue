<template>
  <section>
    <header>
      <h2>Contact me</h2>
    </header>
    <p>Leave your message with your contact details here and I will get back to you via phone or email.</p>
    <form v-on:submit.prevent="onSubmit">
      <div class="form-item">
        <input data-rel="name" v-model="name" placeholder="Name...">
      </div>
      <div class="form-item">
        <input data-rel="email" v-model="email" placeholder="Email...">
      </div>
      <div class="form-item">
        <input data-rel="phone" v-model="phone" placeholder="Phone...">
      </div>
      <div class="form-item">
        <textarea data-rel="message" v-model="message" placeholder="Message..."></textarea>
      </div>
      <button type="button" @click="onCancel">Cancel</button>
      <button type="submit">Send</button>
    </form>
  </section>
</template>
<style lang="scss">
  p {
    color: #333;
    margin: 16px 0 8px 0;
    font-size: 12px;
  }
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
import { createNamespacedHelpers } from 'vuex';

const { mapActions } = createNamespacedHelpers('contact');

export default {
  data() {
    return {
      name: '',
      email: '',
      phone: '',
      message: '',
    }
  },

  methods: {
    ...mapActions([ 'sendMessage' ]),

    async onSubmit() {
      try {
        await this.sendMessage({
          name: this.name,
          email: this.email,
          phone: this.phone,
          message: this.message
        });
        this.$router.push({ name: 'contact-success'})
      } catch (error) {
        this.$router.push({ name: 'contact-error'})
      }
    },

    onCancel() {
      this.name = '';
      this.email = '';
      this.phone = '';
      this.message = '';

      this.$router.push({ name: 'home' });
    }
  },
};
</script>
