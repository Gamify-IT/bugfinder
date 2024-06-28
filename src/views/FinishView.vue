<script setup lang="ts">
import mitt from 'mitt';
import { ref } from 'vue';

const emitter = mitt();
let score = ref(0);
let rewards = ref(0);

import { useStore } from 'vuex';

const store = useStore();

emitter.on('RewardsAndScores',  score => console.log('RewardsAndScores', score) )



function closeGame() {
  window.parent.postMessage('CLOSE ME');

}
</script>

<template>
  <main>
    <div class="text-center position-absolute top-50 start-50 translate-middle">
      <h2>You finished the Game!! You've gained {{ score = store.state.score }} scores and {{ rewards = store.state.rewards }} coins !! </h2>
      <b-button variant="danger" id="close-button" v-on:click="closeGame"> Back to game </b-button>
    </div>
  </main>
</template>