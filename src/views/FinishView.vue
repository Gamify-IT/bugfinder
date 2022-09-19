<script setup lang="ts">
function closeGame() {
  window.parent.postMessage('CLOSE ME');
}
</script>

<template>
  <main>
    <div class="text-center position-absolute top-50 start-50 translate-middle">
      <h2>You finished the Game!</h2>
      <b-button variant="danger" id="close-button" v-on:click="closeGame"> Back to game </b-button>
    </div>
  </main>
</template>
