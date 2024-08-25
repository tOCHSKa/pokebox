<template>
    <div class="container">
        <div class="img">
            <img :src="pokemon.sprites.front_default">
        </div>
        <div class="name">
            <h4 class="pname">{{ pokemon.name }}</h4>
        </div>
        <div>
            <p class="paratype">Type : <span v-for="type in pokemon.types" :key="type.type.name" class="spantype">
                    {{ type.type.name }} 
                </span></p>
        </div>
    </div>

</template>

<script setup>

import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const pokemon = ref(null)

function fetchPokemon() {
    fetch(`https://pokeapi.co/api/v2/pokemon/${route.params.id}`)
        .then(response => response.json())
        .then(data => {
            pokemon.value = data
        })
}

// Si l'ID change, on appelle la fonction fetchPokemon
watch(route, () => fetchPokemon())

// Appel de la fonction fetchPokemon, pour récupérer les détails du pokémon
fetchPokemon()
</script>

<style scope>
.container {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
}

.img {
    width: 200px;
}

img {
    width: 100%;
}

.name {

}

.pname {
    text-transform: capitalize;
}

.spantype {
    margin-right: 5px;
    font-weight: 400;
}

.paratype {
    font-weight: 600;
}
</style>