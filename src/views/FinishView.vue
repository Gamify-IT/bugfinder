<script setup lang="ts">
function closeGame() {
  playClickSound();
  window.parent.postMessage('CLOSE ME');
}

function playClickSound(){
  const clickSound = new Audio("@/assets/music/click_sound.mp3");
  clickSound.play();
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
