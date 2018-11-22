<template>
  <main>
    <div id="header">
      <h1><router-link to="/" exact>nvent</router-link></h1>
    </div>
    <router-view/>
    <div id="footer">
      <p>v.{{ version }}</p>
    </div>
  </main>
</template>

<style src="./app.css"></style>
<script lang="ts" src="./App.ts"></script>
