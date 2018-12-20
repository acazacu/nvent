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
@import "src/styles/colors";
@import "src/styles/typography";

header {
  display: flex;
  flex-direction: column;

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

    @media screen and (min-width: 480px) {
      margin-left: 1rem;
      display: block;
    }
  }

  a {
    color: $color-cta;
    @include copy($scale1);

    &:hover {
      color: $color-cta-target;
      cursor: pointer;
    }

    &.router-link-active {
      color: $color-copy;

      &:hover {
        color: $color-copy;
        cursor: default;
      }
    }
  }

  button {
    border: 0;
    padding: 0;
    background: transparent;
    color: $color-copy;
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
      background: $color-background;
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
