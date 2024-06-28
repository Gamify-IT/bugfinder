<script setup lang="ts">
import { useStore } from 'vuex';

const store = useStore();

function closeGame() {
  window.parent.postMessage('CLOSE ME');
}

</script>

<template>
  <main>
    <div class="text-center position-absolute top-50 start-50 translate-middle">
      <h2>You finished the Game!! You've gained {{ store.state.score }} scores and {{ store.state.rewards }} coins !! </h2>
      <b-button variant="danger" id="close-button" v-on:click="closeGame"> Back to game </b-button>
    </div>
  </main>
</template>