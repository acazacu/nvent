<template>
  <main>
    <div id="header">
      <h1><router-link to="/">nvent</router-link></h1>
    </div>
    <nav>
      <ol>
        <li><router-link to="/about">about</router-link></li>
      </ol>
    </nav>
    <router-view/>
    <div id="footer">
      <p>v.{{ version }}</p>
    </div>
  </main>
</template>

<style src="./app.css"></style>
<script lang="ts" src="./App.ts"></script>
