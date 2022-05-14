<template>
  <h1>{{ title }}</h1>
  <img style="margin: 0 auto" alt="Vue logo" src="./assets/images/logo.png" />
  <nav>
    Router:
    <router-link to="/">/</router-link> |
    <router-link to="/users">/users</router-link> |
    <router-link to="/users/1">/users/:id</router-link>
  </nav>
  <router-view />
</template>

<script setup lang="ts">
const title = import.meta.env.VITE_APP_TITLE;
</script>

<style lang="scss">
#app {
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
