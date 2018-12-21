<template>
  <header v-bind:class="{ 'nav-visible': isNavVisible }">
    <div>
      <router-link exact :to="{ name: 'home' }">nvent</router-link>
      <button @click="onClickToggleMenu" title="Toggle menu">
        <font-awesome-icon icon="bars"></font-awesome-icon>
      </button>
    </div>
    <ul>
      <li><router-link :to="{ name: 'contact-form' }">contact</router-link></li>
    </ul>
  </header>
</template>
<style scoped lang="scss">
@import "../../styles/colors";
@import "../../styles/typography";

header {
  display: flex;
  flex-direction: column;
  background: $color-primary;

  .logo {
    color: $color-high-contrast-light;
  }

  @media screen and (min-width: 480px) {
    flex-direction: row;
  }

  div {
    display: flex;
    justify-content: space-between;
  }

  ul {
    margin-bottom: 0;
    padding-left: 0;
    list-style: none inside;
    display: none;
    flex-grow: 1;
    flex-direction: column;

    li {
      margin-bottom: 1rem;
    }

    @media screen and (min-width: 480px) {
      margin-left: 1rem;
      display: flex;
      flex-direction: row;

      li {
        margin-bottom: 0;
        margin-left: 1rem;
      }
    }
  }

  a {
    @include copy($scale1);

    &.router-link-active {
      color: $color-reduced-contrast-light;

      &:hover {
        color: $color-reduced-contrast-light;
        cursor: default;
      }
    }
  }

  button {
    border: 0;
    padding: 0;
    background: transparent;
    color: $color-reduced-contrast-light;
    @include copy($scale1);

    @media screen and (min-width: 480px) {
      display: none;
    }
  }

  &.nav-visible {
    @media screen and (max-width: 480px) {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: $color-primary;
      z-index: 2;
    }

    ul {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
<script>
export default {
  name: "header-component",
  data() {
    return {
      isNavVisible: false
    };
  },
  created() {
    this.$router.afterEach(() => {
      this.isNavVisible = false;
    });
  },
  methods: {
    onClickToggleMenu() {
      this.isNavVisible = !this.isNavVisible;
    }
  }
};
</script>
