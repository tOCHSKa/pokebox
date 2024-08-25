<script setup>

import { ref, defineProps, defineEmits } from 'vue'


const name = ref('')

const props = defineProps({
  pokemon: Object,
})


</script>

<template>

  <div class="card" style="width: 18rem;">
    <div class="card-body text-center">
      <h5 class="card-title">{{ props.pokemon.name }}</h5>
      <h6>ID : {{ props.pokemon.id }}</h6>
      <a :href="`http://localhost:5173/pokemon/${props.pokemon.id}`" class="btn btn-primary mt-2">Details</a>
    </div>
  </div>

</template>