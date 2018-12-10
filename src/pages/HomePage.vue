<template>
  <article>
    <header>
      <h2>Hi stranger,</h2>
    </header>
    <p>I'm Alex, a techie working in and around Amsterdam and this is my website.</p>
    <p><router-link :to="{ name: 'contact-form' }">Contact me.</router-link></p>
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

  a {
    font-size: 12px;
  }
</style>
