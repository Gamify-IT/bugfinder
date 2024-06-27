<script setup lang="ts">
import mitt from 'mitt';
import { ref } from 'vue';

const emitter = mitt();
let score = ref(0);
let rewards = ref(0);



function closeGame() {
  window.parent.postMessage('CLOSE ME');
  emitter.on('RewardsAndScores', score => console.log('RewardsAndScores' , score) )

}
</script>

<template>
  <main>
    <div class="text-center position-absolute top-50 start-50 translate-middle">
      <h2>You finished the Game! Score: {{ score }}</h2>
      <b-button variant="danger" id="close-button" v-on:click="closeGame"> Back to game </b-button>
    </div>
  </main>
</template>