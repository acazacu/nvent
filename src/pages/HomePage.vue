<template>
  <article>
    <header>
      <h2>Hi stranger,</h2>
    </header>
    <p>I'm Alex, a techie working in and around Amsterdam and this is my website.</p>
    <p>If you're looking to get in touch with me, do it via
      <router-link to="/contact">this contact form</router-link>
      .
    </p>
    <p>This is a serverless website, you can view its source code by visiting <a href="https://github.com/acazacu/nvent"
                                                                                 target="_blank"
                                                                                 title="github.com/acazacu/nvent">this github repo</a>.
    </p>
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
