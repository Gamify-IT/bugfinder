<script setup lang="ts">
import { ref } from 'vue';
import HomeView from '@/views/HomeView.vue';
import GameView from '@/views/GameView.vue';
import FinishView from '@/views/FinishView.vue';

enum views {
  home,
  game,
  finish,
}
var actualView = ref(views.home);

function changeView(newView: views) {
  actualView.value = newView;
}
</script>

<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <span class="navbar-brand mb-0 h1">Bugfinder</span>
      </div>
    </nav>
  </header>
  <HomeView v-if="actualView == views.home" @start-game="changeView(views.game)" />
  <GameView v-else-if="actualView == views.game" @end-game="changeView(views.finish)" />
  <FinishView v-else-if="actualView == views.finish" />
</template>

<script lang="ts"></script>

<style>
@import '@/assets/base.css';
</style>
