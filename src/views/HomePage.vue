<template>
  <article>
    <h1>Hi stranger,</h1>
    <section>
      <p>I'm Alex, a techie working in and around Amsterdam and this is my website.</p>
      <p>
        Are you looking to get in touch with me? Head on over to the contact page and
        <router-link :to="{ name: 'contact-form' }">send me a message</router-link>.
      </p>
    </section>
  </article>
</template>
