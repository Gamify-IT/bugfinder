<script setup lang="ts">
import { createApp } from 'vue';
import HomeView from '@/views/HomeView.vue';
import GameView from '@/views/GameView.vue';

enum views {
  home,
  game,
}
var actualView = views.game;

function changeView(newView: views) {
  actualView = newView;
  console.log('change view to ' + actualView);
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
  <GameView v-else-if="actualView == views.game" @start-game="changeView(views.home)" />
</template>

<script lang="ts"></script>

<style>
@import '@/assets/base.css';
</style>
