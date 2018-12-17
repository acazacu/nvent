<template>
  <router-link exact to="/">nvent</router-link>
</template>
<style scoped lang="scss">
a {
  text-decoration: none;
  color: #333333;
  cursor: default;
  user-select: none;
  font-size: 24px;
  font-weight: normal;
  letter-spacing: 1px;

  &:not(.router-link-active) {
    cursor: pointer;

    &:hover {
      color: blue;
    }
  }
  @media screen and (min-width: 1024px) {
    font-size: 32px;
  }
}
</style>
