<script setup>

import { ref, defineProps, defineEmits } from 'vue'


const name = ref('')

const props = defineProps ({
    pokemon: Object,
})


</script>

<template>

<div class="card" style="width: 18rem;">
  <!-- <img  class="card-img-top" alt="photo"> -->
  <div class="card-body text-center">
    <h5 class="card-title">{{ props.pokemon.name }}</h5>
    <a href="#" class="btn btn-primary mt-2">Details</a>
  </div>
</div>

</template>