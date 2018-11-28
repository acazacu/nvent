<template>
    <article>
        <header>
            <h2>Contact me</h2>
        </header>
        <p>Leave your message with your contact details here and I will get back to you via phone or email.</p>
        <form v-on:submit.prevent="onMessageFormSubmit">
            <button type="submit">Send</button>
        </form>
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
export default {
  methods: {
    onMessageFormSubmit() {
      console.log('aaa');
    },
  },
};
</script>
