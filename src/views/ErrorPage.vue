<template>
  <article>
    <section>
      <h2>Something went wrong</h2>
      <p>
        Whoops, the website encountered an error while trying to send your message. The error was
        logged and we will take a look into this ASAP.
        <router-link :to="{ name: 'home' }">Go back to the homepage</router-link>.
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
