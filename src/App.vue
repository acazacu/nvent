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
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>
<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import HeaderComponent from '@/component/Header.vue';
    import FooterComponent from '@/component/Footer.vue';

    @Component({
        components: {
            'header-component': HeaderComponent,
            'footer-component': FooterComponent,
        },
    })
    export default class App extends Vue { }

</script>
