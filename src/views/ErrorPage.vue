<template>
  <article>
    <h2>Error</h2>
    <section>
      <p>
        Whoops, the website encountered an error while trying to send your message. The error was
        logged and we will take a look into this ASAP.
        <router-link :to="{ name: 'home' }">Go back to the homepage</router-link>.
      </p>
    </section>
  </article>
</template>
