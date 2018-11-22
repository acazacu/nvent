<template>
    <header>
        <h1><router-link to="/" exact>nvent</router-link></h1>
    </header>
</template>
<style scoped lang="scss">
    h1 {
        font-weight: normal;
        font-size: 0.9em;
        letter-spacing: 1px;
    }
    a {
        text-decoration: none;
        color: #333333;
        cursor: default;
        user-select: none;
    }
</style>
<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';

    @Component({})
    export default class HeaderComponent extends Vue { }
</script>