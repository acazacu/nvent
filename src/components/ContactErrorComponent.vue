<template>
  <section>
    <h2>Something went wrong</h2>
    <p>Whoops, the website encountered an error while trying to send your message. The error was logged and we will take a look into this ASAP. <router-link :to="{ name: 'home' }">Go back to the homepage</router-link>.</p>
  </section>
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
