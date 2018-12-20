<template>
  <body>
    <header-component></header-component>
    <main><router-view /></main>
    <footer>
      <p class="version">v.{{ version }} 🤯</p>
    </footer>
  </body>
</template>

<style lang="scss">
@import "./styles/normalise";
@import "./styles/colors";
@import "./styles/typography";
@import "./styles/buttons";

body {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;
  background: $color-background;

  > main {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: space-between;
    flex-grow: 1;
  }

  > footer {
    .version {
      margin-bottom: 0;
      cursor: default;
      text-align: center;
    }
  }
}
</style>
<script>
import HeaderComponent from "./views/components/HeaderComponent.vue";
import { mapState } from "vuex";

export default {
  name: "App",
  components: {
    "header-component": HeaderComponent
  },
  computed: {
    ...mapState(["version"])
  }
};
</script>
