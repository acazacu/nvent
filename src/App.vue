<template>
  <body>
    <header>
      <logo-component></logo-component>
      <nav></nav>
    </header>
    <main>
      <router-view/>
    </main>
    <footer>
      <p class="version">v.{{ version }} 🤯</p>
      <nav></nav>
    </footer>
  </body>
</template>

<style lang="scss">
  @import "./styles/normalise";
  @import "./styles/typography";

  body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    > header {
      padding: 8px 16px;
    }

    > main {
      padding: 16px;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      justify-content: space-between;
    }

    > footer {
      padding: 8px 16px;

      .version {
        font-size: 10px;
        color: #666666;
        cursor: default;
        font-weight: normal;
      }
    }
  }
</style>
<script>
import LogoComponent from './views/components/LogoComponent.vue';
import { mapState } from 'vuex';

export default {
  name: 'App',
  components: {
    'logo-component': LogoComponent,
  },
  computed: {
    ...mapState([ 'version' ]),
  },
};
</script>
