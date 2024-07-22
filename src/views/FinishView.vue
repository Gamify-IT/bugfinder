<script setup lang="ts">
import clickSoundSource from '@/assets/music/click_sound.mp3';

const clickSound = new Audio(clickSoundSource);
function closeGame() {
  window.parent.postMessage('CLOSE ME');
}

async function handleCloseGame() {
  await playClickSound();
    setTimeout(() => {
      closeGame();
    }, 500);
}

function playClickSound(){
  clickSound.play();
}
</script>

<template>
  <main>
    <div class="text-center position-absolute top-50 start-50 translate-middle">
      <h2>You finished the Game!</h2>
      <b-button variant="danger" id="close-button" v-on:click="handleCloseGame"> Back to game </b-button>
    </div>
  </main>
</template>
