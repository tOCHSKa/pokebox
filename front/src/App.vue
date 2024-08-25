<template>
  <div class="app-container">
    <Navbar />
    <router-view />
    <footer>Footer content here</footer>
  </div>
</template>

<script setup>

import Navbar from './components/Navbar.vue';

</script>

<style scoped>
.app-container {
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh; /* Pour que le contenu prenne toute la hauteur de la page */
}

/* Ajoutez un peu de style à votre footer si nécessaire */
footer {
  background-color: #f8f8f8;
  padding: 10px;
  text-align: center;
}
</style>
