<script setup lang="ts">
import mitt, { Emitter } from 'mitt';
import { ref } from 'vue';


let rewards = ref(0);

type Events = {
  RewardsAndScores: { score: number };
  // Weitere Ereignisse hier...
};

const emitter: Emitter<Events> = mitt<Events>();
const score = ref(0);

emitter.on('RewardsAndScores', (data: { score: number }) => {
  console.log('RewardsAndScores', data.score);
  score.value = data.score;
});
function closeGame() {
  window.parent.postMessage('CLOSE ME');

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