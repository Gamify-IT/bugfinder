<script setup lang="ts">
/**
 * Manages game views (home, game, finish) and controls background music and sound effects.
 */

import { ref, onMounted, onUnmounted } from 'vue';
import HomeView from '@/views/HomeView.vue';
import GameView from '@/views/GameView.vue';
import FinishView from '@/views/FinishView.vue';
import backgroundMusicSource from '@/assets/music/background_music.mp3';
import clickSoundSource from '@/assets/music/click_sound.mp3';
import { fetchAndChangeVolumeLevel } from '@/services/changeVolumeLevel';

let backgroundMusic = new Audio(backgroundMusicSource);
const clickSound = fetchAndChangeVolumeLevel(clickSoundSource);


onMounted(() => {
  backgroundMusic.volume = 0;
  backgroundMusic = fetchAndChangeVolumeLevel(backgroundMusicSource);
  backgroundMusic.loop = true;
  backgroundMusic.play();
});

onUnmounted(() => {
  backgroundMusic.pause();
  backgroundMusic.currentTime = 0;
});

enum views {
  home,
  game,
  finish,
}
const actualView = ref(views.home);

/**
 * Changes the current view of the application.
 *
 * @param {views} newView - The new view to switch to.
 */
function changeView(newView: views) {
  actualView.value = newView;
}

/**
 * Closes the game and sends a close signal to the parent window.
 */
function closeGame() {
  window.parent.postMessage('CLOSE ME');
}

function playClickSound(){
  clickSound.play();
}

/**
 * Handles closing the game, includes a delay to ensure smooth operation.
 *
 * @returns {Promise<void>} - Returns a promise that resolves after the game is closed.
 */
async function handleCloseGame() {
  await playClickSound();
    setTimeout(() => {
      closeGame();
    }, 500);
}
</script>

<template>
  <!-- The header section of the page with navigation -->
  <header>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <span class="navbar-brand mb-0 h1">Bugfinder</span>
      </div>
      <div class="mr-1">
        <!-- Close button to trigger the closeGame function -->
        <b-button variant="danger" class="nav-buttons close-button" id="close-button" v-on:click="handleCloseGame">
          <em class="bi-x"></em>
        </b-button>
      </div>
    </nav>
  </header>
  <!-- Conditional rendering of views based on the current view -->
  <HomeView v-if="actualView === views.home" @start-game="changeView(views.game)" />
  <GameView v-else-if="actualView === views.game" @end-game="changeView(views.finish)" />
  <FinishView v-else-if="actualView === views.finish" />
</template>

<script lang="ts"></script>
<style scoped>
.close-button {
  margin-right: 10px;
}
</style>
