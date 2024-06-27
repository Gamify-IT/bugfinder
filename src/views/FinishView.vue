<script setup lang="ts">

import { ref, onMounted } from 'vue';
import { BugFinderGame } from '@/services/bugfindergame';

const score = ref(0);
const rewards = ref(0);

let gameInstance: BugFinderGame | null = null;


function closeGame() {
  window.parent.postMessage('CLOSE ME');
}

onMounted(async () => {
  try {

    gameInstance = new BugFinderGame('configurationId'); // Passe die Konfigurations-ID entsprechend an

    score.value = gameInstance.getScore();
    rewards.value = gameInstance.getRewards();

  } catch (error) {
    console.error('Error initializing BugFinderGame:', error);
  }
});

</script>

<template>
  <main>
    <div class="text-center position-absolute top-50 start-50 translate-middle">
      <h2>You finished the Game!Your Score: {{ score }}! Your Rewards: {{ rewards }}!</h2>
      <b-button variant="danger" id="close-button" v-on:click="closeGame"> Back to game </b-button>
    </div>
  </main>
</template>
