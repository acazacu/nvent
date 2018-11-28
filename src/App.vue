<template>
  <main>
    <header-component></header-component>
    <router-view/>
    <footer-component></footer-component>
  </main>
</template>

<style scoped lang="scss">
  main {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: space-between;
    font-family: 'Muli', sans-serif;

    > header {
      margin: 8px 16px 0 16px;
    }

    > article {
      margin: 16px;
    }

    > footer {
      margin: 0 16px 8px 16px;
    }

    @media screen and (min-width: 1024px) {
      align-items: center;
      justify-content: space-around;
      margin: auto;
      width: 640px;
    }
  }
</style>
<script>
import HeaderComponent from './components/HeaderComponent.vue';
import FooterComponent from './components/FooterComponent.vue';

export default {
  name: 'App',
  components: {
    'header-component': HeaderComponent,
    'footer-component': FooterComponent,
  },
};
</script>
