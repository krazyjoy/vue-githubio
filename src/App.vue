<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue';
import Header from './components/management/Header.vue'
</script>

<template>
  <div class="page">
    <!-- <Navbar/>
    <Header></Header> -->
    <RouterView/>
  </div>
  
</template>

<style scoped>
.page{
  display: flex;
  width: 100%;
  flex-direction: column;
  min-height: 100vh;
  justify-content: flex-start;
  font-family: "Bebas Neue", sans-serif;
  letter-spacing: 2px;
}
</style>
