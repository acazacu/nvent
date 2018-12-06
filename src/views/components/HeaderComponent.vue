<template>
  <header>
    <h1>
      <router-link exact to="/">{{ siteName }}</router-link>
    </h1>
  </header>
</template>
<style scoped lang="scss">
  h1 {
    font-size: 24px;
    font-weight: normal;
    letter-spacing: 1px;
  }

  a {
    text-decoration: none;
    color: #333333;
    cursor: default;
    user-select: none;

    &:not(.router-link-active) {
      cursor: pointer;
      text-decoration: underline;

      &:hover {
        color: blue;
      }
    }
  }
</style>
<script>
  export default {
    data() {
      return {
        siteName: 'nvent'
      }
    }
  }
</script>
