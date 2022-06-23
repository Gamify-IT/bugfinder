<script setup lang="ts">
import HomeView from '@/views/HomeView.vue';
import GameView from '@/views/GameView.vue';

const views = {
  home: HomeView,
  game: GameView,
};
//views.home.$on('startGame', () => (actualView = views.game));
var actualView: any = views.game;
</script>

<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <span class="navbar-brand mb-0 h1">Bugfinder</span>
      </div>
    </nav>
  </header>
  <component :is="actualView" />
</template>

<script lang="ts"></script>

<style>
@import '@/assets/base.css';
</style>
