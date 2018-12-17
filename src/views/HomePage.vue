<template>
  <article>
    <section>
      <h2>Hi stranger,</h2>
      <p>I'm Alex, a techie working in and around Amsterdam and this is my website.</p>
      <p>
        Not much going on around here really, except
        <router-link :to="{ name: 'contact-form' }">this</router-link> neat little contact form. You
        can use it to <router-link :to="{ name: 'contact-form' }">send me a message</router-link>.
      </p>
    </section>
  </article>
</template>
<style scoped lang="scss">
article {
  margin: 8px;
  color: #333;
  max-width: 580px;
}
</style>
