<template>
  <router-link exact to="/">nvent</router-link>
</template>
<style scoped lang="scss">
@import "src/styles/colors";
@import "src/styles/typography";

a {
  text-decoration: none;
  color: $color-copy;
  cursor: default;
  user-select: none;
  @include copy($scale1);

  &:hover {
    color: $color-copy;
  }

  &:not(.router-link-active) {
    color: $color-cta;
    cursor: pointer;

    &:hover {
      color: $color-cta-target;
    }
  }
}
</style>
