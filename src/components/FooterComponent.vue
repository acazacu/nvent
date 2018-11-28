<template>
  <footer>
    <p>v.{{ version }}</p>
  </footer>
</template>
<style scoped lang="scss">
  p {
    font-size: 0.6em;
    color: #666666;
    cursor: default;
    font-weight: normal;
  }
</style>
<script>
export default {
  computed: {
    version: () => process.env.VUE_APP_VERSION,
  },
};
</script>
