<template>
  <article>
    <header>
      <h2>Contact me</h2>
    </header>
    <p>Leave your message with your contact details here and I will get back to you via phone or email.</p>
    <contact-component></contact-component>
  </article>
</template>
<style scoped lang="scss">
  h2 {
    font-size: 16px;
  }

  p {
    color: #333;
    margin: 16px 0 8px 0;
    font-size: 12px;
  }
</style>
<script>
  import ContactComponent from '../components/ContactComponent.vue';

  export default {
    name: 'contactPage',
    components: {
      'contact-component': ContactComponent,
    },
  };
</script>
