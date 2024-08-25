<template>


  <div class="container">
    <div class="header">
      <h1>Pokémons Liste</h1>
    </div>
    <div class="grid-container" v-if="paginatedPokemons.length">
    <Card 
      v-for="pokemon in paginatedPokemons"
      :key="pokemon.id"
      :pokemon="pokemon"
    />
    </div>

    <Pagination
      :currentPage="currentPage"
      :previousPage="pagePrev"
      :nextPage="pageNext"
      @prev="prevPage"
      @next="nextPage"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Card from '../components/Card.vue';
import Pagination from '../components/Pagination.vue';
import { getPokemons } from '../lib/data.js';

const pokemons = ref([]);
const pokemonsFiltered = ref([]);
const perPage = 9;
const route = useRoute();
const router = useRouter();
const id = ref(0);


const currentPage = computed(() => Number(route.params.page) || 1);
const pagePrev = computed(() =>  currentPage.value > 1 ? currentPage.value - 1 : null) 
const pageNext = computed(() => {
  return currentPage.value * perPage < pokemonsFiltered.value.length 
    ? currentPage.value + 1 
    : null;
});

/**
 * Fonction pour récupérer les Pokémon depuis l'API et préparer les données pour l'affichage.
 */
async function fetchPokemons() {
    try {
        // Appel de la fonction getTest avec la limite de 151
        const data = await getPokemons(151);
        // Réinitialise le tableau filtré pour éviter l'ajout de doublons
        pokemonsFiltered.value = [];
        // Stocke les résultats dans le tableau 'pokemons'
        pokemons.value = data.results;
        // Ajoute les Pokémon récupérés au tableau filtré
        pokemonsFiltered.value.push(...pokemons.value);
        // Tri les Pokémon par nom en ordre alphabétique pour un affichage organisé
        pokemonsFiltered.value.sort((a, b) => a.name.localeCompare(b.name));
        // Réinitialise l'identifiant de base pour les Pokémon
        id.value = 0;
        // Attribue un identifiant unique à chaque Pokémon pour une gestion facile dans l'interface
        pokemonsFiltered.value.forEach(objet => {
            id.value += 1; // Incrémente l'identifiant à chaque itération
            objet.id = id.value; // Assigne l'identifiant incrémenté à l'objet Pokémon
        });
    } catch (error) {
        // Gère les erreurs potentielles lors de la récupération des données
        console.error('Error fetching Pokémon:', error);
    }
}

// Appel de la fonction pour récupérer et afficher les données
fetchPokemons();

// Déclaration de la propriété calculée pour obtenir les Pokémon paginés
const paginatedPokemons = computed(() => {
  // Calcul de l'index de début pour la pagination
  const start = (currentPage.value - 1) * perPage;
  // Calcul de l'index de fin pour la pagination
  const end = start + perPage;
  // Retourne une tranche du tableau de Pokémon filtrés en fonction des indices de début et de fin
  return pokemonsFiltered.value.slice(start, end);
});

function prevPage() {
  if (currentPage.value > 1) {
    router.push({ name: 'pokemons', params: { page: currentPage.value - 1 } });
  }
}

function nextPage() {
  if (currentPage.value * perPage < pokemonsFiltered.value.length) {
    router.push({ name: 'pokemons', params: { page: currentPage.value + 1 } });
  }
}

onMounted(fetchPokemons);
watch(currentPage, fetchPokemons);

</script>

<style scoped>
/* Style pour centrer le titre */
.header {
  text-align: center;
  margin: 20px 0;
}

/* Conteneur général pour centrer tout le contenu */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0 20px;
}

/* Grille des cartes */
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 colonnes par défaut */
  gap: 16px; /* Espacement entre les cartes */
  justify-content: center; /* Centre la grille */
}

/* Media queries pour la grille */
@media (max-width: 994px) {
  .grid-container {
    grid-template-columns: repeat(2, 1fr); /* 2 colonnes en dessous de 994px */
  }
}

@media (max-width: 600px) {
  .grid-container {
    grid-template-columns: 1fr; /* 1 colonne en dessous de 600px */
  }
}
</style>