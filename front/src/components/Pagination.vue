

<script setup>

import { ref, defineProps, defineEmits } from 'vue'



// Définition des emits 
const emit = defineEmits(['prev', 'next'])

const props = defineProps ({
    previousPage: Number,
    currentPage: Number,
    nextPage: Number,
})

// Methode pour emettre les events
function emitPrev() {
  emit('prev');
}

function emitNext() {
  emit('next');
}

</script>
<template lang="">
<div aria-label="Page navigation" class="mt-4">
  <ul class="pagination">
    <li class="page-item" :class="{ disabled: currentPage <= 1 }"><a class="page-link" href="#" @click="emitPrev">Previous</a></li>

    <li class="page-item" v-if="props.previousPage !== null"><a class="page-link" href="#" @click="emitPrev">{{props.previousPage}}</a></li>
    <li class="page-item"><a class="page-link" href="#">{{props.currentPage}}</a></li>
    <li class="page-item" v-if="props.nextPage !== null"><a class="page-link" href="#" @click="emitNext">{{props.nextPage}}</a></li>

    <li class="page-item" :class="{ disabled: props.nextPage === null }"><a class="page-link" href="#" @click="emitNext">Next</a></li>
  </ul>
</div>
</template>

<style lang="">
    
</style>